export const site = {
  name: "Alex Chapman",
  brand: "Alex's Loop",
  domain: "alexoloopios.com",
  title: "Alex's Loop · Games, software & more",
  description:
    "Alex Chapman's home for accessible software, NVDA add-ons, future games, and whatever comes next.",
  intro:
    "I'm Alex Chapman, a blind developer who cares about inclusive design and screen reader access. This is where I share what I make and what I'm exploring next.",
};

export type Project = {
  title: string;
  description: string;
  repoUrl: string;
  releaseUrl: string;
  version: string;
  category: string;
  prerelease?: boolean;
};

// Add games here once they have published releases.
export const games: Project[] = [];

// These entries were checked against published GitHub releases on October 1, 2026.
export const software: Project[] = [
  {
    title: "Pico SAPI5",
    description:
      "The SVOX Pico text-to-speech synthesizer for Windows SAPI5, with 32-bit and 64-bit support and six voices and languages.",
    repoUrl: "https://github.com/alexoloopios/pico-sapi5",
    releaseUrl: "https://github.com/alexoloopios/pico-sapi5/releases/tag/v1.0.0",
    version: "v1.0.0",
    category: "Windows speech",
  },
  {
    title: "Discord Enhancements",
    description: "An NVDA add-on that improves the Discord experience for screen reader users.",
    repoUrl: "https://github.com/alexoloopios/discord-enhancements",
    releaseUrl: "https://github.com/alexoloopios/discord-enhancements/releases/tag/v1.3.1",
    version: "v1.3.1",
    category: "NVDA add-on",
  },
  {
    title: "Pico TTS for NVDA",
    description: "A maintained fork of the Pico TTS add-on for modern versions of NVDA.",
    repoUrl: "https://github.com/alexoloopios/PicoTTS-NVDA",
    releaseUrl: "https://github.com/alexoloopios/PicoTTS-NVDA/releases/tag/4.1",
    version: "4.1",
    category: "NVDA add-on",
  },
  {
    title: "DECTalk for NVDA",
    description: "DECTalk speech for NVDA 2026.1 and newer, while preserving support for older versions.",
    repoUrl: "https://github.com/alexoloopios/dectalk-nvda",
    releaseUrl: "https://github.com/alexoloopios/dectalk-nvda/releases/tag/v2026.1.1",
    version: "2026.1.1",
    category: "NVDA add-on",
  },
  {
    title: "STAR Manager",
    description:
      "A Windows interface for managing Speech to Audio Relay setups, including providers and the local coagulator.",
    repoUrl: "https://github.com/alexoloopios/starmanager",
    releaseUrl: "https://github.com/alexoloopios/starmanager/releases/tag/v0.1.0",
    version: "v0.1.0",
    category: "Windows utility",
    prerelease: true,
  },
  {
    title: "WxEnhancements",
    description:
      "An NVDA add-on that improves announcements for wxWidgets and wxPython apps, including checkbox labels and window titles.",
    repoUrl: "https://github.com/alexoloopios/WxEnhancements",
    releaseUrl: "https://github.com/alexoloopios/WxEnhancements/releases/tag/1.0",
    version: "1.0",
    category: "NVDA add-on",
  },
  {
    title: "NVDA Custom Tones",
    description: "Replaces NVDA synthesizer beeps with pitched WAV sounds.",
    repoUrl: "https://github.com/alexoloopios/NVDA-CustomTones",
    releaseUrl: "https://github.com/alexoloopios/NVDA-CustomTones/releases/tag/v1.0",
    version: "v1.0",
    category: "NVDA add-on",
  },
  {
    title: "Folder Sorter",
    description: "A small Windows utility that sorts files into folders by file type.",
    repoUrl: "https://github.com/alexoloopios/folder-sorter",
    releaseUrl: "https://github.com/alexoloopios/folder-sorter/releases/tag/v1",
    version: "v1",
    category: "Windows utility",
  },
];
