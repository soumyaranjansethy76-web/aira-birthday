const LEAVES = [
  { left: "8%", delay: "0s", duration: "16s", drift: "22px" },
  { left: "22%", delay: "2.4s", duration: "18s", drift: "-18px" },
  { left: "38%", delay: "5.1s", duration: "15s", drift: "28px" },
  { left: "54%", delay: "1.2s", duration: "20s", drift: "-12px" },
  { left: "68%", delay: "6.8s", duration: "17s", drift: "20px" },
  { left: "82%", delay: "3.6s", duration: "19s", drift: "-24px" },
  { left: "92%", delay: "8.2s", duration: "16s", drift: "14px" },
];

export function Leaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {LEAVES.map((l) => (
        <span
          key={l.left}
          className="leaf-fall"
          style={{
            left: l.left,
            animationDelay: l.delay,
            animationDuration: l.duration,
            ["--drift" as string]: l.drift,
          }}
        />
      ))}
    </div>
  );
}
