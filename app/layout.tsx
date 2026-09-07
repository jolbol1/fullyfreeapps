import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: {
    default: 'Fully Free Apps — useful apps, completely free',
    template: '%s · Fully Free Apps',
  },
  description:
    'Useful apps from MWD Studios Ltd. No ads, subscriptions, in-app purchases or tracking.',
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="shell header">
          <Link className="brand" href="/">
            fully free apps<span aria-hidden="true">.</span>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/slate">Slate</Link>
            <Link href="/support">Support</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </header>
        {children}
        <footer className="shell">
          <div className="footer-top">
            <Link className="brand" href="/">
              fully free apps.
            </Link>
            <p>Useful by design. Free by choice.</p>
          </div>
          <p>
            Fully Free Apps is a trading name of MWD Studios Ltd.
            <br />
            Registered in England and Wales · Company number 15680016.
            <br />
            Registered office: 238 Station Road, Addlestone, Surrey, England,
            KT15 2PS.
          </p>
          <div className="footer-bottom">
            <span>© 2026 MWD Studios Ltd</span>
            <Link href="/privacy">Privacy</Link>
            <Link href="/support">Support</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
