import type { Step } from "@/types";
import { smartMoneyPreview } from "./smart-money";

export const CONCEPT_PREVIEWS: Record<string, Step[]> = {
  "smart-money": smartMoneyPreview,
  // thêm dần khi học thêm khái niệm
};
