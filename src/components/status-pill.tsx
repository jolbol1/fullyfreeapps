import { cn } from '@/lib/utils';

export function StatusPill({
  tone,
  children,
  className,
}: {
  tone: 'amber' | 'mint';
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'label inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2',
        tone === 'amber' && 'border-amber/30 bg-amber/10 text-amber',
        tone === 'mint' && 'border-mint/30 bg-mint/10 text-mint',
        className,
      )}
    >
      <span className="relative flex size-1.5">
        <span
          className={cn(
            'absolute inline-flex size-full animate-ping rounded-full opacity-60',
            tone === 'amber' ? 'bg-amber' : 'bg-mint',
          )}
        />
        <span
          className={cn(
            'relative inline-flex size-1.5 rounded-full',
            tone === 'amber' ? 'bg-amber' : 'bg-mint',
          )}
        />
      </span>
      {children}
    </span>
  );
}
