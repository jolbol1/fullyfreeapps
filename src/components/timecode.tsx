import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');

export function formatTimecode(date: Date, fps: number) {
  const frame = Math.floor((date.getMilliseconds() / 1000) * fps);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}:${pad(frame)}`;
}

/** Local time as HH:MM:SS:FF, written straight to the DOM every frame. */
export function Timecode({
  fps = 24,
  className,
}: {
  fps?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let last = '';
    const tick = () => {
      const next = formatTimecode(new Date(), fps);
      if (next !== last && ref.current) {
        ref.current.textContent = next;
        last = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fps]);

  return (
    <span
      ref={ref}
      className={cn('font-mono tabular-nums', className)}
      aria-hidden="true"
    >
      00:00:00:00
    </span>
  );
}
