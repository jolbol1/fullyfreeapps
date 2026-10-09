import { Timecode } from '@/components/timecode';
import { buttonVariants } from '@/components/ui/button';
import { gsap, MOTION, REDUCED, useGSAP } from '@/lib/gsap';
import { play, warm } from '@/lib/sound';
import { cn } from '@/lib/utils';
import { ArrowDownIcon } from 'lucide-react';
import { useRef, useState } from 'react';

/** Open the stick so its tip lifts ~2.4× its own height, whatever the width. */
function openAngle(stick: HTMLElement | null) {
  if (!stick) return -10;
  const lift = stick.offsetHeight * 2.4;
  return -(Math.atan(lift / stick.offsetWidth) * 180) / Math.PI;
}

/**
 * The home hero is a clapperboard: the top stick snaps shut on load, and
 * tapping it claps again (with Slate's own clap) and bumps the take.
 */
export function ClapperHero() {
  const root = useRef<HTMLElement>(null);
  const stick = useRef<HTMLButtonElement>(null);
  const [take, setTake] = useState(1);

  const flash = () =>
    gsap.fromTo(
      '[data-flash]',
      { opacity: 0.14 },
      { opacity: 0, duration: 0.6, ease: 'power2.out' },
    );

  const thud = () =>
    gsap.fromTo(
      '[data-board]',
      { y: 5 },
      { y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' },
    );

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap
          .timeline({ delay: 0.15 })
          .set(stick.current, { rotate: openAngle(stick.current) })
          .fromTo(
            '[data-board]',
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out' },
          )
          .to(
            stick.current,
            { rotate: 0, duration: 0.24, ease: 'power4.in' },
            '-=0.35',
          )
          .add(flash)
          .add(thud, '<')
          .from(
            '[data-hero-line]',
            { yPercent: 115, duration: 1.2, ease: 'expo.out', stagger: 0.1 },
            '<0.02',
          )
          .from(
            '[data-hero-fade]',
            {
              autoAlpha: 0,
              y: 20,
              duration: 1,
              ease: 'expo.out',
              stagger: 0.06,
            },
            '<0.3',
          );
      });
    },
    { scope: root },
  );

  // Wrapped per click so GSAP can clean up anything it starts.
  const clap = () =>
    contextSafe(() => {
      const still = window.matchMedia(REDUCED).matches;
      const raise = still ? 0 : 0.2;
      const drop = still ? 0 : 0.14;
      void play('clap', { volume: 0.5, delay: raise + drop });
      if (still) {
        setTake((t) => t + 1);
        return;
      }
      gsap
        .timeline()
        .to(stick.current, {
          rotate: openAngle(stick.current),
          duration: raise,
          ease: 'power2.out',
          overwrite: true,
        })
        .to(stick.current, { rotate: 0, duration: drop, ease: 'power4.in' })
        .add(() => {
          flash();
          thud();
          setTake((t) => t + 1);
        });
    })();

  const fields = [
    { label: 'Take', value: String(take).padStart(2, '0'), live: true },
    { label: 'Price', value: '£0.00' },
    { label: 'Ads', value: 'None' },
    { label: 'Tracking', value: 'None' },
  ];

  return (
    <section ref={root} className="relative pt-22 pb-6 sm:pt-26">
      <div
        data-flash
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] bg-paper opacity-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-[-15%] -z-10 size-[min(900px,120vw)] rounded-full bg-[radial-gradient(closest-side,rgb(255_165_58/0.16),transparent)]"
      />

      <div className="shell">
        <div data-intro data-board className="relative">
          {/* Top stick: hinged at the bottom-left, like a real clapper. */}
          <div className="relative h-[clamp(2.75rem,5.2vw,4.25rem)]">
            <button
              ref={stick}
              type="button"
              onClick={clap}
              onPointerEnter={() => warm('clap')}
              onFocus={() => warm('clap')}
              aria-label="Clap the slate (plays a clap sound)"
              className="group absolute inset-0 flex origin-[calc(clamp(2.75rem,5.2vw,4.25rem)/2)_100%] cursor-pointer items-center justify-center overflow-hidden rounded-t-[1.25rem] rounded-b-[0.3rem] stripes [--stripe:clamp(16px,2.2vw,30px)]"
            >
              <Hinge pivot />
              <span className="label rounded-full bg-amber px-4 py-2 text-[0.625rem] font-semibold text-ink shadow-[0_6px_20px_-4px_rgb(0_0_0/0.6)] transition-transform group-hover:scale-105 group-active:scale-95 sm:px-6 sm:text-xs">
                Tap to clap
              </span>
            </button>
          </div>
          {/* Bottom stick, fixed to the board. */}
          <div className="relative mt-[3px] h-[clamp(2.75rem,5.2vw,4.25rem)] overflow-hidden rounded-[0.3rem] stripes [--stripe:clamp(16px,2.2vw,30px)] [background-position:calc(clamp(16px,2.2vw,30px)*1.2)_0]">
            <Hinge />
          </div>

          <div className="mt-[3px] overflow-hidden rounded-b-[1.75rem] border border-line bg-ink-2/85 backdrop-blur-sm">
            <div className="grid gap-10 px-6 pt-8 pb-10 sm:px-10 sm:pt-10 lg:px-14 lg:pt-12 lg:pb-14">
              <div className="label flex flex-wrap items-center justify-between gap-3 text-paper/45">
                <span data-hero-fade>Independent apps · Made in the UK</span>
                <span data-hero-fade>Prod. Fully Free Apps</span>
              </div>

              <h1 className="display text-[clamp(3.6rem,12.4vw,11.5rem)] leading-[0.88]">
                <span className="block overflow-hidden pb-[0.06em]">
                  <span data-hero-line className="block">
                    Good tools.
                  </span>
                </span>
                <span className="-mt-[0.04em] block overflow-hidden pr-[0.1em] pb-[0.14em]">
                  <span
                    data-hero-line
                    className="serif-accent block text-[1.06em] text-amber"
                  >
                    Fully free.
                  </span>
                </span>
              </h1>

              <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
                <p
                  data-hero-fade
                  className="max-w-[46ch] text-lg leading-relaxed text-paper/70 sm:text-xl"
                >
                  Small, focused apps for people who make things. No ads, no
                  subscriptions, no tracking, and every feature included.
                </p>
                <div data-hero-fade className="flex flex-wrap gap-3">
                  <a
                    href="#apps"
                    className={buttonVariants({ variant: 'amber', size: 'xl' })}
                  >
                    Meet the apps
                    <ArrowDownIcon />
                  </a>
                  <a
                    href="#promise"
                    className={buttonVariants({ variant: 'line', size: 'xl' })}
                  >
                    Our promise
                  </a>
                </div>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
              {fields.map((f) => (
                <div
                  key={f.label}
                  className="bg-ink-2 px-6 py-5 sm:px-10 lg:px-8"
                >
                  <dt className="label text-paper/40">{f.label}</dt>
                  <dd
                    className="mt-2 font-mono text-xl tabular-nums sm:text-2xl"
                    aria-live={f.live ? 'polite' : undefined}
                  >
                    {f.value}
                  </dd>
                </div>
              ))}
              <div className="col-span-2 bg-ink-2 px-6 py-5 sm:px-10 lg:col-span-1 lg:px-8">
                <dt className="label text-paper/40">Local time · 24 fps</dt>
                <dd className="mt-2 text-xl text-amber sm:text-2xl">
                  <Timecode />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hinge({ pivot }: { pivot?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'absolute inset-y-0 left-0 grid aspect-square place-items-center bg-ink-3 shadow-[1px_0_0_rgb(255_255_255/0.06)]',
        pivot ? 'rounded-tl-[1.25rem]' : '',
      )}
    >
      {pivot && (
        <span className="size-[38%] rounded-full bg-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(255_255_255/0.08)]" />
      )}
    </span>
  );
}
