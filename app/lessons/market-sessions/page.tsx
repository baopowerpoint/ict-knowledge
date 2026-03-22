"use client";

import { useState, useCallback } from "react";
import { LessonPage, type LessonStep } from "@/components/shared/LessonPage";
import { Chart, Candle, py, CHART_W, CHART_H } from "@/components/shared/chart";

function ChartSessions() {
  const MIN = 36,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);

  const sessions = [
    {
      x: 40,
      w: 90,
      label: "Sydney",
      time: "04:00–13:00",
      color: "#5a6d85",
      vol: "Thấp",
    },
    {
      x: 140,
      w: 110,
      label: "Tokyo",
      time: "07:00–16:00",
      color: "#60a5fa",
      vol: "Thấp",
    },
    {
      x: 250,
      w: 140,
      label: "London",
      time: "14:00–23:00",
      color: "#a78bfa",
      vol: "Cao",
    },
    {
      x: 340,
      w: 160,
      label: "New York",
      time: "19:00–04:00",
      color: "#f59e0b",
      vol: "Rất cao",
    },
  ];

  const overlapX = 340,
    overlapW = 60;

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {sessions.map(({ x, w, label, time, color, vol }) => (
        <g key={label}>
          <rect
            x={x}
            y={30}
            width={w}
            height={CHART_H - 50}
            fill={`${color}10`}
            stroke={color}
            strokeWidth={0.5}
            strokeDasharray="4,4"
            rx={4}
          />
          <text
            x={x + w / 2}
            y={46}
            fontFamily="JetBrains Mono"
            fontSize={9}
            fill={color}
            textAnchor="middle"
            fontWeight={600}
          >
            {label}
          </text>
          <text
            x={x + w / 2}
            y={60}
            fontFamily="JetBrains Mono"
            fontSize={7.5}
            fill="#5a6d85"
            textAnchor="middle"
          >
            {time}
          </text>
          <text
            x={x + w / 2}
            y={CHART_H - 28}
            fontFamily="JetBrains Mono"
            fontSize={7.5}
            fill={color}
            textAnchor="middle"
            opacity={0.7}
          >
            {vol}
          </text>
        </g>
      ))}
      <rect
        x={overlapX}
        y={30}
        width={overlapW}
        height={CHART_H - 50}
        fill="rgba(245,158,11,0.12)"
        rx={4}
      />
      <text
        x={overlapX + overlapW / 2}
        y={CHART_H / 2}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f59e0b"
        textAnchor="middle"
        fontWeight={700}
      >
        OVERLAP
      </text>
      <text
        x={overlapX + overlapW / 2}
        y={CHART_H / 2 + 14}
        fontFamily="JetBrains Mono"
        fontSize={7}
        fill="#f59e0b"
        textAnchor="middle"
      >
        19–23h VN
      </text>
      <text
        x={CHART_W / 2}
        y={CHART_H - 6}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Giờ Việt Nam (UTC+7) — Giờ chuẩn (không DST)
      </text>
    </Chart>
  );
}

