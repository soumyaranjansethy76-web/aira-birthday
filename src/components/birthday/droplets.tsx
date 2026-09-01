import { Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

export function DropletsCollect({
  found,
  onFind,
}: {
  found: boolean[];
  onFind: (i: number) => void;
}) {
  const spots = [
    { left: "12%", top: "22%" },
    { left: "78%", top: "38%" },
    { left: "48%", top: "68%" },
  ];

  return (
    <>
      {spots.map((s, i) => (
        <button
          key={i}
          type="button"
          aria-label={found[i] ? "集めた雨粒" : "隠れた雨粒"}
          disabled={found[i]}
          onClick={() => onFind(i)}
          className={cn(
            "absolute z-20 flex size-11 items-center justify-center rounded-full transition-[opacity,transform] duration-200 ease-out drip",
            found[i] ? "opacity-0 pointer-events-none" : "bg-foam/20 text-foam hover:bg-foam/35",
          )}
          style={{ left: s.left, top: s.top }}
        >
          <Droplet className="size-4 fill-foam/70" strokeWidth={1.5} />
        </button>
      ))}
    </>
  );
}
