# Ekagra

A calm, privacy-first Pomodoro timer — Chrome extension built with Manifest V3.

**Ekagra** (Sanskrit: "one-pointed focus") helps you stay productive with timed focus sessions, short breaks, and long breaks — all without collecting a single byte of your data.

## Features

- **Reliable background timer** — uses `chrome.alarms` and timestamp math, survives popup close, system sleep, and browser restart
- **11 themes** — Sunrise, Meadow, Ocean, Aurora, Zen, Neon, Retro, Brutalist, Coral, Analog Lux, Glass — each with unique animated SVG backgrounds and color palettes
- **5 timer displays** — Ring, Flip Clock, Big Number, Bloom, and Analog Clock
- **Focus / Short Break / Long Break** modes with automatic session cycling
- **Stats & analytics** — daily focus minutes, weekly bar chart, streak tracking, all stored locally
- **Configurable** — session durations, sessions before long break, auto-start, daily focus goal, break reminders, notification sound
- **Session completion chime** — Web Audio API arpeggio via offscreen document
- **Badge** — remaining minutes shown on the extension icon
- **Zero data collection** — no analytics, no tracking, no external APIs. Everything stays in `chrome.storage.local`

## Install

### Chrome Web Store

Currently under review — link will be added once approved.

### Download (no coding required)

1. Go to the [latest release](https://github.com/chintan-27/ekagra/releases/latest)
2. Download the `.zip` file
3. Unzip it — you'll get a folder with the extension files
4. Open Chrome and go to `chrome://extensions`
5. Turn on **Developer mode** (toggle in the top-right corner)
6. Click **Load unpacked**
7. Select the unzipped folder
8. Ekagra will appear in your extensions bar — click the icon to start!

### Build from source

```bash
git clone https://github.com/chintan-27/ekagra.git
cd ekagra
npm install
npm run build
```

Then load the `dist/` folder as an unpacked extension following steps 4-8 above.

For development with hot reload:

```bash
npm run dev
```

## Architecture

```
Popup (React)  <-->  Service Worker  <-->  chrome.storage.local
                          |
                    chrome.alarms
                    chrome.notifications
                    chrome.offscreen (audio)
```

- **Service worker** orchestrates alarms, messages, notifications, badge updates, and session transitions
- **Timer engine** contains pure functions for all state transitions — no Chrome API calls
- **Popup** uses `requestAnimationFrame` for smooth countdown display, sending messages to the service worker for state changes
- Timer accuracy relies on timestamp math (`remaining = duration - (Date.now() - startTime)`), not active timers

## Tech Stack

- TypeScript
- React 19
- Vite 6 with [@crxjs/vite-plugin](https://github.com/nicedoc/crxjs)
- Chrome Extension Manifest V3

## Permissions

| Permission | Reason |
|---|---|
| `storage` | Save timer state, settings, and stats locally |
| `alarms` | Fire session-complete events while popup is closed |
| `notifications` | Alert when a session ends |
| `offscreen` | Play completion chime via Web Audio API |

## License

[MIT](LICENSE)
