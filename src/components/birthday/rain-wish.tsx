import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "aira-rain-wishes-18";

export function RainWish() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [falling, setFalling] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSaved(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  function send() {
    const wish = text.trim();
    if (!wish) {
      setStatus("願いごとを書いてね。");
      return;
    }
    setFalling(true);
    setStatus("雨粒に乗せて…");
    window.setTimeout(() => {
      const next = [wish, ...saved].slice(0, 12);
      setSaved(next);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      setText("");
      setFalling(false);
      setStatus("雨に届いたよ。この端末の中だけに残る。");
      window.setTimeout(() => setStatus(""), 2800);
    }, 1100);
  }

  return (
    <div className="rounded-xl bg-foam/8 p-6 outline outline-1 outline-foam/15 sm:p-8">
      <p className="font-display text-sm tracking-[0.22em] text-petal uppercase">Wish upon the rain</p>
      <h3 className="mt-2 font-sans text-2xl font-medium text-foam">雨粒に、お願いを</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-foam/70">
        流れ星じゃなくていい。雨の一粒でも、ちゃんと届く。誰にも送られない。
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, 200))}
        rows={3}
        placeholder="今年、こうだったらいいな…"
        className="mt-5 w-full resize-none rounded-lg bg-night/60 px-4 py-3 text-base text-foam outline outline-1 outline-foam/12 placeholder:text-foam/35 focus-visible:outline-2 focus-visible:outline-petal"
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button type="button" variant="night" onClick={send} disabled={falling}>
          {falling ? "降っていく…" : "雨に乗せる"}
        </Button>
        <span className="text-sm text-petal">{status}</span>
      </div>
      {saved.length > 0 ? (
        <ul className="mt-5 space-y-2">
          {saved.map((w, i) => (
            <li
              key={`${w}-${i}`}
              className="rounded-md border-l-2 border-petal bg-foam/6 px-3 py-2 text-sm text-foam/85"
            >
              {w}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
