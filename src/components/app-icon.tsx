import { cue, slate, srcSet, src } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * Slate's icon is a full-bleed iOS square, so it gets the iOS corner mask.
 * Cue's macOS icon already includes its rounded shape and padding.
 */
export function AppIcon({
  app,
  size,
  className,
}: {
  app: 'slate' | 'cue';
  size: number;
  className?: string;
}) {
  const icon = app === 'slate' ? slate.icon : cue.icon;
  return (
    <img
      src={src(icon)}
      srcSet={srcSet(icon)}
      sizes={`${size}px`}
      width={size}
      height={size}
      alt={icon.alt}
      draggable={false}
      className={cn(
        'shrink-0 select-none',
        app === 'slate'
          ? 'rounded-[22.5%] shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_12px_32px_-8px_rgb(0_0_0/0.8)]'
          : 'scale-[1.22] drop-shadow-[0_12px_24px_rgb(0_0_0/0.6)]',
        className,
      )}
    />
  );
}
