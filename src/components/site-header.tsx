import { Timecode } from '@/components/timecode';
import { buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cue, slate } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { MenuIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const nav = [
  { to: '/slate', label: 'Slate' },
  { to: '/cue', label: 'Cue' },
  { to: '/support', label: 'Support' },
  { to: '/privacy', label: 'Privacy' },
] as const;

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'text-[1.1875rem] font-semibold tracking-[-0.045em] whitespace-nowrap',
        className,
      )}
    >
      fully free apps<span className="text-amber">.</span>
    </span>
  );
}

export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // Solid once scrolled; tucks away while scrolling down, returns on the way up.
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      header.dataset.scrolled = String(y > 8);
      const hide = !still.matches && y > 160 && y > last + 2;
      const show = y < last - 2 || y <= 160;
      if (hide) header.dataset.hidden = 'true';
      else if (show) header.dataset.hidden = 'false';
      last = y;
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      data-scrolled="false"
      data-hidden="false"
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[translate,background-color,border-color] duration-300 ease-out data-[hidden=true]:-translate-y-full data-[scrolled=true]:border-line data-[scrolled=true]:bg-ink/80 data-[scrolled=true]:backdrop-blur-xl"
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link to="/" className="rounded-md" aria-label="Fully Free Apps home">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3.5 py-2 text-sm text-paper/60 transition-colors hover:text-paper aria-[current=page]:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <p className="label hidden items-center gap-2.5 text-paper/45 lg:flex">
            <span className="size-1.5 rounded-full bg-amber" />
            <span>TC</span>
            <Timecode className="text-paper/70" />
          </p>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: 'line', size: 'icon-lg' }),
                    'rounded-full md:hidden',
                  )}
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent
              side="top"
              className="border-line bg-ink/95 px-5 pt-5 pb-8 backdrop-blur-xl"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Link to="/" onClick={() => setOpen(false)} className="w-fit">
                <Wordmark />
              </Link>
              <nav aria-label="Mobile" className="mt-6 flex flex-col">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="display border-b border-line py-4 text-4xl text-paper/80 aria-[current=page]:text-amber"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-1 text-sm text-paper/55">
                <span>{slate.tagline}</span>
                <span>{cue.tagline}</span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
