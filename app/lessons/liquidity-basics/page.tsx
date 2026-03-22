"use client";

import { useState, useCallback } from "react";
import { LessonPage, type LessonStep } from "@/components/shared/LessonPage";
import { Chart, Candle, py, CHART_W, CHART_H } from "@/components/shared/chart";
import { ConceptLink } from "@/components/shared/lesson/ConceptLink";

function ChartStep1() {
  const MIN = 34,
    MAX = 48;
  const p = (v: number) => py(v, MIN, MAX);
  const BSL = 45.5,
    SSL = 36.5;
  const candles = [
    { x: 60, o: 36, h: 37.5, l: 35.5, c: 37 },
    { x: 95, o: 37, h: 38.5, l: 36.5, c: 38 },
    { x: 130, o: 38, h: 39, l: 37, c: 37.5 },
    { x: 165, o: 37.5, h: 39, l: 37, c: 38.5 },
    { x: 200, o: 38.5, h: 40, l: 38, c: 39.5 },
    { x: 235, o: 39.5, h: 41, l: 39, c: 40.5 },
    { x: 270, o: 40.5, h: 42, l: 40, c: 41.5 },
    { x: 305, o: 41.5, h: 42.5, l: 41, c: 42 },
    { x: 340, o: 42, h: 43.5, l: 41.5, c: 43 },
    { x: 375, o: 43, h: 44.5, l: 42.5, c: 44 },
    { x: 410, o: 44, h: 45.5, l: 43.5, c: 45 },
    { x: 445, o: 45, h: 46, l: 44.5, c: 45.5 },
    { x: 480, o: 45.5, h: 46.5, l: 45, c: 46 },
    { x: 515, o: 46, h: 46.5, l: 44.5, c: 45 },
  ];
  return (
    <Chart min={MIN} max={MAX} step={2}>
      <rect
        x={36}
        y={p(BSL + 0.3)}
        width={CHART_W - 44}
        height={8}
        fill="rgba(167,139,250,0.08)"
      />
      <line
        x1={36}
        y1={p(BSL)}
        x2={CHART_W - 8}
        y2={p(BSL)}
        stroke="#a78bfa"
        strokeWidth={1}
        strokeDasharray="5,4"
      />
      <text
        x={CHART_W - 10}
        y={p(BSL) - 5}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#a78bfa"
        textAnchor="end"
        fontWeight={600}
      >
        BSL
      </text>
      <text
        x={CHART_W - 10}
        y={p(BSL) + 14}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
        opacity={0.6}
        textAnchor="end"
      >
        Stop Loss đám đông
      </text>
      <rect
        x={36}
        y={p(SSL)}
        width={CHART_W - 44}
        height={8}
        fill="rgba(52,211,153,0.08)"
      />
      <line
        x1={36}
        y1={p(SSL)}
        x2={CHART_W - 8}
        y2={p(SSL)}
        stroke="#34d399"
        strokeWidth={1}
        strokeDasharray="5,4"
      />
      <text
        x={CHART_W - 10}
        y={p(SSL) + 14}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
        textAnchor="end"
        fontWeight={600}
      >
        SSL
      </text>
      <text
        x={CHART_W - 10}
        y={p(SSL) + 26}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        opacity={0.6}
        textAnchor="end"
      >
        Stop Loss đám đông
      </text>
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}
      <text
        x={CHART_W / 2}
        y={p(42)}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#5a6d85"
        textAnchor="middle"
      >
        ← Smart Money cần liquidity để khớp lệnh lớn →
      </text>
    </Chart>
  );
}

