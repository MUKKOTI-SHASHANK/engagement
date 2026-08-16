// Edit this file to personalize the whole site. No other code changes needed.

export const config = {
  // Gate password — currently your anniversary date, ddmmyyyy
  password: '19082024',

  // Names shown throughout the site
  yourName: 'SHASHANK',
  herName: 'PRATHYUSHA',

  // Shown on the hero section right after the gate unlocks
  heroTitle: 'Forever Us',
  heroSubtitle: 'Two hearts, one promise, no distance too far.',

  // The big cinematic date reveal section, right after the hero
  anniversary: {
    day: '23',
    month: 'August',
    year: '2026',
    detail: 'The day distance stopped mattering.',
  },

  // "Our story" timeline — add/remove entries freely, each needs a photo
  // Drop photo files into public/photos/ and reference them as '/photos/filename.jpg'
  timeline: [
    {
      // date: 'For Years',
      caption:
        'For years, I carried a little secret in my heart. I loved you quietly, without ever telling you. You were special to me long before you knew it.',
      photo: '/photos/first.jpeg',
    },
    {
      // date: 'How It Started',
      caption:
        'I never knew how our story would begin. I never imagined our families would bring us together. But somehow, life was already writing our story for us.',
      photo: '/photos/second.jpeg',
    },
    {
      // date: '19 August 2024',
      caption:
        'The love I kept hidden for so many years is finally no longer a secret. Today, we begin a beautiful journey together. ❤️',
      photo: '/photos/third.jpeg',
    },
    {
      // date: 'Today',
      caption:
        "Today isn't the end of a love story. It's the beautiful beginning of <strong>our story together</strong>. And I'm so happy that the girl I loved quietly is now my fiancée. 💍❤️",
      photo: '/photos/fourth.jpeg',
    },
  ],

  // Love letter — replace with your real words. Line breaks are preserved.
  loveLetter: `My love,

Distance has never been able to hold what we have — not really.
Every mile between us has only ever made the pull toward you stronger.

This is my promise to you, written in the only way I know how to make
it feel as big as it actually is.

Forever yours,
{yourName}`,

  // Optional: path to a voice message audio file, e.g. '/audio/message.mp3'.
  // Leave as null to hide the audio player.
  voiceMessage: null,

  // Closing message shown after the ring reveal
  closingMessage: 'Every day, in every country, in every way — I choose you.',
}
