import { site } from '@/lib/site';

export function Studio() {
  return (
    <section className="py-16 lg:py-24">
      <div className="shell grid gap-10 border-t border-line pt-16 lg:grid-cols-12 lg:pt-24">
        <div className="lg:col-span-5">
          <p
            data-reveal
            className="label flex items-center gap-3 text-paper/55"
          >
            <span className="size-1.5 rounded-full bg-amber" />
            The studio
          </p>
          <h2
            data-reveal
            className="display mt-5 text-[clamp(2.5rem,4.6vw,4.25rem)]"
          >
            Small, <span className="serif-accent text-amber">on purpose.</span>
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-paper/70 lg:col-span-6 lg:col-start-7">
          <p data-reveal>
            Fully Free Apps is the home for software that {site.company.name}{' '}
            chooses to share freely. We’re an independent UK company making
            straightforward tools for everyday jobs.
          </p>
          <p data-reveal>
            No growth hacks, no funnels and no upsells. Just apps we’d want to
            use ourselves, made with care.
          </p>
        </div>
      </div>
    </section>
  );
}
