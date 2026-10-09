import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Faq } from '@/lib/site';
import { cn } from '@/lib/utils';

/** Building blocks shared by the Slate and Cue pages. */

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <Accordion className="border-t border-line">
      {items.map((f) => (
        <AccordionItem key={f.q} value={f.q} className="border-b border-line">
          <AccordionTrigger className="gap-6 rounded-none py-6 text-lg font-medium tracking-[-0.01em] hover:no-underline focus-visible:ring-0 sm:text-xl [&_[data-slot=accordion-trigger-icon]]:mt-1 [&_[data-slot=accordion-trigger-icon]]:size-5">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-[68ch] pb-7 text-base leading-relaxed text-paper/65">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function SpecList({
  items,
  className,
}: {
  items: [string, React.ReactNode][];
  className?: string;
}) {
  return (
    <dl className={cn('border-t border-line', className)}>
      {items.map(([term, value]) => (
        <div
          key={term}
          className="flex items-baseline justify-between gap-6 border-b border-line py-4"
        >
          <dt className="text-paper/55">{term}</dt>
          <dd className="text-right">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Notes({
  items,
  tone,
}: {
  items: { title: string; body: React.ReactNode }[];
  tone: 'amber' | 'mint';
}) {
  return (
    <ul className="space-y-4">
      {items.map((n) => (
        <li
          key={n.title}
          data-reveal
          className={cn(
            'rounded-2xl border-l-2 bg-ink-2 p-6',
            tone === 'amber' ? 'border-amber' : 'border-mint',
          )}
        >
          <p className="font-semibold">{n.title}</p>
          <p className="mt-2 leading-relaxed text-paper/60">{n.body}</p>
        </li>
      ))}
    </ul>
  );
}
