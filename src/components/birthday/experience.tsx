import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Cake } from "@/components/birthday/cake";
import { Cat } from "@/components/birthday/cat";
import { DropletsCollect } from "@/components/birthday/droplets";
import { Hug } from "@/components/birthday/hug";
import { Leaves } from "@/components/birthday/leaves";
import { MusicToggle } from "@/components/birthday/music-toggle";
import { Rain } from "@/components/birthday/rain";
import { RainWish } from "@/components/birthday/rain-wish";
import { Reveal } from "@/components/birthday/reveal";
import { UmbrellaToggle } from "@/components/birthday/umbrella-toggle";

const NOTES = [
  {
    ja: "今日は、輝かなくていい。",
    en: "You don't have to sparkle today. Rain never does — and still, everything grows.",
  },
  {
    ja: "がんばっているところ、見てるよ。",
    en: "I notice how hard you try. Even the parts you never mention.",
  },
  {
    ja: "あなたがいると、空気がやさしくなる。",
    en: "Rooms feel warmer when you're in them. That's not a small thing.",
  },
  {
    ja: "小さく感じた日も、ここに戻ってきて。",
    en: "If a day ever makes you feel small, come back here. I'll still mean every word.",
  },
];

const REASONS = [
  "雨の日の静かさ",
  "やさしい声",
  "がんばるところ",
  "笑ったときの目",
  "猫みたいなくつろぎ",
  "自然を好きなところ",
  "聴いてくれること",
  "小さな優しさ",
  "自分のペース",
  "雨音を楽しむこと",
  "素直さ",
  "やさしい強さ",
  "弱さも隠さないこと",
  "いるだけで空気が変わる",
  "季節を感じる人",
  "大切なものを大切にすること",
  "明日を信じてくれる",
  "生まれてきてくれたこと",
];

const WISHES = [
  { ja: "やさしい朝を", en: "Mornings that don't rush you" },
  { ja: "心が軽くなる時間を", en: "Hours that feel light in your chest" },
  { ja: "あなたのペースで", en: "A year that moves at your pace" },
  { ja: "笑って、休んで", en: "Laughter, and rest without apology" },
  { ja: "大切にされること", en: "To be cared for, the way you care" },
  { ja: "あなたらしく", en: "To stay yourself, even as you grow" },
];

