import { gsap, MOTION, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

/**
 * The <main> landmark for every route. Anything inside marked `data-reveal`
 * rises into view as it scrolls in; `data-reveal="fade"` skips the movement.
 */
export function Page({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
        items.forEach((el) =>
          gsap.set(el, {
            autoAlpha: 0,
            y: el.dataset.reveal === 'fade' ? 0 : 32,
          }),
        );
        ScrollTrigger.batch(items, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: 'expo.out',
              stagger: 0.07,
              overwrite: true,
            }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <main
      ref={ref}
      id="main"
      tabIndex={-1}
      className={cn('outline-none', className)}
    >
      {children}
    </main>
  );
}
