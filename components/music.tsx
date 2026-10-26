"use client";

import { useEffect, useRef, useState } from "react";
import { me } from "@/lib/content";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${ss.toString().padStart(2, "0")}`;
}

/** Musiqa player vidjeti — haqiqiy iTunes preview bilan */
export default function MusicWidget() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(30);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setT(a.currentTime);
    const onMeta = () => setDur(a.duration || 30);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  function skip(d: number) {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.duration || 30, a.currentTime + d));
  }

  const remaining = Math.max(0, dur - t);

  return (
    <div className="w-[320px] rounded-2xl bg-white p-4 card-shadow">
      <audio ref={audioRef} src={me.song.audioUrl} preload="metadata" />
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={me.song.cover} alt={`${me.song.title} album cover`} className="h-[68px] w-[68px] rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-bold">{me.song.title}</div>
          <div className="truncate text-[13px] text-gray-500">{me.song.artist}</div>
          <div className="mt-2 flex items-center justify-center gap-5">
            <button aria-label="Back 10 seconds" onClick={() => skip(-10)} className="text-gray-800 transition hover:opacity-60">
              <svg width="15" height="14" viewBox="0 0 15 14" fill="currentColor"><path d="M2 1v12M13.5 1.8 6 7l7.5 5.2V1.8Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button aria-label={playing ? "Pause" : "Play"} onClick={toggle} className="transition hover:opacity-60">
              {playing ? (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><rect x="1" y="1" width="4" height="14" rx="1"/><rect x="9" y="1" width="4" height="14" rx="1"/></svg>
              ) : (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M2 1.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 2 1.5Z"/></svg>
              )}
            </button>
            <button aria-label="Forward 10 seconds" onClick={() => skip(10)} className="text-gray-800 transition hover:opacity-60">
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 1v12M1.5 1.8 9 7l-7.5 5.2V1.8Z"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
        <span>{fmt(t)}</span>
        <span>-{fmt(remaining)}</span>
      </div>
      <div className="mt-1 h-[2px] w-full rounded bg-gray-200">
        <div className="h-full rounded bg-gray-400 transition-all" style={{ width: `${dur ? (t / dur) * 100 : 0}%` }} />
      </div>
    </div>
  );
}
