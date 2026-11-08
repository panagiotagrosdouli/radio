"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RADIO_CONFIG } from "@/lib/radio-config";

export type StreamStatus =
  | "idle"
  | "connecting"
  | "buffering"
  | "playing"
  | "paused"
  | "reconnecting"
  | "unavailable";

const VOLUME_KEY = "radio-live-volume";
const CONNECT_TIMEOUT_MS = 12_000;
const MAX_RETRIES = 2;

export function useRadioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const wantsPlayback = useRef(false);
  const operationId = useRef(0);
  const retryCount = useRef(0);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const connectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousVolume = useRef(RADIO_CONFIG.defaultVolume);
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [volume, setVolumeState] = useState<number>(RADIO_CONFIG.defaultVolume);

  const clearTimers = useCallback(() => {
    if (retryTimer.current) clearTimeout(retryTimer.current);
    if (connectTimer.current) clearTimeout(connectTimer.current);
    retryTimer.current = null;
    connectTimer.current = null;
  }, []);

  const syncMediaSession = useCallback((next: StreamStatus) => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.playbackState =
      next === "playing" ? "playing" : next === "paused" || next === "idle" ? "paused" : "none";
  }, []);

  const markStatus = useCallback((next: StreamStatus) => {
    setStatus(next);
    syncMediaSession(next);
  }, [syncMediaSession]);

  const attemptPlayback = useCallback(async (reconnect = false) => {
    const audio = audioRef.current;
    if (!audio || !wantsPlayback.current) return;
    const currentOperation = ++operationId.current;
    clearTimers();
    markStatus(reconnect ? "reconnecting" : "connecting");
    audio.src = RADIO_CONFIG.streamUrl;
    audio.load();

    connectTimer.current = setTimeout(() => {
      if (currentOperation !== operationId.current || !wantsPlayback.current) return;
      audio.pause();
      markStatus("unavailable");
    }, CONNECT_TIMEOUT_MS);

    try {
      await audio.play();
    } catch (error) {
      if (currentOperation !== operationId.current) return;
      clearTimers();
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        wantsPlayback.current = false;
        markStatus("paused");
      } else {
        markStatus("unavailable");
      }
    }
  }, [clearTimers, markStatus]);

  const scheduleReconnect = useCallback(() => {
    if (!wantsPlayback.current) return;
    clearTimers();
    if (retryCount.current >= MAX_RETRIES) {
      markStatus("unavailable");
      return;
    }
    retryCount.current += 1;
    markStatus("reconnecting");
    retryTimer.current = setTimeout(() => attemptPlayback(true), retryCount.current * 1600);
  }, [attemptPlayback, clearTimers, markStatus]);

  const play = useCallback(() => {
    if (status === "connecting" || status === "reconnecting") return;
    wantsPlayback.current = true;
    retryCount.current = 0;
    void attemptPlayback(false);
  }, [attemptPlayback, status]);

  const pause = useCallback(() => {
    wantsPlayback.current = false;
    ++operationId.current;
    clearTimers();
    audioRef.current?.pause();
    markStatus("paused");
  }, [clearTimers, markStatus]);

  const toggle = useCallback(() => {
    if (status === "playing" || status === "buffering") pause();
    else play();
  }, [pause, play, status]);

  const retry = useCallback(() => {
    wantsPlayback.current = true;
    retryCount.current = 0;
    void attemptPlayback(false);
  }, [attemptPlayback]);

  const setVolume = useCallback((next: number) => {
    const normalized = Math.min(1, Math.max(0, next));
    const audio = audioRef.current;
    if (audio) {
      audio.volume = normalized;
      audio.muted = normalized === 0;
    }
    if (normalized > 0) previousVolume.current = normalized;
    setVolumeState(normalized);
    localStorage.setItem(VOLUME_KEY, String(normalized));
  }, []);

  const toggleMute = useCallback(() => {
    setVolume(volume === 0 ? previousVolume.current || RADIO_CONFIG.defaultVolume : 0);
  }, [setVolume, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const activeOperation = operationId;
    const saved = Number(localStorage.getItem(VOLUME_KEY));
    const initial = Number.isFinite(saved) && saved >= 0 && saved <= 1 ? saved : RADIO_CONFIG.defaultVolume;
    audio.volume = initial;
    audio.muted = initial === 0;
    setVolumeState(initial);
    if (initial > 0) previousVolume.current = initial;

    const onOnline = () => {
      if (wantsPlayback.current) retry();
    };
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("online", onOnline);
      wantsPlayback.current = false;
      activeOperation.current += 1;
      clearTimers();
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, [clearTimers, retry]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: RADIO_CONFIG.name,
      artist: "Live radio",
    });
    navigator.mediaSession.setActionHandler("play", play);
    navigator.mediaSession.setActionHandler("pause", pause);
    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
    };
  }, [pause, play]);

  return {
    audioRef,
    status,
    volume,
    toggle,
    retry,
    setVolume,
    toggleMute,
    handlers: {
      onPlaying: () => {
        clearTimers();
        retryCount.current = 0;
        markStatus("playing");
      },
      onWaiting: () => wantsPlayback.current && markStatus("buffering"),
      onStalled: scheduleReconnect,
      onError: scheduleReconnect,
      onPause: () => {
        if (!wantsPlayback.current) markStatus("paused");
      },
    },
  };
}
