"use client";

import { useState, useCallback } from "react";
import { LessonPage, type LessonStep } from "@/components/shared/LessonPage";
import { Chart, Candle, py, CHART_W, CHART_H } from "@/components/shared/chart";
import { ConceptLink } from "@/components/shared/lesson/ConceptLink";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chart 1 — STH / STL  (3-candle pattern — 1 candle mỗi bên)
// ĐÂY LÀ ĐÚNG — giữ nguyên logic cũ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartSTH() {
  const MIN = 36,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);

  const candles = [
    { x: 55, o: 39, h: 40.5, l: 38.5, c: 40 },
    { x: 88, o: 40, h: 41.5, l: 39.5, c: 41 },
    // ── STH pattern: L → STH → R ──
    { x: 121, o: 41, h: 43, l: 40.5, c: 42.5 }, // L (lower high)
    { x: 154, o: 42.5, h: 45, l: 42, c: 44.5 }, // ★ STH (highest)
    { x: 187, o: 44.5, h: 44.2, l: 43, c: 43.5 }, // R (lower high)
    { x: 220, o: 43.5, h: 44, l: 42, c: 42.5 },
    // ── STL pattern: L → STL → R ──
    { x: 253, o: 42.5, h: 43, l: 41, c: 41.5 }, // L (higher low)
    { x: 286, o: 41.5, h: 42, l: 39.5, c: 40 }, // ★ STL (lowest)
    { x: 319, o: 40, h: 41.5, l: 40, c: 41 }, // R (higher low)
    { x: 352, o: 41, h: 42.5, l: 40.5, c: 42 },
    { x: 385, o: 42, h: 43.5, l: 41.5, c: 43 },
    { x: 418, o: 43, h: 45, l: 42.5, c: 44.5 },
    { x: 451, o: 44.5, h: 46, l: 44, c: 45.5 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* STH horizontal line */}
      <line
        x1={36}
        y1={p(45)}
        x2={CHART_W - 8}
        y2={p(45)}
        stroke="#a78bfa"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <text
        x={CHART_W - 10}
        y={p(45) - 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#a78bfa"
        textAnchor="end"
        fontWeight={600}
      >
        STH
      </text>

      {/* STL horizontal line */}
      <line
        x1={36}
        y1={p(39.5)}
        x2={CHART_W - 8}
        y2={p(39.5)}
        stroke="#34d399"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <text
        x={CHART_W - 10}
        y={p(39.5) + 13}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
        textAnchor="end"
        fontWeight={600}
      >
        STL
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* STH annotation: L → STH → R */}
      <text
        x={121}
        y={p(43.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        L
      </text>
      <text
        x={154}
        y={p(45.8)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#a78bfa"
        textAnchor="middle"
        fontWeight={600}
      >
        STH
      </text>
      <text
        x={187}
        y={p(45)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        R
      </text>

      {/* STL annotation: L → STL → R */}
      <text
        x={253}
        y={p(40.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        L
      </text>
      <text
        x={286}
        y={p(38.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={600}
      >
        STL
      </text>
      <text
        x={319}
        y={p(40.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        R
      </text>

      {/* Bracket for STH */}
      <path
        d={`M 115 ${p(45) - 14} Q 154 ${p(45) - 24} 193 ${p(45) - 14}`}
        fill="none"
        stroke="#a78bfa"
        strokeWidth={0.8}
        opacity={0.6}
      />
      <text
        x={154}
        y={p(45) - 26}
        fontFamily="JetBrains Mono"
        fontSize={7}
        fill="#a78bfa"
        textAnchor="middle"
        opacity={0.8}
      >
        3 nến
      </text>

      {/* Formula */}
      <text
        x={CHART_W / 2}
        y={CHART_H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        STH/STL = 3-candle swing pattern · nến giữa cao/thấp nhất
      </text>
    </Chart>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chart 2 — ITH / ITL  ★ ĐÃ SỬA ★
// ITH = một STH có STH thấp hơn ở mỗi bên (hierarchy, KHÔNG phải đếm raw candle)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartITH() {
  const MIN = 34,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);

  // Mô phỏng giá tạo ra 3 STH, trong đó STH giữa cao nhất = ITH
  const candles = [
    // ── STH #1 (thấp hơn) ──
    { x: 42, o: 37, h: 38.5, l: 36.5, c: 38 },
    { x: 60, o: 38, h: 40, l: 37.5, c: 39.5 }, // L
    { x: 78, o: 39.5, h: 43, l: 39, c: 42.5 }, // ★ STH #1 = 43
    { x: 96, o: 42.5, h: 42.8, l: 41, c: 41.5 }, // R
    { x: 114, o: 41.5, h: 42, l: 40, c: 40.5 },

    // ── Pullback ──
    { x: 132, o: 40.5, h: 41, l: 39, c: 39.5 },
    { x: 150, o: 39.5, h: 40.5, l: 39, c: 40 },

    // ── STH #2 (CAO NHẤT = ITH) ──
    { x: 168, o: 40, h: 42.5, l: 39.5, c: 42 }, // L
    { x: 186, o: 42, h: 44.5, l: 41.5, c: 44 },
    { x: 204, o: 44, h: 48, l: 43.5, c: 47.5 },
    { x: 222, o: 47.5, h: 52, l: 47, c: 51.5 }, // ★ STH #2 = 52 (ITH!)
    { x: 240, o: 51.5, h: 51.8, l: 49.5, c: 50 }, // R
    { x: 258, o: 50, h: 50.5, l: 48, c: 48.5 },

    // ── Pullback ──
    { x: 276, o: 48.5, h: 49, l: 46, c: 46.5 },
    { x: 294, o: 46.5, h: 47.5, l: 44.5, c: 45 },
    { x: 312, o: 45, h: 46, l: 43.5, c: 44 },

    // ── STH #3 (thấp hơn) ──
    { x: 330, o: 44, h: 45.5, l: 43.5, c: 45 }, // L
    { x: 348, o: 45, h: 48, l: 44.5, c: 47.5 }, // ★ STH #3 = 48
    { x: 366, o: 47.5, h: 47.8, l: 46, c: 46.5 }, // R
    { x: 384, o: 46.5, h: 47, l: 45, c: 45.5 },

    // ── Tiếp tục giảm ──
    { x: 402, o: 45.5, h: 46, l: 43.5, c: 44 },
    { x: 420, o: 44, h: 44.5, l: 42, c: 42.5 },
    { x: 438, o: 42.5, h: 43, l: 40.5, c: 41 },
  ];

  const STH1 = 43,
    STH2 = 52,
    STH3 = 48;

  return (
    <Chart min={MIN} max={MAX} step={4}>
      {/* ITH line (STH #2 — cao nhất) */}
      <line
        x1={36}
        y1={p(STH2)}
        x2={CHART_W - 8}
        y2={p(STH2)}
        stroke="#f59e0b"
        strokeWidth={1.4}
        strokeDasharray="6,4"
        opacity={0.7}
      />
      <text
        x={CHART_W - 10}
        y={p(STH2) - 5}
        fontFamily="JetBrains Mono"
        fontSize={10}
        fill="#f59e0b"
        textAnchor="end"
        fontWeight={700}
      >
        ITH
      </text>

      {/* STH #1 line */}
      <line
        x1={42}
        y1={p(STH1)}
        x2={114}
        y2={p(STH1)}
        stroke="#a78bfa"
        strokeWidth={0.8}
        strokeDasharray="3,4"
        opacity={0.5}
      />

      {/* STH #3 line */}
      <line
        x1={330}
        y1={p(STH3)}
        x2={402}
        y2={p(STH3)}
        stroke="#a78bfa"
        strokeWidth={0.8}
        strokeDasharray="3,4"
        opacity={0.5}
      />

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} w={11} />
      ))}

      {/* STH #1 label */}
      <rect
        x={58}
        y={p(STH1) - 18}
        width={44}
        height={14}
        fill="rgba(167,139,250,0.1)"
        rx={3}
      />
      <text
        x={80}
        y={p(STH1) - 8}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
        textAnchor="middle"
        fontWeight={600}
      >
        STH ①
      </text>

      {/* STH #2 / ITH label */}
      <rect
        x={200}
        y={p(STH2) - 18}
        width={50}
        height={14}
        fill="rgba(245,158,11,0.15)"
        rx={3}
      />
      <text
        x={225}
        y={p(STH2) - 8}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={700}
      >
        ★ STH ②
      </text>

      {/* STH #3 label */}
      <rect
        x={326}
        y={p(STH3) - 18}
        width={44}
        height={14}
        fill="rgba(167,139,250,0.1)"
        rx={3}
      />
      <text
        x={348}
        y={p(STH3) - 8}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
        textAnchor="middle"
        fontWeight={600}
      >
        STH ③
      </text>

      {/* Hierarchy bracket: STH① < STH② > STH③ → ITH */}
      <path
        d={`M 80 ${p(STH1) - 22} Q 225 ${p(55)} 348 ${p(STH3) - 22}`}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1}
        opacity={0.5}
        strokeDasharray="4,3"
      />
      <text
        x={225}
        y={p(56.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={600}
      >
        STH② cao nhất → ITH
      </text>

      {/* Bottom formula */}
      <text
        x={CHART_W / 2}
        y={CHART_H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        ITH = STH có STH thấp hơn ở mỗi bên · Hierarchy, không phải đếm raw
        candle
      </text>
    </Chart>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chart 3 — Hierarchy Diagram  ★ MỚI ★
// Minh họa cấu trúc lồng nhau: Candle → STH/STL → ITH/ITL → LTH/LTL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartHierarchy() {
  // Đây là diagram thuần SVG, không cần candle
  const W = 580,
    H = 300;

  const boxStyle = (color: string) => ({
    rx: 6,
    fill: `${color}12`,
    stroke: color,
    strokeWidth: 1.2,
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {/* Background grid */}
      <rect width={W} height={H} fill="transparent" />

      {/* Level 0 — Raw Candles */}
      <rect x={30} y={220} width={520} height={50} {...boxStyle("#5a6d85")} />
      <text
        x={290}
        y={242}
        fontFamily="JetBrains Mono"
        fontSize={10}
        fill="#5a6d85"
        textAnchor="middle"
        fontWeight={600}
      >
        Raw Candles (nến thô)
      </text>
      <text
        x={290}
        y={258}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
        opacity={0.7}
      >
        Mỗi nến = 1 OHLC trên bất kỳ timeframe nào
      </text>

      {/* Level 1 — STH/STL */}
      <rect x={60} y={148} width={200} height={50} {...boxStyle("#a78bfa")} />
      <text
        x={160}
        y={170}
        fontFamily="JetBrains Mono"
        fontSize={10}
        fill="#a78bfa"
        textAnchor="middle"
        fontWeight={600}
      >
        STH / STL
      </text>
      <text
        x={160}
        y={186}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
        textAnchor="middle"
        opacity={0.7}
      >
        3-candle pattern · 1 nến mỗi bên
      </text>

      <rect x={320} y={148} width={200} height={50} {...boxStyle("#34d399")} />
      <text
        x={420}
        y={170}
        fontFamily="JetBrains Mono"
        fontSize={10}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={600}
      >
        STL / STH
      </text>
      <text
        x={420}
        y={186}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
        opacity={0.7}
      >
        Swing point cơ bản nhất
      </text>

      {/* Arrows: Candles → STH/STL */}
      <line
        x1={160}
        y1={220}
        x2={160}
        y2={198}
        stroke="#a78bfa"
        strokeWidth={1}
        markerEnd="url(#arrowPurple)"
      />
      <line
        x1={420}
        y1={220}
        x2={420}
        y2={198}
        stroke="#34d399"
        strokeWidth={1}
        markerEnd="url(#arrowGreen)"
      />

      {/* Level 2 — ITH/ITL */}
      <rect x={120} y={76} width={340} height={50} {...boxStyle("#f59e0b")} />
      <text
        x={290}
        y={98}
        fontFamily="JetBrains Mono"
        fontSize={10}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={600}
      >
        ITH / ITL
      </text>
      <text
        x={290}
        y={114}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        textAnchor="middle"
        opacity={0.7}
      >
        STH có STH thấp hơn mỗi bên · STL có STL cao hơn mỗi bên
      </text>

      {/* Arrows: STH/STL → ITH/ITL */}
      <line
        x1={160}
        y1={148}
        x2={240}
        y2={126}
        stroke="#f59e0b"
        strokeWidth={1}
        markerEnd="url(#arrowAmber)"
      />
      <line
        x1={420}
        y1={148}
        x2={340}
        y2={126}
        stroke="#f59e0b"
        strokeWidth={1}
        markerEnd="url(#arrowAmber)"
      />

      {/* Level 3 — LTH/LTL */}
      <rect x={180} y={10} width={220} height={46} {...boxStyle("#f87171")} />
      <text
        x={290}
        y={30}
        fontFamily="JetBrains Mono"
        fontSize={10}
        fill="#f87171"
        textAnchor="middle"
        fontWeight={600}
      >
        LTH / LTL
      </text>
      <text
        x={290}
        y={44}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        textAnchor="middle"
        opacity={0.7}
      >
        ITH có ITH thấp hơn mỗi bên · Mạnh nhất
      </text>

      {/* Arrow: ITH/ITL → LTH/LTL */}
      <line
        x1={290}
        y1={76}
        x2={290}
        y2={56}
        stroke="#f87171"
        strokeWidth={1}
        markerEnd="url(#arrowRed)"
      />

      {/* Arrow markers */}
      <defs>
        <marker
          id="arrowPurple"
          markerWidth={6}
          markerHeight={6}
          refX={5}
          refY={3}
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#a78bfa" />
        </marker>
        <marker
          id="arrowGreen"
          markerWidth={6}
          markerHeight={6}
          refX={5}
          refY={3}
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
        </marker>
        <marker
          id="arrowAmber"
          markerWidth={6}
          markerHeight={6}
          refX={5}
          refY={3}
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
        </marker>
        <marker
          id="arrowRed"
          markerWidth={6}
          markerHeight={6}
          refX={5}
          refY={3}
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#f87171" />
        </marker>
      </defs>
    </svg>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chart 4 — MSS  (giữ logic cũ, cập nhật label cho nhất quán)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartMSS() {
  const MIN = 34,
    MAX = 56;
  const p = (v: number) => py(v, MIN, MAX);

  const candles = [
    // Uptrend
    { x: 45, o: 37, h: 38.5, l: 36.5, c: 38 },
    { x: 75, o: 38, h: 40, l: 37.5, c: 39.5 },
    { x: 105, o: 39.5, h: 42, l: 39, c: 41.5 },
    { x: 135, o: 41.5, h: 44, l: 41, c: 43.5 },
    { x: 165, o: 43.5, h: 46, l: 43, c: 45.5 }, // STH
    { x: 195, o: 45.5, h: 46.5, l: 43.5, c: 44 }, // pullback
    { x: 225, o: 44, h: 44.5, l: 42, c: 42.5 }, // STL tại 42
    { x: 255, o: 42.5, h: 48, l: 42, c: 47.5 }, // sweep BSL
    { x: 285, o: 47.5, h: 48.5, l: 45.5, c: 46 }, // reject
    { x: 315, o: 46, h: 46.5, l: 43.5, c: 44 },
    { x: 345, o: 44, h: 44.5, l: 41.5, c: 42 }, // MSS — phá STL
    { x: 375, o: 42, h: 42.5, l: 39.5, c: 40 },
    { x: 405, o: 40, h: 41, l: 38, c: 38.5 },
    { x: 435, o: 38.5, h: 40, l: 37, c: 37.5 },
    { x: 465, o: 37.5, h: 38, l: 35.5, c: 36 },
  ];

  const BSL = 46;
  const STL_BEFORE = 42;

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* BSL line */}
      <line
        x1={36}
        y1={p(BSL)}
        x2={CHART_W - 8}
        y2={p(BSL)}
        stroke="#a78bfa"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <text
        x={52}
        y={p(BSL) - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
        opacity={0.7}
      >
        BSL (STH cũ)
      </text>

      {/* STL before MSS */}
      <line
        x1={36}
        y1={p(STL_BEFORE)}
        x2={CHART_W - 8}
        y2={p(STL_BEFORE)}
        stroke="#f87171"
        strokeWidth={1.2}
        strokeDasharray="5,4"
        opacity={0.6}
      />
      <text
        x={52}
        y={p(STL_BEFORE) + 13}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        opacity={0.8}
      >
        STL — MSS khi bị phá
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}

      {/* Sweep BSL annotation */}
      <circle
        cx={255}
        cy={p(48)}
        r={7}
        fill="none"
        stroke="#a78bfa"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={268}
        y={p(48.3)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
      >
        Sweep BSL
      </text>

      {/* MSS annotation */}
      <rect
        x={320}
        y={p(42.5)}
        width={60}
        height={18}
        fill="rgba(248,113,113,0.1)"
        rx={4}
      />
      <text
        x={350}
        y={p(41.5)}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f87171"
        textAnchor="middle"
        fontWeight={700}
      >
        MSS
      </text>

      {/* Arrow showing new trend */}
      <path
        d={`M 435 ${p(37.5)} L 465 ${p(36)}`}
        stroke="#f87171"
        strokeWidth={1.5}
        fill="none"
        markerEnd="url(#arrowMSS)"
      />
      <defs>
        <marker
          id="arrowMSS"
          markerWidth={6}
          markerHeight={6}
          refX={5}
          refY={3}
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#f87171" />
        </marker>
      </defs>

      <text
        x={CHART_W / 2}
        y={CHART_H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Sweep BSL → phá STL → MSS → Bearish confirmed
      </text>
    </Chart>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chart 5 — Vòng lặp Liquidity
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartCycle() {
  const MIN = 32,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);

  const candles = [
    // Uptrend — tạo STH/STL
    { x: 38, o: 35, h: 36.5, l: 34.5, c: 36 },
    { x: 56, o: 36, h: 38, l: 35.5, c: 37.5 },
    { x: 74, o: 37.5, h: 40, l: 37, c: 39.5 },
    { x: 92, o: 39.5, h: 42.5, l: 39, c: 42 },
    { x: 110, o: 42, h: 44.5, l: 41.5, c: 44 }, // STH #1
    { x: 128, o: 44, h: 44.5, l: 42, c: 42.5 },
    { x: 146, o: 42.5, h: 43, l: 40.5, c: 41 }, // STL #1
    { x: 164, o: 41, h: 44, l: 40.5, c: 43.5 },
    { x: 182, o: 43.5, h: 47, l: 43, c: 46.5 },
    { x: 200, o: 46.5, h: 50, l: 46, c: 49.5 }, // STH #2 (ITH)
    { x: 218, o: 49.5, h: 50.5, l: 47, c: 47.5 },
    { x: 236, o: 47.5, h: 48, l: 45, c: 45.5 },
    // Sweep BSL + ITH
    { x: 254, o: 45.5, h: 52, l: 45, c: 51.5 }, // sweep ITH
    { x: 272, o: 51.5, h: 53, l: 51, c: 52.5 }, // new high
    // Reversal
    { x: 290, o: 52.5, h: 53, l: 50, c: 50.5 },
    { x: 308, o: 50.5, h: 51, l: 48, c: 48.5 },
    { x: 326, o: 48.5, h: 49, l: 46, c: 46.5 },
    { x: 344, o: 46.5, h: 47, l: 44, c: 44.5 }, // MSS
    { x: 362, o: 44.5, h: 45, l: 42, c: 42.5 },
    { x: 380, o: 42.5, h: 43, l: 40, c: 40.5 },
    // Tạo STL mới = liquidity mới
    { x: 398, o: 40.5, h: 42, l: 39.5, c: 41.5 }, // pullback
    { x: 416, o: 41.5, h: 42, l: 38, c: 38.5 },
    { x: 434, o: 38.5, h: 39, l: 36, c: 36.5 }, // new STL = SSL mới
    { x: 452, o: 36.5, h: 38, l: 35.5, c: 37.5 }, // bounce
    { x: 470, o: 37.5, h: 39, l: 37, c: 38.5 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={4}>
      {/* ITH line */}
      <line
        x1={36}
        y1={p(50)}
        x2={CHART_W - 8}
        y2={p(50)}
        stroke="#f59e0b"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.4}
      />
      <text
        x={52}
        y={p(50) - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        opacity={0.7}
      >
        ITH (BSL)
      </text>

      {/* New SSL */}
      <line
        x1={380}
        y1={p(36)}
        x2={CHART_W - 8}
        y2={p(36)}
        stroke="#34d399"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <text
        x={CHART_W - 10}
        y={p(36) + 13}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="end"
        opacity={0.8}
      >
        SSL mới
      </text>

      {/* Candles */}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} w={10} />
      ))}

      {/* Sweep annotation */}
      <circle
        cx={272}
        cy={p(53)}
        r={6}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
      />
      <text
        x={286}
        y={p(53.3)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#f59e0b"
      >
        Sweep ITH
      </text>

      {/* MSS annotation */}
      <rect
        x={322}
        y={p(45)}
        width={48}
        height={14}
        fill="rgba(248,113,113,0.1)"
        rx={3}
      />
      <text
        x={346}
        y={p(44.2)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        textAnchor="middle"
        fontWeight={700}
      >
        MSS
      </text>

      {/* New liquidity label */}
      <circle
        cx={434}
        cy={p(36)}
        r={6}
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
      />
      <text
        x={434}
        y={p(34.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#34d399"
        textAnchor="middle"
      >
        STL mới
      </text>

      {/* Cycle arrow (curved) */}
      <path
        d={`M 475 ${p(38.5)} Q 510 ${p(45)} 510 ${p(52)}`}
        fill="none"
        stroke="#5a6d85"
        strokeWidth={0.8}
        strokeDasharray="3,3"
      />
      <text
        x={518}
        y={p(48)}
        fontFamily="JetBrains Mono"
        fontSize={7}
        fill="#5a6d85"
        opacity={0.7}
      >
        Chu kỳ
      </text>
      <text
        x={518}
        y={p(46.5)}
        fontFamily="JetBrains Mono"
        fontSize={7}
        fill="#5a6d85"
        opacity={0.7}
      >
        lặp lại
      </text>

      <text
        x={CHART_W / 2}
        y={CHART_H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Sweep → MSS → New Trend → Tạo Liquidity mới → Lặp lại vô tận
      </text>
    </Chart>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chart 6 — Tổng kết 4 mục tiêu (SVG diagram)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartSummary() {
  const W = 580,
    H = 300;

  const goals = [
    {
      y: 32,
      num: "01",
      label: "Lấy Thanh Khoản",
      sub: "BSL / SSL / PDH / PDL",
      color: "#a78bfa",
    },
    {
      y: 98,
      num: "02",
      label: "Lấp Đầy Khoảng Trống",
      sub: "FVG / VI / NDOG / NWOG / OB",
      color: "#60a5fa",
    },
    {
      y: 164,
      num: "03",
      label: "Về Vùng Cân Bằng",
      sub: "Equilibrium 50% / Premium-Discount",
      color: "#34d399",
    },
    {
      y: 230,
      num: "04",
      label: "Tạo Đỉnh Đáy Mới",
      sub: "STH→ITH→LTH / STL→ITL→LTL",
      color: "#f59e0b",
    },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {goals.map(({ y, num, label, sub, color }, i) => (
        <g key={num}>
          {/* Number circle */}
          <circle
            cx={36}
            cy={y + 20}
            r={14}
            fill={`${color}15`}
            stroke={color}
            strokeWidth={1.2}
          />
          <text
            x={36}
            y={y + 24}
            fontFamily="JetBrains Mono"
            fontSize={10}
            fill={color}
            textAnchor="middle"
            fontWeight={700}
          >
            {num}
          </text>

          {/* Label */}
          <text
            x={62}
            y={y + 16}
            fontFamily="JetBrains Mono"
            fontSize={11}
            fill="#eaf0f6"
            fontWeight={600}
          >
            {label}
          </text>
          <text
            x={62}
            y={y + 32}
            fontFamily="JetBrains Mono"
            fontSize={8}
            fill="#5a6d85"
          >
            {sub}
          </text>

          {/* Connector arrow */}
          {i < goals.length - 1 && (
            <line
              x1={36}
              y1={y + 38}
              x2={36}
              y2={goals[i + 1].y + 4}
              stroke="#263550"
              strokeWidth={1}
              strokeDasharray="3,4"
            />
          )}
        </g>
      ))}

      {/* Cycle arrow: 04 → 01 */}
      <path
        d={`M 20 ${230 + 20} Q 10 ${155} 20 ${32 + 20}`}
        fill="none"
        stroke="#5a6d85"
        strokeWidth={1}
        strokeDasharray="4,4"
        markerEnd="url(#arrowCycle)"
      />
      <text
        x={6}
        y={155}
        fontFamily="JetBrains Mono"
        fontSize={7}
        fill="#5a6d85"
        textAnchor="middle"
        writingMode="tb"
      >
        vòng lặp
      </text>

      <defs>
        <marker
          id="arrowCycle"
          markerWidth={6}
          markerHeight={6}
          refX={5}
          refY={3}
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#5a6d85" />
        </marker>
      </defs>
    </svg>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEPS — Narration  ★ ĐÃ SỬA TOÀN BỘ ★
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STEPS: LessonStep[] = [
  {
    label: "Slide 1 — STH / STL",
    badge: "Short-Term",
    title: "STH / STL — Đỉnh đáy ngắn hạn",
    chart: <ChartSTH />,
    body: (
      <>
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>
          STH (Short-Term High)
        </span>{" "}
        là một{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          3-candle swing pattern
        </span>
        : nến giữa có high cao hơn cả 2 nến kế bên. Tương tự,{" "}
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          STL (Short-Term Low)
        </span>{" "}
        là nến giữa có low thấp hơn cả 2 nến kế bên.
        <br />
        <br />
        Đây là{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          đơn vị cơ bản nhất
        </span>{" "}
        trong hệ thống phân cấp đỉnh/đáy của ICT. Mọi cấp cao hơn (ITH, LTH) đều
        được xây dựng từ STH/STL.
        <br />
        <br />
        STH/STL là các mức{" "}
        <ConceptLink slug="liquidity-basics">liquidity</ConceptLink> ngắn hạn —
        nơi đám đông đặt SL, dễ bị sweep nhất.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        STH/STL dùng trên LTF (M1-M15) để xác định entry chính xác. Không dùng
        để xác định trend lớn — đó là việc của ITH/ITL và LTH/LTL.
      </p>
    ),
  },
  {
    label: "Slide 2 — ITH / ITL",
    badge: "Intermediate-Term",
    title: "ITH / ITL — Hierarchy, không phải đếm nến",
    chart: <ChartITH />,
    body: (
      <>
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          ITH (Intermediate-Term High)
        </span>{" "}
        là một{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          STH có STH thấp hơn ở mỗi bên
        </span>
        . <span style={{ color: "#34d399", fontWeight: 500 }}>ITL</span> tương
        tự — một STL có STL cao hơn ở mỗi bên.
        <br />
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          ⚠ Lưu ý quan trọng:
        </span>{" "}
        ITH/ITL là{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          cấu trúc phân cấp (hierarchy)
        </span>
        , KHÔNG phải đếm 2 raw candle mỗi bên. Mỗi "bên" của ITH là một STH
        pattern hoàn chỉnh (bản thân nó đã là 3-candle pattern).
        <br />
        <br />
        ITH/ITL mạnh hơn STH/STL vì đại diện cho{" "}
        <ConceptLink slug="liquidity-basics">liquidity</ConceptLink> tích tụ qua
        nhiều swing — khi bị sweep sẽ phản ứng mạnh hơn nhiều.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Khi ITH/ITL bị phá, đó là{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          significant break in market structure (BMS)
        </span>{" "}
        — mạnh hơn nhiều so với phá STH/STL. Dùng ITH/ITL trên H1-H4 để xác định
        target và bias.
      </p>
    ),
  },
  {
    label: "Slide 3 — Hierarchy",
    badge: "Cấu trúc lồng nhau",
    title: "Hệ thống phân cấp: Candle → STH → ITH → LTH",
    chart: <ChartHierarchy />,
    body: (
      <>
        Toàn bộ hệ thống đỉnh/đáy ICT hoạt động theo nguyên tắc{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          lồng nhau (nested hierarchy)
        </span>
        :
        <br />
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>
          Level 1 — STH/STL:
        </span>{" "}
        3-candle pattern từ nến thô.
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          Level 2 — ITH/ITL:
        </span>{" "}
        STH/STL có STH/STL thấp/cao hơn ở mỗi bên.
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          Level 3 — LTH/LTL:
        </span>{" "}
        ITH/ITL có ITH/ITL thấp/cao hơn ở mỗi bên.
        <br />
        <br />
        Level càng cao →{" "}
        <ConceptLink slug="liquidity-basics">liquidity</ConceptLink> càng lớn →
        khi bị sweep → phản ứng giá càng mạnh. Đây là lý do{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          HTF analysis luôn quan trọng hơn LTF
        </span>
        .
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Thứ tự mạnh: LTH/LTL (D1/W1) {">"} ITH/ITL (H1-H4) {">"} STH/STL
        (M1-M15). Phá LTH/LTL = thay đổi toàn bộ narrative của thị trường.
      </p>
    ),
  },
  {
    label: "Slide 4 — MSS",
    badge: "Market Structure Shift",
    title: "MSS — Tín hiệu đảo chiều cấu trúc",
    chart: <ChartMSS />,
    body: (
      <>
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          MSS (Market Structure Shift)
        </span>{" "}
        xảy ra khi giá phá vỡ{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          STL/ITL trước đó trong uptrend
        </span>{" "}
        (hoặc STH/ITH trong downtrend).
        <br />
        <br />
        Trong chart: giá sweep BSL (đỉnh cũ) →{" "}
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          không tạo được HH mới
        </span>{" "}
        → phá STL → MSS bearish → bắt đầu downtrend.
        <br />
        <br />
        Phá ITL/ITH → MSS{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          mạnh hơn nhiều
        </span>{" "}
        so với chỉ phá STL/STH, vì liquidity tại ITL/ITH lớn hơn.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        MSS trên HTF (H4/D1) đáng tin hơn LTF. Đừng thoát lệnh HTF chỉ vì thấy
        LTF MSS — nhìn ITH/ITL của HTF để đánh giá.
      </p>
    ),
  },
  {
    label: "Slide 5 — Vòng lặp",
    badge: "The Cycle",
    title: "Vòng lặp vô tận: Sweep → MSS → Liquidity mới",
    chart: <ChartCycle />,
    body: (
      <>
        Sau khi sweep liquidity cũ → MSS → trend mới, thị trường sẽ tạo ra{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>STH/STL mới</span> —
        chính là liquidity cho chu kỳ tiếp theo:
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>1. Sweep</span>{" "}
        ITH/BSL cũ → kích hoạt SL đám đông
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>2. MSS</span> → phá
        STL/ITL → cấu trúc đảo chiều
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          3. New trend
        </span>{" "}
        → giá tạo STL mới = SSL mới cho tương lai
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>4. Lặp lại</span> →
        STL mới tích tụ thành ITL → LTL → liquidity lớn hơn
        <br />
        <br />
        Đây là vòng lặp vô tận — mọi setup ICT đều xoay quanh chu kỳ này.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Hiểu vòng lặp này = hiểu tại sao thị trường không bao giờ di chuyển
        thẳng. Mỗi swing tạo ra liquidity cho swing tiếp theo.
      </p>
    ),
  },
  {
    label: "Slide 6 — Tổng kết",
    badge: "4 Mục Tiêu",
    title: "Tổng kết: 4 mục tiêu của thị trường",
    chart: <ChartSummary />,
    body: (
      <>
        Mọi chuyển động giá đều phục vụ ít nhất 1 trong 4 mục tiêu:
        <br />
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>01.</span> Lấy thanh
        khoản (sweep BSL/SSL)
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>02.</span> Lấp đầy
        khoảng trống (fill FVG/VI/OB)
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>03.</span> Về vùng
        cân bằng (EQ 50%)
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>04.</span> Tạo
        đỉnh/đáy mới (STH→ITH→LTH, STL→ITL→LTL)
        <br />
        <br />
        Sau mục tiêu 4, thị trường quay lại mục tiêu 1 — tạo thành{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          vòng lặp vĩnh cửu
        </span>
        . Mọi setup ICT đều bắt nguồn từ 4 nguyên lý này.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Khi phân tích chart, luôn tự hỏi: "Giá đang phục vụ mục tiêu nào trong 4
        mục tiêu này?" — câu trả lời sẽ cho bạn bias và target.
      </p>
    ),
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Page export
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONFIG = {
  group: "Nhóm 2 · Bài 10",
  heading: "Tạo Đỉnh Đáy Mới",
  subhead:
    "STH/STL → ITH/ITL → LTH/LTL — hệ thống phân cấp lồng nhau tạo ra liquidity mới sau mỗi chu kỳ.",
  accentColor: "#f59e0b",
  steps: STEPS,
};

export default function NewHighsLowsPage() {
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
