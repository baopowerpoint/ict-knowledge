"use client";

import { useState, useCallback } from "react";
import { LessonPage, type LessonStep } from "@/components/shared/LessonPage";
import { Chart, Candle, py, CHART_W, CHART_H } from "@/components/shared/chart";

// ── Charts ────────────────────────────────────────────────────────────────────

function ChartSamePrice() {
  const MIN = 36,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);

  // D1 candle: O=38, H=52, L=37, C=50
  const D1_X = 100,
    D1_O = 38,
    D1_H = 52,
    D1_L = 37,
    D1_C = 50;

  // Chỉ hiện 6 H4 — đúng hơn (1 D1 = 6 H4)
  const h4Candles = [
    { x: 280, o: 38, h: 40.5, l: 37, c: 40 }, // H4-1
    { x: 320, o: 40, h: 43, l: 39.5, c: 42.5 }, // H4-2
    { x: 360, o: 42.5, h: 45.5, l: 42, c: 45 }, // H4-3
    { x: 400, o: 45, h: 48, l: 44.5, c: 47.5 }, // H4-4
    { x: 440, o: 47.5, h: 51, l: 47, c: 50 }, // H4-5
    { x: 480, o: 50, h: 52.5, l: 49.5, c: 50 }, // H4-6
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* D1 candle */}
      <line
        x1={D1_X}
        y1={p(D1_H)}
        x2={D1_X}
        y2={p(D1_L)}
        stroke="#34d399"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <rect
        x={D1_X - 24}
        y={p(D1_C)}
        width={48}
        height={p(D1_O) - p(D1_C)}
        fill="#34d399"
        rx={2}
      />
      <text
        x={D1_X}
        y={p(D1_H) - 8}
        fontFamily="JetBrains Mono"
        fontSize={10}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={700}
      >
        D1
      </text>
      <text
        x={D1_X}
        y={p(D1_L) + 16}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        1 nến = 1 ngày
      </text>

      {/* Separator */}
      <line
        x1={190}
        y1={20}
        x2={190}
        y2={CHART_H - 10}
        stroke="#263550"
        strokeWidth={1}
        strokeDasharray="3,4"
      />
      <text
        x={340}
        y={16}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#263550"
      >
        Cùng khoảng thời gian — xem ở H4
      </text>

      {/* H4 candles */}
      {h4Candles.map((c, i) => (
        <g key={i}>
          <Candle {...c} min={MIN} max={MAX} w={14} />
          <text
            x={c.x}
            y={p(D1_L) + 16}
            fontFamily="JetBrains Mono"
            fontSize={7}
            fill="#5a6d85"
            textAnchor="middle"
          >
            H4-{i + 1}
          </text>
        </g>
      ))}

      <text
        x={CHART_W / 2 + 150}
        y={CHART_H - 14}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        6 nến H4 = cùng 1 ngày
      </text>

      {/* Bảng công thức nhỏ */}
      <text
        x={D1_X}
        y={p(43)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        1 D1
      </text>
      <text
        x={D1_X}
        y={p(42)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        = 6 H4
      </text>
      <text
        x={D1_X}
        y={p(41)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        = 24 H1
      </text>

      <text
        x={CHART_W / 2}
        y={CHART_H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Cùng 1 khoảng giá — H4 cho thấy chi tiết bên trong D1
      </text>
    </Chart>
  );
}

function ChartTimeframeHierarchy() {
  const MIN = 34,
    MAX = 56;
  const p = (v: number) => py(v, MIN, MAX);

  // Vẽ các "blocks" đại diện cho từng timeframe
  const tfs = [
    { x: 50, w: 60, label: "Monthly", sub: "M", color: "#f87171", h: 16 },
    { x: 140, w: 52, label: "Weekly", sub: "W", color: "#f59e0b", h: 14 },
    { x: 222, w: 44, label: "Daily", sub: "D1", color: "#a78bfa", h: 12 },
    { x: 296, w: 36, label: "H4", sub: "H4", color: "#60a5fa", h: 10 },
    { x: 362, w: 30, label: "H1", sub: "H1", color: "#34d399", h: 9 },
    { x: 422, w: 26, label: "M15", sub: "M15", color: "#34d399", h: 8 },
    { x: 478, w: 22, label: "M5", sub: "M5", color: "#34d399", h: 7.5 },
    { x: 530, w: 18, label: "M1", sub: "M1", color: "#5a6d85", h: 7 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {tfs.map(({ x, w, label, sub, color, h }) => {
        const cy = CHART_H / 2;
        return (
          <g key={label}>
            <rect
              x={x}
              y={cy - 30}
              width={w}
              height={60}
              fill={`${color}18`}
              stroke={color}
              strokeWidth={0.8}
              rx={4}
            />
            <text
              x={x + w / 2}
              y={cy - 34}
              fontFamily="JetBrains Mono"
              fontSize={h}
              fill={color}
              textAnchor="middle"
              fontWeight={600}
            >
              {sub}
            </text>
            <text
              x={x + w / 2}
              y={cy + 44}
              fontFamily="JetBrains Mono"
              fontSize={7}
              fill="#5a6d85"
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Arrows showing hierarchy */}
      {tfs.slice(0, -1).map((tf, i) => (
        <line
          key={i}
          x1={tf.x + tf.w + 2}
          y1={CHART_H / 2}
          x2={tfs[i + 1].x - 2}
          y2={CHART_H / 2}
          stroke="#263550"
          strokeWidth={1}
          markerEnd="url(#arr)"
        />
      ))}

      <defs>
        <marker
          id="arr"
          viewBox="0 0 10 10"
          refX={8}
          refY={5}
          markerWidth={5}
          markerHeight={5}
          orient="auto"
        >
          <path
            d="M2 2L8 5L2 8"
            fill="none"
            stroke="#263550"
            strokeWidth={1.5}
          />
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
        HTF (cao) → xác định trend · LTF (thấp) → tìm entry
      </text>
    </Chart>
  );
}

function ChartHTFvsLTF() {
  const MIN = 36,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);

  // HTF (H4) — trend rõ ràng
  const htfCandles = [
    { x: 55, o: 38, h: 39.5, l: 37.5, c: 39 },
    { x: 100, o: 39, h: 42, l: 38.5, c: 41.5 },
    { x: 145, o: 41.5, h: 45, l: 41, c: 44.5 },
    { x: 190, o: 44.5, h: 48, l: 44, c: 47.5 },
  ];

  // LTF (M15) — chi tiết entry
  const ltfCandles = [
    { x: 320, o: 44.5, h: 46, l: 44, c: 45.5 },
    { x: 345, o: 45.5, h: 47, l: 45, c: 46.5 },
    { x: 370, o: 46.5, h: 48, l: 45.5, c: 46 },
    { x: 395, o: 46, h: 46.5, l: 44, c: 44.5 }, // pullback
    { x: 420, o: 44.5, h: 45.5, l: 44, c: 45.2 }, // entry
    { x: 445, o: 45.2, h: 47.5, l: 45, c: 47 },
    { x: 470, o: 47, h: 49, l: 46.5, c: 48.5 },
    { x: 495, o: 48.5, h: 50, l: 48, c: 49.5 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* HTF section */}
      <text
        x={120}
        y={14}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={600}
      >
        H4 — Xác định trend
      </text>
      {htfCandles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} w={18} />
      ))}

      {/* Trend arrow */}
      <path
        d="M 55 230 Q 120 200 190 160"
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
        strokeDasharray="4,3"
        opacity={0.5}
      />

      {/* Separator */}
      <line
        x1={265}
        y1={20}
        x2={265}
        y2={CHART_H - 10}
        stroke="#263550"
        strokeWidth={1}
        strokeDasharray="3,4"
      />

      {/* LTF section */}
      <text
        x={415}
        y={14}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={600}
      >
        M15 — Tìm entry
      </text>
      {ltfCandles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} w={10} />
      ))}

      {/* Entry annotation */}
      <circle
        cx={420}
        cy={p(44)}
        r={6}
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={420}
        y={p(43) + 16}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
      >
        Entry
      </text>
    </Chart>
  );
}

