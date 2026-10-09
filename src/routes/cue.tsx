import { AppIcon } from '@/components/app-icon';
import { FaqList, Notes, SpecList } from '@/components/app-page';
import { PrompterDemo } from '@/components/cue/prompter-demo';
import { MacWindow } from '@/components/device';
import { FeatureGrid } from '@/components/feature-grid';
import { GitHubIcon } from '@/components/icons';
import { Page } from '@/components/page';
import { SectionHeading } from '@/components/section-heading';
import { buttonVariants } from '@/components/ui/button';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { gsap, MOTION, useGSAP } from '@/lib/gsap';
import { jsonLd, seo } from '@/lib/seo';
import { cue, cueFaqs, site } from '@/lib/site';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  CheckIcon,
  CodeXmlIcon,
  FileTextIcon,
  FolderOpenIcon,
  KeyboardIcon,
  MonitorUpIcon,
  RefreshCwIcon,
  ScanEyeIcon,
  FootprintsIcon,
  DownloadIcon,
} from 'lucide-react';
import { useRef } from 'react';

const description =
  'Cue is a free, native macOS teleprompter for the Markdown scripts you already have. Live reload, mirrored prompter output, a camera marker and Stream Deck Pedal support. No account, no tracking.';

export const Route = createFileRoute('/cue')({
  head: () => ({
    ...seo({
      title: 'Cue — a free Markdown teleprompter for Mac',
      description,
      path: '/cue',
    }),
    scripts: [
      jsonLd({
        '@type': 'SoftwareApplication',
        name: cue.name,
        description,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'macOS 14 or later',
        url: `${site.url}/cue`,
        downloadUrl: cue.download,
        image: `${site.url}/images/cue/icon-512.webp`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        publisher: { '@type': 'Organization', name: site.company.name },
      }),
    ],
  }),
  component: CuePage,
});

const features = [
  {
    icon: FolderOpenIcon,
    title: 'Your files, untouched',
    body: 'Point Cue at a folder of Markdown scripts and browse them in a searchable, sortable sidebar. It never copies, imports or writes to them.',
  },
  {
    icon: RefreshCwIcon,
    title: 'Live reload',
    body: 'Save in any editor and Cue picks up the change within a second, keeping your place in the script.',
  },
  {
    icon: FileTextIcon,
    title: 'Written to be read aloud',
    body: 'Headings, paragraphs, lists, emphasis and quotes appear without Markdown symbols. Frontmatter, comments, images and code blocks stay out of the way.',
  },
  {
    icon: MonitorUpIcon,
    title: 'Prompter output',
    body: 'Project to any display. Elgato prompters are picked automatically. Mirror or rotate for beam-splitter glass, and dim the output.',
  },
  {
    icon: ScanEyeIcon,
    title: 'Reading area and camera marker',
    body: 'Highlight the lines you’re reading, dim the rest, and line both up with a marker placed over your camera lens.',
  },
  {
    icon: FootprintsIcon,
    title: 'Stream Deck Pedal',
    body: 'Hold the side pedals to scroll and tap the centre to play or pause, even while another app has focus.',
  },
  {
    icon: KeyboardIcon,
    title: 'Global shortcuts',
    body: 'Play, project, black out and rewind from any app. They’re registered hotkeys, so no Accessibility permission is needed.',
  },
  {
    icon: CodeXmlIcon,
    title: 'Properly native',
    body: 'SwiftUI, AppKit, TextKit and IOKit. No web view, no Electron, no account and no server.',
  },
];

const shortcuts: [string, string[]][] = [
  ['Play / pause', ['⌃', '⌥', '⌘', 'Space']],
  ['Project / stop projecting', ['⌃', '⌥', '⌘', 'P']],
  ['Blackout / show script', ['⌃', '⌥', '⌘', 'B']],
  ['Back to start', ['⌃', '⌥', '⌘', 'R']],
  ['Stop projecting', ['Esc']],
];

const steps = [
  {
    title: 'Choose your scripts folder',
    body: 'From the sidebar’s folder menu or File → Choose Scripts Folder (⇧⌘O). You can also open a single file with ⌘O.',
  },
  {
    title: 'Pick a script',
    body: 'The preview shows exactly what your prompter will display.',
  },
  {
    title: 'Set up the output',
    body: 'In the Output tab, choose the prompter display and turn on mirroring or rotation if your rig needs it.',
  },
  {
    title: 'Place the camera marker',
    body: 'Drag in the preview to put it over your lens, then align the reading area to it.',
  },
  {
    title: 'Project and play',
    body: 'Click Project, then press Play or tap the centre pedal.',
  },
];

