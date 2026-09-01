import { useState } from "react";
import { Button } from "@/components/ui/button";

const COUNT = 8;

export function Cake() {
  const [lit, setLit] = useState(false);
  const [wished, setWished] = useState(false);

  function act() {
    if (!lit && !wished) {
      setLit(true);
      return;
    }
    if (lit) {
      setLit(false);
      setWished(true);
    }
  }

  return (
    <div>
      <div className="mt-8 flex w-fit items-end justify-center gap-3 rounded-lg bg-paper px-6 py-4">
        {Array.from({ length: COUNT }).map((_, i) => (
          <div key={i} className="flex w-4 flex-col items-center">
            <div className="flex h-5 items-end justify-center">
              {lit ? <span className="flame" /> : wished ? <span className="h-4 w-0.5 rounded-full bg-muted/40" /> : null}
            </div>
            <span className={`mt-0.5 h-9 w-1 rounded-full ${i % 2 ? "bg-petal" : "bg-rain"}`} />
            <span className="mt-1 size-2 rounded-full bg-ink/15" />
          </div>
        ))}
      </div>

      <div className="mt-6 min-h-12">
        {!wished ? (
          <Button type="button" onClick={act}>
            {lit ? "お願いごとをする" : "キャンドルに火を灯す"}
          </Button>
        ) : (
          <p className="text-lg text-rain">十八歳の、お願い。叶いますように。</p>
        )}
      </div>
    </div>
  );
}
