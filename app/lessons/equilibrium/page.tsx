"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ConceptLink } from "@/components/shared/lesson/ConceptLink";
import { LessonPage } from "@/components/shared/LessonPage";

// ── Helpers ───────────────────────────────────────────────────────────────────

const W = 580;
const H = 300;

function py(price: number, min: number, max: number): number {
  return H - 16 - ((price - min) / (max - min)) * (H - 32);
}

function Grid({ min, max, step }: { min: number; max: number; step: number }) {
  const prices: number[] = [];
  for (let p = min; p <= max; p += step) prices.push(p);
  return (
    <>
      {prices.map((p) => (
        <g key={p}>
          <line
            x1={36}
            y1={py(p, min, max)}
            x2={W - 8}
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

function Candle({
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

function Chart({
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
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      <Grid min={min} max={max} step={step} />
      {children}
    </svg>
  );
}

// ── Chart 1 — Equilibrium là gì ──────────────────────────────────────────────

function ChartEquilibrium() {
  const MIN = 34,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);

  // Con sóng từ 36 → 54, midpoint = 45
  const SWING_LOW = 36;
  const SWING_HIGH = 54;
  const EQ = (SWING_LOW + SWING_HIGH) / 2; // 45

  const candles = [
    { x: 50, o: 37, h: 38.5, l: 36, c: 38 },
    { x: 82, o: 38, h: 40, l: 37.5, c: 39.5 },
    { x: 114, o: 39.5, h: 42, l: 39, c: 41.5 },
    { x: 146, o: 41.5, h: 44, l: 41, c: 43.5 },
    { x: 178, o: 43.5, h: 46, l: 43, c: 45.5 },
    { x: 210, o: 45.5, h: 48, l: 45, c: 47.5 },
    { x: 242, o: 47.5, h: 50, l: 47, c: 49.5 },
    { x: 274, o: 49.5, h: 52, l: 49, c: 51.5 },
    { x: 306, o: 51.5, h: 54, l: 51, c: 53.5 }, // đỉnh
    { x: 338, o: 53.5, h: 54.5, l: 51, c: 51.5 }, // đảo chiều
    { x: 370, o: 51.5, h: 52, l: 49, c: 49.5 },
    { x: 402, o: 49.5, h: 50, l: 46, c: 46.5 },
    { x: 434, o: 46.5, h: 47, l: 44.5, c: 45.2 }, // chạm EQ
    { x: 466, o: 45.2, h: 47.5, l: 45, c: 47 }, // bounce tại EQ
    { x: 498, o: 47, h: 50, l: 46.5, c: 49.5 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={4}>
      {/* Swing range */}
      <line
        x1={50}
        y1={p(SWING_LOW)}
        x2={60}
        y2={p(SWING_LOW)}
        stroke="#5a6d85"
        strokeWidth={1}
      />
      <line
        x1={306}
        y1={p(SWING_HIGH)}
        x2={316}
        y2={p(SWING_HIGH)}
        stroke="#5a6d85"
        strokeWidth={1}
      />

      {/* EQ line */}
      <line
        x1={36}
        y1={p(EQ)}
        x2={W - 8}
        y2={p(EQ)}
        stroke="#f59e0b"
        strokeWidth={1.2}
        strokeDasharray="6,4"
      />
      <rect
        x={W - 80}
        y={p(EQ) - 10}
        width={72}
        height={18}
        fill="#080c14"
        rx={4}
      />
      <text
        x={W - 44}
        y={p(EQ) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={600}
      >
        EQ / 50%
      </text>

      {/* Premium / Discount zones */}
      <rect
        x={36}
        y={p(SWING_HIGH)}
        width={W - 44}
        height={p(EQ) - p(SWING_HIGH)}
        fill="rgba(248,113,113,0.04)"
      />
      <text
        x={52}
        y={p(SWING_HIGH) + 16}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        opacity={0.6}
      >
        PREMIUM — tìm Sell
      </text>

      <rect
        x={36}
        y={p(EQ)}
        width={W - 44}
        height={p(SWING_LOW) - p(EQ)}
        fill="rgba(52,211,153,0.04)"
      />
      <text
        x={52}
        y={p(EQ) + 16}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        opacity={0.6}
      >
        DISCOUNT — tìm Buy
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* Bounce annotation */}
      <circle
        cx={434}
        cy={p(44.5)}
        r={7}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={447}
        y={p(44.3)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
      >
        Tôn trọng EQ
      </text>
    </Chart>
  );
}

// ── Chart 2 — Fibonacci levels ───────────────────────────────────────────────

function ChartFibonacci() {
  const MIN = 34,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);

  const SWING_LOW = 36;
  const SWING_HIGH = 54;

  const fib = (pct: number) => SWING_LOW + (SWING_HIGH - SWING_LOW) * pct;

  const levels = [
    { pct: 1.0, label: "1 (100%)", color: "#5a6d85" },
    { pct: 0.75, label: "0.75 (75%)", color: "#60a5fa" },
    { pct: 0.5, label: "0.5 (50%)", color: "#f59e0b" },
    { pct: 0.25, label: "0.25 (25%)", color: "#60a5fa" },
    { pct: 0.0, label: "0 (0%)", color: "#5a6d85" },
  ];

  const candles = [
    { x: 50, o: 37, h: 38.5, l: 36, c: 38 },
    { x: 82, o: 38, h: 40.5, l: 37.5, c: 40 },
    { x: 114, o: 40, h: 43, l: 39.5, c: 42.5 },
    { x: 146, o: 42.5, h: 46, l: 42, c: 45.5 },
    { x: 178, o: 45.5, h: 49, l: 45, c: 48.5 },
    { x: 210, o: 48.5, h: 52, l: 48, c: 51.5 },
    { x: 242, o: 51.5, h: 54.5, l: 51, c: 54 }, // đỉnh
    { x: 274, o: 54, h: 54.5, l: 51.5, c: 52 },
    { x: 306, o: 52, h: 52.5, l: 49, c: 49.5 },
    { x: 338, o: 49.5, h: 50, l: 46.5, c: 47 },
    { x: 370, o: 47, h: 47.5, l: 45, c: 45.3 }, // chạm 50%
    { x: 402, o: 45.3, h: 47, l: 45, c: 46.5 }, // bounce
    { x: 434, o: 46.5, h: 49.5, l: 46, c: 49 },
    { x: 466, o: 49, h: 52, l: 48.5, c: 51.5 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={4}>
      {/* Fib lines */}
      {levels.map(({ pct, label, color }) => (
        <g key={pct}>
          <line
            x1={36}
            y1={p(fib(pct))}
            x2={W - 8}
            y2={p(fib(pct))}
            stroke={color}
            strokeWidth={pct === 0.5 ? 1.5 : 0.8}
            strokeDasharray={pct === 0.5 ? "6,4" : "3,6"}
            opacity={pct === 0.5 ? 1 : 0.5}
          />
          <text
            x={W - 10}
            y={p(fib(pct)) - 3}
            fontFamily="JetBrains Mono"
            fontSize={pct === 0.5 ? 9 : 8}
            fill={color}
            textAnchor="end"
            fontWeight={pct === 0.5 ? 700 : 400}
            opacity={pct === 0.5 ? 1 : 0.7}
          >
            {label}
          </text>
        </g>
      ))}

      {/* Premium zone */}
      <rect
        x={36}
        y={p(fib(1))}
        width={W - 44}
        height={p(fib(0.5)) - p(fib(1))}
        fill="rgba(248,113,113,0.04)"
      />
      <rect
        x={36}
        y={p(fib(0.5))}
        width={W - 44}
        height={p(fib(0)) - p(fib(0.5))}
        fill="rgba(52,211,153,0.04)"
      />

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* 50% annotation */}
      <circle
        cx={370}
        cy={p(45)}
        r={7}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={383}
        y={p(44.8)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
      >
        Bounce 50%
      </text>
    </Chart>
  );
}

// ── Chart 3 — 50% của PDA ────────────────────────────────────────────────────

function ChartPDA50() {
  const MIN = 36,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);

  // FVG: 42 → 46, midpoint = 44
  const FVG_BOT = 42;
  const FVG_TOP = 46;
  const FVG_MID = (FVG_BOT + FVG_TOP) / 2;

  const candles = [
    // Hình thành FVG
    { x: 60, o: 39, h: 40.5, l: 38.5, c: 40 },
    { x: 95, o: 40, h: 41.5, l: 39.5, c: 41.5 },
    { x: 130, o: 41.5, h: 42.5, l: 41, c: 42 }, // nến 1
    { x: 165, o: 42, h: 49, l: 41.5, c: 48.5 }, // impulse
    { x: 200, o: 48.5, h: 50, l: 46.5, c: 49.5 }, // nến 3
    { x: 235, o: 49.5, h: 51, l: 49, c: 50.5 },
    // Pullback — case 1: chạm đúng 50%
    { x: 290, o: 50.5, h: 51, l: 48.5, c: 49 },
    { x: 325, o: 49, h: 49.5, l: 47, c: 47.5 },
    { x: 360, o: 47.5, h: 48, l: 45, c: 45.5 },
    { x: 395, o: 45.5, h: 46, l: 43.8, c: 44.2 }, // thân đóng gần 50%
    { x: 430, o: 44.2, h: 46.5, l: 44, c: 46 }, // bounce từ 50%
    { x: 465, o: 46, h: 49, l: 45.5, c: 48.5 },
    { x: 500, o: 48.5, h: 51.5, l: 48, c: 51 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* FVG full zone */}
      <rect
        x={36}
        y={p(FVG_TOP)}
        width={W - 44}
        height={p(FVG_BOT) - p(FVG_TOP)}
        fill="rgba(245,158,11,0.06)"
      />
      <line
        x1={36}
        y1={p(FVG_TOP)}
        x2={W - 8}
        y2={p(FVG_TOP)}
        stroke="#f59e0b"
        strokeWidth={0.8}
        strokeDasharray="4,5"
        opacity={0.4}
      />
      <line
        x1={36}
        y1={p(FVG_BOT)}
        x2={W - 8}
        y2={p(FVG_BOT)}
        stroke="#f59e0b"
        strokeWidth={0.8}
        strokeDasharray="4,5"
        opacity={0.4}
      />

      {/* 50% of FVG — midpoint */}
      <line
        x1={36}
        y1={p(FVG_MID)}
        x2={W - 8}
        y2={p(FVG_MID)}
        stroke="#f59e0b"
        strokeWidth={1.5}
        strokeDasharray="6,4"
      />
      <rect
        x={W - 96}
        y={p(FVG_MID) - 10}
        width={88}
        height={18}
        fill="#080c14"
        rx={4}
      />
      <text
        x={W - 52}
        y={p(FVG_MID) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={700}
      >
        50% FVG = {FVG_MID}
      </text>

      {/* FVG label */}
      <text
        x={52}
        y={p(FVG_TOP) - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        opacity={0.6}
      >
        FVG
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* 50% touch annotation */}
      <circle
        cx={395}
        cy={p(43.8)}
        r={7}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={326}
        y={p(43.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
      >
        Thân đóng tại 50%
      </text>
    </Chart>
  );
}

// ── Chart 4 — Râu nến vượt 50% ───────────────────────────────────────────────

function ChartWickBeyond() {
  const MIN = 36,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);

  const FVG_BOT = 42;
  const FVG_TOP = 46;
  const FVG_MID = (FVG_BOT + FVG_TOP) / 2;

  // Case: thân đóng trên 50% nhưng râu đã lấp full FVG
  const candles = [
    { x: 60, o: 39, h: 40.5, l: 38.5, c: 40 },
    { x: 95, o: 40, h: 41.5, l: 39.5, c: 41 },
    { x: 130, o: 41, h: 42.5, l: 40.5, c: 42 }, // nến 1
    { x: 165, o: 42, h: 49, l: 41.5, c: 48.5 }, // impulse
    { x: 200, o: 48.5, h: 50, l: 46.5, c: 49.5 }, // nến 3
    { x: 235, o: 49.5, h: 51, l: 49, c: 50.5 },
    { x: 270, o: 50.5, h: 51, l: 48.5, c: 49 },
    { x: 305, o: 49, h: 49.5, l: 47.5, c: 48 },
    // Nến pullback — thân đóng trên 50% (44.5) nhưng râu xuống 41.5 (fill full FVG)
    { x: 340, o: 48, h: 48.5, l: 41.5, c: 45.5 }, // RAU lấp full FVG!
    { x: 375, o: 45.5, h: 47, l: 45, c: 46.5 },
    { x: 410, o: 46.5, h: 48.5, l: 46, c: 48 },
    { x: 445, o: 48, h: 50, l: 47.5, c: 49.5 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* FVG zone */}
      <rect
        x={36}
        y={p(FVG_TOP)}
        width={W - 44}
        height={p(FVG_BOT) - p(FVG_TOP)}
        fill="rgba(245,158,11,0.06)"
      />
      <line
        x1={36}
        y1={p(FVG_TOP)}
        x2={W - 8}
        y2={p(FVG_TOP)}
        stroke="#f59e0b"
        strokeWidth={0.8}
        strokeDasharray="4,5"
        opacity={0.4}
      />
      <line
        x1={36}
        y1={p(FVG_BOT)}
        x2={W - 8}
        y2={p(FVG_BOT)}
        stroke="#f59e0b"
        strokeWidth={0.8}
        strokeDasharray="4,5"
        opacity={0.4}
      />

      {/* 50% midpoint */}
      <line
        x1={36}
        y1={p(FVG_MID)}
        x2={W - 8}
        y2={p(FVG_MID)}
        stroke="#f59e0b"
        strokeWidth={1.5}
        strokeDasharray="6,4"
      />
      <text
        x={W - 10}
        y={p(FVG_MID) - 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="end"
        fontWeight={700}
      >
        50%
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* Wick annotation */}
      <line
        x1={340}
        y1={p(41.5)}
        x2={440}
        y2={p(41.5)}
        stroke="#f87171"
        strokeWidth={1}
        strokeDasharray="3,3"
        opacity={0.6}
      />
      <text
        x={445}
        y={p(41.3)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
      >
        Râu fill full FVG
      </text>

      {/* Body annotation */}
      <line
        x1={340}
        y1={p(45.5)}
        x2={440}
        y2={p(45.5)}
        stroke="#34d399"
        strokeWidth={1}
        strokeDasharray="3,3"
        opacity={0.6}
      />
      <text
        x={445}
        y={p(45.3)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
      >
        Thân đóng trên 50%
      </text>

      {/* Warning */}
      <text
        x={W / 2}
        y={H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        textAnchor="middle"
      >
        → FVG yếu hơn cho lần retest sau
      </text>
    </Chart>
  );
}

// ── Chart 5 — Tổng kết ───────────────────────────────────────────────────────

function ChartSummary() {
  const MIN = 32,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);

  // Swing: 34 → 54, EQ = 44
  const SWING_LOW = 34;
  const SWING_HIGH = 54;
  const EQ = (SWING_LOW + SWING_HIGH) / 2;

  // FVG tại vùng discount: 38 → 42, mid = 40
  const FVG_BOT = 38;
  const FVG_TOP = 42;
  const FVG_MID = (FVG_BOT + FVG_TOP) / 2;

  const candles = [
    { x: 50, o: 35, h: 36.5, l: 34, c: 36 },
    { x: 82, o: 36, h: 37.5, l: 35.5, c: 37 },
    { x: 114, o: 37, h: 38.5, l: 36.5, c: 38 }, // nến 1 FVG
    { x: 146, o: 38, h: 43.5, l: 37.5, c: 43 }, // impulse — FVG
    { x: 178, o: 43, h: 45, l: 42.5, c: 44.5 }, // nến 3 FVG
    { x: 210, o: 44.5, h: 47, l: 44, c: 46.5 },
    { x: 242, o: 46.5, h: 49, l: 46, c: 48.5 },
    { x: 274, o: 48.5, h: 51, l: 48, c: 50.5 },
    { x: 306, o: 50.5, h: 53, l: 50, c: 52.5 },
    { x: 338, o: 52.5, h: 54.5, l: 52, c: 54 }, // đỉnh swing
    { x: 370, o: 54, h: 54.5, l: 51.5, c: 52 },
    { x: 402, o: 52, h: 52.5, l: 49, c: 49.5 },
    { x: 434, o: 49.5, h: 50, l: 46, c: 46.5 },
    { x: 466, o: 46.5, h: 47, l: 43.5, c: 44.2 }, // chạm EQ
    { x: 498, o: 44.2, h: 45, l: 40.5, c: 41 }, // tiếp vào FVG
    { x: 530, o: 41, h: 42.5, l: 39.8, c: 42 }, // chạm 50% FVG
    { x: 562, o: 42, h: 45, l: 41.5, c: 44.5 }, // bounce
  ];

  return (
    <Chart min={MIN} max={MAX} step={4}>
      {/* Swing EQ */}
      <line
        x1={36}
        y1={p(EQ)}
        x2={W - 8}
        y2={p(EQ)}
        stroke="#f59e0b"
        strokeWidth={1.2}
        strokeDasharray="6,4"
        opacity={0.6}
      />
      <text
        x={52}
        y={p(EQ) - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        opacity={0.8}
      >
        50% Swing (EQ)
      </text>

      {/* FVG zone */}
      <rect
        x={36}
        y={p(FVG_TOP)}
        width={W - 44}
        height={p(FVG_BOT) - p(FVG_TOP)}
        fill="rgba(245,158,11,0.07)"
      />
      <line
        x1={36}
        y1={p(FVG_MID)}
        x2={W - 8}
        y2={p(FVG_MID)}
        stroke="#f59e0b"
        strokeWidth={1.5}
        strokeDasharray="6,4"
      />
      <text
        x={52}
        y={p(FVG_MID) - 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        fontWeight={700}
      >
        50% FVG
      </text>

      {/* Discount zone label */}
      <text
        x={W - 10}
        y={p(34) - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="end"
        opacity={0.6}
      >
        DISCOUNT
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* Entry annotation */}
      <circle
        cx={530}
        cy={p(39.8)}
        r={7}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={400}
        y={p(39)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
      >
        50% FVG + Discount = Entry
      </text>

      {/* Arrow up */}
      <path
        d={`M 562 ${p(44.5)} Q 580 ${p(48)} 580 ${p(52)}`}
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
        strokeDasharray="4,3"
        opacity={0.6}
      />
    </Chart>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    label: "Slide 1 — Equilibrium",
    badge: "Khái niệm",
    title: "Equilibrium — Điểm cân bằng thị trường",
    chart: <ChartEquilibrium />,
    body: (
      <>
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          Equilibrium (EQ)
        </span>{" "}
        là điểm 50% của bất kỳ con sóng nào — nơi thị trường được coi là{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          cân bằng thực sự
        </span>{" "}
        giữa bên mua và bên bán.
        <br />
        <br />
        Thị trường luôn có xu hướng quay về EQ trước khi quyết định tiếp tục
        trend hay đảo chiều —{" "}
        <ConceptLink slug="smart-money">Smart Money</ConceptLink> dùng vùng này
        để thực thi lệnh với giá tốt nhất.
        <br />
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          Trên 50% = Premium
        </span>{" "}
        → tìm cơ hội Sell.
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Dưới 50% = Discount
        </span>{" "}
        → tìm cơ hội Buy.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Nguyên tắc đơn giản nhất: không mua ở Premium, không bán ở Discount.
        Luôn giao dịch thuận chiều với vùng giá hiện tại so với EQ.
      </p>
    ),
  },
  {
    label: "Slide 2 — Fibonacci 50%",
    badge: "Fibonacci",
    title: "50% của con sóng — Fibonacci Levels",
    chart: <ChartFibonacci />,
    body: (
      <>
        Dùng Fibonacci để xác định vùng 50% của con sóng. Các mức quan trọng:
        <br />
        <br />
        <span style={{ color: "#5a6d85", fontWeight: 500 }}>100% / 0%</span> —
        Đỉnh và đáy của sóng
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>75%</span> — Deep
        Premium (bán mạnh)
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          50% — Equilibrium
        </span>{" "}
        → Vùng phản ứng mạnh nhất
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>25%</span> — Deep
        Discount (mua mạnh)
        <br />
        <br />
        Giá chạm 50% của sóng → xem xét phản ứng. Nếu có thêm{" "}
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          FVG hoặc OB
        </span>{" "}
        tại vùng này → confluence mạnh → entry.
      </>
    ),
  },
  {
    label: "Slide 3 — 50% của PDA",
    badge: "PDA Midpoint",
    title: "50% của PDA — Điểm vào lệnh tối ưu",
    chart: <ChartPDA50 />,
    body: (
      <>
        Mỗi vùng PDA (FVG, OB, VI,...) đều có điểm 50% riêng — đây là mức giá{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          lý tưởng nhất để entry
        </span>{" "}
        bên trong vùng đó.
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>Cách dùng:</span>
        <br />
        • Xác định FVG/OB trên HTF
        <br />• Khi giá pullback vào vùng → đợi nến đóng cửa{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          gần 50% của vùng đó
        </span>
        <br />• Thân nến đóng tại/trên 50% → entry{" "}
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          rủi ro thấp nhất
        </span>
        <br />
        <br />
        FVG được coi là đã "filled" đủ khi giá chạm 50% — không cần fill toàn bộ
        100%.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Entry tại 50% FVG cho phép đặt SL nhỏ hơn (dưới đáy FVG) → R:R tốt hơn
        so với entry tại cạnh dưới FVG.
      </p>
    ),
  },
  {
    label: "Slide 4 — Râu nến & FVG yếu",
    badge: "Lưu ý quan trọng",
    title: "Thân đóng trên 50% nhưng râu fill full — FVG yếu hơn",
    chart: <ChartWickBeyond />,
    body: (
      <>
        Có 2 trường hợp khi giá pullback vào FVG:
        <br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Trường hợp tốt:
        </span>{" "}
        Thân nến đóng cửa tại hoặc dưới 50% FVG →{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          FVG còn nguyên vẹn
        </span>
        , phản ứng mạnh ở lần sau.
        <br />
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          Trường hợp yếu hơn:
        </span>{" "}
        Thân nến đóng trên 50% nhưng{" "}
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          râu nến đã lấp toàn bộ FVG
        </span>{" "}
        → tuy giá tôn trọng 50%, nhưng FVG đã bị "mitigated" bởi râu → lần
        retest sau{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          phản ứng yếu hơn
        </span>
        .
        <br />
        <br />
        Ưu tiên FVG chưa bị râu nến chạm qua hoàn toàn.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Một FVG bị fill hoàn toàn (cả thân lẫn râu qua đáy) = mất hiệu lực. Chỉ
        dùng FVG còn "fresh" — chưa bị giá chạm qua.
      </p>
    ),
  },
  {
    label: "Slide 5 — Tổng kết",
    badge: "Tổng kết",
    title: "Discount + 50% FVG = Entry tối ưu",
    chart: <ChartSummary />,
    body: (
      <>
        Kết hợp 2 lớp 50%:
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>Lớp 1:</span> Giá
        đang ở{" "}
        <span style={{ color: "#34d399", fontWeight: 500 }}>Discount</span>{" "}
        (dưới 50% của swing) → bias Buy.
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>Lớp 2:</span> Bên
        trong vùng Discount có FVG → đợi giá chạm{" "}
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          50% của FVG đó
        </span>{" "}
        → entry.
        <br />
        <br />
        Đây là setup{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          confluence 2 lớp
        </span>{" "}
        — xác suất cao nhất, rủi ro thấp nhất. Ngược lại với Sell: giá ở Premium
        + chạm 50% Bearish FVG → entry Sell.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Checklist nhanh trước khi entry: (1) Giá đang Discount hay Premium? (2)
        Có FVG/OB trong vùng đó không? (3) Giá đã chạm 50% của PDA chưa? Đủ 3
        điều kiện → entry.
      </p>
    ),
  },
];

const CONFIG = {
  group: "Nhóm 2 · Bài 09",
  heading: "Vùng Cân Bằng 50%",
  subhead:
    "Equilibrium, Premium/Discount, 50% PDA và cách kết hợp để tìm entry tối ưu.",
  accentColor: "#f59e0b",
  steps: STEPS,
};

export default function EquilibriumPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDir] = useState(1);
  const go = useCallback(
    (n: number) => {
      if (n < 0 || n >= CONFIG.steps.length) return;
      setDir(n > current ? 1 : -1);
      setCurrent(n);
    },
    [current],
  );
  return (
    <LessonPage
      config={CONFIG}
      current={current}
      direction={direction}
      onGo={go}
    />
  );
}
