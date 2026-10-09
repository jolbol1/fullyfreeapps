import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export type Feature = { icon: LucideIcon; title: string; body: string };

export function FeatureGrid({
  items,
  tone,
}: {
  items: Feature[];
  tone: 'amber' | 'mint';
}) {
  return (
    // Every cell draws its right and bottom edge; the negative margin pushes
    // the outermost ones under the clipped container.
    <div className="overflow-hidden rounded-[2rem] border border-line">
      <ul className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <li key={title} className="border-r border-b border-line">
            <div data-reveal className="flex h-full flex-col gap-4 p-7 lg:p-9">
              <span
                className={cn(
                  'grid size-11 place-items-center rounded-xl',
                  tone === 'amber'
                    ? 'bg-amber/12 text-amber'
                    : 'bg-mint/12 text-mint',
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em]">
                {title}
              </h3>
              <p className="leading-relaxed text-paper/60">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
