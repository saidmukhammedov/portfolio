"use client";

import { useEffect, useState } from "react";
import { about, achievements, links, me, pillars, press, ventures } from "@/lib/content";
import { EChip } from "./dock";

/** Awwwards "W. Nominee" chap ribbon — scroll'dan keyin ko'rinadi */
export function NomineeRibbon() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 400);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  if (!show) return null;
  return (
    <a
      href="https://www.awwwards.com"
      target="_blank"
      rel="noreferrer"
      className="fade-up fixed left-0 top-[44%] z-40 flex w-9 flex-col items-center gap-2 bg-black py-4 text-white"
    >
      <span className="text-[15px] font-extrabold">W.</span>
      <span className="text-[10px] font-semibold tracking-[0.18em] [writing-mode:vertical-rl]">Nominee</span>
    </a>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="border-t border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <h2 className="text-[38px] font-extrabold tracking-tight">Achievements</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-5">
          {achievements.map((a, i) => {
            const tile = (
              <div className="group">
                <div className="flex h-[120px] items-center justify-center rounded-xl bg-[#f5f5f7] transition group-hover:bg-[#ededf0]">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-[26px] shadow-md"
                    style={{ background: `linear-gradient(135deg, ${a.g1}, ${a.g2})` }}
                  >
                    {a.icon}
                  </span>
                </div>
                <div className="mt-4 text-[15px] font-bold">{a.title}</div>
                <div className="mt-1 text-[14px] leading-snug text-gray-500">{a.desc}</div>
              </div>
            );
            return a.href ? (
              <a key={i} href={a.href} target="_blank" rel="noreferrer">{tile}</a>
            ) : (
              <div key={i}>{tile}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PressCard({ logo, title, url }: { logo?: string; title: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex w-[360px] shrink-0 flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 card-shadow transition hover:shadow-md"
    >
      {logo && (
        <div className="mb-3 h-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" className="h-full w-auto object-contain opacity-80" />
        </div>
      )}
      <div className="text-[15px] font-semibold leading-snug">{title}</div>
      <div className="mt-3 text-[13px] text-gray-400">
        Read the article <span aria-hidden>↗</span>
      </div>
    </a>
  );
}

export function PressMarquee() {
  if (!press.length) return null;
  const row1 = [...press, ...press, ...press];
  const row2 = [...press, ...press, ...press];
  return (
    <section className="overflow-hidden bg-white pb-20">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <h2 className="text-[38px] font-extrabold tracking-tight">In the press</h2>
      </div>
      <div className="marquee-pause mt-8 space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-5 animate-marquee">
          {row1.map((p, i) => <PressCard key={i} {...p} />)}
        </div>
        <div className="flex w-max gap-5 animate-marquee-r">
          {row2.map((p, i) => <PressCard key={i} title={p.title} url={p.url} />)}
        </div>
      </div>
    </section>
  );
}

export function PillarStack() {
  return (
    <section id="pillar-stack" className="bg-[#f0f0f2] py-10">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        {pillars.map((p, i) => (
          <div key={i} className="mb-10">
            {/* Papka tab'i */}
            <div className="relative inline-flex items-center">
              <div className="h-[46px] rounded-t-[18px] bg-gradient-to-b from-[#e4e4e8] to-[#dcdce0] pl-6 pr-14">
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-gray-500">{p.tab}</span>
              </div>
              <div className="absolute left-full top-0 h-[46px] w-[420px] rounded-tr-[18px] bg-gradient-to-b from-[#e4e4e8] to-[#dcdce0] [clip-path:polygon(0_100%,0_35%,6%_0,100%_0,100%_100%)] md:w-[560px]" />
            </div>
            {/* Kontent kartasi */}
            <div className="grid items-center gap-10 rounded-[18px] bg-gradient-to-b from-[#ececef] to-white p-8 md:grid-cols-2 md:p-14">
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray-400">{p.no}</div>
                <h2 className="mt-2 text-[32px] font-extrabold leading-[1.15] tracking-tight md:text-[36px]">{p.heading}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-500">{p.desc}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {p.buttons.map((b) => (
                    <a
                      key={b.label}
                      href={b.href}
                      className="rounded-full bg-[#57a4f0] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[#3f97ee]"
                    >
                      {b.label} <span aria-hidden>→</span>
                    </a>
                  ))}
                </div>
              </div>
              {/* Sticky note */}
              <div className="justify-self-center w-full max-w-[536px]">
                <div className="rounded-xl card-shadow">
                  <div className="h-6 rounded-t-xl bg-gradient-to-b from-[#f3d264] to-[#e3c23c]" />
                  <div className="space-y-4 bg-white rounded-b-xl px-6 py-5">
                    {p.note.map((n, j) => (
                      <div key={j}>
                        <div className="text-[15px] font-bold">{n.t}</div>
                        <div className="text-[14px] text-gray-500">{n.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Ventures() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <h2 className="text-[38px] font-extrabold tracking-tight">Venture studio & portfolio work</h2>
        <p className="mt-1 text-[15px] text-gray-500">Work spanning 2019 to 2024</p>
        <div className="mt-8">
          {ventures.map((v, i) => (
            <div key={i} className="grid gap-1 border-t border-gray-100 py-6 md:grid-cols-2 md:items-center">
              <div className="text-[16px] font-bold">{v.name}</div>
              <div className="text-[15px] leading-snug text-gray-500 md:text-right">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlaygroundCta() {
  return (
    <section className="bg-white py-24 text-center">
      <a href="/playground" className="group inline-flex flex-col items-center">
        <div className="flex items-center gap-5">
          <span className="text-[56px] font-extrabold tracking-tight md:text-[64px]">The</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/folder.png" alt="" className="h-[110px] w-[110px] object-contain transition group-hover:scale-105" />
          <span className="text-[56px] font-extrabold tracking-tight md:text-[64px]">Playground</span>
        </div>
        <p className="mt-4 text-[15px] text-gray-500">My personal gallery. Random stuff I've done and things I like.</p>
      </a>
    </section>
  );
}

export function AboutWindow() {
  const [open, setOpen] = useState(false);
  return (
    <section id="about" className="bg-white pb-24">
      <div className="mx-auto max-w-[1000px] px-6">
        <div className="overflow-hidden rounded-xl border border-gray-200/70 card-shadow">
          <div className="relative flex h-9 items-center justify-center border-b border-gray-100 bg-[#f5f5f7]">
            <div className="absolute left-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#f4605a]" />
              <span className="h-3 w-3 rounded-full bg-[#f9bd4e]" />
              <span className="h-3 w-3 rounded-full bg-[#35c94b]" />
            </div>
            <span className="text-[13px] text-gray-600">about-me.txt</span>
          </div>
          <div className="grid gap-10 px-8 py-10 md:grid-cols-2 md:px-14">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray-400">Then</div>
              <p className="mt-3 text-[15px] leading-relaxed text-gray-700">{about.then}</p>
            </div>
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray-400">Now</div>
              <p className="mt-3 text-[15px] leading-relaxed text-gray-700">{about.now}</p>
              <button
                onClick={() => setOpen(!open)}
                className="mt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-gray-500 transition hover:text-gray-800"
              >
                The future {open ? "×" : "+"}
              </button>
              {open && <p className="fade-up mt-3 text-[15px] leading-relaxed text-gray-700">{about.future}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-gray-100 bg-white py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_auto_auto] md:px-16">
        <div>
          <div className="flex items-center gap-3">
            <EChip size={40} />
            <div>
              <div className="text-[17px] font-bold">{me.fullName}.</div>
              <div className="text-[14px] text-gray-500">{me.tagline}</div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            {[
              { src: "/app-icons/linkedin.png", href: links.linkedin, alt: "LinkedIn" },
              { src: "/app-icons/x.png", href: links.x, alt: "X" },
              { src: "/app-icons/gmail.png", href: `mailto:${me.email}`, alt: "Gmail" },
              { src: "/app-icons/claude.png", href: "#", alt: "Claude" },
              { src: "/app-icons/chatgpt.png", href: "#", alt: "ChatGPT" },
              { src: "/app-icons/notion.png", href: links.cv, alt: "Notion CV" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.alt}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} className="h-9 w-9 rounded-lg transition hover:scale-110" />
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-3 text-[15px]">
          {[
            { label: "Email", href: `mailto:${me.email}` },
            { label: "LinkedIn", href: links.linkedin },
            { label: "X", href: links.x },
            { label: "Book a meeting", href: links.booking },
            { label: "CV", href: links.cv },
          ].map((l) => (
            <a key={l.label} href={l.href} className="group flex items-center gap-2 font-semibold transition hover:text-[#2e7cf6]">
              {l.label}
              <span className="text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#2e7cf6]">→</span>
            </a>
          ))}
        </div>
        <div className="md:text-right">
          <div className="flex gap-2 md:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/badges/cssda-special-kudos-yellow.svg" alt="CSSDA Special Kudos" className="h-12 w-12" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/badges/cssda-best-ui-purple.svg" alt="CSSDA Best UI" className="h-12 w-12" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/badges/cssda-best-ux-orange.svg" alt="CSSDA Best UX" className="h-12 w-12" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/badges/cssda-best-inn-green.svg" alt="CSSDA Best Innovation" className="h-12 w-12" />
          </div>
          <div className="mt-2 text-[12px] text-gray-400">CSS Design Awards, 2026</div>
          <div className="mt-3 text-[13px] text-gray-400">© {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
}
