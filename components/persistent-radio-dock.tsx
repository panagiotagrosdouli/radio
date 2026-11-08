"use client";

import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { useRadioPlayer } from "@/hooks/use-radio-player";
import { RadioLiveMark } from "@/components/radio-live-mark";
import { sitePath } from "@/lib/site-path";

export function PersistentRadioDock() {
  const { status, toggle } = useRadioPlayer();
  const isPlaying = status === "playing";
  const isBusy = status === "connecting" || status === "reconnecting";

  return (
    <aside className={`radio-dock${isPlaying ? " is-playing" : ""}`} aria-label="Radio Live player">
      <div className="radio-dock-station">
        <span className="radio-dock-mark"><RadioLiveMark /></span>
        <span className="radio-dock-name"><strong>RADIO LIVE</strong><small>From Athens · no ads</small></span>
      </div>
      <span className="radio-dock-signal" role="status" aria-live="polite"><i />{isPlaying ? "YOU’RE LIVE" : "LIVE RADIO · 24/7"}</span>
      <button className="radio-dock-control" type="button" onClick={toggle} disabled={isBusy} aria-label={isPlaying ? "Pause Radio Live" : "Play Radio Live"}>
        {isBusy ? <span className="dock-spinner" aria-hidden="true" /> : isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
      </button>
      <Link className="radio-dock-full" href={sitePath("/#live")}>Full player <ArrowUpRight aria-hidden="true" /></Link>
    </aside>
  );
}
