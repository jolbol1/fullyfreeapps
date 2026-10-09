export const site = {
  name: 'Fully Free Apps',
  url: 'https://fullyfreeapps.com',
  description:
    'Small, focused apps from an independent UK studio. No ads, subscriptions, in-app purchases, accounts or tracking. Every feature included.',
  email: 'support@fullyfreeapps.com',
  company: {
    name: 'MWD Studios Ltd',
    number: '15680016',
    office: '238 Station Road, Addlestone, Surrey, England, KT15 2PS',
  },
} as const;

export type Shot = {
  name: string;
  /** Path stem in public/images; files are `${stem}-${width}.webp`. */
  stem: string;
  widths: readonly number[];
  width: number;
  height: number;
  alt: string;
};

function shot(
  stem: string,
  widths: number[],
  [width, height]: [number, number],
  alt: string,
): Shot {
  return {
    name: stem.split('/').pop() ?? stem,
    stem,
    widths,
    width,
    height,
    alt,
  };
}

export function srcSet(s: Shot) {
  return s.widths.map((w) => `/images/${s.stem}-${w}.webp ${w}w`).join(', ');
}

export function src(s: Shot) {
  return `/images/${s.stem}-${s.widths[0]}.webp`;
}

export const slate = {
  name: 'Slate',
  storeName: 'Slate — Digital Clapperboard',
  tagline: 'A digital clapperboard for iPhone and iPad.',
  platforms: 'iPhone & iPad',
  requires: 'iOS 15 or later',
  source: 'https://github.com/jolbol1/slate',
  issues: 'https://github.com/jolbol1/slate/issues',
  // Set this to https://apps.apple.com/app/id6810465414 once Slate is live.
  appStoreUrl: null as string | null,
  status: 'Coming soon to the App Store',
  icon: shot('slate/icon', [512, 192], [512, 512], 'Slate app icon'),
  shots: {
    ipadLandscape: shot(
      'slate/ipad-landscape',
      [1800, 1000],
      [2752, 2064],
      'Slate on iPad in landscape: Scene 2, Shot B, Take 2 for the production Night Train, with director, camera, filter and notes below and a running clock.',
    ),
    ipadDetails: shot(
      'slate/ipad-details',
      [1100, 640],
      [2064, 2752],
      'The Slate Details sheet on iPad, editing production, director, camera, roll, filter and sound fields.',
    ),
    iphoneLandscape: shot(
      'slate/iphone-landscape',
      [1600, 900],
      [2868, 1320],
      'Slate on iPhone in landscape with the striped clapper bar, roll and camera tags, and large Scene, Shot and Take counters.',
    ),
    iphoneLocked: shot(
      'slate/iphone-locked',
      [1600, 900],
      [2868, 1320],
      'Slate locked on iPhone: the counters are dimmed, the status reads Locked and an amber Unlock slate button is shown.',
    ),
    iphonePortrait: shot(
      'slate/iphone-portrait',
      [760, 420],
      [1320, 2868],
      'Slate on iPhone in portrait, with stacked Scene, Shot and Take counters, director and camera names, and the clock.',
    ),
    iphoneSettings: shot(
      'slate/iphone-settings',
      [760, 420],
      [1320, 2868],
      'Slate Settings on iPhone: clap or beep, volume, screen flash, take counter automation and clock frame rate.',
    ),
  },
};

