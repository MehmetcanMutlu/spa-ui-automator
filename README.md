# BBB Poll Observer (Research)

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![Status](https://img.shields.io/badge/Status-Experimental-orange)

`BBB Poll Observer` is an experimental Chrome content-script project for detecting active poll panels in BigBlueButton-like single-page applications (SPA) by monitoring dynamic DOM updates.

## Why this repo exists
- Demonstrates **MutationObserver-based UI detection** in real-time interfaces
- Shows how to isolate an **active panel** from stale/archived UI sections
- Provides a lightweight **local simulation page** for debugging (`son_test.html`)

## Project Structure
- `manifest.json`: Extension manifest (MV3)
- `content.js`: DOM observer and active poll panel logic
- `son_test.html`: Local scenario file for quick testing

## How it works
1. Watches DOM mutations continuously.
2. Searches for poll-related warning text patterns in visible UI.
3. Walks up the DOM tree to locate the active poll container.
4. Interacts only once per detected container via `data-bot-processed` guard.

## Local Setup
1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this repository folder
4. Open target page (or `son_test.html`) and inspect console logs

## Notes
- This repository is shared for **research/automation learning** purposes.
- UI text selectors are environment-specific and may require updates.
- For production-grade usage, add stronger selector strategy and telemetry.

## Roadmap
- Configurable selector patterns
- Better container disambiguation heuristics
- Optional dry-run mode (detect only, no interaction)

---
If you want, I can also prepare a cleaner public-facing version name and metadata in `manifest.json` so the extension title/description stays consistent with this README.
