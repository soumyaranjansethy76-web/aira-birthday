import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/birthday/reveal";

export function Cat() {
  const [pets, setPets] = useState(0);
  const purring = pets >= 5;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        <figure className="overflow-hidden rounded-xl">
          <img
            src="/images/cat-umbrella.jpg"
            alt="雨の庭で傘の下にいる猫"
            className="aspect-3/4 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
        </figure>
      </Reveal>
      <Reveal delay={80}>
        <div>
          <p className="font-display text-sm tracking-[0.22em] text-rain uppercase">A quiet companion</p>
          <h2 className="mt-2 font-sans text-3xl font-medium sm:text-4xl">猫のように、そばに</h2>
          <p className="mt-5 max-w-md text-base leading-loose text-muted">
            雨の日は、窓辺が一番好きだって、なんとなく知ってる。撫でてあげて。五回で、ご機嫌になる。
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button type="button" variant="moss" onClick={() => setPets((n) => Math.min(n + 1, 8))} disabled={purring}>
              {purring ? "ご機嫌" : "なでる"}
            </Button>
            <p className="text-sm text-muted">{purring ? "ごろごろ…" : `${pets} / 5`}</p>
          </div>
          {purring ? (
            <p className="mt-6 max-w-sm text-base leading-relaxed text-ink">
              あなたがいると、雨音までやさしくなる。そんな人だよ。
            </p>
          ) : null}
        </div>
      </Reveal>
    </div>
  );
}
