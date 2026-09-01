import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "aira-birthday-wish";

export function PrivateWish() {
  const [wish, setWish] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(KEY);
      if (existing) {
        setWish(existing);
        setSaved(true);
      }
    } catch {
      /* private storage may be blocked */
    }
  }, []);

  function save() {
    const next = wish.trim();
    try {
      if (next) localStorage.setItem(KEY, next);
      else localStorage.removeItem(KEY);
    } catch {
      /* ignore quota */
    }
    setSaved(Boolean(next));
  }

  return (
    <form
      className="paper-card rounded-xl p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <p className="font-display text-sm tracking-[0.18em] text-rose uppercase">A wish, only yours</p>
      <h3 className="mt-2 font-sans text-2xl font-medium">星に、お願いを</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        ここに書いたことは、この端末の中だけに残る。誰にも送られない。
      </p>
      <label htmlFor="wish" className="sr-only">
        お願いごと
      </label>
      <textarea
        id="wish"
        value={wish}
        onChange={(e) => {
          setWish(e.target.value);
          setSaved(false);
        }}
        rows={4}
        placeholder="今年、こうだったらいいな…"
        className="mt-5 w-full resize-none rounded-md bg-paper px-4 py-3 text-base leading-relaxed text-ink placeholder:text-muted/70 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
      />
      <div className="mt-4 flex items-center gap-3">
        <Button type="submit" size="md">
          しまっておく
        </Button>
        {saved && <span className="text-sm text-muted">大切に、預かっているよ。</span>}
      </div>
    </form>
  );
}
