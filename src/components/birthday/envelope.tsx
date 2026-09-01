import { useEffect, useRef, useState } from "react";
import { Droplets } from "lucide-react";
import { Leaves } from "@/components/birthday/leaves";
import { Rain } from "@/components/birthday/rain";
import { Button } from "@/components/ui/button";
import { startMusic } from "@/lib/music-box";
import { cn } from "@/lib/utils";

export function Envelope({ onOpened }: { onOpened: () => void }) {
  const [phase, setPhase] = useState<"sealed" | "opening">("sealed");
  const openedRef = useRef(false);

  useEffect(() => {
    if (phase !== "opening") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(onOpened, reduced ? 80 : 1500);
    return () => window.clearTimeout(t);
  }, [phase, onOpened]);

  function open() {
    if (openedRef.current) return;
    openedRef.current = true;
    startMusic();
    setPhase("opening");
  }

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16">
      <img src="/images/forest.jpg" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-night/45" />
      <div className="absolute inset-0 bg-linear-to-b from-night/25 via-transparent to-night/55" />
      <Rain variant="light" />
      <Leaves />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <p className="font-display text-sm tracking-[0.32em] text-foam/80 uppercase">Eighteen</p>
        <h1 className="mt-3 font-sans text-5xl font-medium text-foam sm:text-6xl">あいら</h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-foam/80">
          雨の日に、手紙を書きました。
        </p>

        <button
          type="button"
          onPointerDown={open}
          onClick={open}
          disabled={phase !== "sealed"}
          aria-label="封筒を開ける"
          className="envelope-scene relative z-30 mt-10"
        >
          <div className={cn("envelope", phase === "opening" && "opening")}>
            <div className="envelope-letter">
              <p className="font-sans text-sm text-rain">あいらへ</p>
              <div className="mt-3 space-y-2" aria-hidden="true">
                <span className="block h-1.5 w-11/12 rounded-full bg-paper" />
                <span className="block h-1.5 w-9/12 rounded-full bg-paper" />
                <span className="block h-1.5 w-10/12 rounded-full bg-paper" />
              </div>
            </div>
            <div className="envelope-body" />
            <div className="envelope-flap" />
            <div className="envelope-seal" aria-hidden="true">
              <Droplets className="size-4 text-foam" strokeWidth={2} />
            </div>
          </div>
        </button>

        <p className="mt-6 text-sm text-foam/75">
          {phase === "sealed" ? "封を、そっと開けて" : "どうぞ。"}
        </p>

        {phase === "sealed" ? (
          <Button type="button" variant="night" className="relative z-30 mt-5" onPointerDown={open} onClick={open}>
            手紙を開ける
          </Button>
        ) : null}
      </div>
    </section>
  );
}
