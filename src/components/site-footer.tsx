import { gsap, MOTION, SplitText, useGSAP } from '@/lib/gsap';
import { cue, site, slate } from '@/lib/site';
import { Link } from '@tanstack/react-router';
import { ArrowUpRightIcon } from 'lucide-react';
import { useRef } from 'react';

const columns = [
  {
    title: 'Apps',
    links: [
      { to: '/slate', label: 'Slate for iPhone & iPad' },
      { to: '/cue', label: 'Cue for Mac' },
    ],
  },
  {
    title: 'Help',
    links: [
      { to: '/support', label: 'Support' },
      { to: '/privacy', label: 'Privacy' },
    ],
  },
  {
    title: 'Source',
    links: [
      { href: slate.source, label: 'Slate on GitHub' },
      { href: cue.source, label: 'Cue on GitHub' },
    ],
  },
] as const;

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const split = SplitText.create('[data-wordmark]', {
          type: 'chars',
          mask: 'chars',
        });
        gsap.from(split.chars, {
          yPercent: 105,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.035,
          scrollTrigger: { trigger: '[data-wordmark]', start: 'top 95%' },
          onComplete: () => split.revert(),
        });
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="relative mt-24 border-t border-line pt-20">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="label text-paper/45">Need help?</p>
          <Link
            to="/support"
            className="group mt-5 inline-flex items-center gap-3 text-[clamp(1.6rem,3.4vw,2.75rem)] font-semibold tracking-[-0.04em] text-paper transition-colors hover:text-amber"
          >
            Get support
            <ArrowUpRightIcon className="size-[0.8em] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          <p className="mt-4 max-w-[48ch] leading-relaxed text-paper/55">
            Questions and bug reports go best as a GitHub issue for{' '}
            <a
              href={slate.issues}
              className="text-paper/80 underline decoration-paper/25 underline-offset-4 hover:decoration-paper"
            >
              Slate
            </a>{' '}
            or{' '}
            <a
              href={cue.issues}
              className="text-paper/80 underline decoration-paper/25 underline-offset-4 hover:decoration-paper"
            >
              Cue
            </a>
            . Prefer email, or have an idea for a new app? Write to{' '}
            <a
              href={`mailto:${site.email}`}
              className="text-paper/80 underline decoration-paper/25 underline-offset-4 hover:decoration-paper"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6"
        >
          {columns.map((col) => (
            <div key={col.title}>
              <p className="label text-paper/45">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'to' in link ? (
                      <Link
                        to={link.to}
                        className="text-paper/75 transition-colors hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-paper/75 transition-colors hover:text-paper"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="shell mt-20">
        {/* Sized in container units so the wordmark always spans the shell. */}
        <div className="@container">
          <p
            data-wordmark
            aria-hidden="true"
            className="display pb-[0.06em] text-[15.6cqw] leading-none tracking-[-0.06em] whitespace-nowrap text-paper"
          >
            fully free apps<span className="text-amber">.</span>
          </p>
        </div>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-line py-8 text-sm text-paper/45 lg:flex-row lg:items-end lg:justify-between">
        <p className="max-w-[80ch] leading-relaxed">
          Fully Free Apps is a trading name of {site.company.name}. Registered
          in England and Wales, company number {site.company.number}. Registered
          office: {site.company.office}.
        </p>
        <p className="shrink-0">
          © {__BUILD_YEAR__} {site.company.name}
        </p>
      </div>
    </footer>
  );
}