function ChartKillZones() {
  const MIN = 36,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);

  const kzs = [
    {
      x: 36,
      w: 70,
      label: "Asia KZ",
      time: "02:00–05:00",
      color: "#60a5fa",
      desc: "Rạng sáng",
    },
    {
      x: 200,
      w: 110,
      label: "London KZ",
      time: "14:00–17:00",
      color: "#a78bfa",
      desc: "Sweep & MSS",
    },
    {
      x: 390,
      w: 110,
      label: "NY Open KZ",
      time: "19:00–22:00",
      color: "#f59e0b",
      desc: "Trend mạnh",
    },
  ];

  const candles = [
    { x: 50, o: 43, h: 43.5, l: 42.5, c: 43.2 }, // Asia range
    { x: 75, o: 43.2, h: 43.8, l: 42.8, c: 43 },
    { x: 100, o: 43, h: 43.6, l: 42.6, c: 43.4 },
    { x: 150, o: 43.4, h: 44, l: 43, c: 43.8 },
    { x: 220, o: 43.8, h: 46, l: 43, c: 45.5 }, // London — sweep
    { x: 255, o: 45.5, h: 47.5, l: 45, c: 47 },
    { x: 290, o: 47, h: 49, l: 46.5, c: 48.5 },
    { x: 340, o: 48.5, h: 50, l: 48, c: 49.5 },
    { x: 410, o: 49, h: 51, l: 48.5, c: 50.5 }, // NY KZ
    { x: 445, o: 50.5, h: 52, l: 50, c: 51.5 },
    { x: 480, o: 51.5, h: 53, l: 51, c: 52.5 },
    { x: 515, o: 52.5, h: 53.5, l: 52, c: 53 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {kzs.map(({ x, w, label, time, color, desc }) => (
        <g key={label}>
          <rect
            x={x}
            y={20}
            width={w}
            height={CHART_H - 36}
            fill={`${color}08`}
            stroke={color}
            strokeWidth={0.8}
            strokeDasharray="5,4"
            rx={4}
          />
          <text
            x={x + w / 2}
            y={34}
            fontFamily="JetBrains Mono"
            fontSize={8}
            fill={color}
            textAnchor="middle"
            fontWeight={600}
          >
            {label}
          </text>
          <text
            x={x + w / 2}
            y={46}
            fontFamily="JetBrains Mono"
            fontSize={7}
            fill="#5a6d85"
            textAnchor="middle"
          >
            {time} VN
          </text>
          <text
            x={x + w / 2}
            y={CHART_H - 22}
            fontFamily="JetBrains Mono"
            fontSize={7}
            fill={color}
            textAnchor="middle"
            opacity={0.7}
          >
            {desc}
          </text>
        </g>
      ))}
      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} w={10} />
      ))}
    </Chart>
  );
}

function ChartAsiaDraw() {
  const MIN = 36,
    MAX = 52;
  const p = (v: number) => py(v, MIN, MAX);

  const HIGH = 46.5,
    LOW = 43.5;

  const candles = [
    // Asia range — sideway
    { x: 55, o: 44.5, h: 46, l: 44, c: 45.5 },
    { x: 85, o: 45.5, h: 46.5, l: 45, c: 46 },
    { x: 115, o: 46, h: 46.5, l: 45, c: 45.5 },
    { x: 145, o: 45.5, h: 46, l: 44.5, c: 45 },
    { x: 175, o: 45, h: 45.5, l: 43.5, c: 44 },
    { x: 205, o: 44, h: 44.5, l: 43.5, c: 44 },
    // London opens — sweep Asia low
    { x: 270, o: 44, h: 44.5, l: 42.5, c: 43 }, // sweep SSL
    { x: 300, o: 43, h: 45, l: 42.5, c: 44.5 }, // reversal
    { x: 330, o: 44.5, h: 47, l: 44, c: 46.5 },
    { x: 360, o: 46.5, h: 49, l: 46, c: 48.5 },
    { x: 390, o: 48.5, h: 51, l: 48, c: 50.5 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* Asia range */}
      <rect
        x={36}
        y={p(HIGH)}
        width={250}
        height={p(LOW) - p(HIGH)}
        fill="rgba(96,165,250,0.06)"
      />
      <line
        x1={36}
        y1={p(HIGH)}
        x2={286}
        y2={p(HIGH)}
        stroke="#60a5fa"
        strokeWidth={1}
        strokeDasharray="5,4"
      />
      <line
        x1={36}
        y1={p(LOW)}
        x2={286}
        y2={p(LOW)}
        stroke="#60a5fa"
        strokeWidth={1}
        strokeDasharray="5,4"
      />
      <text
        x={50}
        y={p(HIGH) - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#60a5fa"
      >
        Asia High (BSL)
      </text>
      <text
        x={50}
        y={p(LOW) + 13}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#60a5fa"
      >
        Asia Low (SSL)
      </text>

      {/* London open marker */}
      <line
        x1={250}
        y1={20}
        x2={250}
        y2={CHART_H - 10}
        stroke="#a78bfa"
        strokeWidth={1}
        strokeDasharray="3,4"
      />
      <text
        x={258}
        y={16}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#a78bfa"
      >
        London mở
      </text>

      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} w={11} />
      ))}

      {/* Sweep annotation */}
      <circle
        cx={270}
        cy={p(42.5)}
        r={6}
        fill="none"
        stroke="#34d399"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={283}
        y={p(42.3)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
      >
        Sweep Asia Low
      </text>

      <text
        x={CHART_W / 2}
        y={CHART_H - 4}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Asia tạo range → London sweep rồi đi theo hướng thực
      </text>
    </Chart>
  );
}