export const cue = {
  name: 'Cue',
  tagline: 'A teleprompter for the Markdown scripts you already have.',
  platforms: 'macOS',
  requires: 'macOS 14 Sonoma or later',
  source: 'https://github.com/jolbol1/cue',
  issues: 'https://github.com/jolbol1/cue/issues',
  download: 'https://github.com/jolbol1/cue/releases/latest',
  icon: shot('cue/icon', [512, 192], [512, 512], 'Cue app icon'),
  shots: {
    main: shot(
      'cue/main',
      [1600, 900],
      [1600, 1071],
      'Cue on macOS: a sidebar of Markdown scripts, a live prompter preview with a highlighted reading area and camera marker, and the Text inspector.',
    ),
    output: shot(
      'cue/output',
      [1600, 900],
      [1600, 1071],
      'Cue’s Output inspector with display selection, mirror and rotate toggles, brightness and camera marker settings.',
    ),
    pedal: shot(
      'cue/pedal',
      [648, 400],
      [648, 800],
      'Cue’s Pedal settings with direct USB input, live indicators for the left, centre and right pedals, and hold-to-scroll speed.',
    ),
  },
};

export type Faq = { q: string; a: string };

export const slateFaqs: Faq[] = [
  {
    q: 'Where can I download Slate?',
    a: 'Slate is on its way to the App Store for iPhone and iPad. We’ll link it here as soon as it’s live. In the meantime, the source is on GitHub.',
  },
  {
    q: 'How do I change scene, shot and take?',
    a: 'Use the plus and minus buttons on each counter. Scene and take are numbers; shot steps through the alphabet from A to Z. By default, take returns to 1 when the scene or shot changes. You can turn that off in Settings.',
  },
  {
    q: 'How does the lock work?',
    a: 'Double-tap the lock button to lock or unlock. A single tap does nothing, so a stray touch can’t change your counters. The clapper still works while locked. With VoiceOver or Switch Control, use the normal activation gesture.',
  },
  {
    q: 'Why can’t I hear the clap or beep?',
    a: 'Open Slate’s Settings, choose a sound and check the volume slider. Then check your device volume and whether audio is going to headphones or a Bluetooth speaker. Slate plays its sound even with Silent Mode on.',
  },
  {
    q: 'Is the timecode synchronised?',
    a: 'No. The clock shows your device’s local time as HH:MM:SS:FF at 24, 25, 30, 48, 50 or 60 fps. It’s a visual time-of-day reference, not synchronised timecode, and it doesn’t output to recording equipment.',
  },
  {
    q: 'Can the lock stop people leaving the app?',
    a: 'No. It protects Slate’s own controls, not the Home gesture or power button. To keep a device in Slate, use Guided Access in your device’s Accessibility settings.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Only on your device. Slate saves your counters, details and settings as you go and restores them when you reopen it. Nothing syncs between devices, and deleting the app removes its data.',
  },
];

export const cueFaqs: Faq[] = [
  {
    q: 'How do I install Cue?',
    a: 'Download the latest DMG from GitHub, open it and drag Cue onto Applications. Cue is signed with a Developer ID and notarized by Apple, so it opens like any other app.',
  },
  {
    q: 'Does Cue change my scripts?',
    a: 'Never. Cue reads your Markdown files where they are. It doesn’t copy, import or write to them, and it reloads them within a second when you save in another editor.',
  },
  {
    q: 'Which Markdown does Cue show?',
    a: 'Headings, paragraphs, lists, quotes, bold, italic and inline code, all without their symbols. Frontmatter, HTML comments, standalone images, link definitions and horizontal rules are hidden. Code blocks are hidden unless you turn them on. Tables, embedded HTML and reference-style links aren’t fully supported.',
  },
  {
    q: 'Do I need a teleprompter?',
    a: 'No. Cue can project to any display, including an Elgato Prompter, which it picks automatically. You can also just read from the preview on your Mac.',
  },
  {
    q: 'My Stream Deck Pedal isn’t responding.',
    a: 'Turn on Enable direct USB input in Cue → Settings → Pedal. If macOS blocks it, allow Cue under Privacy & Security → Input Monitoring, then click Reconnect. Give the pedal an empty profile in the Stream Deck app so its own actions don’t also fire.',
  },
  {
    q: 'What does Cue store?',
    a: 'Its settings, the last file you opened and the window layout, in macOS user defaults on your Mac. Nothing else, and nothing leaves your Mac.',
  },
];
