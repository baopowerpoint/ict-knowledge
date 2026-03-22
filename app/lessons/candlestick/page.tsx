"use client";

import { useState, useCallback } from "react";
import { LessonPage, type LessonStep } from "@/components/shared/LessonPage";
import { Chart, Candle, py, CHART_W } from "@/components/shared/chart";

function ChartAnatomy() {
  const MIN = 36,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);
  const BX = 160,
    BO = 40,
    BH = 55,
    BL = 37,
    BC = 51;
  const RX = 380,
    RO = 50,
    RH = 52,
    RL = 39,
    RC = 42;
  return (
    <Chart min={MIN} max={MAX} step={4}>
      <line
        x1={BX}
        y1={p(BH)}
        x2={BX}
        y2={p(BL)}
        stroke="#34d399"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <rect
        x={BX - 22}
        y={p(BC)}
        width={44}
        height={p(BO) - p(BC)}
        fill="#34d399"
        rx={2}
      />
      <line
        x1={BX + 26}
        y1={p(BH)}
        x2={BX + 70}
        y2={p(BH)}
        stroke="#5a6d85"
        strokeWidth={0.8}
      />
      <text
        x={BX + 74}
        y={p(BH) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#eaf0f6"
      >
        H — High (Cao nhất)
      </text>
      <line
        x1={BX + 26}
        y1={p(BC)}
        x2={BX + 70}
        y2={p(BC)}
        stroke="#5a6d85"
        strokeWidth={0.8}
      />
      <text
        x={BX + 74}
        y={p(BC) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
      >
        C — Close (Đóng cửa)
      </text>
      <line
        x1={BX + 26}
        y1={p(BO)}
        x2={BX + 70}
        y2={p(BO)}
        stroke="#5a6d85"
        strokeWidth={0.8}
      />
      <text
        x={BX + 74}
        y={p(BO) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
        opacity={0.7}
      >
        O — Open (Mở cửa)
      </text>
      <line
        x1={BX + 26}
        y1={p(BL)}
        x2={BX + 70}
        y2={p(BL)}
        stroke="#5a6d85"
        strokeWidth={0.8}
      />
      <text
        x={BX + 74}
        y={p(BL) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#eaf0f6"
      >
        L — Low (Thấp nhất)
      </text>
      <text
        x={BX}
        y={p(36) + 16}
        fontFamily="JetBrains Mono"
        fontSize={10}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={700}
      >
        Nến Tăng
      </text>
      <text
        x={BX - 30}
        y={p((BO + BC) / 2) + 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="end"
        opacity={0.7}
      >
        Thân
      </text>
      <text
        x={BX - 30}
        y={p(BH) - 8}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="end"
      >
        Râu trên
      </text>
      <text
        x={BX - 30}
        y={p(BL) + 16}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="end"
      >
        Râu dưới
      </text>
      <line
        x1={RX}
        y1={p(RH)}
        x2={RX}
        y2={p(RL)}
        stroke="#f87171"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <rect
        x={RX - 22}
        y={p(RO)}
        width={44}
        height={p(RC) - p(RO)}
        fill="#f87171"
        rx={2}
      />
      <line
        x1={RX - 26}
        y1={p(RH)}
        x2={RX - 70}
        y2={p(RH)}
        stroke="#5a6d85"
        strokeWidth={0.8}
      />
      <text
        x={RX - 74}
        y={p(RH) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#eaf0f6"
        textAnchor="end"
      >
        High
      </text>
      <line
        x1={RX - 26}
        y1={p(RO)}
        x2={RX - 70}
        y2={p(RO)}
        stroke="#5a6d85"
        strokeWidth={0.8}
      />
      <text
        x={RX - 74}
        y={p(RO) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f87171"
        textAnchor="end"
      >
        O — Open
      </text>
      <line
        x1={RX - 26}
        y1={p(RC)}
        x2={RX - 70}
        y2={p(RC)}
        stroke="#5a6d85"
        strokeWidth={0.8}
      />
      <text
        x={RX - 74}
        y={p(RC) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f87171"
        opacity={0.7}
        textAnchor="end"
      >
        C — Close
      </text>
      <line
        x1={RX - 26}
        y1={p(RL)}
        x2={RX - 70}
        y2={p(RL)}
        stroke="#5a6d85"
        strokeWidth={0.8}
      />
      <text
        x={RX - 74}
        y={p(RL) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#eaf0f6"
        textAnchor="end"
      >
        Low
      </text>
      <text
        x={RX}
        y={p(36) + 16}
        fontFamily="JetBrains Mono"
        fontSize={10}
        fill="#f87171"
        textAnchor="middle"
        fontWeight={700}
      >
        Nến Giảm
      </text>
    </Chart>
  );
}

function ChartBodyMeaning() {
  const MIN = 34,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);
  return (
    <Chart min={MIN} max={MAX} step={4}>
      <line
        x1={80}
        y1={p(52)}
        x2={80}
        y2={p(38)}
        stroke="#34d399"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={64}
        y={p(52)}
        width={32}
        height={p(38) - p(52)}
        fill="#34d399"
        rx={2}
      />
      <text
        x={80}
        y={p(53.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={600}
      >
        Mạnh
      </text>
      <text
        x={80}
        y={p(36.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Thân to = Bull
      </text>
      <line
        x1={190}
        y1={p(50)}
        x2={190}
        y2={p(40)}
        stroke="#34d399"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={174}
        y={p(46)}
        width={32}
        height={p(44) - p(46)}
        fill="#34d399"
        rx={2}
      />
      <text
        x={190}
        y={p(51.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Thân nhỏ
      </text>
      <text
        x={190}
        y={p(38.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        = Do dự
      </text>
      <line
        x1={300}
        y1={p(51)}
        x2={300}
        y2={p(39)}
        stroke="#f59e0b"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect x={284} y={p(45.1)} width={32} height={2} fill="#f59e0b" rx={1} />
      <text
        x={300}
        y={p(52.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        textAnchor="middle"
      >
        Doji
      </text>
      <text
        x={300}
        y={p(37.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#f59e0b"
        textAnchor="middle"
      >
        = Cân bằng
      </text>
      <line
        x1={420}
        y1={p(52)}
        x2={420}
        y2={p(38)}
        stroke="#f87171"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={404}
        y={p(50)}
        width={32}
        height={p(40) - p(50)}
        fill="#f87171"
        rx={2}
      />
      <text
        x={420}
        y={p(53.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        textAnchor="middle"
        fontWeight={600}
      >
        Mạnh
      </text>
      <text
        x={420}
        y={p(36.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Thân to = Bear
      </text>
      <text
        x={CHART_W / 2}
        y={290}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Thân càng to → phe thắng càng áp đảo
      </text>
    </Chart>
  );
}

function ChartWickMeaning() {
  const MIN = 34,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);
  return (
    <Chart min={MIN} max={MAX} step={4}>
      <line
        x1={80}
        y1={p(50)}
        x2={80}
        y2={p(37)}
        stroke="#34d399"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={66}
        y={p(50)}
        width={28}
        height={p(47) - p(50)}
        fill="#34d399"
        rx={2}
      />
      <text
        x={80}
        y={p(52)}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={600}
      >
        Hammer
      </text>
      <text
        x={80}
        y={p(35.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#34d399"
        textAnchor="middle"
      >
        → Bull từ chối giảm
      </text>
      <line
        x1={210}
        y1={p(53)}
        x2={210}
        y2={p(42)}
        stroke="#f87171"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={196}
        y={p(44.5)}
        width={28}
        height={p(42) - p(44.5)}
        fill="#f87171"
        rx={2}
      />
      <text
        x={210}
        y={p(54.5)}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f87171"
        textAnchor="middle"
        fontWeight={600}
      >
        Shooting Star
      </text>
      <text
        x={210}
        y={p(40.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#f87171"
        textAnchor="middle"
      >
        → Bear từ chối tăng
      </text>
      <line
        x1={340}
        y1={p(53)}
        x2={340}
        y2={p(38)}
        stroke="#f59e0b"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={326}
        y={p(49)}
        width={28}
        height={p(42) - p(49)}
        fill="#f59e0b"
        rx={2}
      />
      <text
        x={340}
        y={p(54.5)}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={600}
      >
        Spinning Top
      </text>
      <text
        x={340}
        y={p(36.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#f59e0b"
        textAnchor="middle"
      >
        → Chưa bên nào thắng
      </text>
      <rect
        x={446}
        y={p(52)}
        width={28}
        height={p(39) - p(52)}
        fill="#34d399"
        rx={2}
      />
      <text
        x={460}
        y={p(53.5)}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={600}
      >
        Marubozu
      </text>
      <text
        x={460}
        y={p(37.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#34d399"
        textAnchor="middle"
      >
        → Bull hoàn toàn kiểm soát
      </text>
    </Chart>
  );
}

function ChartReadingCandles() {
  const MIN = 36,
    MAX = 56;
  const p = (v: number) => py(v, MIN, MAX);
  const candles = [
    { x: 55, o: 38, h: 40, l: 37.5, c: 39.5 },
    { x: 88, o: 39.5, h: 42, l: 39, c: 41.5 },
    { x: 121, o: 41.5, h: 44, l: 41, c: 43.5 },
    { x: 154, o: 43.5, h: 45.5, l: 42.5, c: 44 },
    { x: 187, o: 44, h: 45, l: 42, c: 43.5 },
    { x: 220, o: 43.5, h: 48, l: 43, c: 43.8 },
    { x: 253, o: 43.8, h: 44.5, l: 41.5, c: 42 },
    { x: 286, o: 42, h: 42.5, l: 40, c: 40.5 },
    { x: 319, o: 40.5, h: 41, l: 38, c: 38.5 },
    { x: 352, o: 38.5, h: 39.5, l: 36.5, c: 39 },
    { x: 385, o: 39, h: 41.5, l: 38.5, c: 41 },
    { x: 418, o: 41, h: 43.5, l: 40.5, c: 43 },
    { x: 451, o: 43, h: 46, l: 42.5, c: 45.5 },
    { x: 484, o: 45.5, h: 48, l: 45, c: 47.5 },
  ];
  return (
    <Chart min={MIN} max={MAX} step={4}>
      <text
        x={110}
        y={p(45.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
      >
        Tăng mạnh
      </text>
      <text
        x={187}
        y={p(46.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        textAnchor="middle"
      >
        Do dự
      </text>
      <text
        x={220}
        y={p(49.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        textAnchor="middle"
      >
        Đảo chiều
      </text>
      <text
        x={310}
        y={p(43)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        textAnchor="middle"
      >
        Giảm
      </text>
      <text
        x={352}
        y={p(35.8)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
      >
        Hammer
      </text>
      <text
        x={440}
        y={p(48.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
      >
        Tăng lại
      </text>
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}
      <circle
        cx={220}
        cy={p(48)}
        r={6}
        fill="none"
        stroke="#f87171"
        strokeWidth={1.5}
        opacity={0.7}
      />
      <circle
        cx={352}
        cy={p(36.5)}
        r={6}
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
        opacity={0.7}
      />
    </Chart>
  );
}

function ChartPatterns() {
  const MIN = 36,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);
  return (
    <Chart min={MIN} max={MAX} step={4}>
      <line
        x1={65}
        y1={p(50)}
        x2={65}
        y2={p(42)}
        stroke="#f87171"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={52}
        y={p(49)}
        width={26}
        height={p(43) - p(49)}
        fill="#f87171"
        rx={2}
      />
      <line
        x1={97}
        y1={p(51)}
        x2={97}
        y2={p(40)}
        stroke="#34d399"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={84}
        y={p(50.5)}
        width={26}
        height={p(41) - p(50.5)}
        fill="#34d399"
        rx={2}
      />
      <text
        x={81}
        y={p(53)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={600}
      >
        Bull Engulfing
      </text>
      <text
        x={81}
        y={p(38.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Xanh nuốt đỏ → Bull
      </text>
      <line
        x1={210}
        y1={p(52)}
        x2={210}
        y2={p(44)}
        stroke="#34d399"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={197}
        y={p(51)}
        width={26}
        height={p(45) - p(51)}
        fill="#34d399"
        rx={2}
      />
      <line
        x1={242}
        y1={p(53)}
        x2={242}
        y2={p(41)}
        stroke="#f87171"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={229}
        y={p(52)}
        width={26}
        height={p(42) - p(52)}
        fill="#f87171"
        rx={2}
      />
      <text
        x={226}
        y={p(54.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        textAnchor="middle"
        fontWeight={600}
      >
        Bear Engulfing
      </text>
      <text
        x={226}
        y={p(39.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Đỏ nuốt xanh → Bear
      </text>
      <line
        x1={360}
        y1={p(52)}
        x2={360}
        y2={p(41)}
        stroke="#f87171"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={347}
        y={p(51)}
        width={26}
        height={p(42) - p(51)}
        fill="#f87171"
        rx={2}
      />
      <line
        x1={392}
        y1={p(50)}
        x2={392}
        y2={p(44)}
        stroke="#34d399"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={379}
        y={p(49)}
        width={26}
        height={p(45) - p(49)}
        fill="#34d399"
        rx={2}
      />
      <text
        x={376}
        y={p(53.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={600}
      >
        Inside Bar
      </text>
      <text
        x={376}
        y={p(39.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#f59e0b"
        textAnchor="middle"
      >
        → Chờ phá vỡ
      </text>
      <line
        x1={500}
        y1={p(52)}
        x2={500}
        y2={p(38)}
        stroke="#34d399"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={487}
        y={p(50)}
        width={26}
        height={p(47) - p(50)}
        fill="#34d399"
        rx={2}
      />
      <text
        x={500}
        y={p(53.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={600}
      >
        Pin Bar
      </text>
      <text
        x={500}
        y={p(36.5)}
        fontFamily="JetBrains Mono"
        fontSize={7.5}
        fill="#34d399"
        textAnchor="middle"
      >
        → Từ chối mạnh
      </text>
    </Chart>
  );
}

function ChartICTCandles() {
  const MIN = 36,
    MAX = 56;
  const p = (v: number) => py(v, MIN, MAX);
  const candles = [
    { x: 55, o: 39, h: 40.5, l: 38.5, c: 40 },
    { x: 88, o: 40, h: 42, l: 39.5, c: 41.5 },
    { x: 121, o: 41.5, h: 43, l: 41, c: 42.5 },
    { x: 154, o: 42.5, h: 50, l: 42, c: 49.5 },
    { x: 187, o: 49.5, h: 51, l: 47.5, c: 50 },
    { x: 220, o: 50, h: 51, l: 48.5, c: 49.5 },
    { x: 253, o: 49.5, h: 50, l: 47.5, c: 48 },
    { x: 286, o: 48, h: 48.5, l: 46, c: 46.5 },
    { x: 319, o: 46.5, h: 47, l: 44, c: 44.5 },
    { x: 352, o: 44.5, h: 45, l: 43, c: 43.3 },
    { x: 385, o: 43.3, h: 43.8, l: 41, c: 41.5 },
    { x: 418, o: 41.5, h: 42.5, l: 40.5, c: 42 },
    { x: 451, o: 42, h: 44.5, l: 41.5, c: 44 },
    { x: 484, o: 44, h: 47, l: 43.5, c: 46.5 },
  ];
  const FVG_BOT = 43,
    FVG_TOP = 47.5;
  return (
    <Chart min={MIN} max={MAX} step={3}>
      <rect
        x={36}
        y={p(FVG_TOP)}
        width={CHART_W - 44}
        height={p(FVG_BOT) - p(FVG_TOP)}
        fill="rgba(245,158,11,0.07)"
      />
      <line
        x1={36}
        y1={p(FVG_TOP)}
        x2={CHART_W - 8}
        y2={p(FVG_TOP)}
        stroke="#f59e0b"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <line
        x1={36}
        y1={p(FVG_BOT)}
        x2={CHART_W - 8}
        y2={p(FVG_BOT)}
        stroke="#f59e0b"
        strokeWidth={1}
        strokeDasharray="5,4"
        opacity={0.5}
      />
      <text
        x={CHART_W / 2}
        y={p((FVG_BOT + FVG_TOP) / 2) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={600}
      >
        FVG
      </text>
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}
      <text
        x={154}
        y={p(51.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
      >
        Impulse — SM vào lệnh
      </text>
      <rect
        x={338}
        y={p(45)}
        width={28}
        height={p(43) - p(45)}
        fill="rgba(52,211,153,0.15)"
        rx={2}
      />
      <text
        x={352}
        y={p(43) + 14}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
      >
        OB
      </text>
      <circle
        cx={418}
        cy={p(40.5)}
        r={6}
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
        opacity={0.7}
      />
      <text
        x={432}
        y={p(40.3)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
      >
        Hammer tại FVG
      </text>
    </Chart>
  );
}

const STEPS: LessonStep[] = [
  {
    label: "Slide 1 — Giải phẫu nến",
    badge: "Cơ bản nhất",
    title: "OHLC — 4 thông tin trong 1 cây nến",
    chart: <ChartAnatomy />,
    body: (
      <>
        Mỗi cây nến Nhật chứa đúng{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>4 thông tin</span>:
        <br />
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>O — Open:</span> Giá
        mở cửa.
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>H — High:</span> Giá
        cao nhất.
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>L — Low:</span> Giá
        thấp nhất.
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          C — Close:
        </span>{" "}
        Giá đóng cửa.
        <br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Nến tăng (xanh):
        </span>{" "}
        Close {">"} Open → phe mua thắng.
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          Nến giảm (đỏ):
        </span>{" "}
        Close {"<"} Open → phe bán thắng.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Khung thời gian quyết định nến đại diện cho bao lâu. Nến H1 = 1 giờ. Nến
        D1 = 1 ngày. OHLC không đổi — chỉ khung thời gian thay đổi.
      </p>
    ),
  },
  {
    label: "Slide 2 — Ý nghĩa thân nến",
    badge: "Thân nến",
    title: "Thân nến — Ai đang kiểm soát?",
    chart: <ChartBodyMeaning />,
    body: (
      <>
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>Thân nến</span> là
        khoảng cách giữa Open và Close — cho biết{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          mức độ áp đảo của phe thắng
        </span>
        .<br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>Thân to:</span> Phe
        thắng kiểm soát hoàn toàn. Động lượng mạnh.
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>Thân nhỏ:</span> Hai
        phe tranh giành, chưa bên nào áp đảo.
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>Doji</span> (Open ≈
        Close): Thị trường hoàn toàn cân bằng — thường xuất hiện trước đảo chiều
        hoặc breakout.
      </>
    ),
  },
  {
    label: "Slide 3 — Ý nghĩa râu nến",
    badge: "Râu nến",
    title: "Râu nến — Phe nào bị từ chối?",
    chart: <ChartWickMeaning />,
    body: (
      <>
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>Râu nến</span> cho
        biết{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          vùng giá bị từ chối
        </span>
        .<br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Râu dưới dài:
        </span>{" "}
        Giá giảm sâu nhưng bị đẩy lại — phe mua vào mạnh ở vùng thấp. Tín hiệu
        bullish.
        <br />
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          Râu trên dài:
        </span>{" "}
        Giá tăng cao nhưng bị đẩy lại — phe bán vào mạnh ở vùng cao. Tín hiệu
        bearish.
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          Spinning Top:
        </span>{" "}
        Râu dài cả 2 phía — thị trường tranh chấp, chưa phân thắng bại.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Trong ICT: râu nến dài thường là dấu hiệu sweep liquidity — giá kích
        hoạt stop loss của đám đông rồi đảo chiều ngay.
      </p>
    ),
  },
  {
    label: "Slide 4 — Đọc chuỗi nến",
    badge: "Chuỗi nến",
    title: "Đọc câu chuyện qua chuỗi nến",
    chart: <ChartReadingCandles />,
    body: (
      <>
        Một cây nến đơn lẻ ít có ý nghĩa —{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          chuỗi nến mới kể được câu chuyện
        </span>
        .<br />
        <br />
        Chuỗi nến xanh thân to liên tiếp → trend tăng mạnh.
        <br />
        <br />
        Nến thân nhỏ / doji sau chuỗi tăng →{" "}
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>cảnh báo</span> động
        lượng yếu dần.
        <br />
        <br />
        Shooting star sau đỉnh →{" "}
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          tín hiệu đảo chiều
        </span>
        .<br />
        <br />
        Hammer sau đáy →{" "}
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          tín hiệu phục hồi
        </span>
        .
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Thói quen quan trọng: trước khi nhìn vào indicator, hãy đọc chuỗi 5-10
        nến gần nhất. Thị trường đang làm gì? Ai đang kiểm soát?
      </p>
    ),
  },
  {
    label: "Slide 5 — Mẫu nến quan trọng",
    badge: "Patterns",
    title: "4 mẫu nến cần biết",
    chart: <ChartPatterns />,
    body: (
      <>
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Bullish Engulfing:
        </span>{" "}
        Nến xanh nuốt hoàn toàn nến đỏ → phe mua lấy lại kiểm soát.
        <br />
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          Bearish Engulfing:
        </span>{" "}
        Nến đỏ nuốt nến xanh → phe bán đột ngột áp đảo.
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          Inside Bar:
        </span>{" "}
        Nến 2 nằm trong nến 1 → thị trường tích lũy, chờ phá vỡ.
        <br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>Pin Bar:</span> Râu
        dài hơn 2 lần thân → từ chối vùng giá mạnh, thường báo đảo chiều.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Không trade chỉ dựa vào mẫu nến đơn lẻ. Luôn xem vị trí của mẫu nến — nó
        xuất hiện tại vùng liquidity / FVG / OB không?
      </p>
    ),
  },
  {
    label: "Slide 6 — Nến trong ICT",
    badge: "Ứng dụng ICT",
    title: "Nến Nhật trong ICT — Công cụ đọc ý định SM",
    chart: <ChartICTCandles />,
    body: (
      <>
        Trong ICT, mỗi cây nến là{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          dấu vết hành động của Smart Money
        </span>
        :<br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Nến xung lực (Impulse):
        </span>{" "}
        Thân to, ít râu → SM vào lệnh quyết đoán, tạo FVG.
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          Nến tại OB:
        </span>{" "}
        Nến đỏ cuối cùng trước impulse tăng → nơi SM gom hàng.
        <br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Hammer tại FVG:
        </span>{" "}
        Râu dưới dài chạm FVG, đóng cửa bật lên → SM defend vùng FVG.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Checklist đọc 1 cây nến trong ICT: (1) Thân to hay nhỏ? (2) Râu dài phía
        nào? (3) Đang ở vùng liquidity / FVG / OB không?
      </p>
    ),
  },
];

const CONFIG = {
  group: "Nhóm 0 · Bài 01",
  heading: "Nến Nhật",
  subhead: "OHLC, thân nến, râu nến — nền tảng để đọc bất kỳ biểu đồ nào.",
  accentColor: "#60a5fa",
  steps: STEPS,
};

export default function CandlestickPage() {
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
