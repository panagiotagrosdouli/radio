"use client";

import { Pause, Play, RefreshCw, Volume1, Volume2, VolumeX } from "lucide-react";
import { RADIO_CONFIG } from "@/lib/radio-config";
import { StreamStatus, useRadioPlayer } from "@/hooks/use-radio-player";
import { RadioLiveMark } from "@/components/radio-live-mark";

const STATUS: Record<StreamStatus, { label: string; detail: string }> = {
  idle: { label: "Ready when you are", detail: "Press play to tune in to Radio Live" },
  connecting: { label: "Finding the signal…", detail: "Connecting to the live stream" },
  buffering: { label: "Loading the sound…", detail: "Your broadcast will be with you shortly" },
  playing: { label: "You’re listening live", detail: "Welcome to Radio Live" },
  paused: { label: "On pause", detail: "Press play whenever you’re ready" },
  reconnecting: { label: "Finding the signal again…", detail: "Restoring your live stream" },
  unavailable: { label: "The signal is away", detail: "Give it a moment, then try again" },
};

function AudioVisualizer({ active }: { active: boolean }) {
  return (
    <div className={`visualizer ${active ? "is-active" : ""}`} aria-hidden="true">
      {Array.from({ length: 24 }).map((_, index) => (
        <span key={index} style={{ "--height": `${22 + ((index * 31) % 70)}%`, "--delay": `${(index % 8) * -0.1}s` } as React.CSSProperties} />
      ))}
    </div>
  );
}

export function RadioPlayer() {
  const { audioRef, status, volume, toggle, retry, setVolume, toggleMute, handlers } = useRadioPlayer();
  const isPlaying = status === "playing";
  const isBusy = status === "connecting" || status === "reconnecting";
  const statusCopy = STATUS[status];
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <section className="player-panel" aria-labelledby="station-name">
      <audio ref={audioRef} preload="none" {...handlers} />
      <div className="player-topline">
        <div className={`live-badge ${isPlaying ? "is-live" : ""}`}>
          <span className="live-dot" /> LIVE
        </div>
        <span className="signal-copy">24 HOURS · 7 DAYS · NO ADS</span>
      </div>

      <div className="player-layout">
        <div className="station-visual" aria-hidden="true">
          <div className="station-core"><RadioLiveMark /></div>
          <AudioVisualizer active={isPlaying} />
          <span className="station-visual-label">RADIO LIVE · ATHENS</span>
        </div>

        <div className="player-details">
          <div className="station-identity">
            <div className="station-emblem" aria-hidden="true"><RadioLiveMark /></div>
            <div>
              <p className="station-kicker">YOUR LIVE SIGNAL</p>
              <h2 id="station-name">{RADIO_CONFIG.name}</h2>
              <div className="stream-status" role="status" aria-live="polite">
                <strong>{statusCopy.label}</strong>
                <span>{statusCopy.detail}</span>
              </div>
            </div>
          </div>

          <div className="player-controls">
            <button
              className="primary-control"
              type="button"
              onClick={toggle}
              disabled={isBusy}
              aria-label={isPlaying ? "Pause live radio" : "Play live radio"}
            >
              {isBusy ? <span className="spinner" /> : isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
            </button>
            <div className="volume-group">
              <button className="icon-control" type="button" onClick={toggleMute} aria-label={volume === 0 ? "Unmute" : "Mute"}>
                <VolumeIcon />
              </button>
              <input aria-label={`Volume ${Math.round(volume * 100)}%`} type="range" min="0" max="1" step="0.05" value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                style={{ "--volume": `${volume * 100}%` } as React.CSSProperties}
              />
              <output aria-hidden="true">{Math.round(volume * 100)}%</output>
            </div>
          </div>

          {status === "unavailable" && (
            <div className="error-card" role="alert">
              <div><strong>We couldn’t find the signal.</strong><span>Check your connection and give it another try.</span></div>
              <button type="button" onClick={retry}><RefreshCw /> Try again</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
