import type { Block } from "@/lib/case-studies";
import { me } from "@/lib/content";

const pillColors: Record<string, string> = {
  blue: "bg-[#57a4f0] text-white",
  purple: "bg-[#a855f7] text-white",
  green: "bg-[#1fb84a] text-white",
  gray: "bg-white text-gray-700 ring-1 ring-gray-200",
};

export function RichP({ html }: { html: string }) {
  return <p className="text-[16px] leading-relaxed text-gray-800" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Chart() {
  const weeks = ["Jun 08", "Jun 15", "Jun 22", "Jun 29", "Jul 06", "Jul 13", "Jul 20", "Jul 27", "Aug 03", "Aug 10"];
  const merged = [8, 28, 18, 14, 24, 24, 40, 42, 34, 44];
  const opened = [10, 32, 22, 17, 27, 27, 44, 46, 38, 48];
  const acc = [65, 72, 54, 60, 70, 72, 88, 92, 90, 95];
  const max = Math.max(...opened);
  const pt = (v: number, i: number) => `${(i / (weeks.length - 1)) * 100},${100 - (v / 100) * 90}`;
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 card-shadow">
      <div className="relative h-44">
        <div className="absolute inset-0 flex items-end gap-[6px]">
          {weeks.map((w, i) => (
            <div key={w} className="flex flex-1 flex-col items-center justify-end gap-0">
              <div className="relative flex w-full flex-col justify-end" style={{ height: `${(opened[i] / max) * 100}%` }}>
                <div className="absolute inset-0 rounded-t bg-[#cfe4fb]" />
                <div className="relative w-full rounded-t bg-[#57a4f0]" style={{ height: `${(merged[i] / opened[i]) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          <polyline points={acc.map((v, i) => pt(v, i)).join(" ")} fill="none" stroke="#1d1e26" strokeWidth="0.7" />
          {acc.map((v, i) => (
            <circle key={i} cx={(i / (weeks.length - 1)) * 100} cy={100 - (v / 100) * 90} r="0.9" fill="#1d1e26" />
          ))}
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-gray-400">
        {weeks.map((w) => <span key={w}>{w}</span>)}
      </div>
      <div className="mt-3 flex items-center gap-5 text-[11px] text-gray-500">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#cfe4fb]" /> opened</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#57a4f0]" /> merged</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-black" /> acceptance %</span>
      </div>
    </div>
  );
}

export function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "p":
      return <RichP html={b.html} />;
    case "stats3":
      return (
        <div className="grid grid-cols-1 gap-3 rounded-xl bg-[#fafafb] p-4 ring-1 ring-gray-100 sm:grid-cols-3">
          {b.items.map((s, i) => (
            <div key={i} className="rounded-lg bg-white p-4 ring-1 ring-gray-100 card-shadow">
              <div className="text-[14px] font-bold">{s.t}</div>
              <div className="mt-0.5 text-[13px] leading-snug text-gray-500">{s.d}</div>
            </div>
          ))}
        </div>
      );
    case "thennow":
      return (
        <div className="grid gap-3 rounded-xl bg-[#fafafb] p-4 ring-1 ring-gray-100 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-4 ring-1 ring-gray-100">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">{b.thenT}</div>
            <div className="mt-1.5 text-[14px] leading-snug text-gray-700">{b.thenD}</div>
          </div>
          <div className="rounded-lg bg-[#eef5fe] p-4 ring-1 ring-[#cfe3fa]">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2e7cf6]">{b.nowT}</div>
            <div className="mt-1.5 text-[14px] leading-snug text-gray-700">{b.nowD}</div>
          </div>
        </div>
      );
    case "stats6":
      return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 rounded-xl bg-[#fafafb] p-6 ring-1 ring-gray-100 sm:grid-cols-3">
          {b.items.map((s, i) => (
            <div key={i}>
              <div className="text-[24px] font-extrabold tracking-tight">{s.v}</div>
              <div className="mt-0.5 text-[13px] leading-snug text-gray-500">{s.d}</div>
            </div>
          ))}
        </div>
      );
    case "chart":
      return <Chart />;
    case "quote":
      return (
        <div className="rounded-xl bg-[#fafafb] p-6 text-center ring-1 ring-gray-100">
          <div className="text-[17px] font-bold leading-snug">{b.text}</div>
          <div className="mt-1.5 text-[12px] text-gray-400">{b.sub}</div>
        </div>
      );
    case "flow":
      return (
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-[#fafafb] px-4 py-5 ring-1 ring-gray-100">
          {b.items.map((f, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className={`rounded-full px-3.5 py-1.5 text-[13px] font-bold ${pillColors[f.color]}`}>{f.label}</span>
              {i < b.items.length - 1 && <span className="text-gray-300">→</span>}
            </span>
          ))}
        </div>
      );
    case "flowStack":
      return (
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-[#fafafb] px-4 py-5 ring-1 ring-gray-100">
          <span className="flex flex-col items-center gap-1.5">
            {b.top.map((f, i) => (
              <span key={i} className={`rounded-full px-3.5 py-1.5 text-[13px] font-bold ${pillColors[f.color]}`}>{f.label}</span>
            ))}
          </span>
          <span className="text-gray-300">→</span>
          {b.rest.map((r, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-bold text-gray-700 ring-1 ring-gray-200">{r}</span>
              {i < b.rest.length && <span className="text-gray-300">→</span>}
            </span>
          ))}
          <span className="rounded-full bg-[#1fb84a] px-3.5 py-1.5 text-[13px] font-bold text-white">Board</span>
        </div>
      );
    case "receipt":
      return (
        <div className="overflow-hidden rounded-xl ring-1 ring-gray-100">
          <div className="flex items-center gap-3 bg-[#fafafb] px-5 py-3">
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold text-white ${b.status === "Merged" ? "bg-[#1fb84a]" : "bg-[#f92d50]"}`}>
              {b.status}
            </span>
            <span className="font-mono text-[12px] text-gray-400">{b.num}</span>
          </div>
          <div className="space-y-3 bg-white px-5 py-4">
            <div className="text-[14px] font-bold">{b.title}</div>
            {b.body && <div className="rounded-lg bg-[#fafafb] p-3.5 text-[14px] leading-relaxed text-gray-600">{b.body}</div>}
            {b.extra?.map((e, i) => (
              <div key={i} className={`rounded-lg p-3.5 text-[14px] leading-relaxed ${e.tone === "blue" ? "bg-[#eef5fe] text-gray-700" : "bg-[#fafafb] text-gray-600"}`}>
                <strong>{e.who}</strong> {e.text}
              </div>
            ))}
          </div>
        </div>
      );
    case "numbered":
      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {b.items.map((n, i) => (
            <div key={i} className="rounded-xl bg-[#fafafb] p-4 text-center ring-1 ring-gray-100">
              <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-white text-[13px] font-extrabold ring-1 ring-gray-200">{n.n}</div>
              <div className="mt-2 text-[14px] font-bold">{n.t}</div>
              <div className="mt-0.5 text-[12px] leading-snug text-gray-500">{n.d}</div>
            </div>
          ))}
        </div>
      );
  }
}

export function Avatar({ size = 32 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-lg bg-white font-clepto text-black ring-1 ring-black/10"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      Ɛ
    </span>
  );
}

export { me };
