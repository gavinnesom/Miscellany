export const MISCELLANY_SOURCE_ID = "miscellany";

export type MemoryRating = "again" | "hard" | "good" | "easy";
export type ReviewTrigger = "manual" | "due";

export type QueuedReview = {
  event_id: string;
  source_id: typeof MISCELLANY_SOURCE_ID;
  item_id: string;
  rating: MemoryRating;
  trigger: ReviewTrigger;
  reviewed_at: string;
};

export type MemorySummary = {
  source_id: string;
  active_items: number;
  due_now: number;
  review_count: number;
  median_stability_days: number | null;
};
