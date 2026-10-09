import { AppIcon } from '@/components/app-icon';
import { FaqList, Notes, SpecList } from '@/components/app-page';
import { Device } from '@/components/device';
import { FeatureGrid } from '@/components/feature-grid';
import { Gallery } from '@/components/gallery';
import { GitHubIcon } from '@/components/icons';
import { Page } from '@/components/page';
import { SectionHeading } from '@/components/section-heading';
import { SlateDemo } from '@/components/slate/slate-demo';
import { StatusPill } from '@/components/status-pill';
import { buttonVariants } from '@/components/ui/button';
import { gsap, MOTION, useGSAP } from '@/lib/gsap';
import { jsonLd, seo } from '@/lib/seo';
import { site, slate, slateFaqs } from '@/lib/site';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowDownIcon,
  BellRingIcon,
  ClockIcon,
  HardDriveIcon,
  HashIcon,
  LockIcon,
  NotebookPenIcon,
  TabletSmartphoneIcon,
  TagsIcon,
  TimerResetIcon,
} from 'lucide-react';
import { useRef } from 'react';

const description =
  'Slate is a free digital clapperboard for iPhone and iPad. Big scene, shot and take counters, tap to clap, a double-tap lock and a frame-accurate clock. No ads, accounts or tracking.';

export const Route = createFileRoute('/slate')({
  head: () => ({
    ...seo({
      title: 'Slate — a free digital clapperboard for iPhone and iPad',
      description,
      path: '/slate',
    }),
    scripts: [
      jsonLd({
        '@type': 'SoftwareApplication',
        name: slate.name,
        alternateName: slate.storeName,
        description,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'iOS 15 or later, iPadOS 15 or later',
        url: `${site.url}/slate`,
        image: `${site.url}/images/slate/icon-512.webp`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        publisher: { '@type': 'Organization', name: site.company.name },
      }),
    ],
  }),
  component: SlatePage,
});

const features = [
  {
    icon: HashIcon,
    title: 'Scene, shot and take',
    body: 'Big, high-contrast counters you can read across the set. Scene and take count up; shot steps through A to Z.',
  },
  {
    icon: BellRingIcon,
    title: 'Tap to clap',
    body: 'A natural clap or a clean beep, with adjustable volume and an optional screen flash that marks the same instant. It plays even in Silent Mode.',
  },
  {
    icon: LockIcon,
    title: 'Double-tap lock',
    body: 'Lock the counters between takes so a stray touch can’t change them. The clapper stays live, and the lock works with VoiceOver and Switch Control.',
  },
  {
    icon: NotebookPenIcon,
    title: 'Production details',
    body: 'Production, director, camera operator, camera and sound rolls, filter and notes, laid out like a real slate.',
  },
  {
    icon: TagsIcon,
    title: 'Quick tags',
    body: 'Camera letter, INT/EXT, DAY/NIGHT and SYNC/MOS change with a single tap.',
  },
  {
    icon: TimerResetIcon,
    title: 'Take automation',
    body: 'Reset the take for a new scene or shot, and optionally step to the next take 0–120 seconds after each clap.',
  },
  {
    icon: ClockIcon,
    title: 'Clock reference',
    body: 'Local time as HH:MM:SS:FF at 24, 25, 30, 48, 50 or 60 fps, ticking even while the slate is locked.',
  },
  {
    icon: HardDriveIcon,
    title: 'Right where you left it',
    body: 'Counters, details and settings save as you go and come back when you reopen. The screen stays awake while Slate is open.',
  },
  {
    icon: TabletSmartphoneIcon,
    title: 'iPhone and iPad',
    body: 'Portrait and landscape layouts on both. Landscape makes the counters huge; portrait adds room for the written details.',
  },
];

