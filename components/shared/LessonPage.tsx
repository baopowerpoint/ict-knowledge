"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LessonStep {
  label: string;
  badge: string;
  title: string;
  body: React.ReactNode;
  chart: React.ReactNode;
  insight?: React.ReactNode;
}

export interface LessonPageConfig {
  group: string; // "Nhóm 0 · Bài 01"
  heading: string; // "Nến Nhật"
  subhead: string; // mô tả ngắn
  accentColor: string; // "#60a5fa" | "#f59e0b" | ...
  steps: LessonStep[];
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  config: LessonPageConfig;
  current: number;
  direction: number;
  onGo: (n: number) => void;
}

export function LessonPage({ config, current, direction, onGo }: Props) {
  const { group, heading, subhead, accentColor, steps } = config;
  const total = steps.length;
  const step = steps[current];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        onGo(current + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onGo(current - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, onGo]);

  return (
    <div
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "32px 20px",
        fontFamily: "Instrument Sans, sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div style={{ marginBottom: 28 }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.6rem",
            letterSpacing: 2,
            textTransform: "uppercase",
            color: accentColor,
            background: hexToRgba(accentColor, 0.08),
            border: `1px solid ${hexToRgba(accentColor, 0.2)}`,
            padding: "3px 10px",
            borderRadius: 20,
            marginBottom: 10,
          }}
        >
          {group}
        </span>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#eaf0f6",
            letterSpacing: -0.5,
            marginBottom: 4,
          }}
        >
          {heading}
        </h1>
        <p style={{ fontSize: "0.82rem", color: "#5a6d85" }}>{subhead}</p>
      </div>

      {/* ── Nav dots ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 20,
        }}
      >
        <NavArrow
          dir="prev"
          disabled={current === 0}
          onClick={() => onGo(current - 1)}
        />
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => onGo(i)}
            style={{
              height: 4,
              width: i === current ? 28 : 14,
              borderRadius: 2,
              border: "none",
              padding: 0,
              background:
                i === current
                  ? accentColor
                  : i < current
                    ? hexToRgba(accentColor, 0.3)
                    : "#1c2840",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          />
        ))}
        <NavArrow
          dir="next"
          disabled={current === total - 1}
          onClick={() => onGo(current + 1)}
        />
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.65rem",
            color: "#5a6d85",
          }}
        >
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ── Chart panel ── */}
      <div
        style={{
          background: "#0f1520",
          border: "1px solid #1c2840",
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        {/* Chart bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid #1c2840",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.65rem",
            color: "#5a6d85",
          }}
        >
          <span>
            MINH HỌA · <span style={{ color: accentColor }}>{heading}</span>
          </span>
          <span>{step.label}</span>
        </div>

        {/* Chart body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current + "-chart"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ padding: "16px 16px 8px" }}
          >
            {step.chart}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Narration panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current + "-nar"}
          custom={direction}
          variants={{
            enter: (d: number) => ({ opacity: 0, y: d * 12 }),
            center: { opacity: 1, y: 0 },
            exit: (d: number) => ({ opacity: 0, y: d * -12 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2 }}
          style={{
            background: "#0f1520",
            border: "1px solid #1c2840",
            borderLeft: `3px solid ${accentColor}`,
            borderRadius: 12,
            padding: 22,
          }}
        >
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: accentColor,
              marginBottom: 8,
            }}
          >
            {step.badge}
          </div>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#eaf0f6",
              marginBottom: 12,
            }}
          >
            {step.title}
          </h2>
          <div
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.75,
              color: "#8a9cb5",
            }}
          >
            {step.body}
          </div>

          {/* Insight box */}
          {step.insight && (
            <div
              style={{
                marginTop: 14,
                background: hexToRgba(accentColor, 0.06),
                border: `1px solid ${hexToRgba(accentColor, 0.15)}`,
                borderRadius: 8,
                padding: "12px 14px",
                fontSize: "0.82rem",
                lineHeight: 1.6,
                color: "#5a6d85",
              }}
            >
              {step.insight}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom nav ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 14,
        }}
      >
        <NavBtn disabled={current === 0} onClick={() => onGo(current - 1)}>
          ← Trước
        </NavBtn>
        <NavBtn
          disabled={current === total - 1}
          onClick={() => onGo(current + 1)}
        >
          Tiếp →
        </NavBtn>
      </div>
    </div>
  );
}

// ── Internal components ───────────────────────────────────────────────────────

function NavArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 28,
        height: 22,
        borderRadius: 6,
        border: "1px solid #1c2840",
        background: "transparent",
        color: disabled ? "#1c2840" : "#5a6d85",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "color 0.15s",
      }}
    >
      {dir === "prev" ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
    </button>
  );
}

function NavBtn({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "8px 20px",
        border: "1px solid #1c2840",
        background: "transparent",
        color: disabled ? "#263550" : "#5a6d85",
        borderRadius: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "0.75rem",
        transition: "color 0.15s",
      }}
    >
      {children}
    </button>
  );
}

// ── Utility ───────────────────────────────────────────────────────────────────

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
