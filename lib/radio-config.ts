/**
 * Public playback configuration. NEXT_PUBLIC_RADIO_STREAM_URL is intentionally
 * the single replacement point for the provider URL at build time. Use the
 * provider's stable redirect URL here; signed playback URLs are temporary.
 */
export const RADIO_CONFIG = {
  name: "Radio Live",
  streamUrl:
    process.env.NEXT_PUBLIC_RADIO_STREAM_URL ??
    "https://stream.surfernetwork.com/0eptqs75m5zuv",
  defaultVolume: 0.8,
} as const;
