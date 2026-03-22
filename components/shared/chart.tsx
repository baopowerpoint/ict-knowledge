// Tất cả helpers vẽ SVG — dùng chung cho mọi lesson

export const CHART_W = 580;
export const CHART_H = 300;

export function py(price: number, min: number, max: number): number {
  return CHART_H - 16 - ((price - min) / (max - min)) * (CHART_H - 32);
}

export function Grid({
  min,
  max,
  step,
}: {
  min: number;
  max: number;
  step: number;
}) {
  const prices: number[] = [];
  for (let p = min; p <= max; p += step) prices.push(p);
  return (
    <>
      {prices.map((p) => (
        <g key={p}>
          <line
            x1={36}
            y1={py(p, min, max)}
            x2={CHART_W - 8}
            y2={py(p, min, max)}
            stroke="#1c2840"
            strokeWidth={0.5}
            strokeDasharray="2,6"
          />
          <text
            x={28}
            y={py(p, min, max) + 4}
            fontFamily="JetBrains Mono"
            fontSize={8}
            fill="#5a6d85"
            textAnchor="end"
          >
            {p}
          </text>
        </g>
      ))}
    </>
  );
}

export function Candle({
  x,
  o,
  h,
  l,
  c,
  w = 12,
  min,
  max,
}: {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
  w?: number;
  min: number;
  max: number;
}) {
  const bull = c >= o;
  const color = bull ? "#34d399" : "#f87171";
  const top = bull ? py(c, min, max) : py(o, min, max);
  const bot = bull ? py(o, min, max) : py(c, min, max);
  return (
    <g>
      <line
        x1={x}
        y1={py(h, min, max)}
        x2={x}
        y2={py(l, min, max)}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={x - w / 2}
        y={top}
        width={w}
        height={Math.max(bot - top, 2)}
        fill={color}
        rx={1.5}
      />
    </g>
  );
}

export function Chart({
  children,
  min,
  max,
  step,
}: {
  children: React.ReactNode;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      style={{ width: "100%", height: "auto" }}
    >
      <Grid min={min} max={max} step={step} />
      {children}
    </svg>
  );
}
