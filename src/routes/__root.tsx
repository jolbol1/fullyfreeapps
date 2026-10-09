import { buttonVariants } from '@/components/ui/button';
import { Page } from '@/components/page';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ScrollTrigger } from '@/lib/gsap';
import { jsonLd, seo } from '@/lib/seo';
import { site } from '@/lib/site';
import {
  HeadContent,
  Link,
  ScriptOnce,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import appCss from '../styles.css?url';

// Runs before paint so GSAP-driven elements can start hidden without a flash.
const JS_FLAG = `document.documentElement.classList.add('js')`;

export const Route = createRootRoute({
  head: () => {
    const base = seo({
      title: 'Fully Free Apps — good tools, fully free',
      description: site.description,
      path: '/',
    });
    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0b0b0a' },
        { name: 'color-scheme', content: 'dark' },
        ...base.meta,
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      scripts: [
        jsonLd({
          '@type': 'Organization',
          name: site.name,
          legalName: site.company.name,
          url: site.url,
          email: site.email,
          logo: `${site.url}/apple-touch-icon.png`,
        }),
      ],
    };
  },
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // New page, new layout: let ScrollTrigger re-measure everything.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <html lang="en-GB" className="dark" suppressHydrationWarning>
      <head>
        <ScriptOnce>{JS_FLAG}</ScriptOnce>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-amber px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  );
}

function ErrorPage() {
  return (
    <Page className="shell flex min-h-[70vh] flex-col justify-center pt-32">
      <p className="label text-paper/50">Technical difficulties</p>
      <h1 className="display mt-6 text-[clamp(3.5rem,11vw,9rem)]">
        Hold<span className="serif-accent text-amber"> the roll.</span>
      </h1>
      <p className="mt-6 max-w-[42ch] text-lg text-paper/65">
        Something went wrong loading this page. Try again, or let us know at{' '}
        <a href={`mailto:${site.email}`} className="text-paper underline">
          {site.email}
        </a>
        .
      </p>
      <div className="mt-10">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={buttonVariants({ variant: 'amber', size: 'xl' })}
        >
          Try again
        </button>
      </div>
    </Page>
  );
}

function NotFound() {
  return (
    <Page className="shell flex min-h-[70vh] flex-col justify-center pt-32">
      <p className="label text-paper/50">Scene missing · Take 404</p>
      <h1 className="display mt-6 text-[clamp(3.5rem,11vw,9rem)]">
        Cut<span className="serif-accent text-amber">!</span>
      </h1>
      <p className="mt-6 max-w-[42ch] text-lg text-paper/65">
        That page isn’t in the script. It may have moved, or the link may be
        wrong.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/"
          className={buttonVariants({ variant: 'amber', size: 'xl' })}
        >
          Back to the start
        </Link>
        <Link
          to="/support"
          className={buttonVariants({ variant: 'line', size: 'xl' })}
        >
          Get help
        </Link>
      </div>
    </Page>
  );
}
