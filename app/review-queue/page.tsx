import { ReviewQueueClient } from "../components/ReviewQueueClient";
import { entries } from "../lib/content";

export const dynamic = "force-dynamic";

export default async function ReviewQueuePage() {
  return <ReviewQueueClient entryCount={entries.length} surpriseSlugs={entries.map((entry) => entry.slug)} />;
}
