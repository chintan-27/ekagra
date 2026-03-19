# Ekagra

A calm, privacy-first Pomodoro timer — Chrome extension built with Manifest V3.

## Features

- Reliable background timer using `chrome.alarms` and timestamp math
- Smooth animated countdown with circular progress ring
- Focus / Short Break / Long Break modes with distinct color themes
- Configurable session durations, auto-start, and sound toggle
- Badge showing remaining minutes on the extension icon
- Zero data collection — no analytics, no tracking, no external APIs

## Getting Started

```bash
npm install
npm run build
```

Then load the `dist/` folder as an unpacked extension:

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `dist/` directory

For development with hot reload:

```bash
npm run dev
```

## Tech Stack

- TypeScript
- React 19
- Vite 6 with [@crxjs/vite-plugin](https://github.com/nicedoc/crxjs)
- Chrome Extension Manifest V3
