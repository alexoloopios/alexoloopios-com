export const youtube = {
  channelId: "UCRzlB1rsyYl66j9fTlLUH8Q",
  channelUrl: "https://www.youtube.com/channel/UCRzlB1rsyYl66j9fTlLUH8Q/videos",
};

export type VideoSeries = {
  slug: string;
  title: string;
  description: string;
  /** Tested against each video title after apostrophes and spacing are normalised. */
  match: RegExp;
  exclude?: RegExp;
  /** Reaction videos are left out of every series unless this is true. */
  reactions?: boolean;
};

export type VideoSubgroup = {
  title?: string;
  series: VideoSeries[];
};

export type VideoCategory = {
  slug: string;
  title: string;
  description: string;
  subgroups: VideoSubgroup[];
};

// Only active and notable series are listed. Everything else is a click away
// through the "View all on YouTube" link. A video can appear in more than one series.
export const videoCategories: VideoCategory[] = [
  {
    slug: "comedy",
    title: "Comedy",
    description: "Bloopers, funny signs, TTS chaos, and reactions to the community's best.",
    subgroups: [
      {
        title: "Logo and ident bloopers",
        series: [
          {
            slug: "mm-bloopers",
            title: "Alex's MM Bloopers",
            description: "Blooper edits of the classic Merrie Melodies intro, with plenty of logo craziness along the way.",
            match: /\bMM Bloopers\b/i,
          },
          {
            slug: "motorola-ident-bloopers",
            title: "Motorola Ident Bloopers",
            description: "Seasonal blooper edits of the Motorola ident, from Moto-beach to Moto-Christmas.",
            match: /^Motorola Ident (Bloopers|Parodies)\b/i,
          },
        ],
      },
      {
        title: "Funny signs and errors",
        series: [
          {
            slug: "funny-signs-and-errors",
            title: "Alex's Funny Signs & Errors",
            description: "Funny signs and errors episodes, from the road to Baldi's School and beyond.",
            match: /^(Alex's|Alexoloopios'|Al Chappers'?s?) Funny Signs\b/i,
          },
          {
            slug: "windows-errors",
            title: "Windows Errors & Parodies",
            description: "Windows going wrong in the funniest possible ways.",
            match: /\bWindows Errors\b|\bWindows 11 (Parodies|goes wrong)\b/i,
          },
        ],
      },
      {
        title: "Sketches and TTS shorts",
        series: [
          {
            slug: "tts-shorts",
            title: "TTS Shorts",
            description: "Short text-to-speech sketches starring Microsoft Sam and friends.",
            match: /^TTS Short\b/i,
          },
          {
            slug: "cte-shorts",
            title: "CTE Shorts",
            description: "The Chappers Tech & Entertainment shorts series.",
            match: /^CTE Shorts\b/i,
          },
          {
            slug: "exercise-in-randomness",
            title: "An Exercise in Randomness",
            description: "Exactly what it says on the tin.",
            match: /^An Exercise in Randomness\b/i,
          },
        ],
      },
      {
        title: "Reactions",
        series: [
          {
            slug: "reactions",
            title: "Reactions",
            description: "Reacting to fellow creators' bloopers, parodies, funny signs, and more.",
            match: /\breaction\b/i,
            exclude: /^CTC (Discord VC|WhatsApp call)/i,
            reactions: true,
          },
        ],
      },
    ],
  },
  {
    slug: "talk",
    title: "Talk and community",
    description: "Podcasts, live calls, and news from around the community.",
    subgroups: [
      {
        series: [
          {
            slug: "loolycast",
            title: "LoolyCast",
            description: "The weekly-ish catch-up show: what's been happening, randomness included.",
            match: /\bLoolyCast\b/i,
          },
          {
            slug: "community-calls",
            title: "CTC Community Calls",
            description: "Recorded Discord and WhatsApp calls with the CTC crew.",
            match: /^CTC (Discord VC|WhatsApp call)/i,
            reactions: true,
          },
          {
            slug: "41-action-news",
            title: "41 Action News",
            description: "Tech, community, and channel news bulletins.",
            match: /\b41 Action News\b/i,
          },
        ],
      },
    ],
  },
  {
    slug: "tech",
    title: "Tech and accessibility",
    description: "Reviews, first looks, and accessibility guides from a blind user's point of view.",
    subgroups: [
      {
        series: [
          {
            slug: "reviews",
            title: "Reviews and first looks",
            description: "Phones, watches, apps, and gadgets, with accessibility front and centre.",
            match: /\breview\b|^A look at\b|^Delta Game Emulator\b/i,
            exclude: /\byear in review\b|\breview soon\b/i,
          },
          {
            slug: "accessibility",
            title: "Accessibility and how-tos",
            description: "Guides, tips, and discussions about getting things done as a blind person.",
            match: /\baccessibility\b|\bTalkBack\b|^How to\b|\bStartAllBack\b|^PSA\b/i,
            exclude: /\bLoolyCast\b|^Delta Game Emulator\b|^A look at\b|\breview\b/i,
          },
        ],
      },
    ],
  },
  {
    slug: "gaming",
    title: "Gaming",
    description: "Let's plays, with an eye on how accessible each game really is.",
    subgroups: [
      {
        series: [
          {
            slug: "glory-frontline",
            title: "Glory Frontline",
            description: "Playing through the accessible mobile FPS.",
            match: /\bGlory Frontline\b/i,
          },
          {
            slug: "minecraft-adventures",
            title: "Minecraft Adventures",
            description: "Escaping to the crazy blocky world.",
            match: /\bMinecraft Adventures\b/i,
          },
          {
            slug: "crazy-party",
            title: "Crazy Party",
            description: "Online battles in Crazy Party.",
            match: /^Crazy Party\b/i,
          },
        ],
      },
    ],
  },
];

export const allVideoSeries = videoCategories.flatMap((category) =>
  category.subgroups.flatMap((subgroup) => subgroup.series),
);
