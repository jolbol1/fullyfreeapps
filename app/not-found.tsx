import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="shell document">
      <p className="eyebrow">404</p>
      <h1>Nothing here.</h1>
      <p>Let’s get you back to the apps.</p>
      <Link className="button" href="/">
        Back home ↗
      </Link>
    </main>
  );
}
