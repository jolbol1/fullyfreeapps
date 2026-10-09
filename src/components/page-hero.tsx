import { gsap, MOTION, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

/** The opening of a plain content page: label, big title and intro. */
export function PageHero({
  label,
  title,
  children,
}: {
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.fromTo(
          '[data-intro]',
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.08,
            delay: 0.1,
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <header ref={root} className="shell pt-32 pb-14 lg:pt-44 lg:pb-20">
      <p data-intro className="label flex items-center gap-3 text-paper/55">
        <span className="size-1.5 rounded-full bg-amber" />
        {label}
      </p>
      <h1 data-intro className="display mt-6 text-[clamp(3.5rem,10vw,8.5rem)]">
        {title}
      </h1>
      {children && (
        <div
          data-intro
          className="mt-8 max-w-[52ch] text-lg leading-relaxed text-paper/65 sm:text-xl"
        >
          {children}
        </div>
      )}
    </header>
  );
}
