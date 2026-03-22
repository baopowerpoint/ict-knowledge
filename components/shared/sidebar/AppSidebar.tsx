"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Circle,
  ChevronDown,
  Layers,
  TrendingUp,
  Target,
  Shield,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { LESSONS, CATEGORY_META } from "@/data/lessons";
import type { Category } from "@/types";

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  liquidity: <Layers size={13} />,
  structure: <TrendingUp size={13} />,
  entry: <Target size={13} />,
  risk: <Shield size={13} />,
};

const GROUPED = (Object.keys(CATEGORY_META) as Category[]).map((cat) => ({
  category: cat,
  meta: CATEGORY_META[cat],
  lessons: LESSONS.filter((l) => l.category === cat),
}));

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const completed = LESSONS.filter((l) => (l as any).completed).length;
  const progress =
    LESSONS.length > 0 ? Math.round((completed / LESSONS.length) * 100) : 0;

  return (
    <Sidebar collapsible="icon" className="border border-muted">
      {/* ── Header ── */}
      <SidebarHeader
        className="px-3 py-3"
        style={{ borderBottom: "1px solid #1c2840" }}
      >
        <div className="flex items-center gap-2.5">
          {/* Logo icon */}
          <div
            style={{
              width: 32,
              height: 32,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              background: "rgba(245,158,11,0.1)",
            }}
          >
            <GraduationCap size={15} style={{ color: "#f59e0b" }} />
          </div>

          {/* Title */}
          {!isCollapsed && (
            <div style={{ overflow: "hidden", flex: 1 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#eaf0f6",
                  fontFamily: "Instrument Sans, sans-serif",
                  lineHeight: 1.2,
                }}
              >
                ICT Knowledge
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "#5a6d85",
                  fontFamily: "JetBrains Mono, monospace",
                  marginTop: 1,
                }}
              >
                Smart Money Concept
              </p>
            </div>
          )}

          <SidebarTrigger className="ml-auto" style={{ color: "#5a6d85" }} />
        </div>

        {/* Progress */}
        {!isCollapsed && (
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 9,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#5a6d85",
                }}
              >
                Tiến độ
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 9,
                  color: "#f59e0b",
                }}
              >
                {completed}/{LESSONS.length}
              </span>
            </div>
            <div
              style={{
                height: 3,
                width: "100%",
                background: "#1c2840",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "#f59e0b",
                  borderRadius: 2,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              />
            </div>
          </div>
        )}
      </SidebarHeader>

      {/* ── Content ── */}
      <SidebarContent style={{ background: "#0a0e17" }}>
        {/* Empty state */}
        {LESSONS.length === 0 && !isCollapsed && (
          <div style={{ padding: "32px 16px", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                color: "#263550",
              }}
            >
              Chưa có bài học nào
            </p>
          </div>
        )}

        {GROUPED.filter((g) => g.lessons.length > 0).map(
          ({ category, meta, lessons }) => (
            <Collapsible
              key={category}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup style={{ padding: "4px 0" }}>
                {/* Group label */}
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      gap: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        color: meta.dotColor,
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {CATEGORY_ICONS[category]}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 9,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            color: "#5a6d85",
                            flex: 1,
                          }}
                        >
                          {meta.label}
                        </span>
                        <ChevronDown
                          size={11}
                          style={{
                            color: "#263550",
                            transition: "transform 0.2s",
                          }}
                          className="group-data-[state=open]/collapsible:rotate-180"
                        />
                      </>
                    )}
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                {/* Lessons */}
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {lessons.map((lesson) => {
                        const isActive = pathname === `/lessons/${lesson.slug}`;
                        return (
                          <SidebarMenuItem key={lesson.slug}>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive}
                              tooltip={lesson.title}
                              style={{
                                height: "auto",
                                alignItems: "flex-start",
                                padding: "8px 12px",
                              }}
                            >
                              <Link href={`/lessons/${lesson.slug}`}>
                                {/* Dot */}
                                <Circle
                                  size={13}
                                  style={{
                                    marginTop: 2,
                                    flexShrink: 0,
                                    color: isActive ? "#f59e0b" : "#263550",
                                  }}
                                />

                                {/* Text */}
                                {!isCollapsed && (
                                  <div style={{ overflow: "hidden", flex: 1 }}>
                                    <p
                                      style={{
                                        fontSize: 13,
                                        fontFamily:
                                          "Instrument Sans, sans-serif",
                                        color: isActive ? "#f59e0b" : "#c8d6e5",
                                        fontWeight: isActive ? 500 : 400,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        lineHeight: 1.3,
                                      }}
                                    >
                                      {lesson.title}
                                    </p>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                        marginTop: 3,
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "JetBrains Mono, monospace",
                                          fontSize: 10,
                                          color: meta.dotColor,
                                          opacity: 0.8,
                                        }}
                                      >
                                        {lesson.titleEn}
                                      </span>
                                      <span
                                        style={{
                                          fontFamily:
                                            "JetBrains Mono, monospace",
                                          fontSize: 10,
                                          color: "#263550",
                                        }}
                                      >
                                        · {lesson.slideCount} slides
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ),
        )}
      </SidebarContent>

      {/* ── Footer ── */}
      {!isCollapsed && (
        <SidebarFooter
          style={{ borderTop: "1px solid #1c2840", padding: "10px 16px" }}
        >
          <p
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color: "#263550",
            }}
          >
            {LESSONS.length} bài học · ICT / SMC
          </p>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
