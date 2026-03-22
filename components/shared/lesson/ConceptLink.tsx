"use client";

import { useDrawer } from "@/contexts/DrawContext";
import type { ReactNode } from "react";

interface Props {
  slug: string;
  children: ReactNode;
}

export function ConceptLink({ slug, children }: Props) {
  const { open } = useDrawer();
  return (
    <span
      onClick={() => open(slug)}
      style={{
        color: "#f59e0b",
        borderBottom: "1px dashed rgba(245,158,11,0.35)",
        cursor: "pointer",
        fontWeight: 500,
        transition: "border-color 0.15s, color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderBottomColor = "#f59e0b";
        e.currentTarget.style.color = "#fbbf24";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderBottomColor = "rgba(245,158,11,0.35)";
        e.currentTarget.style.color = "#f59e0b";
      }}
    >
      {children}
    </span>
  );
}
