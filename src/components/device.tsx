import { type Shot, srcSet, src } from '@/lib/site';
import { cn } from '@/lib/utils';

type Kind = 'phone' | 'tablet';

// Bezel and corner sizes as a share of the frame's width, per orientation.
const frames = {
  phone: {
    landscape: { bezel: 1.5, radius: 6.4, island: true },
    portrait: { bezel: 3.4, radius: 14, island: true },
  },
  tablet: {
    landscape: { bezel: 2.1, radius: 3.4, island: false },
    portrait: { bezel: 2.8, radius: 4.6, island: false },
  },
} as const;

/** Width ÷ height of the whole framed device, bezel included. */
export function deviceAspect(shot: Shot, kind: Kind) {
  const orientation = shot.width > shot.height ? 'landscape' : 'portrait';
  const b = frames[kind][orientation].bezel / 100;
  return 1 / ((1 - 2 * b) * (shot.height / shot.width) + 2 * b);
}

/** A CSS-drawn iPhone or iPad around a real screenshot. */
export function Device({
  shot,
  kind,
  sizes,
  priority,
  className,
}: {
  shot: Shot;
  kind: Kind;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const orientation = shot.width > shot.height ? 'landscape' : 'portrait';
  const f = frames[kind][orientation];

  return (
    <div className={cn('@container', className)}>
      <div
        className="relative bg-[linear-gradient(145deg,#3a3a37,#161615_45%,#2b2b29)] shadow-[0_0_0_1px_rgb(255_255_255/0.09),inset_0_0_0_1px_rgb(255_255_255/0.06),0_40px_80px_-24px_rgb(0_0_0/0.9)]"
        style={{
          padding: `${f.bezel}cqw`,
          borderRadius: `${f.radius}cqw`,
        }}
      >
        <img
          src={src(shot)}
          srcSet={srcSet(shot)}
          sizes={sizes}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          draggable={false}
          className="block h-auto w-full bg-black select-none"
          style={{ borderRadius: `${f.radius - f.bezel}cqw` }}
        />
        {f.island && (
          <span
            aria-hidden="true"
            className={cn(
              'absolute rounded-full bg-black',
              orientation === 'landscape'
                ? 'top-1/2 left-[2.6cqw] h-[11cqw] w-[1.5cqw] -translate-y-1/2'
                : 'top-[5.5cqw] left-1/2 h-[7.5cqw] w-[27cqw] -translate-x-1/2',
            )}
          />
        )}
      </div>
    </div>
  );
}

/** A transparent macOS window capture; the shadow is part of the image. */
export function MacWindow({
  shot,
  sizes,
  priority,
  className,
}: {
  shot: Shot;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src(shot)}
      srcSet={srcSet(shot)}
      sizes={sizes}
      width={shot.width}
      height={shot.height}
      alt={shot.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      draggable={false}
      className={cn('block h-auto w-full select-none', className)}
    />
  );
}
