import type { LessonMeta, Category } from "@/types";
export const LESSONS: LessonMeta[] = [
  // ── Nhóm 0 — Đọc biểu đồ ──
  {
    slug: "candlestick",
    title: "Nến Nhật",
    titleEn: "Candlestick",
    category: "structure",
    level: "beginner",
    slideCount: 6,
  },
  {
    slug: "timeframes",
    title: "Khung Thời Gian",
    titleEn: "Timeframes",
    category: "structure",
    level: "beginner",
    slideCount: 5,
  },
  {
    slug: "market-sessions",
    title: "Phiên Giao Dịch",
    titleEn: "Market Sessions",
    category: "structure",
    level: "beginner",
    slideCount: 5,
  },
  // ── Nhóm 1 — Nền tảng thị trường ──
  {
    slug: "trend-basics",
    title: "Xu Hướng Cơ Bản",
    titleEn: "Trend Basics",
    category: "structure",
    level: "beginner",
    slideCount: 5,
  },
  {
    slug: "smart-money",
    title: "Smart Money",
    titleEn: "Institutional Money",
    category: "liquidity",
    level: "beginner",
    slideCount: 5,
  },
  {
    slug: "market-structure",
    title: "Cấu Trúc Thị Trường",
    titleEn: "Market Structure",
    category: "structure",
    level: "beginner",
    slideCount: 6,
  },
  // ── Nhóm 2 — Thanh khoản ──
  {
    slug: "liquidity-basics",
    title: "Nền Tảng Thanh Khoản",
    titleEn: "Liquidity Basics",
    category: "liquidity",
    level: "beginner",
    slideCount: 5,
  },
  {
    slug: "fill-the-gap",
    title: "Lấp Đầy Khoảng Trống",
    titleEn: "Fill The Gap",
    category: "entry",
    level: "beginner",
    slideCount: 6,
  },
  {
    slug: "equilibrium",
    title: "Vùng Cân Bằng 50%",
    titleEn: "Equilibrium",
    category: "entry",
    level: "beginner",
    slideCount: 5,
  },
  {
    slug: "new-highs-lows",
    title: "Tạo Đỉnh Đáy Mới",
    titleEn: "New Highs & Lows",
    category: "liquidity",
    level: "beginner",
    slideCount: 6,
  },
];

export const CATEGORY_META = {
  structure: { label: "Cấu Trúc", dotColor: "#60a5fa" },
  liquidity: { label: "Thanh Khoản", dotColor: "#a78bfa" },
  entry: { label: "Vào Lệnh", dotColor: "#f59e0b" },
  risk: { label: "Quản Lý Vốn", dotColor: "#34d399" },
} satisfies Record<Category, { label: string; dotColor: string }>;