export function Experience() {
  const [umbrella, setUmbrella] = useState(false);
  const [found, setFound] = useState([false, false, false]);
  const collected = found.filter(Boolean).length;
  const secret = collected >= 3;

  function findDrop(i: number) {
    setFound((prev) => prev.map((v, idx) => (idx === i ? true : v)));
  }

  return (
    <div className="relative bg-bg text-ink">
      <MusicToggle />
      <UmbrellaToggle open={umbrella} onToggle={() => setUmbrella((v) => !v)} />

      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-24">
        <img src="/images/forest.jpg" alt="雨の森の小道" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-night/42" />
        <div className="absolute inset-0 bg-linear-to-b from-night/20 via-night/28 to-night/58" />
        <Rain variant="light" paused={umbrella} />
        <Leaves />
        <DropletsCollect found={found} onFind={findDrop} />
        <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
          <p className="font-display text-sm tracking-[0.32em] text-foam/80 uppercase">Happy 18th Birthday</p>
          <h1 className="mt-4 font-sans text-6xl font-medium text-foam sm:text-7xl">あいら</h1>
          <p className="mt-6 font-sans text-xl text-petal sm:text-2xl">十八歳、おめでとう</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-foam/80">
            雨のにおいも、緑のしずくも、今日は全部、あなたのもの。
          </p>
          {collected > 0 && collected < 3 ? (
            <p className="mt-4 text-xs tracking-wide text-foam/70">雨粒 {collected} / 3</p>
          ) : null}
        </div>
        <a
          href="#letter"
          className="absolute bottom-16 left-1/2 z-10 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-night/40 text-foam transition-[background-color] duration-150 ease-out hover:bg-night/55"
          aria-label="手紙へ"
        >
          <ChevronDown className="size-5" strokeWidth={1.5} />
        </a>
      </section>

      <section id="letter" className="px-5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <figure className="overflow-hidden rounded-xl">
              <img
                src="/images/letter.jpg"
                alt="窓辺の手紙と茶"
                className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
              />
            </figure>
          </Reveal>
          <Reveal delay={80}>
            <article className="paper-card rounded-xl px-6 py-8 sm:px-9 sm:py-10">
              <p className="font-display text-sm tracking-[0.2em] text-rain uppercase">A letter</p>
              <h2 className="mt-2 font-sans text-3xl font-medium">あいらへ</h2>
              <div className="mt-6 space-y-5 text-base leading-loose text-ink">
                <p>
                  十八歳。数字は大きいけど、今日は急がなくていい。雨が庭をゆっくりぬらすみたいに、一年をぬらしていってほしい。
                </p>
                <p>
                  うまく言おうとすると、言葉が足りなくなる。でも、あなたには、ちゃんと手間をかけたい人なんだと思う。聴いてくれること。そばにいてくれること。自分では気づいていない、やさしい強さ。
                </p>
                <p>
                  今日は、好きなものを食べて、猫みたいにくつろいで、「大切に思われている」って、ちゃんと感じられますように。
                </p>
                <p className="font-display text-lg italic leading-relaxed text-muted">
                  I made this because you deserve a day that was thought about. A day arranged with
                  patience. A day that says, plainly — I'm glad you were born.
                </p>
                <p>生まれてきてくれて、ありがとう。お誕生日おめでとう。</p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-8 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-display text-sm tracking-[0.22em] text-rain uppercase">Things I keep noticing</p>
            <h2 className="mt-2 font-sans text-3xl font-medium sm:text-4xl">伝えたい、小さなこと</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {NOTES.map((note, i) => (
              <Reveal key={note.ja} delay={i * 70}>
                <article className="paper-card h-full rounded-lg p-6 sm:p-7">
                  <p className="text-lg font-medium leading-relaxed">{note.ja}</p>
                  <p className="mt-3 font-display text-base italic leading-relaxed text-muted">{note.en}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-display text-sm tracking-[0.22em] text-rain uppercase">Eighteen reasons</p>
            <h2 className="mt-2 font-sans text-3xl font-medium sm:text-4xl">十八の、ありがとう</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              大きな理由じゃなくていい。雨粒みたいに、小さくて、ちゃんと光るもの。
            </p>
          </Reveal>
          <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {REASONS.map((r, i) => (
              <Reveal key={r} delay={i * 40}>
                <li className="paper-card rounded-lg px-4 py-4">
                  <span className="font-display text-sm text-rain">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-1 text-sm font-medium leading-snug sm:text-base">{r}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <figure className="overflow-hidden rounded-xl">
              <img
                src="/images/cake.jpg"
                alt="森のバースデーケーキ"
                className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
              />
            </figure>
          </Reveal>
          <Reveal delay={80}>
            <p className="font-display text-sm tracking-[0.22em] text-rain uppercase">A cake, for you</p>
            <h2 className="mt-2 font-sans text-3xl font-medium sm:text-4xl">ケーキに、火を灯して</h2>
            <p className="mt-4 max-w-md text-base leading-loose text-muted">
              十八本は多すぎるから、八本。お願いごとは、声に出さなくていい。心の中で、そっと。
            </p>
            <Cake />
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Cat />
        </div>
      </section>

      <section className="relative overflow-hidden bg-night px-5 py-20 text-foam sm:py-28">
        <img src="/images/night.jpg" alt="雨の夜の庭" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-night/70" />
        <Rain variant="light" paused={umbrella} />
        <div className="relative z-10 mx-auto max-w-5xl">
          <Reveal>
            <p className="font-display text-sm tracking-[0.22em] text-petal uppercase">For this year</p>
            <h2 className="mt-2 font-sans text-3xl font-medium sm:text-4xl">十八歳の、お願いごと</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foam/75">
              大きな夢じゃなくていい。あなたが、少し楽に息ができるように。
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WISHES.map((w, i) => (
              <Reveal key={w.ja} delay={i * 60}>
                <article className="rounded-lg bg-foam/8 px-5 py-4 outline outline-1 outline-foam/12">
                  <p className="font-medium">{w.ja}</p>
                  <p className="mt-1 font-display text-sm italic text-foam/65">{w.en}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <RainWish />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-display text-sm tracking-[0.22em] text-rain uppercase">Rain garden</p>
            <h2 className="mt-2 font-sans text-3xl font-medium sm:text-4xl">好きなもの、少しだけ</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { src: "/images/bouquet.jpg", alt: "雨にぬれた花束", cap: "ぬれた花" },
              { src: "/images/stream.jpg", alt: "雨の渓流", cap: "森の水" },
              { src: "/images/cat-window.jpg", alt: "窓辺で雨を見る猫", cap: "窓辺の猫" },
            ].map((p, i) => (
              <Reveal key={p.src} delay={i * 80}>
                <figure className="overflow-hidden rounded-xl">
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="aspect-3/4 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
                  />
                  <figcaption className="mt-3 text-sm text-muted">{p.cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {secret ? (
        <section className="px-5 py-12 sm:py-16">
          <Reveal>
            <div className="mx-auto max-w-xl paper-card rounded-xl px-6 py-8 text-center sm:px-10 sm:py-12">
              <p className="font-display text-sm tracking-[0.22em] text-rain uppercase">A hidden garden</p>
              <h2 className="mt-2 font-sans text-2xl font-medium">見つけたね</h2>
              <p className="mt-5 text-base leading-loose text-ink">
                三粒、集めてくれた。秘密はこれだけ。あなたが雨を好きなこと、森を好きなこと、小さな命を好きなこと。全部、大切に思ってる。
              </p>
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        <img src="/images/cat-window.jpg" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-bg/78" />
        <Rain variant="dark" paused={umbrella} />
        <div className="relative z-10 mx-auto max-w-md paper-card rounded-xl px-6 py-10 text-center sm:px-10 sm:py-12">
          <p className="font-display text-sm tracking-[0.22em] text-rain uppercase">Before you go</p>
          <h2 className="mt-2 font-sans text-2xl font-medium">ひとつだけ、渡したいもの</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            もし今日、ひとつだけ贈れるなら。大切にされている、という感覚を。
          </p>
          <div className="mt-8">
            <Hug />
          </div>
          <p className="mt-10 font-display text-2xl italic">Happy 18th birthday, あいら.</p>
          <p className="mt-2 text-sm text-muted">雨の日も、その先も。</p>
        </div>
      </section>
    </div>
  );
}
