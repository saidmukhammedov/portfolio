"use client";

import { useEffect, useState } from "react";
import { me } from "@/lib/content";

/** Jonli analog soat vidjeti */
export function ClockWidget() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = now ? (now.getHours() % 12) + now.getMinutes() / 60 : 10.2;
  const m = now ? now.getMinutes() + now.getSeconds() / 60 : 8;
  const s = now ? now.getSeconds() : 42;
  const hand = (angle: number, len: number, w: number, color: string, round = true) => (
    <line
      x1="76" y1="76"
      x2={76 + len * Math.sin((angle * Math.PI) / 180)}
      y2={76 - len * Math.cos((angle * Math.PI) / 180)}
      stroke={color} strokeWidth={w} strokeLinecap={round ? "round" : "butt"}
    />
  );

  return (
    <div className="flex h-[142px] w-[152px] flex-col items-center justify-between rounded-2xl bg-white py-3 card-shadow">
      <div className="text-[10px] font-semibold tracking-[0.12em] text-gray-500">{me.clockCity}</div>
      <svg width="106" height="106" viewBox="0 0 152 152">
        {/* soat belgilari */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = 76 + 62 * Math.sin(a), y1 = 76 - 62 * Math.cos(a);
          const x2 = 76 + 56 * Math.sin(a), y2 = 76 - 56 * Math.cos(a);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" />;
        })}
        {hand(h * 30, 34, 5, "#111")}
        {hand(m * 6, 48, 4, "#111")}
        {hand(s * 6, 52, 1.6, "#f97316")}
        <circle cx="76" cy="76" r="4" fill="#111" />
      </svg>
      <span />
    </div>
  );
}

function weekday(n: number) { return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][n]; }

/** Kalendar vidjeti — joriy oy, bugun belgilangan */
export function CalendarWidget() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);
  if (!now) return <div className="h-[142px] w-[150px] rounded-2xl bg-white card-shadow" />;

  const y = now.getFullYear(), mo = now.getMonth(), today = now.getDate();
  const first = new Date(y, mo, 1).getDay(); // 0=Sun
  const days = new Date(y, mo + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: first }, () => null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="h-[142px] w-[150px] rounded-2xl bg-white px-3 py-2.5 card-shadow">
      <div className="text-[10px] font-bold uppercase tracking-wide text-[#f92d50]">{weekday(now.getDay())}</div>
      <div className="-mt-0.5 text-[26px] font-extrabold leading-tight">{today}</div>
      <div className="mt-0.5 grid grid-cols-7 gap-y-[1px] text-center text-[8.5px] leading-[13px] text-gray-400">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="font-semibold">{d}</span>
        ))}
        {cells.map((c, i) => (
          <span key={i} className={c === today ? "mx-auto flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#1d1e26] font-bold text-white" : ""}>
            {c ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Ob-havo vidjeti (statik) */
export function WeatherWidget() {
  return (
    <div className="w-[320px] rounded-2xl bg-white p-4 card-shadow">
      <div className="text-[14px] font-semibold">{me.weatherCity}</div>
      <div className="mt-2 flex justify-between">
        {me.weather.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="text-[11px] text-gray-500">{d.day}</span>
            <span className="text-[15px]">{d.icon}</span>
            <span className="text-[11px] text-gray-500">{d.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