function ChartStep2() {
  const MIN = 34,
    MAX = 48;
  const p = (v: number) => py(v, MIN, MAX);
  const BSL = 45.5,
    SSL = 36.5;
  const candles = [
    { x: 60, o: 36, h: 37.5, l: 35.5, c: 37 },
    { x: 95, o: 37, h: 38.5, l: 36.5, c: 38 },
    { x: 130, o: 38, h: 39, l: 37, c: 37.5 },
    { x: 165, o: 37.5, h: 39, l: 37, c: 38.5 },
    { x: 200, o: 38.5, h: 40, l: 38, c: 39.5 },
    { x: 235, o: 39.5, h: 41, l: 39, c: 40.5 },
    { x: 270, o: 40.5, h: 42, l: 40, c: 41.5 },
    { x: 305, o: 44, h: 46, l: 43.5, c: 45.8 },
    { x: 340, o: 45.8, h: 46.2, l: 44, c: 44.5 },
    { x: 375, o: 44.5, h: 45, l: 43, c: 43.5 },
    { x: 410, o: 43.5, h: 44, l: 42, c: 42.5 },
    { x: 445, o: 42.5, h: 43, l: 41, c: 41.5 },
  ];
  return (
    <Chart min={MIN} max={MAX} step={2}>
      <line
        x1={36}
        y1={p(BSL)}
        x2={CHART_W - 8}
        y2={p(BSL)}
        stroke="#a78bfa"
        strokeWidth={1}
        strokeDasharray="5,4"
      />
      <text
        x={CHART_W - 10}
        y={p(BSL) - 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#a78bfa"
        textAnchor="end"
        fontWeight={600}
      >
        BSL
      </text>
      <line
        x1={36}
        y1={p(SSL)}
        x2={CHART_W - 8}
        y2={p(SSL)}
        stroke="#34d399"
        strokeWidth={1}
        strokeDasharray="5,4"
      />
      <text
        x={CHART_W - 10}
        y={p(SSL) + 13}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
        textAnchor="end"
        fontWeight={600}
      >
        SSL
      </text>
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}
      <circle
        cx={305}
        cy={p(46)}
        r={7}
        fill="none"
        stroke="#a78bfa"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={315}
        y={p(46.5)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
      >
        SWEEP!
      </text>
      <path
        d={`M 340 ${p(45.8)} Q 380 ${p(44)} 445 ${p(41.5)}`}
        fill="none"
        stroke="#f87171"
        strokeWidth={1.5}
        strokeDasharray="4,3"
        opacity={0.6}
      />
      <text
        x={400}
        y={p(43) - 6}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        textAnchor="middle"
      >
        Đảo chiều → SSL
      </text>
    </Chart>
  );
}

function ChartStep3() {
  const MIN = 36,
    MAX = 46;
  const p = (v: number) => py(v, MIN, MAX);
  const PDH = 44,
    PDL = 38;
  const candles = [
    { x: 60, o: 39, h: 40, l: 38.5, c: 39.5 },
    { x: 95, o: 39.5, h: 40.5, l: 39, c: 40 },
    { x: 130, o: 40, h: 41, l: 39.5, c: 40.5 },
    { x: 165, o: 40.5, h: 41.5, l: 40, c: 41 },
    { x: 200, o: 41, h: 42, l: 40.5, c: 41.8 },
    { x: 235, o: 41.8, h: 43, l: 41.5, c: 42.5 },
    { x: 270, o: 42.5, h: 44.2, l: 42, c: 43.8 },
    { x: 305, o: 43.8, h: 44.5, l: 43, c: 43.2 },
    { x: 340, o: 43.2, h: 43.8, l: 42, c: 42.5 },
    { x: 375, o: 42.5, h: 43, l: 41.5, c: 42 },
  ];
  return (
    <Chart min={MIN} max={MAX} step={2}>
      <line
        x1={36}
        y1={p(PDH)}
        x2={CHART_W - 8}
        y2={p(PDH)}
        stroke="#f59e0b"
        strokeWidth={1}
        strokeDasharray="5,4"
      />
      <text
        x={CHART_W - 10}
        y={p(PDH) - 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="end"
        fontWeight={600}
      >
        PDH
      </text>
      <text
        x={CHART_W - 10}
        y={p(PDH) + 13}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        textAnchor="end"
        opacity={0.6}
      >
        Previous Day High
      </text>
      <line
        x1={36}
        y1={p(PDL)}
        x2={CHART_W - 8}
        y2={p(PDL)}
        stroke="#60a5fa"
        strokeWidth={1}
        strokeDasharray="5,4"
      />
      <text
        x={CHART_W - 10}
        y={p(PDL) + 14}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#60a5fa"
        textAnchor="end"
        fontWeight={600}
      >
        PDL
      </text>
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}
      <circle
        cx={270}
        cy={p(44.2)}
        r={7}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={282}
        y={p(44.4) + 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
      >
        Sweep PDH
      </text>
    </Chart>
  );
}

function ChartStep4() {
  const MIN = 32,
    MAX = 58;
  const p = (v: number) => py(v, MIN, MAX);
  return (
    <Chart min={MIN} max={MAX} step={4}>
      <line
        x1={36}
        y1={p(55)}
        x2={CHART_W - 8}
        y2={p(55)}
        stroke="#f87171"
        strokeWidth={1.5}
        strokeDasharray="6,4"
      />
      <text
        x={CHART_W - 10}
        y={p(55) - 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f87171"
        textAnchor="end"
        fontWeight={600}
      >
        PMH
      </text>
      <text
        x={50}
        y={p(55) - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        opacity={0.6}
      >
        Previous Month High — Rất mạnh
      </text>
      <line
        x1={36}
        y1={p(49)}
        x2={CHART_W - 8}
        y2={p(49)}
        stroke="#f59e0b"
        strokeWidth={1}
        strokeDasharray="5,4"
      />
      <text
        x={CHART_W - 10}
        y={p(49) - 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#f59e0b"
        textAnchor="end"
        fontWeight={600}
      >
        PWH
      </text>
      <text
        x={50}
        y={p(49) - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        opacity={0.6}
      >
        Previous Week High — Mạnh
      </text>
      <line
        x1={36}
        y1={p(44)}
        x2={CHART_W - 8}
        y2={p(44)}
        stroke="#a78bfa"
        strokeWidth={0.8}
        strokeDasharray="4,4"
      />
      <text
        x={CHART_W - 10}
        y={p(44) - 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#a78bfa"
        textAnchor="end"
        fontWeight={600}
      >
        PDH
      </text>
      <text
        x={50}
        y={p(44) - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
        opacity={0.6}
      >
        Previous Day High — Trung bình
      </text>
      <line
        x1={36}
        y1={p(38)}
        x2={CHART_W - 8}
        y2={p(38)}
        stroke="#60a5fa"
        strokeWidth={0.8}
        strokeDasharray="4,4"
      />
      <text
        x={CHART_W - 10}
        y={p(38) + 13}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#60a5fa"
        textAnchor="end"
        fontWeight={600}
      >
        PDL
      </text>
      <line
        x1={36}
        y1={p(34)}
        x2={CHART_W - 8}
        y2={p(34)}
        stroke="#34d399"
        strokeWidth={1}
        strokeDasharray="5,4"
      />
      <text
        x={CHART_W - 10}
        y={p(34) + 13}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
        textAnchor="end"
        fontWeight={600}
      >
        PWL
      </text>
      <text
        x={50}
        y={p(34) + 13}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        opacity={0.6}
      >
        Previous Week Low — Mạnh
      </text>
      <circle cx={CHART_W / 2} cy={p(41)} r={5} fill="#eaf0f6" opacity={0.9} />
      <text
        x={CHART_W / 2 + 12}
        y={p(41) + 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#eaf0f6"
      >
        Giá hiện tại
      </text>
      <text
        x={CHART_W / 2}
        y={CHART_H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Timeframe càng lớn → Liquidity càng mạnh
      </text>
    </Chart>
  );
}

function ChartStep5() {
  const MIN = 33,
    MAX = 56;
  const p = (v: number) => py(v, MIN, MAX);
  const BSL = 53,
    SSL = 36;
  const candles = [
    { x: 50, o: 42, h: 43.5, l: 41.5, c: 43 },
    { x: 82, o: 43, h: 44.5, l: 42.5, c: 44 },
    { x: 114, o: 44, h: 45, l: 43, c: 44.5 },
    { x: 146, o: 44.5, h: 45.5, l: 43.5, c: 45 },
    { x: 178, o: 45, h: 46, l: 44, c: 44.5 },
    { x: 210, o: 44.5, h: 45, l: 43, c: 43.5 },
    { x: 242, o: 43.5, h: 44, l: 42, c: 42.5 },
    { x: 274, o: 42.5, h: 43, l: 41, c: 41.5 },
    { x: 306, o: 41.5, h: 42, l: 40, c: 40.5 },
    { x: 338, o: 40.5, h: 41, l: 38, c: 38.5 },
    { x: 370, o: 38.5, h: 39, l: 35.5, c: 36.2 },
    { x: 402, o: 36.2, h: 39, l: 35.8, c: 38.5 },
    { x: 434, o: 38.5, h: 41, l: 38, c: 40.5 },
    { x: 466, o: 40.5, h: 44, l: 40, c: 43 },
    { x: 498, o: 43, h: 47, l: 42.5, c: 46 },
    { x: 530, o: 46, h: 50, l: 45.5, c: 49 },
  ];
  return (
    <Chart min={MIN} max={MAX} step={4}>
      <rect
        x={36}
        y={p(BSL + 0.5)}
        width={CHART_W - 44}
        height={10}
        fill="rgba(167,139,250,0.06)"
      />
      <line
        x1={36}
        y1={p(BSL)}
        x2={CHART_W - 8}
        y2={p(BSL)}
        stroke="#a78bfa"
        strokeWidth={1.2}
        strokeDasharray="6,4"
      />
      <text
        x={CHART_W - 10}
        y={p(BSL) - 4}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#a78bfa"
        textAnchor="end"
        fontWeight={600}
      >
        BSL (Mục tiêu)
      </text>
      <rect
        x={36}
        y={p(SSL)}
        width={CHART_W - 44}
        height={10}
        fill="rgba(52,211,153,0.06)"
      />
      <line
        x1={36}
        y1={p(SSL)}
        x2={CHART_W - 8}
        y2={p(SSL)}
        stroke="#34d399"
        strokeWidth={1.2}
        strokeDasharray="6,4"
      />
      <text
        x={CHART_W - 10}
        y={p(SSL) + 18}
        fontFamily="JetBrains Mono"
        fontSize={9}
        fill="#34d399"
        textAnchor="end"
        fontWeight={600}
      >
        SSL (Đã bị sweep)
      </text>
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} />
      ))}
      <circle
        cx={370}
        cy={p(35.5)}
        r={9}
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
        opacity={0.7}
      />
      <text
        x={384}
        y={p(35.2) + 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
      >
        Sweep SSL
      </text>
      <text
        x={440}
        y={p(47)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
        textAnchor="middle"
      >
        Hướng tới BSL →
      </text>
    </Chart>
  );
}

const STEPS: LessonStep[] = [
  {
    label: "Slide 1 — Thanh khoản là gì?",
    badge: "Khái niệm",
    title: "Thanh khoản là gì?",
    chart: <ChartStep1 />,
    body: (
      <>
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          Thanh khoản (Liquidity)
        </span>{" "}
        là nơi tập trung các lệnh stop loss của đám đông — thường nằm ngay trên
        đỉnh và dưới đáy rõ ràng.
        <br />
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>
          BSL — Buyside Liquidity:
        </span>{" "}
        nằm phía trên đỉnh. Stop loss của người short.
        <br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          SSL — Sellside Liquidity:
        </span>{" "}
        nằm phía dưới đáy. Stop loss của người long.
        <br />
        <br />
        <ConceptLink slug="smart-money">Smart Money</ConceptLink> cần phá vỡ
        những vùng này để{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>khớp lệnh lớn</span>
        .
      </>
    ),
  },
  {
    label: "Slide 2 — Sweep & đảo chiều",
    badge: "Cơ chế",
    title: "Sweep liquidity rồi đảo chiều",
    chart: <ChartStep2 />,
    body: (
      <>
        Thị trường di chuyển lên để{" "}
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>sweep BSL</span> →
        sau đó đảo chiều giảm về phía SSL. Và ngược lại.
        <br />
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          Nguyên tắc:
        </span>{" "}
        khi có liquidity cả trên lẫn dưới → đợi thị trường quét 1 bên → tìm
        setup về phía thanh khoản còn lại.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Đừng vào lệnh khi liquidity còn cả 2 phía — không biết thị trường sẽ
        sweep bên nào trước. Chờ xác nhận.
      </p>
    ),
  },
  {
    label: "Slide 3 — PDH / PDL",
    badge: "Previous Levels",
    title: "PDH / PDL — Previous Day High / Low",
    chart: <ChartStep3 />,
    body: (
      <>
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>PDH</span> và{" "}
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>PDL</span> là đỉnh
        và đáy của ngày hôm qua — liquidity cụ thể và dễ nhận diện nhất.
        <br />
        <br />
        Đám đông đặt SL ngay trên/dưới đó → tạo vùng tập trung lệnh chờ bị kích
        hoạt.
        <br />
        <br />
        Thị trường rất thường sweep PDH hoặc PDL{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          trong phiên đầu ngày
        </span>{" "}
        trước khi đi theo hướng thực sự.
      </>
    ),
  },
  {
    label: "Slide 4 — Hierarchy of Liquidity",
    badge: "Phân cấp",
    title: "Timeframe lớn hơn → Liquidity mạnh hơn",
    chart: <ChartStep4 />,
    body: (
      <>
        <span style={{ color: "#f87171", fontWeight: 500 }}>PMH / PML</span> —
        Previous Month: mạnh nhất.
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>PWH / PWL</span> —
        Previous Week: mạnh.
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>PDH / PDL</span> —
        Previous Day: trung bình.
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>ONH / ONL</span> —
        Overnight: nhỏ nhất.
        <br />
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          Cách dùng:
        </span>{" "}
        dùng HTF (H4, Daily) để xác định liquidity lớn → dùng LTF (M15, H1) để
        tìm entry.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        PYH / PYL (Previous Year) phù hợp hơn với position trading dài hạn.
      </p>
    ),
  },
  {
    label: "Slide 5 — Tổng kết",
    badge: "Tổng kết",
    title: "Thị trường di chuyển để lấy thanh khoản",
    chart: <ChartStep5 />,
    body: (
      <>
        Mọi chuyển động đều có{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>mục đích</span>:
        hướng tới vùng liquidity gần nhất, kích hoạt stop loss, rồi đảo chiều.
        <br />
        <br />
        Chart minh họa: giá giảm sweep{" "}
        <span style={{ color: "#34d399", fontWeight: 500 }}>SSL</span> → đảo
        chiều tăng mạnh hướng tới{" "}
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>BSL</span>.<br />
        <br />
        Hiểu được điều này, bạn sẽ giao dịch cùng chiều{" "}
        <ConceptLink slug="smart-money">Smart Money</ConceptLink> thay vì bị
        bẫy.
      </>
    ),
  },
];

const CONFIG = {
  group: "Nhóm 2 · Bài 07",
  heading: "Nền Tảng Thanh Khoản",
  subhead:
    "Thanh khoản là gì, tại sao thị trường di chuyển để lấy nó, và các mức liquidity cần biết.",
  accentColor: "#a78bfa",
  steps: STEPS,
};

export default function LiquidityBasicsPage() {
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
