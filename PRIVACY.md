# Privacy Policy — Ekagra

**Last updated:** March 19, 2026

## Overview

Ekagra is a privacy-first Pomodoro timer Chrome extension. It does not collect, transmit, or share any user data.

## Data Storage

All data is stored locally on your device using Chrome's `chrome.storage.local` API. This includes:

- Timer state (current mode, running/paused status)
- User settings (session durations, theme preference, display type)
- Focus session statistics (daily minutes, session counts, streaks)

This data never leaves your browser. There are no servers, databases, or cloud storage involved.

## Data Collection

Ekagra does **not** collect:

- Personal information
- Browsing history
- Website content
- Analytics or usage telemetry
- Crash reports
- Location data
- Any form of user identifier

## Network Requests

Ekagra makes **no network requests** except loading Google Fonts CSS stylesheets for theme typography. No user data is included in these requests.

## Third-Party Services

Ekagra does not integrate with any third-party services, APIs, or analytics platforms.

## Permissions

| Permission | Purpose |
|---|---|
| `storage` | Save timer state, settings, and stats locally on your device |
| `alarms` | Trigger session-complete events when the popup is closed |
| `notifications` | Show desktop notifications when a session ends |
| `offscreen` | Play an audio chime when a session completes |

## Changes

If this privacy policy changes, the update will be posted here with a revised date.

## Contact

If you have questions about this privacy policy, please open an issue at [github.com/chintan-27/ekagra](https://github.com/chintan-27/ekagra/issues).
