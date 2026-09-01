import { useEffect, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { isMusicPlaying, subscribeMusic, toggleMusic } from "@/lib/music-box";

export function MusicToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(isMusicPlaying());
    return subscribeMusic(setOn);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={on ? "音楽を止める" : "音楽を鳴らす"}
      className="fixed top-[max(0.85rem,env(safe-area-inset-top))] right-[max(0.85rem,env(safe-area-inset-right))] z-50 inline-flex size-11 items-center justify-center rounded-full bg-surface text-rain shadow-paper transition-[background-color,color,transform] duration-150 ease-out hover:bg-paper active:scale-95"
    >
      {on ? <Music2 className="size-4" strokeWidth={1.75} /> : <VolumeX className="size-4" strokeWidth={1.75} />}
    </button>
  );
}
