import Image from 'next/image';
import Link from 'next/link';
export const metadata = { title: 'Slate for iPad' };
export default function Slate() {
  return (
    <main id="main" className="shell document">
      <p className="eyebrow">SLATE FOR IPAD</p>
      <div className="product-heading">
        <div>
          <h1>
            Ready.
            <br />
            Set. <span>Take.</span>
          </h1>
          <p className="lead">A production slate with just what you need.</p>
          <p>
            Scene, shot and take in a clear display. A clap or beep on tap. A
            clock reference at the bottom. All stored locally, ready when you
            reopen the app.
          </p>
          <p className="status">
            IN DEVELOPMENT · APP STORE RELEASE COMING SOON
          </p>
        </div>
        <Image
          unoptimized
          src="/slate-icon.png"
          alt="Slate app icon"
          width="260"
          height="260"
        />
      </div>
      <div className="feature-list">
        <article>
          <h2>Keep the take moving.</h2>
          <p>
            Increase or decrease Scene and Take with a tap. Shot moves through
            A–Z. Your last values are saved automatically on the iPad.
          </p>
        </article>
        <article>
          <h2>Lock it. Clap it.</h2>
          <p>
            Double-tap the lock to protect your counters from accidental
            touches. The slate sound button stays available, with clap or beep
            sounds, adjustable volume and an optional screen flash.
          </p>
        </article>
        <article>
          <h2>A clock at a glance.</h2>
          <p>
            Show the iPad’s local time as HH:MM:SS:FF at 24, 25 or 30 fps. This
            is a visual clock reference; it is not synchronized to a camera or
            an external timecode source.
          </p>
        </article>
        <article>
          <h2>Built to stay simple.</h2>
          <p>
            No account, internet connection, ads or in-app purchases. Designed
            for iPad, including older devices running iOS 12. Final App Store
            compatibility will be confirmed at release.
          </p>
        </article>
      </div>
      <Link className="button" href="/support">
        Slate help <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
