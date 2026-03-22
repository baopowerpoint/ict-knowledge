import { ReactNode } from "react";

export type Category = "liquidity" | "structure" | "entry" | "risk";

export type Level = "beginner" | "intermediate" | "advanced";

export interface LessonMeta {
  slug: string;
  title: string;
  titleEn: string;
  category: Category;
  level: Level;
  slideCount: number;
}

export interface Step {
  label: string;
  badge: string;
  title: string;
  body: ReactNode;
  chart: ReactNode;
  insight?: ReactNode;
}
