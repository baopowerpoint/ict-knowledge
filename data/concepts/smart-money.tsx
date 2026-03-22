import type { Step } from "@/types";

const W = 480;
const H = 220;

function py(price: number, min = 36, max = 52): number {
  return H - 12 - ((price - min) / (max - min)) * (H - 24);
}

function Candle({
  x,
  o,
  h,
  l,
  c,
  w = 11,
}: {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
  w?: number;
}) {
  const bull = c >= o;
  const color = bull ? "#34d399" : "#f87171";
  const top = bull ? py(c) : py(o);
  const bot = bull ? py(o) : py(c);
  return (
    <g>
      <line
        x1={x}
        y1={py(h)}
        x2={x}
        y2={py(l)}
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

function SmallChart({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {/* Grid lines */}
      {[38, 42, 46, 50].map((p) => (
        <line
          key={p}
          x1={30}
          y1={py(p)}
          x2={W - 8}
          y2={py(p)}
          stroke="#1c2840"
          strokeWidth={0.5}
          strokeDasharray="2,6"
        />
      ))}
      {children}
    </svg>
  );
}

export const smartMoneyPreview: Step[] = [
  {
    label: "Smart Money là ai?",
    badge: "Định nghĩa",
    title: "Smart Money — Tổ chức tài chính lớn",
    chart: (
      <SmallChart>
        {/* Retail bị bẫy */}
        {[
          { x: 60, o: 40, h: 41, l: 39, c: 40.5 },
          { x: 95, o: 40.5, h: 42, l: 40, c: 41.5 },
          { x: 130, o: 41.5, h: 43, l: 41, c: 42.5 },
          { x: 165, o: 42.5, h: 44, l: 42, c: 43.5 },
          { x: 200, o: 43.5, h: 45, l: 43, c: 44.5 }, // retail buy
          { x: 235, o: 44.5, h: 45.5, l: 42, c: 42 }, // SM dumps
          { x: 270, o: 42, h: 42.5, l: 40, c: 40.5 },
          { x: 305, o: 40.5, h: 41, l: 38.5, c: 39 },
        ].map((c, i) => (
          <Candle key={i} {...c} />
        ))}

        {/* Retail buy zone */}
        <rect
          x={165}
          y={py(44.5)}
          width={70}
          height={py(43) - py(44.5)}
          fill="rgba(96,165,250,0.08)"
        />
        <text
          x={200}
          y={py(45.5) - 4}
          fontFamily="JetBrains Mono"
          fontSize={8}
          fill="#60a5fa"
          textAnchor="middle"
        >
          Retail mua
        </text>

        {/* SM dumps */}
        <text
          x={235}
          y={py(46)}
          fontFamily="JetBrains Mono"
          fontSize={8}
          fill="#f87171"
          textAnchor="middle"
        >
          SM bán!
        </text>

        {/* Labels */}
        <text
          x={W / 2}
          y={H - 4}
          fontFamily="JetBrains Mono"
          fontSize={8}
          fill="#5a6d85"
          textAnchor="middle"
        >
          Retail mua đỉnh → Smart Money phân phối
        </text>
      </SmallChart>
    ),
    body: (
      <>
        <span style={{ color: "#f59e0b", fontWeight: 500 }}>Smart Money</span>{" "}
        là các tổ chức tài chính lớn — ngân hàng trung ương, quỹ hedge fund,
        market maker — những người có đủ vốn để{" "}
        <span style={{ color: "#eaf0f6", fontWeight: 500 }}>
          di chuyển thị trường
        </span>
        .
        <br />
        <br />
        Họ không mua/bán như retail. Để khớp lệnh hàng triệu USD, họ cần đối ứng
        — tức là cần{" "}
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>liquidity</span> từ
        stop loss của đám đông.
      </>
    ),
  },
  {
    label: "SM hoạt động như thế nào?",
    badge: "Cơ chế",
    title: "Accumulation → Manipulation → Distribution",
    chart: (
      <SmallChart>
        {[
          // Accumulation — tích lũy âm thầm
          { x: 50, o: 39, h: 40, l: 38.5, c: 39.5 },
          { x: 82, o: 39.5, h: 40.5, l: 39, c: 40 },
          { x: 114, o: 40, h: 41, l: 39.5, c: 40.5 },
          { x: 146, o: 40.5, h: 41.5, l: 40, c: 41 },
          // Manipulation — đẩy giả
          { x: 178, o: 41, h: 41.5, l: 38, c: 38.5 }, // fake dump
          { x: 210, o: 38.5, h: 39.5, l: 37.5, c: 38.8 },
          // Distribution — đẩy thật
          { x: 242, o: 38.8, h: 42, l: 38.5, c: 41.5 },
          { x: 274, o: 41.5, h: 44, l: 41, c: 43.5 },
          { x: 306, o: 43.5, h: 46, l: 43, c: 45.5 },
          { x: 338, o: 45.5, h: 49, l: 45, c: 48 },
        ].map((c, i) => (
          <Candle key={i} {...c} />
        ))}

        {/* Phase labels */}
        <rect
          x={36}
          y={py(41.5)}
          width={130}
          height={py(38.5) - py(41.5)}
          fill="rgba(52,211,153,0.05)"
        />
        <text
          x={100}
          y={py(40) + 4}
          fontFamily="JetBrains Mono"
          fontSize={7.5}
          fill="#34d399"
          textAnchor="middle"
          opacity={0.8}
        >
          Accumulation
        </text>

        <rect
          x={168}
          y={py(41.5)}
          width={64}
          height={py(37.5) - py(41.5)}
          fill="rgba(248,113,113,0.05)"
        />
        <text
          x={200}
          y={py(40.5) + 4}
          fontFamily="JetBrains Mono"
          fontSize={7.5}
          fill="#f87171"
          textAnchor="middle"
          opacity={0.8}
        >
          Manipulation
        </text>

        <rect
          x={234}
          y={py(49)}
          width={130}
          height={py(38.5) - py(49)}
          fill="rgba(167,139,250,0.05)"
        />
        <text
          x={300}
          y={py(44) + 4}
          fontFamily="JetBrains Mono"
          fontSize={7.5}
          fill="#a78bfa"
          textAnchor="middle"
          opacity={0.8}
        >
          Distribution
        </text>
      </SmallChart>
    ),
    body: (
      <>
        Smart Money hoạt động theo 3 giai đoạn:{" "}
        <span style={{ color: "#34d399", fontWeight: 500 }}>Accumulation</span>{" "}
        →{" "}
        <span style={{ color: "#f87171", fontWeight: 500 }}>Manipulation</span>{" "}
        →{" "}
        <span style={{ color: "#a78bfa", fontWeight: 500 }}>Distribution</span>.
        <br />
        <br />
        Manipulation là bước sweep liquidity — đẩy giá ngược chiều để kích hoạt
        SL của đám đông, gom thêm lệnh với giá tốt hơn, rồi mới đi theo hướng
        thực sự.
      </>
    ),
  },
];