function ChartPowerOfThree() {
  const MIN = 36,
    MAX = 56;
  const p = (v: number) => py(v, MIN, MAX);

  const candles = [
    // Asia — Accumulation (range)
    { x: 55, o: 43, h: 44, l: 42.5, c: 43.5 },
    { x: 82, o: 43.5, h: 44.5, l: 43, c: 44 },
    { x: 109, o: 44, h: 44.5, l: 43, c: 43.8 },
    { x: 136, o: 43.8, h: 44.2, l: 43, c: 43.3 },
    // London — Manipulation (sweep thấp)
    { x: 200, o: 43.3, h: 43.8, l: 40.5, c: 41 }, // fake drop
    { x: 227, o: 41, h: 42, l: 40, c: 41.5 },
    // London/NY — Distribution (tăng thật)
    { x: 290, o: 41.5, h: 44, l: 41, c: 43.5 },
    { x: 317, o: 43.5, h: 47, l: 43, c: 46.5 },
    { x: 344, o: 46.5, h: 50, l: 46, c: 49.5 },
    { x: 371, o: 49.5, h: 53, l: 49, c: 52.5 },
    { x: 398, o: 52.5, h: 54.5, l: 52, c: 54 },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {/* Phase zones */}
      <rect
        x={36}
        y={20}
        width={150}
        height={CHART_H - 36}
        fill="rgba(96,165,250,0.05)"
      />
      <text
        x={111}
        y={34}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#60a5fa"
        textAnchor="middle"
        fontWeight={600}
      >
        Accumulation
      </text>
      <text
        x={111}
        y={46}
        fontFamily="JetBrains Mono"
        fontSize={7}
        fill="#5a6d85"
        textAnchor="middle"
      >
        Asia session
      </text>

      <rect
        x={190}
        y={20}
        width={90}
        height={CHART_H - 36}
        fill="rgba(248,113,113,0.05)"
      />
      <text
        x={235}
        y={34}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
        textAnchor="middle"
        fontWeight={600}
      >
        Manipulation
      </text>
      <text
        x={235}
        y={46}
        fontFamily="JetBrains Mono"
        fontSize={7}
        fill="#5a6d85"
        textAnchor="middle"
      >
        London open
      </text>

      <rect
        x={284}
        y={20}
        width={270}
        height={CHART_H - 36}
        fill="rgba(52,211,153,0.05)"
      />
      <text
        x={419}
        y={34}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#34d399"
        textAnchor="middle"
        fontWeight={600}
      >
        Distribution
      </text>
      <text
        x={419}
        y={46}
        fontFamily="JetBrains Mono"
        fontSize={7}
        fill="#5a6d85"
        textAnchor="middle"
      >
        London/NY trend
      </text>

      {candles.map((c, i) => (
        <Candle key={i} {...c} min={MIN} max={MAX} w={11} />
      ))}

      {/* Fake drop annotation */}
      <circle
        cx={200}
        cy={p(40.5)}
        r={6}
        fill="none"
        stroke="#f87171"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <text
        x={213}
        y={p(40.3)}
        fontFamily="JetBrains Mono"
        fontSize={8}
        fill="#f87171"
      >
        Bẫy Sell!
      </text>
    </Chart>
  );
}

