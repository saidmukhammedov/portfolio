"use client";

import { useEffect, useRef, useState } from "react";
import { me, terminalAnswers, terminalFallback, terminalIntro } from "@/lib/content";

type Entry = { q: string; lines: string[] };

export function runCommand(raw: string): string[] {
  const input = raw.trim().toLowerCase();
  if (!input) return [];
  if (input === "clear") return ["__CLEAR__"];
  for (const a of terminalAnswers) {
    if (a.keys.some((k) => input.includes(k))) return a.lines;
  }
  return terminalFallback;
}

/** macOS Terminal oynasi — desktop modal va playground'da ishlatiladi */
export default function TerminalWindow({
  onClose,
  className = "",
  title,
}: {
  onClose?: () => void;
  className?: string;
  title?: string;
}) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [tick, setTick] = useState(0); // blur-reveal qayta o'ynashi uchun
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [entries, tick]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function submit() {
    if (!value.trim()) return;
    const lines = runCommand(value);
    if (lines[0] === "__CLEAR__") {
      setEntries([]);
      setValue("");
      return;
    }
    setEntries((e) => [...e, { q: value.trim(), lines }]);
    setTick((t) => t + 1);
    setValue("");
  }

  return (
    <div className={`flex h-full flex-col overflow-hidden rounded-xl bg-[#26262b] win-shadow ${className}`}>
      {/* Title bar */}
      <div className="flex h-9 shrink-0 items-center justify-center border-b border-black/40 bg-[#2e2e34] px-3">
        <div className="absolute left-3 flex gap-2">
          <button
            aria-label="Close"
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-[#f4605a] transition hover:brightness-110"
          />
          <span className="h-3 w-3 rounded-full bg-[#f9bd4e]" />
          <span className="h-3 w-3 rounded-full bg-[#35c94b]" />
        </div>
        <span className="font-mono text-[12px] text-white/60">
          {title ?? `${me.shellUser} — zsh — 80x24`}
        </span>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed" onClick={() => inputRef.current?.focus()}>
        <div className="text-white/40">{terminalIntro[0]}</div>
        <div className="mt-1 text-white/90">{terminalIntro[1]}</div>

        {entries.map((e, i) => (
          <div key={i} className="mt-3">
            <div>
              <span className="text-[#3fbf62]">{me.shellUser}</span>
              <span className="text-white/50"> ~ % </span>
              <span className="text-white/90">{e.q}</span>
            </div>
            <div key={tick + "-" + i} className="blur-reveal mt-1 whitespace-pre-wrap text-white/80">
              {e.lines.join("\n")}
            </div>
          </div>
        ))}

        <div className="mt-3 flex items-center">
          <span className="text-[#3fbf62]">{me.shellUser}</span>
          <span className="text-white/50">&nbsp;~ %&nbsp;</span>
          <span className="text-white/90">{value}</span>
          <span className="cursor-blink ml-0.5 inline-block h-4 w-[7px] bg-white/85" />
        </div>

        {/* Yashirin input — klaviatura ushlab turadi */}
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            e.stopPropagation();
          }}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          aria-label="Terminal input"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
