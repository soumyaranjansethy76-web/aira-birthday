import { Umbrella, CloudRain } from "lucide-react";

export function UmbrellaToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "傘を閉じる" : "傘をさす"}
      className="fixed top-[max(0.85rem,env(safe-area-inset-top))] right-[max(3.7rem,calc(env(safe-area-inset-right)+2.85rem))] z-50 inline-flex size-11 items-center justify-center rounded-full bg-surface text-rain shadow-paper transition-[background-color,color,transform] duration-150 ease-out hover:bg-paper active:scale-95"
    >
      {open ? <Umbrella className="size-4" strokeWidth={1.75} /> : <CloudRain className="size-4" strokeWidth={1.75} />}
    </button>
  );
}
