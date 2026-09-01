import { useMemo } from "react";
import { cn } from "@/lib/utils";

const DROPS = Array.from({ length: 42 }, (_, i) => ({
  left: `${(i * 9.3) % 100}%`,
  delay: `${(i * 0.17) % 3.4}s`,
  duration: `${1.4 + (i % 7) * 0.18}s`,
  height: `${12 + (i % 5) * 6}px`,
  drift: `${(i % 2 === 0 ? 8 : -10) + (i % 5)}px`,
  opacity: 0.35 + (i % 4) * 0.12,
}));

export function Rain({
  variant = "light",
  paused = false,
}: {
  variant?: "light" | "dark";
  paused?: boolean;
}) {
  const drops = useMemo(() => DROPS, []);
  if (paused) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {drops.map((d, i) => (
        <span
          key={i}
          className={cn("rain-drop", variant === "dark" && "dark")}
          style={{
            left: d.left,
            height: d.height,
            opacity: d.opacity,
            animationDelay: d.delay,
            animationDuration: d.duration,
            ["--drift" as string]: d.drift,
          }}
        />
      ))}
    </div>
  );
}
