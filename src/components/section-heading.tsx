import { cn } from '@/lib/utils';

/** Mono label, large heading and optional intro, used to open each section. */
export function SectionHeading({
  label,
  title,
  intro,
  align = 'left',
  className,
  accent = 'amber',
}: {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  accent?: 'amber' | 'mint' | 'ink';
}) {
  return (
    <header
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <p data-reveal className="label flex items-center gap-3 text-current/60">
        <span
          aria-hidden="true"
          className={cn(
            'size-1.5 rounded-full',
            accent === 'amber' && 'bg-amber',
            accent === 'mint' && 'bg-mint',
            accent === 'ink' && 'bg-ink',
          )}
        />
        {label}
      </p>
      <h2
        data-reveal
        className="display max-w-[16ch] text-[clamp(2.5rem,6vw,5.25rem)]"
      >
        {title}
      </h2>
      {intro && (
        <p
          data-reveal
          className="max-w-[58ch] text-lg leading-relaxed text-current/65"
        >
          {intro}
        </p>
      )}
    </header>
  );
}
