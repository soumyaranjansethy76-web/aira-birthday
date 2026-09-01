const PETALS = [
  { left: "6%", delay: "0s", duration: "14s", drift: "18px", scale: 0.8 },
  { left: "18%", delay: "2.4s", duration: "16s", drift: "-22px", scale: 1 },
  { left: "31%", delay: "5.1s", duration: "13s", drift: "28px", scale: 0.7 },
  { left: "44%", delay: "1.2s", duration: "18s", drift: "-12px", scale: 1.1 },
  { left: "57%", delay: "7s", duration: "15s", drift: "24px", scale: 0.85 },
  { left: "69%", delay: "3.6s", duration: "17s", drift: "-30px", scale: 0.95 },
  { left: "81%", delay: "8.2s", duration: "14s", drift: "16px", scale: 0.75 },
  { left: "92%", delay: "4.4s", duration: "19s", drift: "-18px", scale: 1.05 },
  { left: "12%", delay: "10s", duration: "16s", drift: "10px", scale: 0.65 },
  { left: "75%", delay: "11.5s", duration: "13s", drift: "-8px", scale: 0.9 },
];

export function Petals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            ["--drift" as string]: p.drift,
            transform: `scale(${p.scale})`,
          }}
        />
      ))}
    </div>
  );
}
