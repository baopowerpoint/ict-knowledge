"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ConceptLink } from "@/components/shared/lesson/ConceptLink";
import { LessonPage } from "@/components/shared/LessonPage";

// ── Helpers ───────────────────────────────────────────────────────────────────

const W = 580;
const H = 300;

function py(price: number, min = 34, max = 56): number {
  return H - 16 - ((price - min) / (max - min)) * (H - 32);
}

function Grid({
  min = 34,
  max = 56,
  step = 4,
}: {
  min?: number;
  max?: number;
  step?: number;
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
  min = 34,
  max = 56,
}: {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
  w?: number;
  min?: number;
  max?: number;
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
  min = 34,
  max = 56,
  step = 4,
}: {
  children: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      <Grid min={min} max={max} step={step} />
      {children}
    </svg>
  );
}

// ── Chart Step 1 — FVG ────────────────────────────────────────────────────────

function ChartFVG() {
  const MIN = 36,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);
  const candles = [
    { x: 60, o: 38, h: 39.5, l: 37.5, c: 39 },
    { x: 95, o: 39, h: 40.5, l: 38.5, c: 40 },
    { x: 130, o: 40, h: 41.5, l: 39.5, c: 41 },
    { x: 165, o: 41, h: 42.5, l: 40.5, c: 42 }, // nến 1
    { x: 200, o: 42, h: 49, l: 41.5, c: 48.5 }, // nến xung lực
    { x: 235, o: 48.5, h: 50, l: 46.5, c: 49 }, // nến 3
    { x: 270, o: 49, h: 49.5, l: 47.5, c: 48 },
    { x: 305, o: 48, h: 48.5, l: 45.5, c: 46 },
    { x: 340, o: 46, h: 46.5, l: 43.5, c: 44 }, // fill FVG
    { x: 375, o: 44, h: 46, l: 43.5, c: 45.5 }, // bounce
    { x: 410, o: 45.5, h: 48, l: 45, c: 47.5 },
    { x: 445, o: 47.5, h: 50, l: 47, c: 49.5 },
  ];
  // FVG: high nến 1 (42.5) → low nến 3 (46.5)
  const FVG_BOT = 42.5;
  const FVG_TOP = 46.5;
  const FVG_MID = (FVG_BOT + FVG_TOP) / 2;

  return (
    <Chart min={MIN} max={MAX} step={3}>
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
        y1={p(FVG_TOP)}
        x2={W - 8}
        y2={p(FVG_TOP)}
        stroke="#f59e0b"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <line
        x1={36}
        y1={p(FVG_BOT)}
        x2={W - 8}
        y2={p(FVG_BOT)}
        stroke="#f59e0b"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <text
        x={W / 2}
        y={p(FVG_MID) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={600}
      >
        FVG
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* Impulse label */}
      <text
        x={200}
        y={p(49.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
      >
        Nến xung lực
      </text>

      {/* Fill annotation */}
      <circle
        cx={340}
        cy={p(43.5)}
        r={7}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={355}
        y={p(43.3)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
      >
        Fill FVG
      </text>

      {/* Bounce arrow */}
      <path
        d={`M 375 ${p(43.5)} Q 420 ${p(44)} 445 ${p(48)}`}
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
        strokeDasharray="4,3"
        opacity={0.6}
      />
    </Chart>
  );
}

// ── Chart Step 2 — Volume Imbalance ──────────────────────────────────────────

function ChartVI() {
  const MIN = 36,
    MAX = 52;
  const p = (v: number) => py(v, MIN, MAX);
  const candles = [
    { x: 60, o: 38, h: 39.5, l: 37.5, c: 39 },
    { x: 95, o: 39, h: 40.5, l: 38.5, c: 40 },
    { x: 130, o: 40, h: 41.5, l: 39.5, c: 41 },
    { x: 165, o: 41, h: 43, l: 40.5, c: 42.5 }, // nến A — close 42.5
    { x: 200, o: 44, h: 46, l: 43.5, c: 45.5 }, // nến B — open 44 → gap thân
    { x: 235, o: 45.5, h: 47, l: 45, c: 46.5 },
    { x: 270, o: 46.5, h: 47.5, l: 45.5, c: 46 },
    { x: 305, o: 46, h: 46.5, l: 44, c: 44.5 },
    { x: 340, o: 44.5, h: 45, l: 43, c: 43.5 }, // fill VI
    { x: 375, o: 43.5, h: 45.5, l: 43, c: 45 },
    { x: 410, o: 45, h: 47, l: 44.5, c: 46.5 },
  ];
  // VI: close nến A (42.5) → open nến B (44)
  const VI_BOT = 42.5;
  const VI_TOP = 44.0;

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* VI zone */}
      <rect
        x={36}
        y={p(VI_TOP)}
        width={W - 44}
        height={p(VI_BOT) - p(VI_TOP)}
        fill="rgba(96,165,250,0.08)"
      />
      <line
        x1={36}
        y1={p(VI_TOP)}
        x2={W - 8}
        y2={p(VI_TOP)}
        stroke="#60a5fa"
        strokeWidth={1}
        strokeDasharray="4,4"
        opacity={0.6}
      />
      <line
        x1={36}
        y1={p(VI_BOT)}
        x2={W - 8}
        y2={p(VI_BOT)}
        stroke="#60a5fa"
        strokeWidth={1}
        strokeDasharray="4,4"
        opacity={0.6}
      />
      <text
        x={W / 2}
        y={p((VI_BOT + VI_TOP) / 2) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#60a5fa"
        textAnchor="middle"
        fontWeight={600}
      >
        VI
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* Labels */}
      <text
        x={165}
        y={p(43.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Close A
      </text>
      <text
        x={200}
        y={p(44.8)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Open B
      </text>

      <circle
        cx={340}
        cy={p(43)}
        r={6}
        fill="none"
        stroke="#60a5fa"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={352}
        y={p(42.8)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#60a5fa"
      >
        Fill VI
      </text>

      <text
        x={W / 2}
        y={H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        VI nhỏ hơn FVG — chỉ là gap giữa thân 2 nến liên tiếp
      </text>
    </Chart>
  );
}

// ── Chart Step 3 — NDOG / NWOG ────────────────────────────────────────────────

function ChartGap() {
  const MIN = 36,
    MAX = 52;
  const p = (v: number) => py(v, MIN, MAX);

  // Thứ Sáu đóng cửa 44, Thứ Hai mở cửa 46 → NWOG = 44-46
  const PREV_CLOSE = 44;
  const TODAY_OPEN = 46.5;
  const candles = [
    // Thứ Sáu
    { x: 60, o: 41, h: 42.5, l: 40.5, c: 42 },
    { x: 95, o: 42, h: 43.5, l: 41.5, c: 43 },
    { x: 130, o: 43, h: 44.5, l: 42.5, c: 44 }, // đóng cửa cuối tuần
    // Thứ Hai — gap lên
    { x: 235, o: 46.5, h: 48, l: 46, c: 47.5 },
    { x: 270, o: 47.5, h: 49, l: 47, c: 48.5 },
    { x: 305, o: 48.5, h: 49.5, l: 47.5, c: 48 },
    { x: 340, o: 48, h: 48.5, l: 46, c: 46.5 },
    { x: 375, o: 46.5, h: 47, l: 44.5, c: 45 }, // fill gap
    { x: 410, o: 45, h: 46.5, l: 44.5, c: 46 },
    { x: 445, o: 46, h: 48.5, l: 45.5, c: 48 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* Gap zone */}
      <rect
        x={36}
        y={p(TODAY_OPEN)}
        width={W - 44}
        height={p(PREV_CLOSE) - p(TODAY_OPEN)}
        fill="rgba(167,139,250,0.07)"
      />
      <line
        x1={36}
        y1={p(TODAY_OPEN)}
        x2={W - 8}
        y2={p(TODAY_OPEN)}
        stroke="#a78bfa"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.6}
      />
      <line
        x1={36}
        y1={p(PREV_CLOSE)}
        x2={W - 8}
        y2={p(PREV_CLOSE)}
        stroke="#a78bfa"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.6}
      />
      <text
        x={W / 2}
        y={p((PREV_CLOSE + TODAY_OPEN) / 2) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#a78bfa"
        textAnchor="middle"
        fontWeight={600}
      >
        NWOG
      </text>

      {/* Weekend separator */}
      <line
        x1={185}
        y1={20}
        x2={185}
        y2={H - 10}
        stroke="#263550"
        strokeWidth={1}
        strokeDasharray="3,4"
      />
      <text
        x={185}
        y={16}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#263550"
        textAnchor="middle"
      >
        Weekend
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* Labels */}
      <text
        x={130}
        y={p(44.7)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Đóng Thứ 6
      </text>
      <text
        x={235}
        y={p(47.2)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Mở Thứ 2
      </text>

      <circle
        cx={375}
        cy={p(44.5)}
        r={6}
        fill="none"
        stroke="#a78bfa"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={387}
        y={p(44.3)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
      >
        Fill gap
      </text>
    </Chart>
  );
}

// ── Chart Step 4 — Order Block ────────────────────────────────────────────────

function ChartOB() {
  const MIN = 36,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);
  const candles = [
    { x: 60, o: 39, h: 40.5, l: 38.5, c: 40 },
    { x: 95, o: 40, h: 41.5, l: 39.5, c: 41 },
    { x: 130, o: 41, h: 42.5, l: 40.5, c: 42 },
    { x: 165, o: 42, h: 43, l: 40.5, c: 41 }, // OB — nến đỏ cuối trước impulse
    { x: 200, o: 41, h: 49, l: 40.5, c: 48.5 }, // impulse tăng mạnh
    { x: 235, o: 48.5, h: 50, l: 46.5, c: 49 },
    { x: 270, o: 49, h: 49.5, l: 47.5, c: 48 },
    { x: 305, o: 48, h: 48.5, l: 46, c: 46.5 },
    { x: 340, o: 46.5, h: 47, l: 43, c: 43.5 }, // retest OB
    { x: 375, o: 43.5, h: 45.5, l: 43, c: 45 }, // bounce
    { x: 410, o: 45, h: 48, l: 44.5, c: 47.5 },
    { x: 445, o: 47.5, h: 51, l: 47, c: 50.5 },
  ];
  // OB: nến đỏ tại x=165 → thân từ 42 đến 40.5
  const OB_TOP = 42;
  const OB_BOT = 40.5;

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* OB zone */}
      <rect
        x={36}
        y={p(OB_TOP)}
        width={W - 44}
        height={p(OB_BOT) - p(OB_TOP)}
        fill="rgba(52,211,153,0.07)"
      />
      <line
        x1={36}
        y1={p(OB_TOP)}
        x2={W - 8}
        y2={p(OB_TOP)}
        stroke="#34d399"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <line
        x1={36}
        y1={p(OB_BOT)}
        x2={W - 8}
        y2={p(OB_BOT)}
        stroke="#34d399"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <text
        x={W / 2}
        y={p((OB_TOP + OB_BOT) / 2) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={600}
      >
        Bullish OB
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* OB arrow */}
      <text
        x={165}
        y={p(43.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#34d399"
        textAnchor="middle"
      >
        OB
      </text>

      {/* Impulse label */}
      <text
        x={200}
        y={p(50)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
      >
        Impulse
      </text>

      {/* Retest annotation */}
      <circle
        cx={340}
        cy={p(43)}
        r={7}
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={353}
        y={p(42.8)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
      >
        Retest OB
      </text>

      {/* Bounce */}
      <path
        d={`M 375 ${p(43)} Q 415 ${p(44.5)} 445 ${p(50.5)}`}
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
        strokeDasharray="4,3"
        opacity={0.6}
      />
    </Chart>
  );
}

// ── Chart Step 5 — BPR ────────────────────────────────────────────────────────

function ChartBPR() {
  const MIN = 36,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);

  // Bullish FVG: 41-44 | Bearish FVG: 43-46 → BPR overlap = 43-44
  const BULL_FVG_BOT = 41;
  const BULL_FVG_TOP = 44;
  const BEAR_FVG_BOT = 43;
  const BEAR_FVG_TOP = 46;
  const BPR_BOT = 43;
  const BPR_TOP = 44;

  const candles = [
    { x: 60, o: 39, h: 40, l: 38.5, c: 39.5 },
    { x: 95, o: 39.5, h: 44.5, l: 39, c: 44 }, // bull impulse (bull FVG hình thành)
    { x: 130, o: 44, h: 46, l: 43.5, c: 45.5 }, // nến 3 của bull FVG
    { x: 165, o: 45.5, h: 47, l: 43.5, c: 44 }, // bear impulse
    { x: 200, o: 44, h: 44.5, l: 41, c: 41.5 }, // nến 3 bear FVG
    { x: 235, o: 41.5, h: 42.5, l: 40.5, c: 42 },
    { x: 270, o: 42, h: 43.5, l: 41.5, c: 43.2 }, // tiếp cận BPR
    { x: 305, o: 43.2, h: 44.2, l: 43, c: 43.8 }, // vào BPR
    { x: 340, o: 43.8, h: 46, l: 43.5, c: 45.5 }, // bounce
    { x: 375, o: 45.5, h: 48, l: 45, c: 47.5 },
    { x: 410, o: 47.5, h: 50, l: 47, c: 49.5 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* Bullish FVG */}
      <rect
        x={36}
        y={p(BULL_FVG_TOP)}
        width={W - 44}
        height={p(BULL_FVG_BOT) - p(BULL_FVG_TOP)}
        fill="rgba(52,211,153,0.04)"
      />
      <text
        x={52}
        y={p(BULL_FVG_TOP) - 4}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#34d399"
        opacity={0.6}
      >
        Bull FVG
      </text>

      {/* Bearish FVG */}
      <rect
        x={36}
        y={p(BEAR_FVG_TOP)}
        width={W - 44}
        height={p(BEAR_FVG_BOT) - p(BEAR_FVG_TOP)}
        fill="rgba(248,113,113,0.04)"
      />
      <text
        x={52}
        y={p(BEAR_FVG_TOP) - 4}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#f87171"
        opacity={0.6}
      >
        Bear FVG
      </text>

      {/* BPR overlap */}
      <rect
        x={36}
        y={p(BPR_TOP)}
        width={W - 44}
        height={p(BPR_BOT) - p(BPR_TOP)}
        fill="rgba(245,158,11,0.12)"
      />
      <line
        x1={36}
        y1={p(BPR_TOP)}
        x2={W - 8}
        y2={p(BPR_TOP)}
        stroke="#f59e0b"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.6}
      />
      <line
        x1={36}
        y1={p(BPR_BOT)}
        x2={W - 8}
        y2={p(BPR_BOT)}
        stroke="#f59e0b"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.6}
      />
      <text
        x={W / 2}
        y={p((BPR_BOT + BPR_TOP) / 2) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={600}
      >
        BPR (overlap)
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      <text
        x={W / 2}
        y={H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        BPR = vùng giao nhau giữa Bull FVG và Bear FVG — mạnh nhất
      </text>
    </Chart>
  );
}

// ── Chart Step 6 — Tổng kết ───────────────────────────────────────────────────

function ChartSummary() {
  const MIN = 34,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);
  const candles = [
    { x: 50, o: 37, h: 38.5, l: 36.5, c: 38 },
    { x: 82, o: 38, h: 39.5, l: 37.5, c: 39 },
    { x: 114, o: 39, h: 40.5, l: 38.5, c: 40 },
    { x: 146, o: 40, h: 40.5, l: 38.5, c: 39 }, // OB
    { x: 178, o: 39, h: 47, l: 38.5, c: 46.5 }, // impulse — FVG hình thành
    { x: 210, o: 46.5, h: 48, l: 45, c: 47.5 }, // nến 3 FVG
    { x: 242, o: 47.5, h: 49, l: 47, c: 48.5 },
    { x: 274, o: 48.5, h: 49.5, l: 47.5, c: 48 },
    { x: 306, o: 48, h: 48.5, l: 46, c: 46.5 },
    { x: 338, o: 46.5, h: 47, l: 44, c: 44.5 }, // pullback vào FVG+OB
    { x: 370, o: 44.5, h: 46, l: 44, c: 45.5 }, // bounce
    { x: 402, o: 45.5, h: 49, l: 45, c: 48.5 },
    { x: 434, o: 48.5, h: 52, l: 48, c: 51.5 },
    { x: 466, o: 51.5, h: 55, l: 51, c: 54.5 },
  ];
  // FVG: 40.5 → 45
  // OB:  38.5 → 40

  return (
    <Chart min={MIN} max={MAX} step={4}>
      {/* OB */}
      <rect
        x={36}
        y={p(40)}
        width={W - 44}
        height={p(38.5) - p(40)}
        fill="rgba(52,211,153,0.06)"
      />
      <text
        x={52}
        y={p(40.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        opacity={0.7}
      >
        OB
      </text>

      {/* FVG */}
      <rect
        x={36}
        y={p(45)}
        width={W - 44}
        height={p(40.5) - p(45)}
        fill="rgba(245,158,11,0.06)"
      />
      <line
        x1={36}
        y1={p(45)}
        x2={W - 8}
        y2={p(45)}
        stroke="#f59e0b"
        strokeWidth={0.8}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <line
        x1={36}
        y1={p(40.5)}
        x2={W - 8}
        y2={p(40.5)}
        stroke="#f59e0b"
        strokeWidth={0.8}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <text
        x={W / 2}
        y={p(42.7) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={600}
      >
        FVG + OB confluence
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* Entry annotation */}
      <circle
        cx={370}
        cy={p(44)}
        r={7}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={383}
        y={p(43.8)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
      >
        Entry zone
      </text>

      {/* Target */}
      <line
        x1={434}
        y1={p(55)}
        x2={W - 8}
        y2={p(55)}
        stroke="#a78bfa"
        strokeWidth={1}
        strokeDasharray="3,4"
        opacity={0.5}
      />
      <text
        x={W - 10}
        y={p(55) - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
        textAnchor="end"
      >
        BSL Target
      </text>
    </Chart>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    label: "Slide 1 — Fair Value Gap",
    badge: "FVG",
    title: "Fair Value Gap — Khoảng trống 3 nến",
    chart: <ChartFVG />,
    body: (
      <>
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          FVG (Fair Value Gap)
        </span>{" "}
        hình thành khi có một nến xung lực mạnh tạo ra khoảng trống giữa{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          High của nến 1
        </span>{" "}
        và{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>Low của nến 3</span>
        .
        <br />
        <br />
        Tại vùng đó giá di chuyển quá nhanh — không đủ giao dịch ở cả 2 phía mua
        và bán. Thị trường sẽ quay lại để{" "}
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          cân bằng lại
        </span>{" "}
        vùng này trước khi tiếp tục trend.
        <br />
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          Bullish FVG:
        </span>{" "}
        hình thành trong đà tăng → giá pullback xuống fill rồi tăng tiếp.
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          Bearish FVG:
        </span>{" "}
        hình thành trong đà giảm → giá bounce lên fill rồi giảm tiếp.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        FVG được xem là đã "filled" khi giá chạm vào 50% của vùng gap
        (midpoint). Không nhất thiết phải fill 100%.
      </p>
    ),
  },
  {
    label: "Slide 2 — Volume Imbalance",
    badge: "VI",
    title: "Volume Imbalance — Gap giữa thân 2 nến",
    chart: <ChartVI />,
    body: (
      <>
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>
          Volume Imbalance (VI)
        </span>{" "}
        nhỏ hơn FVG — đây là khoảng trống giữa{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          thân (close/open)
        </span>{" "}
        của 2 nến liên tiếp, không phải giữa bóng nến.
        <br />
        <br />
        Khi Close của nến A thấp hơn Open của nến B → có VI. Giá vẫn sẽ muốn
        fill vùng này nhưng{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          ưu tiên thấp hơn FVG
        </span>
        .
        <br />
        <br />
        Dùng VI như một vùng hỗ trợ phụ — kết hợp với FVG hoặc OB sẽ tạo ra vùng
        confluence mạnh hơn.
      </>
    ),
  },
  {
    label: "Slide 3 — NDOG / NWOG",
    badge: "Opening Gap",
    title: "NDOG / NWOG — Gap phiên mở cửa",
    chart: <ChartGap />,
    body: (
      <>
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>
          NWOG (New Week Opening Gap)
        </span>{" "}
        là khoảng cách giữa giá đóng cửa thứ Sáu và giá mở cửa thứ Hai. Tương
        tự,{" "}
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>
          NDOG (New Day Opening Gap)
        </span>{" "}
        là gap giữa close hôm qua và open hôm nay.
        <br />
        <br />
        Đây là dạng mất cân bằng rõ ràng nhất — không có ai giao dịch trong
        khoảng thời gian thị trường đóng cửa → giá sẽ thường{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          fill gap này sớm
        </span>{" "}
        trong phiên mở cửa.
        <br />
        <br />
        NWOG đặc biệt quan trọng vào đầu tuần — thị trường thường sweep gap
        trước khi đi theo hướng tuần.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        NWOG thường được fill trong 2 ngày đầu tuần (Thứ 2, Thứ 3). Nếu gap quá
        lớn, thị trường có thể fill một phần rồi mới tiếp tục trend.
      </p>
    ),
  },
  {
    label: "Slide 4 — Order Block",
    badge: "OB",
    title: "Order Block — Dấu chân của Smart Money",
    chart: <ChartOB />,
    body: (
      <>
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Order Block (OB)
        </span>{" "}
        là{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          nến cuối cùng ngược chiều
        </span>{" "}
        trước một chuỗi impulse mạnh — đây là nơi{" "}
        <ConceptLink slug="smart-money">Smart Money</ConceptLink> đặt lệnh lớn
        để tạo ra cú tăng/giảm đó.
        <br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Bullish OB:
        </span>{" "}
        nến đỏ cuối cùng trước impulse tăng → khi giá pullback về vùng này sẽ có
        cầu mạnh.
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          Bearish OB:
        </span>{" "}
        nến xanh cuối cùng trước impulse giảm → khi giá bounce lên vùng này sẽ
        có cung mạnh.
        <br />
        <br />
        OB tạo ra vùng mất cân bằng vì{" "}
        <ConceptLink slug="smart-money">Smart Money</ConceptLink> chưa khớp hết
        lệnh ở đó — họ cần giá quay lại để hoàn thành.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        OB hợp lệ cần đủ 3 điều kiện: (1) là nến{" "}
        <strong style={{ color: "#eaf0f6" }}>cuối cùng</strong> ngược chiều
        trước impulse, (2) có BOS/CHoCH sau impulse xác nhận, (3) chưa bị giá
        "mitigated" (chạm qua hoàn toàn). OB bị mitigated = mất hiệu lực hoàn
        toàn.
      </p>
    ),
  },
  {
    label: "Slide 5 — BPR",
    badge: "BPR",
    title: "Balanced Price Range — Vùng cân bằng kép",
    chart: <ChartBPR />,
    body: (
      <>
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          BPR (Balanced Price Range)
        </span>{" "}
        là vùng giao nhau giữa một{" "}
        <span style={{ color: "#34d399", fontWeight: 500 }}>Bullish FVG</span>{" "}
        và một{" "}
        <span style={{ color: "#f87171", fontWeight: 500 }}>Bearish FVG</span>.
        <br />
        <br />
        Đây là vùng{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          cân bằng nhất trên chart
        </span>{" "}
        — cả bên mua lẫn bên bán đều chưa được "phục vụ" ở đó. Khi giá quay lại
        BPR, phản ứng thường rất mạnh vì đây là điểm cân bằng thực sự của thị
        trường.
        <br />
        <br />
        BPR mạnh hơn FVG đơn lẻ — dùng khi tìm{" "}
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          entry với độ chính xác cao
        </span>
        .
      </>
    ),
  },
  {
    label: "Slide 6 — Tổng kết",
    badge: "Tổng kết",
    title: "Fill Gap — Confluence là chìa khóa",
    chart: <ChartSummary />,
    body: (
      <>
        Các vùng gap không tồn tại riêng lẻ — chúng{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          chồng lên nhau
        </span>{" "}
        tạo ra vùng confluence mạnh:
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>FVG + OB</span> ở
        cùng một vùng giá → xác suất phản ứng rất cao.
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          BPR + Liquidity
        </span>{" "}
        → vùng entry tối ưu nhất.
        <br />
        <br />
        Chart minh họa: giá pullback vào vùng{" "}
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          FVG + OB confluence
        </span>{" "}
        → bounce mạnh hướng tới BSL phía trên.
        <br />
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          Thứ tự ưu tiên:
        </span>{" "}
        BPR {">"} FVG + OB {">"} FVG {">"} VI {">"} OB đơn lẻ.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Không phải mọi gap đều sẽ được fill. Gap trên HTF (Daily, Weekly) có độ
        tin cậy cao hơn gap trên LTF (M5, M15). Luôn xác nhận bằng trend HTF
        trước.
      </p>
    ),
  },
];

const CONFIG = {
  group: "Nhóm 2 · Bài 08",
  heading: "Lấp Đầy Khoảng Trống",
  subhead:
    "FVG, Volume Imbalance, NDOG/NWOG, Order Block, BPR — các vùng mất cân bằng cần fill.",
  accentColor: "#f59e0b",
  steps: STEPS,
};

export default function FillTheGapPage() {
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
