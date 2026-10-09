import { Page } from '@/components/page';
import { PageHero } from '@/components/page-hero';
import { seo } from '@/lib/seo';
import { site } from '@/lib/site';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/privacy')({
  head: () =>
    seo({
      title: 'Privacy · Fully Free Apps',
      description:
        'Slate and Cue collect no personal data. No ads, analytics, tracking or accounts, in the apps or on this website.',
      path: '/privacy',
    }),
  component: Privacy,
});

const summary = [
  ['Personal data collected by our apps', 'None'],
  ['Advertising, analytics or tracking', 'None'],
  ['Accounts or in-app purchases', 'None'],
  ['Network requests made by our apps', 'None'],
  ['Tracking cookies on this website', 'None'],
];

function Privacy() {
  return (
    <Page>
      <PageHero
        label="Your privacy"
        title={
          <>
            Private by <span className="serif-accent text-amber">design.</span>
          </>
        }
      >
        Our apps don’t collect your data, so this policy is short. Here’s
        exactly what happens, app by app.
      </PageHero>

      <div className="shell grid gap-14 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div
            data-reveal
            className="rounded-[1.75rem] border border-line bg-ink-2 p-7 lg:sticky lg:top-24"
          >
            <p className="label text-paper/50">At a glance</p>
            <dl className="mt-5 space-y-4">
              {summary.map(([term, value]) => (
                <div
                  key={term}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
                >
                  <dt className="text-sm text-paper/65">{term}</dt>
                  <dd className="font-mono text-sm text-amber">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-paper/45">
              Last updated: 9 October 2026
            </p>
          </div>
        </aside>

        <article
          data-reveal
          className="prose-doc lg:col-span-8 [&>h2:first-child]:mt-0"
        >
          <h2>Who we are</h2>
          <p>
            Fully Free Apps is a trading name of {site.company.name}, a company
            registered in England and Wales (number {site.company.number}). Our
            registered office is {site.company.office}.
          </p>

          <h2>Slate</h2>
          <p>
            Slate does not collect, transmit, sell or share personal data. It
            contains no advertising, analytics, tracking technology, accounts or
            in-app purchases. The app does not request access to your
            microphone, camera, photos, contacts or location.
          </p>
          <p>
            Your scene, shot, take, production details, lock state and
            preferences are stored locally on your iPhone or iPad. The app makes
            no network requests and contains no third-party SDKs. Clap and beep
            audio is included in the app. The clock uses your device’s local
            time.
          </p>

          <h2>Cue</h2>
          <p>
            Cue does not collect, transmit, sell or share personal data. It
            contains no advertising, analytics, tracking technology or accounts,
            and it makes no network requests.
          </p>
          <p>
            Cue reads the Markdown files and folders you choose, where they are
            on your Mac. It never copies, uploads or changes them. It keeps its
            settings, the last file you opened and its window layout in macOS
            user defaults on your Mac.
          </p>
          <p>
            If you turn on Stream Deck Pedal support, macOS may ask you to allow
            Input Monitoring. Cue uses it only to read button presses from the
            pedal over USB. Its global shortcuts are registered hotkeys: Cue
            doesn’t monitor your typing and doesn’t need Accessibility access.
          </p>
          <p>
            Cue is downloaded from GitHub. When you download it, GitHub
            processes your request under{' '}
            <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">
              its own privacy statement
            </a>
            .
          </p>

          <h2>This website</h2>
          <p>
            We do not add advertising, analytics scripts or tracking cookies to
            this website, and its fonts and images are served from this site
            rather than third parties. The interactive demos run entirely in
            your browser and send nothing back to us.
          </p>
          <p>
            Cloudflare hosts and protects the site and processes technical
            information, such as IP addresses and request details, to deliver
            pages and maintain security. Links to GitHub take you to a separate
            service with its own privacy statement.
          </p>

          <h2>If you contact us</h2>
          <p>
            When you email support, we receive your email address and the
            information you send. We use this to answer your request and resolve
            issues, on the basis of our legitimate interest in providing
            support. Email providers process messages to deliver them. We do not
            use support messages for advertising or sell them. We keep
            correspondence only as long as needed for support and any applicable
            legal requirements.
          </p>
          <p>
            If you open an issue on GitHub, it is public. GitHub hosts it under
            its own privacy statement, and we see only what you post there.
            Please don’t include personal or sensitive information in an issue;
            email us instead.
          </p>

          <h2>Your rights</h2>
          <p>
            Where UK data protection law applies to information we hold, you may
            request access, correction or deletion, and may have rights to
            restrict or object to processing. Contact{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>. You can also
            raise a concern with the{' '}
            <a href="https://ico.org.uk/make-a-complaint/">
              UK Information Commissioner’s Office
            </a>
            .
          </p>

          <h2>Changes</h2>
          <p>
            We will update this page if our practices change and show the
            revision date above.
          </p>
        </article>
      </div>
    </Page>
  );
}
