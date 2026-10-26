"use client";

import { useEffect, useState } from "react";
import { me } from "@/lib/content";

function todayParts() {
  const d = new Date();
  return {
    wd: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][d.getDay()],
    day: d.getDate(),
  };
}

function EChip({ size = 40, href }: { size?: number; href?: string }) {
  const inner = (
    <span
      className="flex items-center justify-center rounded-[10px] bg-white font-clepto text-black shadow-sm ring-1 ring-black/5 transition hover:scale-110"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {me.monogram}
    </span>
  );
  return href ? <a href={href} aria-label="Home">{inner}</a> : inner;
}

function Tile({
  bg, children, size = 40, href, label,
}: { bg: string; children: React.ReactNode; size?: number; href?: string; label: string }) {
  const inner = (
    <span
      className="flex items-center justify-center rounded-[10px] text-white shadow-sm transition hover:scale-110"
      style={{ width: size, height: size, background: bg }}
    >
      {children}
    </span>
  );
  return href ? <a href={href} aria-label={label}>{inner}</a> : <span aria-label={label}>{inner}</span>;
}

function CalendarTile({ href, size = 40 }: { href?: string; size?: number }) {
  const { wd, day } = todayParts();
  const inner = (
    <span
      className="flex flex-col items-center justify-center rounded-[10px] bg-white leading-none shadow-sm transition hover:scale-110"
      style={{ width: size, height: size }}
    >
      <span className="text-[8px] font-bold text-[#f92d50]">{wd}</span>
      <span className="text-[16px] font-extrabold">{day}</span>
    </span>
  );
  return href ? <a href={href} aria-label="Book a meeting">{inner}</a> : inner;
}

/** Dock — hero'da pastda, scroll'da tepaga o'tadi */
export default function Dock() {
  const [top, setTop] = useState(false);
  useEffect(() => {
    const f = () => setTop(window.scrollY > window.innerHeight * 0.5);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <div
      className={`fixed left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-white/90 p-2 ring-1 ring-black/5 backdrop-blur-md transition-all duration-500 ${
        top ? "top-4" : "bottom-6"
      }`}
    >
      <EChip href="/" />
      <span className="mx-0.5 h-8 w-px bg-gray-200" />
      <Tile bg="linear-gradient(180deg,#8ec4f8,#57a4f0)" href="/#pillar-stack" label="Work">
        <svg width="20" height="17" viewBox="0 0 22 18" fill="#fff"><path d="M1.5 3.5A1.5 1.5 0 0 1 3 2h5.2c.4 0 .8.16 1.06.44L10.5 3.7H19a1.5 1.5 0 0 1 1.5 1.5v9.3A1.5 1.5 0 0 1 19 16H3a1.5 1.5 0 0 1-1.5-1.5v-11Z"/></svg>
      </Tile>
      <Tile bg="linear-gradient(135deg,#b06af8,#8b3df6)" href="/#achievements" label="Achievements">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5 12 7l5.5.2-4.3 3.4 1.6 5.3L10 12.8l-4.8 3.1 1.6-5.3L2.5 7.2 8 7l2-5.5Z"/></svg>
      </Tile>
      <Tile bg="linear-gradient(135deg,#fb5e7d,#f92d50)" href="/#about" label="About">
        <svg width="18" height="17" viewBox="0 0 20 18" fill="currentColor"><path d="M10 17.2 2.6 9.9A4.7 4.7 0 0 1 9.4 3.2l.6.6.6-.6a4.7 4.7 0 1 1 6.8 6.7L10 17.2Z"/></svg>
      </Tile>
      <CalendarTile href="/#contact" />
      <Tile bg="linear-gradient(135deg,#3ddc6a,#1fb84a)" href="/#contact" label="Contact" size={52}>
        <span className="font-mono text-[15px] font-bold">&gt;_</span>
      </Tile>
    </div>
  );
}

export { EChip, CalendarTile };
