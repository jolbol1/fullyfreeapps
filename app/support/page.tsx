export const metadata = { title: 'Support' };
export default function Support() {
  return (
    <main id="main" className="shell document prose">
      <p className="eyebrow">HERE TO HELP</p>
      <h1>Support.</h1>
      <p className="lead">A little help with your next take.</p>
      <h2>Contact us</h2>
      <p>
        Email{' '}
        <a href="mailto:support@fullyfreeapps.com">support@fullyfreeapps.com</a>{' '}
        with your iPad model, iOS or iPadOS version, and a description of what
        happened. Please don’t send passwords or sensitive production
        information.
      </p>
      <h2>How do I change Scene, Shot and Take?</h2>
      <p>
        Use the plus and minus controls beside each value. Scene and Take use
        numbers; Shot moves through the alphabet from A to Z.
      </p>
      <h2>How does the lock work?</h2>
      <p>
        Double-tap the lock button to lock or unlock the counters. The sound
        button remains usable while locked. With VoiceOver or Switch Control,
        use the normal accessibility activation gesture.
      </p>
      <h2>Why can’t I hear the clap or beep?</h2>
      <p>
        Open Slate’s settings, choose a sound and check the volume. Check your
        iPad’s volume and whether audio is going to headphones or a Bluetooth
        speaker.
      </p>
      <h2>Is the timecode synchronized?</h2>
      <p>
        No. It follows the iPad’s clock and is intended only as a visual
        time-of-day reference. You can choose 24, 25 or 30 fps in settings.
      </p>
      <h2>Where are my settings stored?</h2>
      <p>
        On your iPad. Slate remembers your last counters and settings when you
        close and reopen it. It does not sync across devices; deleting the app
        can remove its saved data.
      </p>
      <h2>Where can I download Slate?</h2>
      <p>
        Slate is currently in development. We will add the official App Store
        link here when it is available.
      </p>
    </main>
  );
}
