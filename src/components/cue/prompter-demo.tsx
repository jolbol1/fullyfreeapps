import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { gsap, REDUCED, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import {
  PauseIcon,
  PlayIcon,
  RabbitIcon,
  SkipBackIcon,
  TurtleIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const HOLD_SPEED = 140;

type Line =
  | { kind: 'hidden'; text: string; why: string }
  | { kind: 'blank' }
  | { kind: 'md'; parts: (string | [string])[] };

/** The script as it sits on disk. `[x]` marks syntax Cue strips out. */
const source: Line[] = [
  { kind: 'hidden', text: '---', why: 'frontmatter' },
  { kind: 'hidden', text: 'title: Meet Cue', why: 'frontmatter' },
  { kind: 'hidden', text: '---', why: 'frontmatter' },
  {
    kind: 'hidden',
    text: '<!-- Slow down on the second line -->',
    why: 'comment',
  },
  { kind: 'blank' },
  { kind: 'md', parts: [['# '], 'Meet Cue'] },
  { kind: 'blank' },
  {
    kind: 'md',
    parts: [
      'Cue is a teleprompter that reads your ',
      ['**'],
      'Markdown scripts',
      ['**'],
      ' straight from disk. No imports, no copies, no accounts.',
    ],
  },
  { kind: 'blank' },
  { kind: 'md', parts: [['## '], 'Why I built it'] },
  { kind: 'blank' },
  {
    kind: 'md',
    parts: [
      'Every video I make starts as a Markdown file. I wanted to read that file on camera ',
      ['*'],
      'without',
      ['*'],
      ' pasting it somewhere else first.',
    ],
  },
  { kind: 'blank' },
  { kind: 'hidden', text: '![Desk B-roll](broll/desk.mov)', why: 'image' },
  { kind: 'blank' },
  { kind: 'md', parts: [['## '], 'How it works'] },
  { kind: 'blank' },
  { kind: 'md', parts: [['- '], 'Pick a folder of scripts'] },
  { kind: 'md', parts: [['- '], 'Choose one and press Play'] },
  { kind: 'md', parts: [['- '], 'Tap the pedal to take a breath'] },
  { kind: 'blank' },
  { kind: 'md', parts: [['> '], 'Edit in any app. Cue reloads as you save.'] },
  { kind: 'blank' },
  { kind: 'md', parts: ['That’s it. Let’s roll.'] },
];

/**
 * Cue in miniature: the Markdown on the left, what the prompter shows on the
 * right. Play, change speed, mirror the text, or hold the pedals to scroll.
 */
export function PrompterDemo() {
  const root = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const hold = useRef<-1 | 0 | 1>(0);
  const visible = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(48);
  const [mirror, setMirror] = useState(false);
  const [band, setBand] = useState(true);
  const [pressed, setPressed] = useState<'left' | 'centre' | 'right' | null>(
    null,
  );

  // The ticker reads the latest controls without re-subscribing.
  const state = useRef({ playing, speed });
  useEffect(() => {
    state.current = { playing, speed };
  }, [playing, speed]);

  // Scroll engine on GSAP's ticker: play speed, or pedal hold, in px per second.
  useGSAP(
    () => {
      const tick = (_: number, deltaMs: number) => {
        if (!visible.current || !screen.current || !text.current) return;
        const dt = Math.min(deltaMs, 64) / 1000;
        const velocity = hold.current
          ? hold.current * HOLD_SPEED
          : state.current.playing
            ? state.current.speed
            : 0;
        if (!velocity) return;
        const max = text.current.scrollHeight - screen.current.clientHeight;
        let next = pos.current + velocity * dt;
        if (next >= max) next = 0; // Loop back to the top, like Cue's loop option.
        pos.current = Math.max(0, next);
        gsap.set(text.current, { y: -pos.current });
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root },
  );

  // Start rolling the first time the demo comes into view; idle off-screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting && !started) {
          started = true;
          if (!window.matchMedia(REDUCED).matches) setPlaying(true);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rewind = () => {
    pos.current = 0;
    if (text.current)
      gsap.to(text.current, { y: 0, duration: 0.5, ease: 'power3.out' });
  };

  const startHold = (dir: -1 | 1) => {
    hold.current = dir;
    setPressed(dir === 1 ? 'right' : 'left');
  };
  const endHold = () => {
    hold.current = 0;
    setPressed(null);
  };

  const pedalKeys = (dir: -1 | 1) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      startHold(dir);
    },
    onPointerUp: endHold,
    onPointerCancel: endHold,
    onLostPointerCapture: endHold,
    onKeyDown: (e: React.KeyboardEvent) => {
      if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
        e.preventDefault();
        startHold(dir);
      }
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') endHold();
    },
    onBlur: endHold,
  });

  return (
    <div ref={root} className="grid gap-5 lg:grid-cols-12">
      {/* Source */}
      <div className="flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-[#101214] lg:col-span-5">
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-paper/55">
            scripts/meet-cue/script.md
          </span>
        </div>
        <pre className="max-h-[360px] flex-1 overflow-auto p-5 font-mono text-[0.8rem] leading-[1.75] whitespace-pre-wrap text-paper/80 lg:max-h-none">
          {source.map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="w-5 shrink-0 text-right text-paper/25 select-none">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                {line.kind === 'blank' && ' '}
                {line.kind === 'hidden' && (
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-paper/30 line-through decoration-paper/30">
                      {line.text}
                    </span>
                    <span className="rounded bg-paper/8 px-1.5 text-[0.65rem] tracking-wider text-paper/45 uppercase">
                      hidden · {line.why}
                    </span>
                  </span>
                )}
                {line.kind === 'md' &&
                  line.parts.map((part, j) =>
                    typeof part === 'string' ? (
                      <span key={j}>{part}</span>
                    ) : (
                      <span key={j} className="text-mint/70">
                        {part[0]}
                      </span>
                    ),
                  )}
              </span>
            </div>
          ))}
        </pre>
      </div>

      {/* Prompter */}
      <div className="flex flex-col gap-4 lg:col-span-7">
        <div
          ref={screen}
          className="relative h-[380px] overflow-hidden rounded-[1.5rem] border border-line bg-black sm:h-[440px]"
        >
          <p className="sr-only">
            Prompter preview: the script above, rendered without its Markdown
            symbols and scrolling at the chosen speed.
          </p>
          <div className={cn('h-full', mirror && '-scale-x-100')}>
            <div
              ref={text}
              aria-hidden="true"
              className="px-[9%] pt-[134px] pb-[250px] text-[clamp(1.25rem,2.3vw,1.85rem)] leading-[1.42] font-medium text-paper sm:pt-[156px] sm:pb-[290px]"
            >
              <Script />
            </div>
          </div>

          {/* Reading area: everything outside the band is dimmed. */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 flex flex-col transition-opacity duration-300',
              band ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div className="h-[34%] bg-black/65" />
            <div className="h-[19%]" />
            <div className="flex-1 bg-black/65" />
          </div>
          {/* Camera marker over the lens. It stays put when the text is mirrored. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[36%] left-1/2 size-9 -translate-x-1/2 border-mint/80"
          >
            <span className="absolute top-0 left-0 size-2.5 border-t-2 border-l-2 border-mint" />
            <span className="absolute top-0 right-0 size-2.5 border-t-2 border-r-2 border-mint" />
            <span className="absolute bottom-0 left-0 size-2.5 border-b-2 border-l-2 border-mint" />
            <span className="absolute right-0 bottom-0 size-2.5 border-r-2 border-b-2 border-mint" />
          </div>
          <span className="label absolute top-4 left-4 rounded-full bg-paper/10 px-2.5 py-1 text-[0.6rem] text-paper/70 backdrop-blur">
            Preview
          </span>
        </div>

        {/* Playback bar */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-4 rounded-[1.25rem] border border-line bg-ink-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={rewind}
              aria-label="Back to start"
              className="grid size-10 place-items-center rounded-full text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
            >
              <SkipBackIcon className="size-4.5" />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={playing}
              className="flex h-10 items-center gap-2 rounded-full bg-mint px-5 text-sm font-semibold text-ink transition-colors hover:bg-[color-mix(in_oklch,var(--mint),white_18%)]"
            >
              {playing ? (
                <PauseIcon className="size-4" />
              ) : (
                <PlayIcon className="size-4" />
              )}
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
          <div className="flex min-w-[220px] flex-1 items-center gap-3">
            <TurtleIcon
              className="size-4.5 shrink-0 text-paper/50"
              aria-hidden="true"
            />
            <Slider
              aria-label="Scroll speed"
              min={15}
              max={120}
              value={[speed]}
              onValueChange={(v) => setSpeed(Array.isArray(v) ? v[0] : v)}
              className="[&_[data-slot=slider-range]]:bg-mint [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:border-mint"
            />
            <RabbitIcon
              className="size-4.5 shrink-0 text-paper/50"
              aria-hidden="true"
            />
            <span className="w-16 shrink-0 text-right font-mono text-xs text-paper/60 tabular-nums">
              {speed} pt/s
            </span>
          </div>
          <div className="flex items-center gap-5 text-sm text-paper/75">
            <label className="flex items-center gap-2.5">
              <Switch
                checked={mirror}
                onCheckedChange={setMirror}
                aria-label="Mirror"
                className="data-checked:bg-mint"
              />
              Mirror
            </label>
            <label className="flex items-center gap-2.5">
              <Switch
                checked={band}
                onCheckedChange={setBand}
                aria-label="Reading area"
                className="data-checked:bg-mint"
              />
              Reading area
            </label>
          </div>
        </div>

        {/* Stream Deck Pedal */}
        <div className="rounded-[1.25rem] border border-line bg-ink-2 p-4">
          <p className="text-sm text-paper/60">
            <span className="font-medium text-paper">Try the pedal.</span> Hold
            a side pedal to scroll, tap the centre to play or pause.
          </p>
          <div className="mt-4 grid grid-cols-[1fr_1.6fr_1fr] gap-2 rounded-2xl bg-black p-2 shadow-[inset_0_2px_8px_rgb(0_0_0/0.8)]">
            <button
              type="button"
              aria-label="Left pedal: hold to scroll back"
              {...pedalKeys(-1)}
              className={pedal(pressed === 'left')}
            >
              <span className="label text-[0.6rem]">Hold</span>
              Scroll back
            </button>
            <button
              type="button"
              aria-label="Centre pedal: play or pause"
              onClick={() => {
                setPlaying((p) => !p);
                setPressed('centre');
                setTimeout(() => setPressed(null), 140);
              }}
              className={pedal(pressed === 'centre')}
            >
              <span className="label text-[0.6rem]">Tap</span>
              Play / pause
            </button>
            <button
              type="button"
              aria-label="Right pedal: hold to scroll forward"
              {...pedalKeys(1)}
              className={pedal(pressed === 'right')}
            >
              <span className="label text-[0.6rem]">Hold</span>
              Scroll forward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const pedal = (active: boolean) =>
  cn(
    'flex h-20 touch-none flex-col items-center justify-center gap-1 rounded-xl border text-sm font-medium transition-all select-none',
    active
      ? 'translate-y-px border-mint/60 bg-mint/15 text-mint'
      : 'border-paper/10 bg-[#1a1b1d] text-paper/75 hover:border-paper/25',
  );

/** What Cue renders from the source: no symbols, no hidden blocks. */
function Script() {
  return (
    <div className="space-y-[0.9em]">
      <p className="font-bold">Meet Cue</p>
      <p className="text-paper/90">
        Cue is a teleprompter that reads your <strong>Markdown scripts</strong>{' '}
        straight from disk. No imports, no copies, no accounts.
      </p>
      <p className="font-bold">Why I built it</p>
      <p className="text-paper/90">
        Every video I make starts as a Markdown file. I wanted to read that file
        on camera <em>without</em> pasting it somewhere else first.
      </p>
      <p className="font-bold">How it works</p>
      <ul className="space-y-[0.2em] text-paper/90">
        <li>• Pick a folder of scripts</li>
        <li>• Choose one and press Play</li>
        <li>• Tap the pedal to take a breath</li>
      </ul>
      <p className="text-paper/90 italic">
        Edit in any app. Cue reloads as you save.
      </p>
      <p className="text-paper/90">That’s it. Let’s roll.</p>
    </div>
  );
}
