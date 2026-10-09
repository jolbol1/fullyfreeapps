import { Timecode } from '@/components/timecode';
import { Switch } from '@/components/ui/switch';
import { gsap, REDUCED, useGSAP } from '@/lib/gsap';
import { play, warm } from '@/lib/sound';
import { cn } from '@/lib/utils';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { useRef, useState, useSyncExternalStore } from 'react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const FRAME_RATES = [24, 25, 30, 48, 50, 60];
const MONTHS = 'JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split(' ');
const MAX = 9999;

const noop = () => () => {};
function today() {
  const d = new Date();
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

type Slate = {
  scene: number;
  shot: number;
  take: number;
  cam: number;
  fps: number;
  interior: boolean;
  night: boolean;
  mos: boolean;
  locked: boolean;
};

const initial: Slate = {
  scene: 2,
  shot: 1,
  take: 1,
  cam: 1,
  fps: 24,
  interior: false,
  night: true,
  mos: false,
  locked: false,
};

/**
 * A working web replica of Slate's landscape layout. It follows the app's
 * rules: shot runs A–Z, take resets on a new scene or shot, the lock needs a
 * double-tap, and the clapper still works while locked.
 */
export function SlateDemo() {
  const root = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLButtonElement>(null);
  const lastTap = useRef(0);
  const [slate, setSlate] = useState(initial);
  const [sound, setSound] = useState<'clap' | 'beep'>('clap');
  const [flash, setFlash] = useState(true);
  const [resetTake, setResetTake] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  // Today's date from the device clock, rendered on the client only.
  const date = useSyncExternalStore(noop, today, () => '');

  const { contextSafe } = useGSAP({ scope: root });
  const { locked } = slate;

  const update = (patch: (s: Slate) => Partial<Slate>) =>
    setSlate((s) => (s.locked ? s : { ...s, ...patch(s) }));

  const clamp = (n: number) => Math.min(MAX, Math.max(1, n));

  const step = (key: 'scene' | 'shot' | 'take', by: 1 | -1) =>
    update((s) => {
      if (key === 'take') return { take: clamp(s.take + by) };
      const value =
        key === 'shot'
          ? Math.min(25, Math.max(0, s.shot + by))
          : clamp(s.scene + by);
      if (value === s[key]) return {};
      const patch: Partial<Slate> =
        key === 'shot' ? { shot: value } : { scene: value };
      return resetTake ? { ...patch, take: 1 } : patch;
    });

  const clap = () =>
    contextSafe(() => {
      const still = window.matchMedia(REDUCED).matches;
      const drop = still ? 0 : 0.13;
      void play(sound, { delay: drop });
      const hit = () => {
        if (flash) {
          gsap.fromTo(
            '[data-demo-flash]',
            { opacity: 0.8 },
            { opacity: 0, duration: 0.5, ease: 'power2.out' },
          );
        }
      };
      if (still) return hit();
      gsap
        .timeline()
        .set(stick.current, { rotate: -4 })
        .to(stick.current, { rotate: 0, duration: drop, ease: 'power4.in' })
        .add(hit);
    })();

  // The lock ignores single taps, exactly like the app.
  const tapLock = () =>
    contextSafe(() => {
      const now = performance.now();
      if (now - lastTap.current < 600) {
        lastTap.current = 0;
        setSlate((s) => ({ ...s, locked: !s.locked }));
        return;
      }
      lastTap.current = now;
      if (!window.matchMedia(REDUCED).matches) {
        gsap.fromTo(
          '[data-lock-hint]',
          { x: -4 },
          { x: 0, duration: 0.5, ease: 'elastic.out(1.2, 0.3)' },
        );
      }
    })();

  return (
    <div
      ref={root}
      className="@container relative overflow-hidden rounded-[1.75rem] border border-line bg-[#0a0b0c] p-4 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] select-none @2xl:p-7"
      onPointerEnter={() => warm(sound)}
    >
      <div
        data-demo-flash
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 bg-white opacity-0"
      />

      <button
        ref={stick}
        type="button"
        onClick={clap}
        aria-label={`Tap to ${sound}`}
        className="group relative flex h-14 w-full origin-[0%_100%] cursor-pointer items-center justify-center overflow-hidden rounded-[1.1rem] stripes [--stripe:20px] @2xl:h-[4.5rem] @2xl:[--stripe:26px]"
      >
        <span className="label rounded-full bg-amber px-5 py-2.5 text-[0.7rem] font-bold tracking-[0.22em] text-ink shadow-lg transition-transform group-active:scale-95 @2xl:px-8 @2xl:py-3 @2xl:text-sm">
          Tap to {sound}
        </span>
      </button>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <p className="text-xl font-semibold tracking-tight @2xl:text-2xl">
          Night Train
        </p>
        <div className="flex items-center gap-4">
          <span className="label hidden text-[0.8rem] font-semibold text-paper/85 @xl:inline">
            {date}
          </span>
          <span
            className={cn(
              'label flex items-center gap-2 text-[0.75rem] font-semibold',
              locked ? 'text-amber' : 'text-paper/50',
            )}
            aria-live="polite"
          >
            <span className="size-2 rounded-full bg-current" />
            {locked ? 'Locked' : 'Ready'}
          </span>
          <button
            type="button"
            onClick={() => setSettingsOpen((o) => !o)}
            aria-expanded={settingsOpen}
            aria-controls="slate-demo-settings"
            className="label rounded-full border border-paper/15 bg-ink-3 px-4 py-2.5 text-[0.72rem] font-semibold text-paper transition-colors hover:border-paper/30"
          >
            Settings
          </button>
        </div>
      </div>

      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] @2xl:-mx-7 @2xl:px-7">
        <Tag name="Roll" value="A001" />
        <Tag
          name="Cam"
          value={LETTERS[slate.cam]}
          disabled={locked}
          onClick={() => update((s) => ({ cam: (s.cam + 1) % 26 }))}
        />
        <Tag name="Snd" value="S001" />
        <Tag
          name="FPS"
          value={String(slate.fps)}
          disabled={locked}
          onClick={() =>
            update((s) => ({
              fps: FRAME_RATES[
                (FRAME_RATES.indexOf(s.fps) + 1) % FRAME_RATES.length
              ],
            }))
          }
        />
        <Pair
          a="Int"
          b="Ext"
          second={!slate.interior}
          disabled={locked}
          onClick={() => update((s) => ({ interior: !s.interior }))}
        />
        <Pair
          a="Day"
          b="Night"
          second={slate.night}
          disabled={locked}
          onClick={() => update((s) => ({ night: !s.night }))}
        />
        <Pair
          a="Sync"
          b="MOS"
          second={slate.mos}
          disabled={locked}
          onClick={() => update((s) => ({ mos: !s.mos }))}
        />
      </div>

      <hr className="my-4 border-line @2xl:my-5" />

      <div className="grid gap-3 @2xl:grid-cols-3">
        <Counter
          label="Scene"
          value={String(slate.scene)}
          locked={locked}
          atMin={slate.scene <= 1}
          atMax={slate.scene >= MAX}
          onStep={(by) => step('scene', by)}
        />
        <Counter
          label="Shot"
          value={LETTERS[slate.shot]}
          locked={locked}
          atMin={slate.shot <= 0}
          atMax={slate.shot >= 25}
          onStep={(by) => step('shot', by)}
        />
        <Counter
          label="Take"
          value={String(slate.take)}
          locked={locked}
          atMin={slate.take <= 1}
          atMax={slate.take >= MAX}
          onStep={(by) => step('take', by)}
        />
      </div>

      <hr className="my-4 border-line @2xl:my-5" />

      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={tapLock}
            aria-pressed={locked}
            className={cn(
              'rounded-full px-7 py-3.5 text-base font-medium transition-colors @2xl:px-10 @2xl:py-4 @2xl:text-lg',
              locked
                ? 'bg-amber text-ink'
                : 'border border-paper/15 bg-ink-3 text-paper hover:border-paper/30',
            )}
          >
            {locked ? 'Unlock slate' : 'Lock slate'}
          </button>
          <p data-lock-hint className="mt-2 text-xs text-paper/50 @2xl:text-sm">
            Double-tap to {locked ? 'unlock' : 'lock'}
          </p>
        </div>
        <div className="text-right">
          <Timecode
            fps={slate.fps}
            className="block font-sans text-[clamp(1.75rem,7cqw,3.5rem)] leading-none font-medium text-paper"
          />
          <p className="label mt-2 text-paper/50">
            Local time · {slate.fps} fps
          </p>
        </div>
      </div>

      {settingsOpen && (
        <section
          id="slate-demo-settings"
          aria-label="Slate settings"
          className="absolute inset-x-4 top-20 z-30 rounded-3xl border border-paper/10 bg-[#1c1c1e]/95 p-5 shadow-2xl backdrop-blur-xl @lg:inset-x-auto @lg:right-7 @lg:w-80 @2xl:top-24"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold">Slate Settings</p>
            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              aria-label="Close settings"
              className="grid size-8 place-items-center rounded-full bg-paper/10 hover:bg-paper/20"
            >
              <XIcon className="size-4" />
            </button>
          </div>
          <p className="mt-5 text-sm text-paper/55">Slate sound</p>
          <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl bg-ink/60 p-1">
            {(['clap', 'beep'] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={sound === s}
                onClick={() => {
                  setSound(s);
                  warm(s);
                }}
                className={cn(
                  'rounded-lg py-2 text-sm capitalize transition-colors',
                  sound === s ? 'bg-paper/15 text-paper' : 'text-paper/55',
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <label className="mt-4 flex items-center justify-between gap-4 text-sm">
            Screen flash
            <Switch
              checked={flash}
              onCheckedChange={setFlash}
              aria-label="Screen flash"
            />
          </label>
          <label className="mt-4 flex items-center justify-between gap-4 text-sm">
            Reset take for new scene or shot
            <Switch
              checked={resetTake}
              onCheckedChange={setResetTake}
              aria-label="Reset take for new scene or shot"
            />
          </label>
        </section>
      )}
    </div>
  );
}

function Tag({
  name,
  value,
  disabled,
  onClick,
}: {
  name: string;
  value: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const body = (
    <>
      <span className="text-paper/45">{name}</span>
      <span className="text-[1.1em] text-paper">{value}</span>
    </>
  );
  const cls =
    'label flex shrink-0 items-baseline gap-3 rounded-full bg-ink-3 px-4 py-2.5 text-[0.72rem] font-semibold';
  if (!onClick) return <span className={cls}>{body}</span>;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${name} ${value}. Tap to change.`}
      className={cn(cls, 'transition-colors enabled:hover:bg-[#262624]')}
    >
      {body}
    </button>
  );
}

function Pair({
  a,
  b,
  second,
  disabled,
  onClick,
}: {
  a: string;
  b: string;
  second: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${second ? b : a}. Tap to switch to ${second ? a : b}.`}
      className="label flex shrink-0 items-baseline gap-2 rounded-full bg-ink-3 px-4 py-2.5 text-[0.72rem] font-bold transition-colors enabled:hover:bg-[#262624]"
    >
      <span className={second ? 'text-paper/30' : 'text-paper'}>{a}</span>
      <span className="text-paper/25">/</span>
      <span className={second ? 'text-paper' : 'text-paper/30'}>{b}</span>
    </button>
  );
}

function Counter({
  label,
  value,
  locked,
  atMin,
  atMax,
  onStep,
}: {
  label: string;
  value: string;
  locked: boolean;
  atMin: boolean;
  atMax: boolean;
  onStep: (by: 1 | -1) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const direction = useRef<1 | -1>(1);

  // Roll the new value in from the direction it moved.
  useGSAP(
    () => {
      if (window.matchMedia(REDUCED).matches) return;
      gsap.fromTo(
        '[data-value]',
        { yPercent: 28 * direction.current, opacity: 0.2 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: 'expo.out' },
      );
    },
    { scope: ref, dependencies: [value], revertOnUpdate: false },
  );

  const press = (by: 1 | -1) => {
    direction.current = by;
    onStep(by);
  };

  const button =
    'grid h-12 place-items-center rounded-2xl border border-paper/10 bg-[#262628] text-paper transition-colors enabled:hover:bg-[#303032] enabled:active:bg-[#38383a] disabled:text-paper/25 @2xl:h-14 @2xl:flex-1 @2xl:rounded-full';

  return (
    <div
      ref={ref}
      className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-paper/[0.08] bg-[#151617] px-5 py-4 @2xl:flex-col @2xl:items-stretch @2xl:px-6 @2xl:py-5"
    >
      <div className="@2xl:text-center">
        <p className="label text-[0.75rem] text-paper/50">{label}</p>
        <p
          className="mt-1 overflow-hidden text-[clamp(3.25rem,15cqw,5rem)] leading-[1.05] font-medium tabular-nums text-[#f3f0e6] @2xl:my-2 @2xl:text-[10.5cqw]"
          aria-live="polite"
        >
          <span data-value className="inline-block">
            {value}
          </span>
        </p>
      </div>
      <div className="flex w-36 gap-2 @2xl:w-auto">
        <button
          type="button"
          onClick={() => press(-1)}
          disabled={locked || atMin}
          aria-label={`Decrease ${label.toLowerCase()}`}
          className={cn(button, 'flex-1')}
        >
          <MinusIcon className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => press(1)}
          disabled={locked || atMax}
          aria-label={`Increase ${label.toLowerCase()}`}
          className={cn(button, 'flex-1')}
        >
          <PlusIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