function ChartWhichTF() {
  const MIN = 34,
    MAX = 56;
  const p = (v: number) => py(v, MIN, MAX);

  // Bảng dùng svg text
  const rows = [
    {
      tf: "Monthly / Weekly",
      use: "Bias dài hạn, Major liquidity",
      color: "#f87171",
    },
    { tf: "Daily / H4", use: "Trend chính, HTF levels", color: "#f59e0b" },
    { tf: "H1", use: "Xác nhận setup, Mid-term structure", color: "#a78bfa" },
    { tf: "M15", use: "Entry model, LTF confirmation", color: "#60a5fa" },
    { tf: "M5 / M1", use: "Tinh chỉnh entry, scalping", color: "#34d399" },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      <text
        x={CHART_W / 2}
        y={28}
        fontFamily="JetBrains Mono"
        fontSize={10}
        fill="#eaf0f6"
        textAnchor="middle"
        fontWeight={600}
      >
        Timeframe → Mục đích
      </text>
      {rows.map(({ tf, use, color }, i) => {
        const y = 52 + i * 46;
        return (
          <g key={tf}>
            <rect
              x={36}
              y={y}
              width={CHART_W - 44}
              height={36}
              rx={6}
              fill={`${color}08`}
              stroke={color}
              strokeWidth={0.5}
            />
            <text
              x={52}
              y={y + 14}
              fontFamily="JetBrains Mono"
              fontSize={9}
              fill={color}
              fontWeight={600}
            >
              {tf}
            </text>
            <text
              x={52}
              y={y + 28}
              fontFamily="JetBrains Mono"
              fontSize={8}
              fill="#5a6d85"
            >
              {use}
            </text>
          </g>
        );
      })}
    </Chart>
  );
}

