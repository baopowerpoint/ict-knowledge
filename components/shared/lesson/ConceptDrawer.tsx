"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CONCEPT_PREVIEWS } from "@/data/concepts";
import { useDrawer } from "@/contexts/DrawContext";

const CONCEPT_META: Record<
  string,
  { title: string; titleEn: string; slug?: string }
> = {
  "smart-money": {
    title: "Smart Money",
    titleEn: "Institutional Money",
    slug: undefined, // chưa có lesson riêng — bỏ nút "Xem đầy đủ"
  },
};

export function ConceptDrawer() {
  const { slug, close } = useDrawer();
  const [idx, setIdx] = useState(0);

  const meta = slug ? CONCEPT_META[slug] : null;
  const steps = slug ? (CONCEPT_PREVIEWS[slug] ?? []) : [];

  useEffect(() => {
    setIdx(0);
  }, [slug]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  return (
    <AnimatePresence>
      {slug && meta && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(3px)",
              zIndex: 40,
            }}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(480px, 92vw)",
              background: "#0a0e17",
              borderLeft: "1px solid #1c2840",
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid #1c2840",
                flexShrink: 0,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: "#f59e0b",
                    marginBottom: 5,
                  }}
                >
                  Khái niệm liên quan
                </p>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 8 }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#eaf0f6",
                      fontFamily: "Instrument Sans, sans-serif",
                    }}
                  >
                    {meta.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      color: "#5a6d85",
                    }}
                  >
                    {meta.titleEn}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Nút xem đầy đủ — chỉ hiện khi có lesson riêng */}
                {meta.slug && (
                  <Link
                    href={`/lessons/${meta.slug}`}
                    onClick={close}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      color: "#60a5fa",
                      textDecoration: "none",
                      border: "1px solid rgba(96,165,250,0.2)",
                      padding: "5px 10px",
                      borderRadius: 6,
                    }}
                  >
                    Xem đầy đủ <ArrowUpRight size={11} />
                  </Link>
                )}

                <button
                  onClick={close}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 7,
                    border: "1px solid #1c2840",
                    background: "transparent",
                    color: "#5a6d85",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Step pills */}
            {steps.length > 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "10px 20px",
                  borderBottom: "1px solid #1c2840",
                  flexShrink: 0,
                }}
              >
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    style={{
                      height: 3,
                      width: i === idx ? 28 : 14,
                      borderRadius: 2,
                      border: "none",
                      padding: 0,
                      background: i === idx ? "#f59e0b" : "#1c2840",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  />
                ))}
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    color: "#5a6d85",
                  }}
                >
                  {idx + 1} / {steps.length}
                </span>
              </div>
            )}

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* Chart */}
                  <div
                    style={{
                      background: "#0f1520",
                      border: "1px solid #1c2840",
                      borderRadius: 12,
                      overflow: "hidden",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        padding: "8px 14px",
                        borderBottom: "1px solid #1c2840",
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 9,
                        color: "#5a6d85",
                      }}
                    >
                      {steps[idx].label}
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      {steps[idx].chart}
                    </div>
                  </div>

                  {/* Narration */}
                  <div
                    style={{
                      borderLeft: "2px solid #f59e0b",
                      paddingLeft: 14,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 9,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        color: "#f59e0b",
                        marginBottom: 8,
                      }}
                    >
                      {steps[idx].badge}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#eaf0f6",
                        fontFamily: "Instrument Sans, sans-serif",
                        marginBottom: 10,
                      }}
                    >
                      {steps[idx].title}
                    </p>
                    <div
                      style={{
                        fontSize: 13,
                        lineHeight: 1.75,
                        color: "#8a9cb5",
                        fontFamily: "Instrument Sans, sans-serif",
                      }}
                    >
                      {steps[idx].body}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer nav */}
            {steps.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "12px 20px",
                  borderTop: "1px solid #1c2840",
                  flexShrink: 0,
                }}
              >
                {[
                  { label: "← Trước", dir: -1, disabled: idx === 0 },
                  {
                    label: "Tiếp →",
                    dir: 1,
                    disabled: idx === steps.length - 1,
                  },
                ].map(({ label, dir, disabled }) => (
                  <button
                    key={label}
                    onClick={() =>
                      setIdx((i) =>
                        Math.min(Math.max(0, i + dir), steps.length - 1),
                      )
                    }
                    disabled={disabled}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      border: "1px solid #1c2840",
                      background: "transparent",
                      color: disabled ? "#263550" : "#5a6d85",
                      borderRadius: 8,
                      cursor: disabled ? "not-allowed" : "pointer",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