function SlatePage() {
  return (
    <Page>
      <Hero />

      <section id="try" className="scroll-mt-16 py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            label="Try it here"
            title={
              <>
                Give it a <span className="serif-accent text-amber">clap.</span>
              </>
            }
            intro="This is a working web version of Slate’s main screen. Step the counters, flip the tags, double-tap the lock, and tap the striped bar for Slate’s own clap."
          />
          <div data-reveal className="mt-12 lg:mt-16">
            <SlateDemo />
          </div>
          <p className="mt-5 text-sm text-paper/45">
            A browser preview for a quick feel. The app itself is native, works
            offline and remembers everything between sessions.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            label="What it does"
            title="Just what you need on set."
            intro="Slate keeps the essentials big and clear, then gets out of the way."
          />
          <div className="mt-14">
            <FeatureGrid items={features} tone="amber" />
          </div>
        </div>
      </section>

      <Gallery
        heading={
          <SectionHeading
            label="Screenshots"
            title={
              <>
                Every angle,{' '}
                <span className="serif-accent text-amber">covered.</span>
              </>
            }
          />
        }
        items={[
          {
            shot: slate.shots.iphoneLandscape,
            kind: 'phone',
            title: 'Big, clear counters',
            caption: 'Landscape puts scene, shot and take front and centre.',
          },
          {
            shot: slate.shots.iphoneLocked,
            kind: 'phone',
            title: 'Locked between takes',
            caption:
              'Counters dim and ignore touches. The clapper still works.',
          },
          {
            shot: slate.shots.iphonePortrait,
            kind: 'phone',
            title: 'Room for details',
            caption: 'Portrait adds the director and camera lines.',
          },
          {
            shot: slate.shots.iphoneSettings,
            kind: 'phone',
            title: 'Your sound, your rules',
            caption: 'Clap or beep, flash, take automation and frame rate.',
          },
          {
            shot: slate.shots.ipadDetails,
            kind: 'tablet',
            title: 'Every field of a real slate',
            caption: 'Production, director, camera, rolls, filter and notes.',
          },
          {
            shot: slate.shots.ipadLandscape,
            kind: 'tablet',
            title: 'Made for iPad, too',
            caption: 'A full-size slate that fills the frame.',
          },
        ]}
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading label="Good to know" title="Honest small print." />
            <div className="mt-10">
              <Notes
                tone="amber"
                items={[
                  {
                    title: 'The clock isn’t synchronised timecode.',
                    body: 'It shows your device’s local time as a visual reference. It doesn’t sync to a camera or output timecode to recording equipment.',
                  },
                  {
                    title: 'The lock protects Slate, not your device.',
                    body: 'It stops stray taps on the counters, but not the Home gesture or power button. Use Guided Access if you need to keep the device in Slate.',
                  },
                ]}
              />
            </div>
          </div>
          <div>
            <SectionHeading label="Details" title="The specs." />
            <div data-reveal className="mt-10">
              <SpecList
                items={[
                  ['Price', 'Free, with every feature'],
                  ['Works on', 'iPhone and iPad'],
                  ['Requires', slate.requires],
                  ['Internet', 'Not needed'],
                  ['Account', 'None'],
                  ['Data collected', 'None'],
                  ['Built with', 'Swift and UIKit'],
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading label="Questions" title="Slate FAQ." />
            <p data-reveal className="mt-6 text-paper/60">
              Something else?{' '}
              <Link
                to="/support"
                className="text-paper underline decoration-amber/60 underline-offset-4 hover:decoration-amber"
              >
                Visit support
              </Link>
              .
            </p>
          </div>
          <div data-reveal className="lg:col-span-8">
            <FaqList items={slateFaqs} />
          </div>
        </div>
      </section>

      <Cta />
    </Page>
  );
}

function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap
          .timeline({ delay: 0.1 })
          .fromTo(
            '[data-intro]',
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: 'expo.out',
              stagger: 0.08,
            },
          )
          .fromTo(
            '[data-device]',
            { autoAlpha: 0, y: 120, rotate: (i) => (i ? -6 : 3) },
            {
              autoAlpha: 1,
              y: 0,
              rotate: 0,
              duration: 1.4,
              ease: 'expo.out',
              stagger: 0.12,
            },
            '<0.2',
          );
        gsap.to('[data-device="tablet"]', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('[data-device="phone"]', {
          yPercent: -26,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden pt-28 pb-16 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(60%_60%_at_70%_0%,rgb(255_165_58/0.14),transparent)]"
      />
      <div className="shell grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div data-intro className="flex items-center gap-4">
            <AppIcon app="slate" size={72} />
            <p className="label text-paper/50">
              App 01
              <br />
              {slate.platforms}
            </p>
          </div>
          <h1
            data-intro
            className="display mt-10 text-[clamp(4.5rem,11vw,9.5rem)]"
          >
            Slate<span className="text-amber">.</span>
          </h1>
          <p
            data-intro
            className="serif-accent mt-3 text-[clamp(1.75rem,3vw,2.5rem)] text-amber"
          >
            Ready. Set. Take.
          </p>
          <p
            data-intro
            className="mt-6 max-w-[40ch] text-lg leading-relaxed text-paper/70"
          >
            A digital clapperboard for iPhone and iPad. Keep scene, shot and
            take big and clear on set, tap to clap, lock between takes, and pick
            up exactly where you left off.
          </p>
          <div data-intro className="mt-8 flex flex-col gap-5">
            <StatusPill tone="amber" className="w-fit">
              {slate.status}
            </StatusPill>
            <div className="flex flex-wrap gap-3">
              {slate.appStoreUrl ? (
                <a
                  href={slate.appStoreUrl}
                  className={buttonVariants({ variant: 'amber', size: 'xl' })}
                >
                  Get it on the App Store
                </a>
              ) : (
                <a
                  href="#try"
                  className={buttonVariants({ variant: 'amber', size: 'xl' })}
                >
                  Try it in your browser <ArrowDownIcon />
                </a>
              )}
              <a
                href={slate.source}
                className={buttonVariants({ variant: 'line', size: 'xl' })}
              >
                <GitHubIcon className="size-4" /> Source
              </a>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative aspect-[4/3.3] w-full">
            <div
              data-hide
              data-device="tablet"
              className="absolute top-0 right-[-4%] w-[96%]"
            >
              <Device
                kind="tablet"
                shot={slate.shots.ipadLandscape}
                sizes="(min-width: 1024px) 55vw, 95vw"
                priority
              />
            </div>
            <div
              data-hide
              data-device="phone"
              className="absolute bottom-0 left-[-2%] w-[30%]"
            >
              <Device
                kind="phone"
                shot={slate.shots.iphonePortrait}
                sizes="(min-width: 1024px) 17vw, 30vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="py-16">
      <div className="shell">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2rem] bg-amber p-8 text-ink sm:p-12 lg:p-16"
        >
          <div
            aria-hidden="true"
            className="absolute -top-10 -right-24 h-24 w-[60%] rotate-[-8deg] stripes opacity-25 [--stripe:22px]"
          />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <AppIcon app="slate" size={64} />
              <h2 className="display mt-8 max-w-[14ch] text-[clamp(2.5rem,5vw,4.5rem)]">
                Your next take starts here.
              </h2>
              <p className="mt-4 max-w-[46ch] text-lg text-ink/70">
                Slate is on its way to the App Store, free for iPhone and iPad.
                Until then, the source is on GitHub.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={slate.source}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-ink/85"
              >
                <GitHubIcon className="size-4" /> View on GitHub
              </a>
              <Link
                to="/support"
                className="inline-flex h-12 items-center rounded-full border border-ink/25 px-6 text-[0.9375rem] font-medium transition-colors hover:bg-ink/5"
              >
                Get help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