function CuePage() {
  return (
    <Page>
      <Hero />

      <section id="try" className="scroll-mt-16 py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            accent="mint"
            label="Try it here"
            title={
              <>
                Markdown in.{' '}
                <span className="serif-accent text-mint">Words out.</span>
              </>
            }
            intro="A script as it sits on disk, and what Cue puts on the prompter: no symbols, no frontmatter, no notes to self. Change the speed, mirror it for the glass, or hold the pedals."
          />
          <div data-reveal className="mt-12 lg:mt-16">
            <PrompterDemo />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            accent="mint"
            label="What it does"
            title="Everything a prompter needs."
            intro="Cue does one job: put your words in front of the lens, in your rhythm, without making you change how you write."
          />
          <div className="mt-14">
            <FeatureGrid items={features} tone="mint" />
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-20 lg:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              accent="mint"
              label="Output"
              title={
                <>
                  Built for the{' '}
                  <span className="serif-accent text-mint">glass.</span>
                </>
              }
            />
            <ul className="mt-10 space-y-4">
              {[
                'Mirror horizontally or rotate 180° for beam-splitter rigs.',
                'A borderless output window that never takes focus, across Spaces and full-screen apps.',
                'A LIVE badge while projecting, and a blackout that hides the script without stopping.',
                'A crosshair, brackets, dot or reading-line marker that stays over the lens even when the text is mirrored.',
                'Projection stops on its own if the display disconnects.',
              ].map((item) => (
                <li key={item} data-reveal className="flex gap-3 text-paper/75">
                  <CheckIcon
                    className="mt-1 size-4 shrink-0 text-mint"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="lg:col-span-7 lg:-mr-24">
            <MacWindow
              shot={cue.shots.output}
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              accent="mint"
              label="Hands-free"
              title="Pedal down, eyes up."
              intro="Cue reads an Elgato Stream Deck Pedal directly over USB. It sends no keystrokes, so it works whichever app has focus, and it never changes your Stream Deck setup."
            />
            <div data-reveal className="mt-10 max-w-[360px]">
              <MacWindow shot={cue.shots.pedal} sizes="360px" />
            </div>
          </div>
          <div className="space-y-12 lg:col-span-6 lg:col-start-7 lg:pt-28">
            <div data-reveal>
              <h3 className="label text-paper/50">The pedal</h3>
              <SpecList
                className="mt-4"
                items={[
                  ['Hold left', 'Scroll back'],
                  ['Tap centre', 'Play / pause'],
                  ['Hold right', 'Scroll forward'],
                ]}
              />
              <p className="mt-4 text-sm leading-relaxed text-paper/50">
                Releasing a side pedal stops the movement, and playback resumes
                if it was running. Hold-to-scroll speed is set separately from
                playback speed.
              </p>
            </div>
            <div data-reveal>
              <h3 className="label text-paper/50">
                Shortcuts that work from any app
              </h3>
              <SpecList
                className="mt-4"
                items={shortcuts.map(([action, keys]) => [
                  action,
                  <KbdGroup key={action}>
                    {keys.map((k) => (
                      <Kbd
                        key={k}
                        className="h-7 min-w-7 rounded-md border border-paper/10 bg-ink-3 px-2 font-mono text-[0.8rem] text-paper/85"
                      >
                        {k}
                      </Kbd>
                    ))}
                  </KbdGroup>,
                ])}
              />
              <p className="mt-4 text-sm leading-relaxed text-paper/50">
                Esc only stops projecting while the pointer is over the output
                display, so it keeps working normally everywhere else.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Steps />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              accent="mint"
              label="Installing"
              title="Before you press play."
            />
            <div className="mt-10">
              <Notes
                tone="mint"
                items={[
                  {
                    title: 'Signed and notarized.',
                    body: 'Download the DMG, drag Cue into Applications and open it. It’s signed with a Developer ID and notarized by Apple, so it opens like any other app.',
                  },
                  {
                    title: 'One permission, only for the pedal.',
                    body: (
                      <>
                        If macOS blocks USB input from the Stream Deck Pedal,
                        allow Cue under System Settings → Privacy &amp; Security
                        → Input Monitoring, then click{' '}
                        <strong className="font-semibold text-paper">
                          Reconnect
                        </strong>
                        . The keyboard shortcuts need no permissions at all.
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div>
            <SectionHeading accent="mint" label="Details" title="The specs." />
            <div data-reveal className="mt-10">
              <SpecList
                items={[
                  ['Price', 'Free, with every feature'],
                  ['Requires', cue.requires],
                  ['Runs on', 'Apple silicon and Intel'],
                  ['Distribution', 'Notarized DMG from GitHub'],
                  [
                    'Works with',
                    'Any display, Elgato Prompter, Stream Deck Pedal',
                  ],
                  ['Account', 'None'],
                  ['Data collected', 'None'],
                  ['Built with', 'Swift, SwiftUI, AppKit, TextKit, IOKit'],
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading accent="mint" label="Questions" title="Cue FAQ." />
            <p data-reveal className="mt-6 text-paper/60">
              Something else?{' '}
              <Link
                to="/support"
                className="text-paper underline decoration-mint/60 underline-offset-4 hover:decoration-mint"
              >
                Visit support
              </Link>
              .
            </p>
          </div>
          <div data-reveal className="lg:col-span-8">
            <FaqList items={cueFaqs} />
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
        gsap.fromTo(
          '[data-intro]',
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.08,
            delay: 0.1,
          },
        );
        // The window starts tipped back like a prompter screen and settles flat.
        gsap.fromTo(
          '[data-window]',
          { autoAlpha: 0, y: 80, rotateX: 28, scale: 0.92 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 18,
            scale: 0.94,
            duration: 1.4,
            ease: 'expo.out',
            delay: 0.35,
          },
        );
        gsap.to('[data-window]', {
          rotateX: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-window]',
            start: 'top 85%',
            end: 'top 15%',
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
      className="relative overflow-hidden pt-28 pb-10 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[80vh] bg-[radial-gradient(50%_60%_at_50%_0%,rgb(98_227_181/0.13),transparent)]"
      />
      <div className="shell flex flex-col items-center text-center">
        <div data-intro>
          <AppIcon app="cue" size={88} />
        </div>
        <p data-intro className="label mt-8 text-paper/50">
          App 02 · Mac
        </p>
        <h1 data-intro className="display mt-6 text-[clamp(4.5rem,12vw,10rem)]">
          Cue<span className="text-mint">.</span>
        </h1>
        <p
          data-intro
          className="serif-accent mt-2 text-[clamp(1.75rem,3vw,2.5rem)] text-mint"
        >
          Your words, on cue.
        </p>
        <p
          data-intro
          className="mt-6 max-w-[48ch] text-lg leading-relaxed text-paper/70"
        >
          A native macOS teleprompter for the Markdown scripts you already have.
          Point it at a folder, pick a script, and read it on your prompter.
        </p>
        <div data-intro className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={cue.download}
            className={buttonVariants({ variant: 'mint', size: 'xl' })}
          >
            <DownloadIcon /> Download for Mac
          </a>
          <a
            href={cue.source}
            className={buttonVariants({ variant: 'line', size: 'xl' })}
          >
            <GitHubIcon className="size-4" /> Source
          </a>
        </div>
        <p data-intro className="mt-5 text-sm text-paper/45">
          Free · {cue.requires} · Apple silicon &amp; Intel
        </p>
      </div>

      <div className="shell mt-16 [perspective:1600px] lg:mt-20">
        <div
          data-hide
          data-window
          className="mx-auto max-w-[1200px] origin-top"
        >
          <MacWindow
            shot={cue.shots.main}
            sizes="(min-width: 1280px) 1200px, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="py-20 lg:py-28">
      <div className="shell">
        <SectionHeading
          accent="mint"
          label="Getting started"
          title="Five steps to your first take."
        />
        <div className="mt-14 overflow-hidden rounded-[2rem] border border-line">
          <ol className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <li key={step.title} className="border-r border-b border-line">
                <div data-reveal className="flex h-full flex-col gap-3 p-7">
                  <span className="font-mono text-sm text-mint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-paper/60">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
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
          className="relative overflow-hidden rounded-[2rem] bg-mint p-8 text-ink sm:p-12 lg:p-16"
        >
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <AppIcon app="cue" size={64} />
              <h2 className="display mt-8 max-w-[14ch] text-[clamp(2.5rem,5vw,4.5rem)]">
                Ready when you are.
              </h2>
              <p className="mt-4 max-w-[46ch] text-lg text-ink/70">
                Download the latest release from GitHub, drag Cue into
                Applications, and point it at your scripts.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={cue.download}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-ink/85"
              >
                <DownloadIcon className="size-4" /> Download for Mac
              </a>
              <a
                href={cue.issues}
                className="inline-flex h-12 items-center rounded-full border border-ink/25 px-6 text-[0.9375rem] font-medium transition-colors hover:bg-ink/5"
              >
                Report an issue
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
