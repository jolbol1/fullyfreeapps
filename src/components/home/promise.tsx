import { gsap, MOTION, SplitText, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

const principles = [
  {
    title: 'Every feature included.',
    body: 'No upgrades to unlock. No trials, subscriptions or in-app purchases.',
  },
  {
    title: 'Nothing in the way.',
    body: 'No ads, no sign-up and no account. Open the app and get to work.',
  },
  {
    title: 'Your data stays put.',
    body: 'No analytics or tracking. Slate and Cue keep everything on your device and make no network requests.',
  },
  {
    title: 'Native and light.',
    body: 'Written in Swift with Apple’s own frameworks. No web views and no third-party SDKs.',
  },
];

/** The cream "slate paper" section; the statement inks in as you scroll. */
export function ThePromise() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const split = SplitText.create('[data-statement]', { type: 'words' });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.12,
            scrollTrigger: {
              trigger: '[data-statement]',
              start: 'top 78%',
              end: 'bottom 52%',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="promise"
      className="grain mx-2 scroll-mt-20 rounded-[2rem] bg-paper py-24 text-ink sm:mx-4 sm:rounded-[2.75rem] lg:py-36"
    >
      <div className="shell">
        <p data-reveal className="label flex items-center gap-3 text-ink/55">
          <span className="size-1.5 rounded-full bg-ink" />
          The promise
        </p>
        <p
          data-statement
          className="display mt-8 max-w-[19ch] text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.98]"
        >
          Free means the{' '}
          <span className="serif-accent text-[1.06em]">whole</span> app. No
          trials, no tiers, no ads and no tracking. Just a good tool that does
          its job.
        </p>

        <ol className="mt-20 grid border-t border-ink/15 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              className="flex flex-col gap-4 border-b border-ink/15 py-8 sm:pr-8 lg:border-b-0 lg:py-10 lg:not-last:border-r lg:not-first:pl-8"
            >
              <span className="font-mono text-sm text-ink/45">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                {p.title}
              </h3>
              <p className="leading-relaxed text-ink/65">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
