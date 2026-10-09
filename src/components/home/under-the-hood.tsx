import { AppIcon } from '@/components/app-icon';
import { GitHubIcon } from '@/components/icons';
import { SectionHeading } from '@/components/section-heading';
import { gsap, MOTION, useGSAP } from '@/lib/gsap';
import { cue, slate } from '@/lib/site';
import { ArrowUpRightIcon } from 'lucide-react';
import { useRef } from 'react';

const stats = ['Ads', 'Trackers', 'Third-party SDKs', 'Network requests'];
const DIGITS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const repos = [
  {
    app: 'slate' as const,
    name: 'jolbol1/slate',
    stack: 'Swift · UIKit',
    href: slate.source,
  },
  {
    app: 'cue' as const,
    name: 'jolbol1/cue',
    stack: 'Swift · SwiftUI · AppKit',
    href: cue.source,
  },
];

export function UnderTheHood() {
  const root = useRef<HTMLElement>(null);

  // Each counter rolls down from 9 and lands on zero.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.fromTo(
          '[data-roll]',
          { y: 0, yPercent: 0 },
          {
            yPercent: -90,
            duration: 1.8,
            ease: 'expo.inOut',
            stagger: 0.12,
            scrollTrigger: { trigger: '[data-stats]', start: 'top 80%' },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="py-24 lg:py-36">
      <div className="shell">
        <SectionHeading
          label="Under the hood"
          title={
            <>
              Native, light and{' '}
              <span className="serif-accent text-amber">open to read.</span>
            </>
          }
          intro="Both apps are written in Swift with Apple’s own frameworks: UIKit for Slate; SwiftUI, AppKit and TextKit for Cue. No web views, no third-party SDKs, and the source for each is on GitHub."
        />

        <dl
          data-stats
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:mt-20 lg:grid-cols-4"
        >
          {stats.map((label) => (
            <div key={label} className="flex flex-col gap-3 bg-ink p-6 sm:p-8">
              <dt className="label order-2 text-paper/50">{label}</dt>
              <dd className="order-1 display text-[clamp(4rem,9vw,8rem)] leading-none">
                <span className="sr-only">0</span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-[1em] overflow-hidden"
                >
                  <span
                    data-roll
                    className="flex flex-col"
                    style={{ transform: 'translateY(-90%)' }}
                  >
                    {DIGITS.map((d) => (
                      <span key={d} className="h-[1em] leading-none">
                        {d}
                      </span>
                    ))}
                  </span>
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => (
            <li key={repo.name} data-reveal>
              <a
                href={repo.href}
                className="group flex items-center gap-5 rounded-3xl border border-line bg-ink-2 p-5 transition-colors hover:border-paper/25 sm:p-6"
              >
                <AppIcon app={repo.app} size={52} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-mono text-[0.9375rem] text-paper">
                    <GitHubIcon className="size-4 shrink-0 text-paper/60" />
                    <span className="truncate">{repo.name}</span>
                  </p>
                  <p className="mt-1 text-sm text-paper/50">{repo.stack}</p>
                </div>
                <ArrowUpRightIcon className="size-5 shrink-0 text-paper/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
