import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const CARD_SRC = "/images/aira-wishes.png";
const CARD_WIDTH = 1152;
const CARD_HEIGHT = 1536;

// This rectangle is the large blank paper area in the supplied 1152×1536 artwork.
const TEXT_BOX = {
  x: 205,
  y: 370,
  width: 742,
  height: 748,
};

const FONT_STACK = '"Hiragino Sans", "Yu Gothic", "Noto Sans JP", system-ui, -apple-system, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

function graphemes(value: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(value), (part) => part.segment);
  }
  return Array.from(value);
}

function wrapText(ctx: CanvasRenderingContext2D, value: string, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = value.replace(/\r\n/g, "\n").split("\n");

  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }

    const tokens =
      typeof Intl !== "undefined" && "Segmenter" in Intl
        ? Array.from(new Intl.Segmenter(undefined, { granularity: "word" }).segment(paragraph), (part) => part.segment)
        : paragraph.split(/(\s+)/).filter(Boolean);

    let line = "";
    for (const token of tokens) {
      const candidate = line + token;
      if (!line || ctx.measureText(candidate).width <= maxWidth) {
        line = candidate;
        continue;
      }

      lines.push(line.trimEnd());
      line = token.trimStart();

      if (ctx.measureText(line).width > maxWidth) {
        let chunk = "";
        for (const char of graphemes(line)) {
          const next = chunk + char;
          if (chunk && ctx.measureText(next).width > maxWidth) {
            lines.push(chunk);
            chunk = char;
          } else {
            chunk = next;
          }
        }
        line = chunk;
      }
    }

    lines.push(line.trimEnd());
  }

  return lines;
}

function fitText(ctx: CanvasRenderingContext2D, value: string) {
  for (let fontSize = 54; fontSize >= 9; fontSize -= 1) {
    ctx.font = `500 ${fontSize}px ${FONT_STACK}`;
    const lines = wrapText(ctx, value, TEXT_BOX.width);
    const lineHeight = fontSize * 1.42;
    if (lines.length * lineHeight <= TEXT_BOX.height) {
      return { lines, fontSize, lineHeight };
    }
  }

  ctx.font = `500 9px ${FONT_STACK}`;
  const lines = wrapText(ctx, value, TEXT_BOX.width);
  return { lines, fontSize: 9, lineHeight: 12 };
}

function drawCard(canvas: HTMLCanvasElement, image: HTMLImageElement, value: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  ctx.drawImage(image, 0, 0, CARD_WIDTH, CARD_HEIGHT);

  if (!value.trim()) return;

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#263c35";
  ctx.shadowColor = "rgb(255 255 255 / 0.28)";
  ctx.shadowBlur = 2;
  ctx.shadowOffsetY = 1;

  const fitted = fitText(ctx, value.trim());
  ctx.font = `500 ${fitted.fontSize}px ${FONT_STACK}`;

  const totalHeight = fitted.lines.length * fitted.lineHeight;
  let y = TEXT_BOX.y + Math.max(0, (TEXT_BOX.height - totalHeight) / 2);

  for (const line of fitted.lines) {
    if (line) ctx.fillText(line, TEXT_BOX.x + TEXT_BOX.width / 2, y);
    y += fitted.lineHeight;
  }

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
}

function canvasBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not create the image."));
    }, "image/png");
  });
}

export function RainWish() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      imageRef.current = image;
      setReady(true);
    };
    image.onerror = () => setStatus("カード画像を読み込めませんでした。");
    image.src = CARD_SRC;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;
    void document.fonts?.ready.then(() => drawCard(canvas, image, text));
  }, [text, ready]);

  async function saveCard() {
    if (!text.trim() || !canvasRef.current || !imageRef.current) {
      setStatus("まず、お願いごとを書いてね。");
      return;
    }

    try {
      // Make sure the final render uses the same text currently visible in the preview.
      drawCard(canvasRef.current, imageRef.current, text);
      const blob = await canvasBlob(canvasRef.current);
      const file = new File([blob], "Aira-18th-Birthday-Wish.png", { type: "image/png" });

      // iPhone/Safari: Web Share is much more reliable than <a download> for saving files.
      if (typeof navigator.share === "function" && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Aira's 18th Birthday Wish",
        });
        setStatus("保存・共有メニューを開いたよ ✨");
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Aira-18th-Birthday-Wish.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setStatus("画像を保存したよ ✨");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("保存できなかったみたい。もう一度試してね。");
    }
  }

  return (
    <div className="rounded-xl bg-foam/8 p-5 outline outline-1 outline-foam/15 sm:p-8">
      <p className="font-display text-sm tracking-[0.22em] text-petal uppercase">Make your wish card</p>
      <h3 className="mt-2 font-sans text-2xl font-medium text-foam">雨粒に、お願いを</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-foam/70">
        書いた言葉が、このカードの真ん中にそのまま入るよ。English・日本語・漢字・emoji・kaomojiにも対応。
      </p>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
        <div className="overflow-hidden rounded-xl bg-night/30 outline outline-1 outline-foam/12">
          <canvas
            ref={canvasRef}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            role="img"
            aria-label="Aira birthday wish card preview"
            className="block h-auto w-full"
          />
        </div>

        <div>
          <label htmlFor="aira-wish" className="text-sm font-medium text-foam">
            Your birthday wish
          </label>
          <textarea
            id="aira-wish"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={9}
            placeholder={"例：\n素敵な18歳になりますように 🌸\nこれからも自分らしくね！ (｡•ᴗ•｡)♡"}
            className="mt-3 w-full resize-y rounded-lg bg-night/60 px-4 py-3 text-base leading-relaxed text-foam outline outline-1 outline-foam/12 placeholder:text-foam/35 focus-visible:outline-2 focus-visible:outline-petal"
          />
          <p className="mt-2 text-xs leading-relaxed text-foam/55">
            長く書いても、文字サイズを自動で小さくして中央の白いスペース内に収めます。
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button type="button" variant="night" onClick={saveCard} disabled={!ready || !text.trim()}>
              画像を保存 / 共有 ✨
            </Button>
            <span className="text-sm text-petal" aria-live="polite">{status}</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-foam/50">
            iPhoneでは保存ボタンを押すと共有メニューが開き、「画像を保存」などから写真に保存できます。
          </p>
        </div>
      </div>
    </div>
  );
}
