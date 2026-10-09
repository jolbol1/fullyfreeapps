import { AppIcon } from '@/components/app-icon';
import { Device, MacWindow } from '@/components/device';
import { SectionHeading } from '@/components/section-heading';
import { StatusPill } from '@/components/status-pill';
import { buttonVariants } from '@/components/ui/button';
import { gsap, MOTION, useGSAP } from '@/lib/gsap';
import { cue, site, slate } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, CheckIcon, DownloadIcon } from 'lucide-react';
import { useRef } from 'react';

/**
 * The app line-up. On large screens each card sticks under the header and the
 * next one slides over it, while the one underneath recedes.
 */
export function AppStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${MOTION}`, () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-card]');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const scrollTrigger = {
            trigger: next,
            start: 'top bottom',
            end: 'top 96px',
            scrub: true,
          };
          gsap.to(card, { scale: 0.92, ease: 'none', scrollTrigger });
          gsap.to(card.querySelector('[data-dim]'), {
            opacity: 0.75,
            ease: 'none',
            scrollTrigger,
          });
        });
      });
      mm.add(MOTION, () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax);
          gsap.fromTo(
            el,
            { yPercent: amount },
            {
              yPercent: -amount,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('[data-card]'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="apps" className="scroll-mt-20 py-24 lg:py-36">
      <div className="shell">
        <SectionHeading
          label="Now showing · 02 apps"
          title={
            <>
              Two apps. <span className="serif-accent text-amber">Zero</span>{' '}
              strings.
            </>
          }
          intro="Each one does a single job properly, then gets out of your way. Download them, use every feature, and never see an upgrade screen."
        />

        <div className="mt-16 space-y-6 lg:mt-24 lg:space-y-10">
          <SlateCard />
          <CueCard />
          <IdeaCard />
        </div>
      </div>
    </section>
  );
}

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      data-card
      className={cn(
        'relative origin-top overflow-hidden rounded-[2rem] border lg:sticky lg:top-24 lg:min-h-[min(80vh,740px)]',
        className,
      )}
    >
      {children}
      <div
        data-dim
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0"
      />
    </article>
  );
}

function Bullets({ items, tone }: { items: string[]; tone: 'amber' | 'mint' }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-paper/75">
          <CheckIcon
            aria-hidden="true"
            className={cn(
              'mt-1 size-4 shrink-0',
              tone === 'amber' ? 'text-amber' : 'text-mint',
            )}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SlateCard() {
  return (
    <Card className="border-line bg-ink-2">
      <div
        aria-hidden="true"
        className="absolute -right-40 -bottom-40 size-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(255_165_58/0.13),transparent)]"
      />
      <div className="relative grid h-full lg:min-h-[inherit] lg:grid-cols-12">
        <div className="flex flex-col gap-8 p-7 sm:p-10 lg:col-span-5 lg:p-12">
          <div className="flex flex-wrap items-center gap-4">
            <AppIcon app="slate" size={64} />
            <div>
              <p className="label text-paper/45">App 01</p>
              <p className="mt-1 text-sm text-paper/70">{slate.platforms}</p>
            </div>
          </div>
          <div>
            <h3 className="display text-[clamp(3.5rem,7vw,6.25rem)]">
              Slate<span className="text-amber">.</span>
            </h3>
            <p className="mt-4 text-xl text-paper/80">{slate.tagline}</p>
          </div>
          <Bullets
            tone="amber"
            items={[
              'Big scene, shot and take counters',
              'Tap to clap or beep, with a screen flash',
              'Double-tap lock between takes',
              'Works offline. Nothing to sign up for.',
            ]}
          />
          <div className="mt-auto flex flex-col gap-5">
            <StatusPill tone="amber" className="w-fit">
              {slate.status}
            </StatusPill>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/slate"
                className={buttonVariants({ variant: 'amber', size: 'xl' })}
              >
                Explore Slate <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[340px] overflow-hidden sm:min-h-[480px] lg:col-span-7 lg:min-h-0">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[18%] h-[22%] -skew-y-6 stripes opacity-[0.06] [--stripe:26px]"
          />
          <div
            data-parallax="6"
            className="absolute top-[10%] right-[-14%] w-[100%] lg:top-[14%] lg:right-[-10%] lg:w-[96%]"
          >
            <Device
              kind="tablet"
              shot={slate.shots.ipadLandscape}
              sizes="(min-width: 1024px) 50vw, 90vw"
            />
          </div>
          <div
            data-parallax="14"
            className="absolute bottom-[4%] left-[6%] w-[30%] lg:bottom-[8%] lg:left-[4%] lg:w-[27%]"
          >
            <Device
              kind="phone"
              shot={slate.shots.iphonePortrait}
              sizes="(min-width: 1024px) 15vw, 30vw"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

function CueCard() {
  return (
    <Card className="border-line bg-[#0f1214]">
      <div
        aria-hidden="true"
        className="absolute -top-56 -right-40 size-[720px] rounded-full bg-[radial-gradient(closest-side,rgb(98_227_181/0.12),transparent)]"
      />
      <div className="relative grid h-full lg:min-h-[inherit] lg:grid-cols-12">
        <div className="flex flex-col gap-8 p-7 sm:p-10 lg:col-span-5 lg:p-12">
          <div className="flex flex-wrap items-center gap-4">
            <AppIcon app="cue" size={64} />
            <div>
              <p className="label text-paper/45">App 02</p>
              <p className="mt-1 text-sm text-paper/70">Mac</p>
            </div>
          </div>
          <div>
            <h3 className="display text-[clamp(3.5rem,7vw,6.25rem)]">
              Cue<span className="text-mint">.</span>
            </h3>
            <p className="mt-4 text-xl text-paper/80">{cue.tagline}</p>
          </div>
          <Bullets
            tone="mint"
            items={[
              'Reads your .md files in place, never copies them',
              'Reloads live as you edit, keeping your place',
              'Mirror, rotate and project to a prompter',
              'Hands-free with a Stream Deck Pedal',
            ]}
          />
          <div className="mt-auto flex flex-col gap-5">
            <StatusPill tone="mint" className="w-fit">
              Free download for Mac
            </StatusPill>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/cue"
                className={buttonVariants({ variant: 'mint', size: 'xl' })}
              >
                Explore Cue <ArrowRightIcon />
              </Link>
              <a
                href={cue.download}
                className={buttonVariants({ variant: 'line', size: 'xl' })}
              >
                <DownloadIcon /> Download
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden sm:min-h-[460px] lg:col-span-7 lg:min-h-0">
          <div
            data-parallax="5"
            className="absolute top-[8%] left-[4%] w-[122%] lg:top-[12%] lg:left-[2%] lg:w-[118%]"
          >
            <MacWindow
              shot={cue.shots.main}
              sizes="(min-width: 1024px) 65vw, 120vw"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

function IdeaCard() {
  return (
    <Card className="border-transparent bg-paper text-ink">
      <div className="relative grid h-full gap-10 p-7 sm:p-10 lg:min-h-[inherit] lg:grid-cols-12 lg:items-center lg:p-12">
        <div className="flex flex-col gap-7 lg:col-span-6">
          <p className="label text-ink/50">App 03 · To be decided</p>
          <h3 className="display text-[clamp(2.75rem,5.4vw,5rem)]">
            What should we make <span className="serif-accent">next?</span>
          </h3>
          <p className="max-w-[46ch] text-lg leading-relaxed text-ink/70">
            We make small tools that do one job well, then give them away. If
            there’s something you wish existed without the ads and
            subscriptions, tell us about it.
          </p>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent('An idea for a fully free app')}`}
            className={cn(
              buttonVariants({ size: 'xl' }),
              'w-fit bg-ink text-paper hover:bg-ink/85',
            )}
          >
            Suggest an app <ArrowRightIcon />
          </a>
        </div>
        <div className="lg:col-span-6" aria-hidden="true">
          <BlankSlate />
        </div>
      </div>
    </Card>
  );
}

/** An empty clapperboard waiting for its next production. */
function BlankSlate() {
  const rows = [
    ['Prod.', '— — —'],
    ['Scene', '03'],
    ['Take', '01'],
  ];
  return (
    <div className="mx-auto w-full max-w-[520px] -rotate-3">
      <div className="h-12 origin-bottom-left -rotate-[8deg] rounded-t-xl stripes [--stripe:20px]" />
      <div className="mt-1 h-12 rounded-sm stripes [--stripe:20px] [background-position:24px_0]" />
      <div className="mt-1 rounded-b-2xl bg-ink p-6 text-paper">
        <dl className="grid gap-px overflow-hidden rounded-lg bg-paper/15">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="flex items-baseline justify-between bg-ink px-4 py-3"
            >
              <dt className="label text-paper/45">{label}</dt>
              <dd className="font-mono text-2xl text-paper/85">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 font-mono text-xs tracking-widest text-paper/40">
          IDEAS WELCOME · {site.email.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
