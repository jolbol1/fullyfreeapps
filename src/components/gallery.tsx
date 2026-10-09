import { Device, deviceAspect, MacWindow } from '@/components/device';
import { gsap, MOTION, useGSAP } from '@/lib/gsap';
import type { Shot } from '@/lib/site';
import { useRef } from 'react';

export type GalleryItem = {
  shot: Shot;
  kind: 'phone' | 'tablet' | 'mac';
  title: string;
  caption: string;
};

/**
 * Screenshots on one shared height. On large screens the section pins and
 * the row slides sideways as you scroll; elsewhere it's a swipeable strip.
 */
export function Gallery({
  heading,
  items,
}: {
  heading: React.ReactNode;
  items: GalleryItem[];
}) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${MOTION}`, () => {
        const el = track.current;
        if (!el) return;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="flex flex-col justify-center overflow-hidden py-24 lg:min-h-screen lg:py-16"
    >
      <div className="shell">{heading}</div>
      <div className="mt-12 overflow-x-auto [scrollbar-width:none] lg:mt-14 lg:overflow-visible">
        <ul
          ref={track}
          className="flex w-max snap-x snap-mandatory items-end gap-6 px-[max(1.25rem,calc((100vw-1320px)/2+2.5rem))] [--h:min(52vh,380px)] sm:gap-10 lg:snap-none lg:[--h:min(54vh,520px)]"
        >
          {items.map((item) => {
            const aspect =
              item.kind === 'mac'
                ? item.shot.width / item.shot.height
                : deviceAspect(item.shot, item.kind);
            return (
              <li
                key={item.shot.stem}
                className="shrink-0 snap-center"
                style={{ width: `calc(var(--h) * ${aspect.toFixed(4)})` }}
              >
                <figure>
                  {item.kind === 'mac' ? (
                    <MacWindow
                      shot={item.shot}
                      sizes="(min-width: 1024px) 60vw, 90vw"
                    />
                  ) : (
                    <Device
                      kind={item.kind}
                      shot={item.shot}
                      sizes="(min-width: 1024px) 50vw, 85vw"
                    />
                  )}
                  <figcaption className="mt-6 max-w-[34ch] min-w-[220px]">
                    <p className="font-semibold tracking-tight">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-paper/55">
                      {item.caption}
                    </p>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