function ChartVNTime() {
  const MIN = 34,
    MAX = 54;
  const p = (v: number) => py(v, MIN, MAX);

  const times = [
    {
      x: 36,
      w: 68,
      label: "00:00–07:00",
      session: "Asia KZ",
      color: "#60a5fa",
      note: "02-05h: Tokyo mở cửa",
    },
    {
      x: 112,
      w: 90,
      label: "07:00–14:00",
      session: "Pre-London",
      color: "#5a6d85",
      note: "Chuẩn bị phân tích",
    },
    {
      x: 210,
      w: 110,
      label: "14:00–17:00",
      session: "London KZ",
      color: "#a78bfa",
      note: "Phiên QT #1",
    },
    {
      x: 328,
      w: 60,
      label: "17:00–19:00",
      session: "Giữa phiên",
      color: "#5a6d85",
      note: "Ít biến động",
    },
    {
      x: 396,
      w: 110,
      label: "19:00–22:00",
      session: "NY Open KZ",
      color: "#f59e0b",
      note: "Phiên QT #2",
    },
    {
      x: 514,
      w: 56,
      label: "22:00–00:00",
      session: "NY PM",
      color: "#5a6d85",
      note: "Giảm dần",
    },
  ];

  return (
    <Chart min={MIN} max={MAX} step={3}>
      {times.map(({ x, w, label, session, color, note }) => (
        <g key={label}>
          <rect
            x={x}
            y={25}
            width={w}
            height={CHART_H - 45}
            fill={`${color}10`}
            stroke={color}
            strokeWidth={0.6}
            strokeDasharray={color === "#5a6d85" ? "3,4" : "0"}
            rx={4}
          />
          <text
            x={x + w / 2}
            y={40}
            fontFamily="JetBrains Mono"
            fontSize={8}
            fill={color}
            textAnchor="middle"
            fontWeight={600}
          >
            {session}
          </text>
          <text
            x={x + w / 2}
            y={52}
            fontFamily="JetBrains Mono"
            fontSize={7}
            fill="#5a6d85"
            textAnchor="middle"
          >
            {label}
          </text>
          <text
            x={x + w / 2}
            y={CHART_H - 22}
            fontFamily="JetBrains Mono"
            fontSize={7}
            fill={color}
            textAnchor="middle"
            opacity={0.8}
          >
            {note}
          </text>
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
        Giờ Việt Nam (UTC+7) · Lệch 1h khi EU/US áp dụng DST (tháng 3–11)
      </text>
    </Chart>
  );
}

const STEPS: LessonStep[] = [
  {
    label: "Slide 1 — 4 phiên chính",
    badge: "Khái niệm",
    title: "4 phiên giao dịch Forex",
    chart: <ChartSessions />,
    body: (
      <>
        Forex mở cửa 24/5. Có 4 phiên chính, mỗi phiên có đặc điểm riêng:
        <br />
        <br />
        <span style={{ color: "#5a6d85", fontWeight: 500 }}>Sydney:</span> Ít
        biến động, khởi động thị trường.
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>
          Tokyo (Asia):
        </span>{" "}
        Tạo range, ít trend. Chuẩn bị cho London.
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>London:</span> Biến
        động mạnh nhất, sweep Asia range, tạo trend.
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          New York:
        </span>{" "}
        Tiếp tục hoặc đảo chiều trend London.
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          Overlap London-NY (14:00-17:00 VN):
        </span>{" "}
        Thanh khoản cao nhất ngày.
      </>
    ),
  },
  {
    label: "Slide 2 — Kill Zones",
    badge: "Kill Zones",
    title: "Kill Zones — Thời điểm vàng để trade",
    chart: <ChartKillZones />,
    body: (
      <>
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>Kill Zone</span> là
        khoảng thời gian các phiên mở cửa — biến động cao, Smart Money hoạt động
        mạnh nhất:
        <br />
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>
          Asia KZ (02:00–05:00 VN):
        </span>{" "}
        Rạng sáng. Tokyo mở cửa, range thấp, tích lũy. Thích hợp để đặt alert.
        <br />
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>
          London KZ (14:00–17:00 VN):
        </span>{" "}
        Quan trọng nhất! Sweep Asia range, MSS, setup xuất hiện nhiều nhất.
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          NY Open KZ (19:00–22:00 VN):
        </span>{" "}
        Tiếp tục trend London hoặc reversal mạnh.
        <br />
        <br />
        <span style={{ color: "#5a6d85", fontWeight: 500 }}>
          NY PM / London Close (22:00–00:00 VN):
        </span>{" "}
        Ít dùng — đóng vị thế cuối ngày.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        ICT khuyến nghị: chỉ trade trong Kill Zone. Tránh trade giờ trưa London
        (12:00-14:00 VN) — thị trường không có hướng, dễ bị whipsaw.
      </p>
    ),
  },
  {
    label: "Slide 3 — Asia Range",
    badge: "Asia Session",
    title: "Asia tạo range — London sweep rồi đi",
    chart: <ChartAsiaDraw />,
    body: (
      <>
        Đây là pattern phổ biến nhất mỗi ngày:
        <br />
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>
          Asia session:
        </span>{" "}
        Giá di chuyển sideways, tạo ra{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          Asia High và Asia Low
        </span>{" "}
        — đây là BSL và SSL cho London.
        <br />
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>
          London open:
        </span>{" "}
        Sweep 1 phía của Asia range (thường sweep phía ngược trend) → MSS → đi
        theo hướng thực sự.
        <br />
        <br />
        Cách dùng: Mark Asia High/Low trước khi ngủ. Khi dậy, xem London đã
        sweep bên nào chưa → biết hướng trade.
      </>
    ),
  },
  {
    label: "Slide 4 — Power of Three",
    badge: "AMD",
    title: "Power of Three — Accumulation, Manipulation, Distribution",
    chart: <ChartPowerOfThree />,
    body: (
      <>
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          Power of Three (AMD)
        </span>{" "}
        là mô hình ICT xảy ra mỗi ngày:
        <br />
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>
          Accumulation (Asia):
        </span>{" "}
        SM âm thầm tích lũy trong range nhỏ.
        <br />
        <br />
        <span style={{ color: "#f87171", fontWeight: 500 }}>
          Manipulation (London open):
        </span>{" "}
        SM đẩy giá ngược chiều để bẫy retail và sweep SL — đây là cú{" "}
        <span style={{ color: "#f87171", fontWeight: 500 }}>trap</span>.<br />
        <br />
        <span style={{ color: "#34d399", fontWeight: 500 }}>
          Distribution (NY):
        </span>{" "}
        SM đẩy giá theo hướng thực sự, retail đã bị stop out không còn ở trên
        đường.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Nếu London mở cửa giảm mạnh ngay → đừng vội Sell. Hỏi: đây là
        Manipulation hay Distribution thật? Chờ xem giá có bật lại không.
      </p>
    ),
  },
  {
    label: "Slide 5 — Giờ VN",
    badge: "Thực chiến",
    title: "Lịch trade theo giờ Việt Nam",
    chart: <ChartVNTime />,
    body: (
      <>
        Với múi giờ Việt Nam (UTC+7), lịch trade lý tưởng:
        <br />
        <br />
        <span style={{ color: "#60a5fa", fontWeight: 500 }}>
          02:00–05:00 (Rạng sáng):
        </span>{" "}
        Asia Kill Zone. Ít dùng nếu không trade AUD/JPY.
        <br />
        <br />
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>
          14:00–17:00 (Chiều):
        </span>{" "}
        London Kill Zone. Quan trọng nhất trong ngày.{" "}
        <span style={{ color: "#a78bfa" }}>★ Ưu tiên</span>
        <br />
        <br />
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>
          19:00–22:00 (Tối):
        </span>{" "}
        NY Open Kill Zone. Overlap London-NY, biến động cực cao.{" "}
        <span style={{ color: "#f59e0b" }}>★ Ưu tiên</span>
        <br />
        <br />
        <span style={{ color: "#5a6d85", fontWeight: 500 }}>
          12:00–14:00 và 17:00–19:00:
        </span>{" "}
        Ít biến động — không nên trade.
        <br />
        <br />
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          Lưu ý DST:
        </span>{" "}
        Tháng 3–11 US/EU áp dụng giờ mùa hè → London KZ dịch sang{" "}
        <span style={{ color: "#a78bfa" }}>13:00–16:00 VN</span>, NY KZ dịch
        sang <span style={{ color: "#f59e0b" }}>18:00–21:00 VN</span>.
      </>
    ),
    insight: (
      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#5a6d85" }}>
        Không cần trade 24/7. 2-4 giờ tập trung trong Kill Zone hiệu quả hơn 12
        giờ nhìn màn hình liên tục.
      </p>
    ),
  },
];

const CONFIG = {
  group: "Nhóm 0 · Bài 03",
  heading: "Phiên Giao Dịch",
  subhead:
    "Asia, London, New York — Kill Zones và Power of Three theo giờ Việt Nam.",
  accentColor: "#60a5fa",
  steps: STEPS,
};

export default function MarketSessionsPage() {
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
