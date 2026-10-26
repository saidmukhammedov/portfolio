"use client";

import { useRef, useState } from "react";
import TerminalWindow from "@/components/terminal";
import Dock from "@/components/dock";
import { playground } from "@/lib/content";

type Pos = { x: number; y: number };

function useDrag(onStart?: () => void) {
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  function down(e: React.PointerEvent) {
    onStart?.();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
  }
  function move(e: React.PointerEvent) {
    if (!drag.current) return;
    setPos({ x: drag.current.ox + (e.clientX - drag.current.sx), y: drag.current.oy + (e.clientY - drag.current.sy) });
  }
  function up() {
    drag.current = null;
  }
  return { pos, down, move, up, setPos };
}

export default function Playground() {
  // Board pan
  const board = useDrag();
  // Ob'ekt pozitsiyalari (board koordinatasida)
  const sticky = useDrag();
  const term = useDrag();

  const [z, setZ] = useState<"sticky" | "term">("term");

  return (
    <main className="flex min-h-screen flex-col bg-[#efeff1]">
      <Dock />

      {/* Sarlavha */}
      <div className="pt-32 text-center">
        <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gray-400">Playground</div>
        <h1 className="mt-3 text-[40px] font-extrabold tracking-tight">{playground.heading}</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-gray-500">{playground.sub}</p>
      </div>

      {/* Kanvas */}
      <div
        className="dotgrid relative mx-6 mt-10 flex-1 cursor-grab overflow-hidden rounded-2xl border border-gray-200/60 bg-[#f0f0f2] active:cursor-grabbing"
        style={{ minHeight: "58vh" }}
        onPointerDown={board.down}
        onPointerMove={board.move}
        onPointerUp={board.up}
      >
        <div className="absolute inset-0" style={{ transform: `translate(${board.pos.x}px, ${board.pos.y}px)` }}>
          {/* Sticky note */}
          <div
            className={`absolute left-[28%] top-[36%] w-56 -rotate-2 cursor-grab p-4 text-[14px] leading-snug shadow-[0_14px_28px_rgba(0,0,0,0.18)] active:cursor-grabbing ${z === "sticky" ? "" : ""}`}
            style={{ background: "linear-gradient(160deg,#f5d761,#eecb45)", zIndex: z === "sticky" ? 30 : 20 }}
            onPointerDown={(e) => { e.stopPropagation(); setZ("sticky"); sticky.down(e); }}
            onPointerMove={(e) => { e.stopPropagation(); sticky.move(e); }}
            onPointerUp={(e) => { e.stopPropagation(); sticky.up(); }}
          >
            {playground.sticky}
            <div className="mt-3 text-[12px] text-black/60">— {playground.stickySign}</div>
          </div>

          {/* Terminal oynasi */}
          <div
            className="absolute right-[6%] top-[8%] h-[380px] w-[500px] max-w-[85vw] cursor-grab active:cursor-grabbing"
            style={{ transform: `translate(${term.pos.x}px, ${term.pos.y}px)`, zIndex: z === "term" ? 30 : 20 }}
            onPointerDown={(e) => { e.stopPropagation(); setZ("term"); term.down(e); }}
            onPointerMove={(e) => { e.stopPropagation(); term.move(e); }}
            onPointerUp={(e) => { e.stopPropagation(); term.up(); }}
          >
            <TerminalWindow className="h-full w-full" />
          </div>
        </div>
      </div>

      <p className="py-6 text-center text-[12px] text-gray-400">{playground.hint}</p>
    </main>
  );
}
