# Forever Us

A private, animated engagement celebration site — built with Vue 3 + Three.js + GSAP.

## Personalize it (no code needed)

Open `src/config.js` and edit:

- `password` — the gate password (currently `your first message date`, your anniversary date)
- `yourName` / `herName`
- `heroTitle` / `heroSubtitle`
- `timeline` — your story. For each entry, add a photo to `public/photos/` and
  point `photo:` at it, e.g. `/photos/us-01.jpg`
- `loveLetter` — your real letter. Use `{yourName}` anywhere you want SHASHANK
  inserted, and blank lines for paragraph breaks.
- `voiceMessage` — optional. Drop an audio file into `public/audio/` (e.g.
  `public/audio/message.mp3`) and set this to `/audio/message.mp3`. Leave as
  `null` to hide the player.
- `closingMessage` — the final line shown after the ring reveal.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL in your browser.

## Share it with her

```bash
npm run build
```

This produces a `dist/` folder — deploy it to any static host (Vercel, Netlify,
GitHub Pages, Cloudflare Pages) and send her the link. The password gate means
the URL itself doesn't need to be kept secret, but keep it unlisted anyway.

## What's inside

- `PasswordGate.vue` — the entry gate
- `HeroSection.vue` — the opening title
- `StoryTimeline.vue` — your photo story, scroll-animated
- `LoveLetter.vue` — a clickable sealed envelope that opens into your letter
- `RingReveal.vue` — the 3D ring centerpiece (Three.js), rotates and reacts to
  mouse movement, scales in dramatically on scroll
- `ClosingSection.vue` — the final message
# engagement
# engagement
