import { useRef, useState, type PointerEvent } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hug() {
  const [done, setDone] = useState(false);
  const [holding, setHolding] = useState(false);
  const timer = useRef<number | null>(null);

  function start(e: PointerEvent<HTMLButtonElement>) {
    if (done) return;
    e.preventDefault();
    setHolding(true);
    timer.current = window.setTimeout(() => {
      setDone(true);
      setHolding(false);
    }, 1500);
  }

  function end() {
    if (done) return;
    setHolding(false);
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        aria-label="長押しで抱きしめる"
        onPointerDown={start}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
        onContextMenu={(e) => e.preventDefault()}
        className={cn(
          "relative flex size-24 items-center justify-center rounded-full bg-surface text-rain shadow-paper transition-[transform,background-color,color] duration-150 ease-out select-none touch-manipulation",
          holding && "scale-95 bg-petal",
          done && "bg-rain text-foam",
        )}
      >
        {holding && !done ? <span className="hug-ring absolute inset-0 rounded-full bg-rain/20" /> : null}
        <Heart className={cn("size-8", done && "fill-foam")} strokeWidth={1.5} />
      </button>
      <p className="mt-5 max-w-xs text-center text-sm leading-relaxed text-muted">
        {done ? "届いた。雨の日も、晴れの日も、ちゃんとそばにいるよ。" : holding ? "そのままで。" : "長押しして。少しだけでいい。"}
      </p>
    </div>
  );
}
