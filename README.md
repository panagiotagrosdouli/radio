# Radio Live

Radio Live is a digital radio station broadcasting from Athens. Its website pairs a live stream with an editorial identity, a daily show line-up, and a music desk for listeners who want to keep discovering.

**Station line:** We’ve got rhythm. No ads. Your radio. All day. Every day. Everywhere.

## Experience

- Responsive, English-language station website
- Live stream player with play, pause, volume, mute, reconnect, and accessible status updates
- Daily show line-up with the current Athens-time show highlighted
- Sound Desk links for music news and artist coverage
- About page, installable web app manifest, and Radio Live visual identity

## Run locally

Requires Node.js `>=22.13.0`.

```sh
npm ci
npm run dev
```

The live player uses the station stream URL in `lib/radio-config.ts`. To use a different public stream, set `NEXT_PUBLIC_RADIO_STREAM_URL` at build time.

## Validate and build

```sh
npm test
npm run build
```

The project uses Vinext and the Sites build integration in `build/sites-vite-plugin.ts`. `.openai/hosting.json` keeps the existing Radio Live Site project identity.