function ChartTopDown() {
  const MIN = 34,
    MAX = 56;
  const p = (v: number) => py(v, MIN, MAX);

  const steps = [
    {
      label: "D1 / H4",
      desc: "Xác định trend, HTF liquidity",
      color: "#f59e0b",
      y: 30,
    },
    {
      label: "H1",
      desc: "Tìm vùng PDA, xác nhận bias",
      color: "#a78bfa",
      y: 100,
    },
    { label: "M15", desc: "Chờ MSS / entry signal", color: "#60a5fa", y: 170 },
    {
      label: "M5",
      desc: "Vào lệnh chính xác, đặt SL",
      color: "#34d399",
      y: 240,
    },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {steps.map(({ label, desc, color, y }, i) => (
        <g key={label}>
          <rect
            x={160}
            y={y}
            width={260}
            height={44}
            rx={8}
            fill={`${color}10`}
            stroke={color}
            strokeWidth={0.8}
          />
          <text
            x={290}
            y={y + 17}
            fontFamily="JetBrains Mono"
            fontSize={10}
            fill={color}
            textAnchor="middle"
            fontWeight={700}
          >
            {label}
          </text>
          <text
            x={290}
            y={y + 32}
            fontFamily="JetBrains Mono"
            fontSize={8}
            fill="#5a6d85"
            textAnchor="middle"
          >
            {desc}
          </text>
          {i < steps.length - 1 && (
            <line
              x1={290}
              y1={y + 44}
              x2={290}
              y2={y + 58}
              stroke={color}
              strokeWidth={1.5}
              strokeDasharray="3,3"
              opacity={0.5}
            />
          )}
        </g>
      ))}

      <text
        x={CHART_W / 2}
        y={CHART_H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Top-Down Analysis — luôn đọc từ lớn xuống nhỏ
      </text>
    </Chart>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS: LessonStep[] = [
  {
    label: "Slide 1 — Timeframe là gì?",
    badge: "Khái niệm",
    title: "Khung thời gian — Mỗi nến đại diện bao lâu?",
    chart: <ChartSamePrice />,
    body: (
      <>
        Mỗi{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          khung thời gian (timeframe)
        </span>{" "}
        quyết định 1 cây nến đại diện cho bao lâu:
        <br />
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>M1:</span> 1 nến = 1
        phút · <span style={{ color: "#f59e0b", fontWeight: 500 }}>H1:</span> 1
        nến = 1 giờ ·{" "}
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>D1:</span> 1 nến = 1
        ngày
        <br />
        <br />
        OHLC không thay đổi — chỉ là cùng 1 khoảng giá nhưng H1 cho thấy{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          chi tiết bên trong
        </span>{" "}
        mà D1 ẩn đi.
        <br />
        <br />
        Chọn timeframe = chọn mức độ chi tiết bạn muốn nhìn thấy.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Quy đổi chuẩn: <br />
        1 D1 = 6 H4 = 24 H1 = 96 M15 = 288 M5 = 1440 M1
        <br />
        Forex mở 24h/ngày × 5 ngày = 120 H1/tuần.
      </p>
    ),
  },
  {
    label: "Slide 2 — Hierarchy",
    badge: "Phân cấp",
    title: "Thứ bậc timeframe — HTF vs LTF",
    chart: <ChartTimeframeHierarchy />,
    body: (
      <>
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          HTF (Higher Time Frame):
        </span>{" "}
        Monthly, Weekly, Daily, H4 — cho thấy bức tranh lớn, trend dài hạn,
        liquidity quan trọng.
        <br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          LTF (Lower Time Frame):
        </span>{" "}
        H1, M15, M5, M1 — cho thấy chi tiết, dùng để tìm entry chính xác.
        <br />
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          Nguyên tắc ICT:
        </span>{" "}
        HTF xác định{" "}
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>hướng đi</span> →
        LTF xác định{" "}
        <span style={{ color: "#34d399", fontWeight: 500 }}>điểm vào lệnh</span>
        . Không bao giờ làm ngược lại.
      </>
    ),
  },
  {
    label: "Slide 3 — HTF vs LTF thực tế",
    badge: "Thực tế",
    title: "H4 xác định trend · M15 tìm entry",
    chart: <ChartHTFvsLTF />,
    body: (
      <>
        Ví dụ thực tế:
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          Bước 1 — H4:
        </span>{" "}
        Thấy uptrend rõ ràng → bias Buy.
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>
          Bước 2 — H1:
        </span>{" "}
        Xác nhận cấu trúc tăng, tìm vùng PDA.
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Bước 3 — M15:
        </span>{" "}
        Chờ pullback về FVG → tìm hammer → vào Buy.
        <br />
        <br />
        Nếu chỉ nhìn M15, bạn có thể thấy giảm và bán — nhưng H4 đang tăng → bán
        ngược trend → thua.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Lỗi phổ biến nhất của retail: chỉ nhìn 1 timeframe. ICT yêu cầu tối
        thiểu 3 timeframe: HTF (bias) + MTF (setup) + LTF (entry).
      </p>
    ),
  },
  {
    label: "Slide 4 — Dùng TF nào?",
    badge: "Hướng dẫn",
    title: "Mỗi timeframe — Một mục đích khác nhau",
    chart: <ChartWhichTF />,
    body: (
      <>
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          Monthly / Weekly:
        </span>{" "}
        Chỉ cần nhìn 1 lần/tuần. Xác định bias lớn nhất và major liquidity
        targets.
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          Daily / H4:
        </span>{" "}
        Nhìn 1-2 lần/ngày. Xác định trend đang trade và các mức HTF quan trọng.
        <br />
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>
          H1 / M15:
        </span>{" "}
        Nhìn khi chuẩn bị trade. Tìm setup, chờ confirmation.
        <br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>M5 / M1:</span> Chỉ
        dùng khi đã có setup rõ ràng từ trên xuống. Tinh chỉnh entry.
      </>
    ),
  },
  {
    label: "Slide 5 — Top-Down Analysis",
    badge: "Tổng kết",
    title: "Top-Down Analysis — Đọc từ lớn xuống nhỏ",
    chart: <ChartTopDown />,
    body: (
      <>
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          Top-Down Analysis
        </span>{" "}
        là quy trình bắt buộc trong ICT — luôn bắt đầu từ timeframe lớn nhất rồi
        đi xuống:
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>D1/H4</span> → Bias
        gì? Bull hay Bear? Liquidity ở đâu?
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>H1</span> → Cấu trúc
        đang ở phase nào? FVG/OB ở đâu?
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>M15</span> → Có MSS
        chưa? Entry signal xuất hiện chưa?
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>M5</span> → Vào
        lệnh, đặt SL, xác nhận TP.
        <br />
        <br />
        Bỏ qua bất kỳ bước nào = tăng rủi ro đáng kể.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Thói quen tốt: mở chart theo thứ tự D1 → H4 → H1 → M15 mỗi khi phân
        tích. Không bao giờ mở M1 trước.
      </p>
    ),
  },
];

const CONFIG = {
  group: "Nhóm 0 · Bài 02",
  heading: "Khung Thời Gian",
  subhead: "Timeframe là gì, HTF vs LTF, và cách phân tích Top-Down đúng cách.",
  accentColor: "#60a5fa",
  steps: STEPS,
};

export default function TimeframesPage() {
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
