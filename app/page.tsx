"use client";

import { useState } from "react";
import Desktop from "@/components/desktop";
import TerminalWindow from "@/components/terminal";
import {
  AboutWindow,
  Achievements,
  Footer,
  NomineeRibbon,
  PillarStack,
  PlaygroundCta,
  PressMarquee,
  Ventures,
} from "@/components/sections";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <NomineeRibbon />
      <Desktop onTerminal={() => setTerminalOpen(true)} />
      <Achievements />
      <PressMarquee />
      <PillarStack />
      <Ventures />
      <PlaygroundCta />
      <AboutWindow />
      <Footer />

      {terminalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="relative h-[440px] w-[640px] max-w-full">
            <TerminalWindow onClose={() => setTerminalOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}
