import { AppIcon } from '@/components/app-icon';
import { FaqList } from '@/components/app-page';
import { GitHubIcon } from '@/components/icons';
import { Page } from '@/components/page';
import { PageHero } from '@/components/page-hero';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { seo } from '@/lib/seo';
import { cue, cueFaqs, site, slate, slateFaqs } from '@/lib/site';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRightIcon, MailIcon } from 'lucide-react';

export const Route = createFileRoute('/support')({
  head: () =>
    seo({
      title: 'Support · Fully Free Apps',
      description:
        'Help with Slate and Cue: answers to common questions, GitHub issues for bugs and questions, and email support.',
      path: '/support',
    }),
  component: Support,
});

function Support() {
  return (
    <Page>
      <PageHero
        label="Here to help"
        title={
          <>
            Support<span className="text-amber">.</span>
          </>
        }
      >
        Questions about Slate or Cue? Start with the answers below. For bugs or
        anything else, open an issue on GitHub, or email us if you’d rather.
      </PageHero>

      <section className="shell grid gap-4 lg:grid-cols-12">
        <div
          data-reveal
          className="flex flex-col justify-between gap-12 rounded-[2rem] bg-amber p-8 text-ink sm:p-10 lg:col-span-7"
        >
          <div className="flex items-center justify-between">
            <GitHubIcon className="size-8" />
            <span className="label rounded-full bg-ink/10 px-3 py-1.5 text-ink/70">
              Best way
            </span>
          </div>
          <div>
            <p className="label text-ink/60">Open an issue on GitHub</p>
            <p className="mt-3 max-w-[24ch] text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.035em]">
              The quickest way to get help or report a bug.
            </p>
            <p className="mt-4 max-w-[50ch] text-ink/70">
              Issues are public, so anyone with the same question can find the
              answer too. Have a quick search first: it may already be solved.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { app: 'slate' as const, name: 'Slate', href: slate.issues },
                { app: 'cue' as const, name: 'Cue', href: cue.issues },
              ].map((repo) => (
                <a
                  key={repo.name}
                  href={repo.href}
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-ink pr-5 pl-2 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-ink/85"
                >
                  <AppIcon app={repo.app} size={32} />
                  {repo.name} issues
                  <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <a
          data-reveal
          href={`mailto:${site.email}`}
          className="group flex flex-col justify-between gap-12 rounded-[2rem] border border-line bg-ink-2 p-8 transition-colors hover:border-paper/25 sm:p-10 lg:col-span-5"
        >
          <div className="flex items-center justify-between">
            <MailIcon className="size-7 text-paper/70" aria-hidden="true" />
            <ArrowUpRightIcon
              className="size-6 text-paper/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="label text-paper/50">Prefer email?</p>
            <p className="mt-3 text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold tracking-[-0.03em] break-all">
              {site.email}
            </p>
            <p className="mt-4 text-paper/60">
              If you’d rather not use GitHub, or your question is private, email
              us instead.
            </p>
          </div>
        </a>

        <div
          data-reveal
          className="rounded-[2rem] border border-line p-8 sm:p-10 lg:col-span-12"
        >
          <p className="font-semibold">Whichever you choose, include:</p>
          <ul className="mt-5 grid gap-3 text-paper/65 md:grid-cols-3">
            {[
              'Which app, and its version',
              'Your device model and its iOS, iPadOS or macOS version',
              'What you expected, and what happened instead',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-paper/45">
            Please don’t share passwords or sensitive production information,
            especially in public GitHub issues.
          </p>
        </div>
      </section>

      <section className="shell mt-24 lg:mt-32">
        <h2 data-reveal className="display text-[clamp(2.25rem,5vw,4rem)]">
          Common questions.
        </h2>
        <Tabs defaultValue="slate" className="mt-10">
          <TabsList className="h-auto gap-1 rounded-full border border-line bg-ink-2 p-1">
            <TabsTrigger
              value="slate"
              className="h-auto gap-2.5 rounded-full px-4 py-2 text-[0.9375rem] dark:data-active:border-transparent dark:data-active:bg-paper dark:data-active:text-ink"
            >
              <AppIcon app="slate" size={22} />
              Slate
            </TabsTrigger>
            <TabsTrigger
              value="cue"
              className="h-auto gap-2.5 rounded-full px-4 py-2 text-[0.9375rem] dark:data-active:border-transparent dark:data-active:bg-paper dark:data-active:text-ink"
            >
              <AppIcon app="cue" size={22} />
              Cue
            </TabsTrigger>
          </TabsList>
          <TabsContent value="slate" className="mt-8">
            <FaqList items={slateFaqs} />
            <MoreHelp app="Slate" to="/slate" issues={slate.issues} />
          </TabsContent>
          <TabsContent value="cue" className="mt-8">
            <FaqList items={cueFaqs} />
            <MoreHelp app="Cue" to="/cue" issues={cue.issues} />
          </TabsContent>
        </Tabs>
      </section>
    </Page>
  );
}

function MoreHelp({
  app,
  to,
  issues,
}: {
  app: string;
  to: '/slate' | '/cue';
  issues: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-paper/60">
      <Link to={to} className="inline-flex items-center gap-2 hover:text-paper">
        Everything {app} does <ArrowUpRightIcon className="size-4" />
      </Link>
      <a
        href={issues}
        className="inline-flex items-center gap-2 hover:text-paper"
      >
        <GitHubIcon className="size-4" /> Open a {app} issue on GitHub
      </a>
    </div>
  );
}
