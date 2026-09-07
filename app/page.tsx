import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <main id="main">
      <section className="shell hero">
        <p className="eyebrow">INDEPENDENT APPS. ZERO STRINGS.</p>
        <h1>
          Good tools.
          <br />
          <span>Fully free.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            Small, useful apps that do their job.
            <br />
            No ads. No subscriptions. No tracking.
            <br />
            Every feature included.
          </p>
          <Link className="button" href="/slate">
            Meet our first app <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="app-section">
        <div className="shell app-grid">
          <div>
            <p className="eyebrow">01 / MADE FOR THE SET</p>
            <h2>Slate.</h2>
            <p className="lead">Your next take starts here.</p>
            <p>
              A simple production slate for iPad. Set your scene, shot and take,
              lock the controls, then tap to clap.
            </p>
            <Link className="text-link" href="/slate">
              Explore Slate <span aria-hidden="true">↗</span>
            </Link>
            <p className="status">IN DEVELOPMENT · COMING TO THE APP STORE</p>
          </div>
          <Link
            className="icon-stage"
            href="/slate"
            aria-label="Explore Slate for iPad"
          >
            <Image
              unoptimized
              src="/slate-icon.png"
              alt="Slate app icon: a black clapperboard with cream and amber panels"
              width="360"
              height="360"
            />
          </Link>
        </div>
      </section>
      <section className="shell promise">
        <p className="eyebrow">A SIMPLE PROMISE</p>
        <h2>
          Free means
          <br />
          the whole app.
        </h2>
        <div className="principles">
          <article>
            <span>01</span>
            <h3>No upgrades to unlock.</h3>
            <p>
              Every feature is included. No trials, subscriptions or in-app
              purchases.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Your attention is yours.</h3>
            <p>No ads interrupting what you came to do.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Your data stays yours.</h3>
            <p>
              No analytics or tracking in our apps. Slate works entirely on your
              iPad.
            </p>
          </article>
        </div>
        <div className="about">
          <h3>Made by MWD Studios Ltd.</h3>
          <p>
            We’re an independent UK company making straightforward tools for
            everyday tasks. Fully Free Apps is our home for software we choose
            to share freely. Slate is our first app.
          </p>
        </div>
      </section>
    </main>
  );
}
