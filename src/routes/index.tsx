import { AppStack } from '@/components/home/app-stack';
import { ClapperHero } from '@/components/home/clapper-hero';
import { ThePromise } from '@/components/home/promise';
import { Studio } from '@/components/home/studio';
import { UnderTheHood } from '@/components/home/under-the-hood';
import { Marquee } from '@/components/marquee';
import { Page } from '@/components/page';
import { seo } from '@/lib/seo';
import { site } from '@/lib/site';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: 'Fully Free Apps — good tools, fully free',
      description: site.description,
      path: '/',
    }),
  component: Home,
});

function Home() {
  return (
    <Page>
      <ClapperHero />
      <div className="relative z-10 my-10 -rotate-[1.4deg] bg-amber py-4 text-ink sm:my-14 sm:py-5">
        <Marquee
          className="text-[clamp(1.25rem,2.6vw,2rem)] font-semibold tracking-[-0.03em] uppercase"
          items={[
            'No ads',
            'No subscriptions',
            'No in-app purchases',
            'No tracking',
            'No accounts',
            'Every feature included',
          ]}
        />
      </div>
      <AppStack />
      <ThePromise />
      <UnderTheHood />
      <Studio />
    </Page>
  );
}
