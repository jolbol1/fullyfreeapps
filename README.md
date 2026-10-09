# Fully Free Apps

Company website for Fully Free Apps, a trading name of MWD Studios Ltd. It showcases [Slate](https://github.com/jolbol1/slate) (a digital clapperboard for iPhone and iPad) and [Cue](https://github.com/jolbol1/cue) (a Markdown teleprompter for Mac).

Built with TanStack Start, Tailwind CSS 4, shadcn/ui (Base UI) and GSAP, deployed to Cloudflare Workers. Every page is prerendered at build time and served as a static asset; the Worker only handles unknown paths (404s).

## Develop

Use Node 22.13 or newer.

```sh
npm ci
npm run dev        # http://localhost:3000
```

If the dev server throws `Cannot read properties of null (reading 'useRef')` straight after you import a new component, Vite has just re-optimised a dependency. Restart `npm run dev`.

## Validate and deploy

```sh
npm run typecheck
npm run lint
npm run format
npm run deploy     # vite build (with prerender) + wrangler deploy
```

The Worker is `fullyfreeapps` and serves `fullyfreeapps.com` and `www.fullyfreeapps.com`. Configuration lives in `wrangler.jsonc`. Prerendered pages are served without a trailing slash (`html_handling: drop-trailing-slash`). Security and cache headers for static files are in `public/_headers`.

## Pages

| Route      | Content                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| `/`        | Clapperboard hero, the app line-up, the free-app promise, the studio    |
| `/slate`   | Slate details, an interactive web replica of the slate, screenshots, FAQ |
| `/cue`     | Cue details, an interactive Markdown-to-prompter demo, pedal, shortcuts, FAQ |
| `/support` | GitHub issues first, email as the alternative, FAQs for both apps        |
| `/privacy` | App, website, GitHub and support-email privacy                          |

App Store Connect and the app READMEs link to `/slate`, `/support` and `/privacy`, so keep those URLs stable.

## Content and assets

- App names, links, status, screenshots and FAQs live in `src/lib/site.ts`. When Slate is live on the App Store, set `slate.appStoreUrl` (`https://apps.apple.com/app/id6810465414`) and update `slate.status` and the "Where can I download Slate?" FAQ.
- `npm run images` regenerates the WebP screenshots, app icons, favicon/touch icons and Slate's clap and beep sounds from sibling checkouts of `../slate` and `../md-teleprompter` (override with `SLATE_DIR` and `CUE_DIR`).
- `public/og.png` is the social share image. It's a static asset rendered from the site's fonts.

## Privacy

Fonts, images and sounds are all served from this site. There are no analytics, advertising or tracking scripts, and Worker observability is disabled. Cloudflare still processes requests to host and protect the site.

## Email

Cloudflare Email Routing forwards support@fullyfreeapps.com and developer@fullyfreeapps.com to the company inbox. Routing is configured in the Cloudflare dashboard, not in this repository. Outbound replies need a mailbox or send-as service if they should come from those aliases.
