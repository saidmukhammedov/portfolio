"use client";

import { useMemo, useRef, useState } from "react";
import type { CaseStudy, QA } from "@/lib/case-studies";
import { me } from "@/lib/content";
import { Avatar, BlockView, RichP } from "./case-blocks";

function Thought({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-[13px] text-gray-400 transition hover:text-gray-600">
      {label} <span className={`transition ${open ? "rotate-90" : ""}`}>›</span>
    </button>
  );
}

function Answer({ qa }: { qa: QA }) {
  const [more, setMore] = useState(false);
  return (
    <div className="fade-up flex gap-3">
      <Avatar />
      <div className="min-w-0 flex-1 space-y-4">
        <Thought label={qa.thought} />
        {qa.blocks.map((b, i) => (
          <BlockView key={i} b={b} />
        ))}
        {qa.more && (
          <button
            onClick={() => setMore(!more)}
            className="rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-gray-700 ring-1 ring-gray-200 transition hover:bg-gray-50"
          >
            Explain more {more ? "–" : "+"}
          </button>
        )}
        {more && qa.more && <RichP html={qa.more} />}
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="fade-up flex justify-end">
      <div className="max-w-[80%] rounded-2xl bg-[#f1f1f3] px-5 py-3 text-[16px] font-medium">{text}</div>
    </div>
  );
}

/** Chat tarixi: 'chat' — bosqichma-bosqich, 'full' — hammasi birdan */
function Conversation({ cs, mode, extraQs }: { cs: CaseStudy; mode: "chat" | "full"; extraQs: { q: string; a: string }[] }) {
  const [visible, setVisible] = useState(1); // intro + 1 savol
  const endRef = useRef<HTMLDivElement>(null);

  const shown = mode === "full" ? cs.qa.length : visible;

  return (
    <div className="space-y-8">
      {/* Intro xabar */}
      <div className="flex gap-3">
        <Avatar />
        <p className="max-w-[640px] text-[16px] leading-relaxed text-gray-800">{cs.intro}</p>
      </div>

      {cs.qa.slice(0, shown).map((qa, i) => (
        <div key={i} className="space-y-6">
          <UserBubble text={qa.q} />
          <Answer qa={qa} />
        </div>
      ))}

      {extraQs.map((x, i) => (
        <div key={"x" + i} className="space-y-6">
          <UserBubble text={x.q} />
          <div className="fade-up flex gap-3">
            <Avatar />
            <p className="max-w-[640px] text-[16px] leading-relaxed text-gray-800">{x.a}</p>
          </div>
        </div>
      ))}

      <div ref={endRef} />

      {mode === "chat" && shown < cs.qa.length && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setVisible((v) => Math.min(v + 1, cs.qa.length))}
            className="rounded-full bg-white px-6 py-2.5 text-[14px] font-bold ring-1 ring-gray-200 card-shadow transition hover:bg-gray-50"
          >
            Continue ↓
          </button>
        </div>
      )}
    </div>
  );
}

export default function CaseChat({ cs }: { cs: CaseStudy }) {
  const [mode, setMode] = useState<"intro" | "chat" | "full">("intro");
  const [input, setInput] = useState("");
  const [extraQs, setExtraQs] = useState<{ q: string; a: string }[]>([]);

  function ask() {
    const q = input.trim();
    if (!q) return;
    if (mode === "intro") {
      setMode("chat");
      setInput("");
      return;
    }
    if (mode === "chat") {
      const words = q.toLowerCase();
      const match = cs.qa.find((x) => x.q.toLowerCase().split(/\s+/).some((w) => w.length > 4 && words.includes(w)));
      const a = match
        ? match.blocks.filter((b) => b.type === "p").map((b) => (b as { html: string }).html.replace(/<[^>]+>/g, "")).join(" ")
        : "Good question — the scripted conversation carries the verified details. Keep scrolling, or try keywords like numbers, architecture, receipts.";
      setExtraQs((e) => [...e, { q, a }]);
      setInput("");
      setTimeout(() => window.scrollBy({ top: 300, behavior: "smooth" }), 100);
    }
  }

  return (
    <div className="mx-auto max-w-[720px] px-6 pb-24">
      {/* Hero */}
      <div className="pt-36 text-center">
        <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gray-400">Case study</div>
        <h1 className="mt-3 inline-flex items-center gap-3 text-[40px] font-extrabold tracking-tight">
          {cs.title}
          <span className="rounded-md bg-[#f1f1f3] px-2 py-1 font-mono text-[11px] font-medium text-gray-500">{cs.badge}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-gray-500">{cs.subtitle}</p>
      </div>

      {/* Sticky input — intro va chat rejimlarida ko'rinadi */}
      {mode !== "full" && (
        <div className="sticky top-24 z-20 mt-10">
          <div className="flex items-center gap-2 rounded-full bg-white py-2 pl-6 pr-2 ring-1 ring-gray-200 card-shadow">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask()}
              placeholder="Ask anything about this project"
              className="flex-1 bg-transparent text-[16px] outline-none placeholder:text-gray-300"
            />
            <button
              onClick={ask}
              aria-label="Send"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-800"
            >
              ↑
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-gray-400">
            The scripted part of this conversation carries the verified numbers. Live answers only use facts from this site.
          </p>
        </div>
      )}

      {mode === "intro" ? (
        /* Tanlov kartalari */
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          <button onClick={() => setMode("chat")} className="rounded-xl border border-[#cfe3fa] bg-[#f3f8fe] p-5 text-left transition hover:shadow-md">
            <div className="text-[15px] font-bold">Chat through it</div>
            <p className="mt-1 text-[14px] leading-snug text-gray-600">
              The story unfolds message by message. You decide when to continue, and you can ask your own questions anytime.
            </p>
          </button>
          <button onClick={() => setMode("full")} className="rounded-xl border border-gray-100 bg-[#fafafb] p-5 text-left transition hover:shadow-md">
            <div className="text-[15px] font-bold">Read the full case study</div>
            <p className="mt-1 text-[14px] leading-snug text-gray-600">
              Load the whole conversation at once and scroll it like an article.
            </p>
          </button>
        </div>
      ) : (
        <>
          <div className="mt-16" />
          <Conversation cs={cs} mode={mode} extraQs={extraQs} />
        </>
      )}

      {/* Pastki navigatsiya */}
      <div className="mt-20 flex items-center justify-between border-t border-gray-100 pt-6 text-[14px] font-semibold">
        <a href="/#pillar-stack" className="text-gray-500 transition hover:text-gray-800">← All case studies</a>
        <a href={cs.next.href} className="text-gray-800 transition hover:text-[#2e7cf6]">Next case study: {cs.next.label} →</a>
      </div>
    </div>
  );
}
