import { MiscellanyApp } from "./components/MiscellanyApp";
import { categoryGroups, contentValidationProblems, entries, topicGroups } from "./lib/content";

export const dynamic = "force-static";

export default function Home() {
  if (contentValidationProblems.length > 0) {
    throw new Error(`Content validation failed: ${contentValidationProblems.join(", ")}`);
  }

  return (
    <MiscellanyApp
      entries={entries}
      groups={categoryGroups}
      topics={topicGroups}
    />
  );
}
