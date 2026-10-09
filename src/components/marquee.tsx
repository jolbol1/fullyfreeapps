import { Spark } from '@/components/icons';
import { gsap, MOTION, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

/** An endless ticker that speeds up with the scroll. */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const loop = gsap.to('[data-track]', {
          xPercent: -50,
          duration: 40,
          ease: 'none',
          repeat: -1,
        });
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 220, 7);
            loop.timeScale(1 + boost);
            gsap.to(loop, {
              timeScale: 1,
              duration: 0.9,
              ease: 'power3.out',
              overwrite: true,
            });
          },
        });
      });
    },
    { scope: root },
  );

  // Two identical halves so the loop can wrap seamlessly at -50%.
  const run = [...items, ...items];
  return (
    <div ref={root} className={cn('overflow-hidden', className)}>
      <div data-track className="flex w-max">
        {[0, 1].map((half) => (
          <ul
            key={half}
            aria-hidden={half === 1 || undefined}
            className="flex shrink-0 items-center"
          >
            {run.map((item, i) => (
              <li key={i} className="flex items-center">
                <span className="px-6 sm:px-8">{item}</span>
                <Spark className="size-[0.55em] shrink-0 opacity-70" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
