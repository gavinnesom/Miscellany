import { MiscellanyApp } from "./components/MiscellanyApp";
import { categoryGroups, contentValidationProblems, entries, topicGroups } from "./lib/content";
import { randomItem } from "./lib/random";

export const dynamic = "force-dynamic";

export default function Home() {
  if (contentValidationProblems.length > 0) {
    throw new Error(`Content validation failed: ${contentValidationProblems.join(", ")}`);
  }

  return (
    <MiscellanyApp
      entries={entries}
      groups={categoryGroups}
      topics={topicGroups}
      initialSlug={randomItem(entries)?.slug}
    />
  );
}
