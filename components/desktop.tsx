"use client";

import { useEffect, useState } from "react";
import { achievements, folders, links, me, press } from "@/lib/content";
import MusicWidget from "./music";
import { CalendarWidget, ClockWidget, WeatherWidget } from "./widgets";
import Dock, { CalendarTile, EChip } from "./dock";

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function MenuBar() {
  const now = useNow();
  const clock = now
    ? now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
      " " +
      now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    : "";
  return (
    <div className="absolute inset-x-0 top-0 z-40 flex h-11 items-center justify-between px-5 text-[13px]">
      <div className="flex items-center gap-3">
        <EChip size={26} />
        <span className="font-semibold">{me.fullName}</span>
        <span className="text-gray-400">{me.role}</span>
      </div>
      <div className="text-gray-500">{clock}</div>
    </div>
  );
}

function IconCluster({ onTerminal }: { onTerminal: () => void }) {
  const apps: { src: string; alt: string; href?: string; onClick?: () => void }[] = [
    { src: "/app-icons/notion.png", alt: "Notion", href: links.cv },
    { src: "/app-icons/cmux.png", alt: "cmux" },
    { src: "/app-icons/granola.png", alt: "Granola" },
    { src: "/app-icons/terminal.png", alt: "Terminal", onClick: onTerminal },
    { src: "/app-icons/claude.png", alt: "Ask Claude about me" },
    { src: "/app-icons/chatgpt.png", alt: "Ask ChatGPT about me" },
    { src: "/app-icons/linkedin.png", alt: "LinkedIn", href: links.linkedin },
    { src: "/app-icons/gmail.png", alt: "Gmail", href: `mailto:${me.email}` },
    { src: "/app-icons/calendar.png", alt: "Calendar", href: links.booking },
    { src: "/app-icons/x.png", alt: "X", href: links.x },
  ];
  return (
    <div className="grid w-fit grid-cols-5 gap-2.5 rounded-2xl bg-white p-3 ring-1 ring-black/5 card-shadow">
      {apps.map((a, i) =>
        a.href ? (
          <a key={i} href={a.href} target="_blank" rel="noreferrer" aria-label={a.alt}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.src} alt={a.alt} className="h-10 w-10 rounded-[9px] transition hover:scale-110" />
          </a>
        ) : (
          <button key={i} onClick={a.onClick} aria-label={a.alt} className="cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.src} alt={a.alt} className="h-10 w-10 rounded-[9px] transition hover:scale-110" />
          </button>
        )
      )}
    </div>
  );
}

/** macOS uslubidagi desktop (hero) */
export default function Desktop({ onTerminal }: { onTerminal: () => void }) {
  return (
    <section className="relative h-screen min-h-[760px] w-full overflow-hidden bg-gradient-to-b from-[#f2f2f4] via-[#f7f7f8] to-white">
      <MenuBar />

      {/* Chap ustun vidjetlar */}
      <div className="absolute left-6 top-[90px] flex gap-5">
        <ClockWidget />
        <CalendarWidget />
      </div>
      <div className="absolute left-6 top-[265px]">
        <WeatherWidget />
      </div>
      <div className="absolute left-6 top-[405px] h-[150px] w-[150px] overflow-hidden rounded-xl card-shadow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={me.photo} alt="Me and my dog" className="h-full w-full object-cover" />
      </div>

      {/* Musiqa vidjeti */}
      <div className="absolute left-[364px] top-[90px] hidden xl:block">
        <MusicWidget />
      </div>

      {/* O'ng papkalar */}
      <div className="absolute right-10 top-[90px] flex flex-col gap-6">
        {folders.map((f) => (
          <a key={f.label} href={f.href} className="group flex w-[76px] flex-col items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/folder.png" alt="" className="h-[52px] w-[56px] object-contain transition group-hover:scale-105" />
            <span className="rounded-md bg-white/70 px-1.5 py-0.5 text-center text-[12px] font-medium leading-tight text-gray-800 group-hover:bg-white">
              {f.label}
            </span>
          </a>
        ))}
      </div>

      {/* Ikonkalar klasteri */}
      <div className="absolute bottom-[100px] right-10 hidden lg:block">
        <IconCluster onTerminal={onTerminal} />
      </div>

      {/* Hero matn */}
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-6 text-center">
        <h1 className="text-[46px] font-extrabold leading-[1.15] tracking-tight md:text-[54px]">
          {me.heroLine1}
          <br />
          {me.heroLine2Pre}
          <a href={me.company.url} target="_blank" rel="noreferrer" className="underline decoration-gray-300 decoration-[6px] underline-offset-[10px] transition hover:decoration-gray-400">
            {me.heroLine2Link}
          </a>
          .
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-gray-500">{me.heroSub}</p>
      </div>

      <Dock />
    </section>
  );
}

export { CalendarTile };
