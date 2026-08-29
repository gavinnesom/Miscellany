export type Category = {
  key: string;
  label: string;
  description: string;
  note: string;
  slug: string;
  title: string;
};

function defineCategory(category: Omit<Category, "slug" | "title">): Category {
  return {
    ...category,
    slug: category.key,
    title: category.label,
  };
}

export const categories: Category[] = [
  defineCategory({
    key: "natural-world",
    label: "Natural World",
    note: "Organisms, landscapes, and oddities of life outdoors.",
    description: "Plants, animals, and resilient forms of life Gavin has noticed, currently centered on local weeds, animal perception, intelligence, and extremophile survival.",
  }),
  defineCategory({
    key: "biology-medicine",
    label: "Biology & Medicine",
    note: "Bodies, cells, disease, sleep, and health mechanisms.",
    description: "Mechanisms of living systems and disease, currently centered on metabolism, diabetes, sleep, cell biology, and selected medical conditions.",
  }),
  defineCategory({
    key: "physics-space",
    label: "Physics & Space",
    note: "Matter, time, planets, stars, and the scale of things.",
    description: "Physical principles and deep time, currently spanning relativity, Earth history, geologic evidence, thermodynamics, and the scale of the observable universe.",
  }),
  defineCategory({
    key: "computing-ai",
    label: "Computing & AI",
    note: "Software, models, algorithms, and machine intelligence.",
    description: "How computation works and how modern AI systems represent language, make predictions, run locally or remotely, and reuse older algorithmic ideas.",
  }),
  defineCategory({
    key: "engineering-machines",
    label: "Engineering & Machines",
    note: "How built systems move, carry, switch, and endure.",
    description: "Practical mechanisms in built systems, currently focused on vehicles, drivetrains, engines, suspension, and electrical infrastructure.",
  }),
  defineCategory({
    key: "history-society",
    label: "History & Society",
    note: "Institutions, myths, arguments, and social memory.",
    description: "Institutions, public-policy arguments, historical myths, financial memory, and big-history interpretations that are easy to misremember without a compact reference.",
  }),
  defineCategory({
    key: "philosophy",
    label: "Philosophy",
    note: "Questions about reality, knowledge, value, reasoning, and life.",
    description: "Orientation to philosophical questions and major thinkers, currently organized around branches, timelines, and a starter set of philosophers.",
  }),
  defineCategory({
    key: "books-ideas",
    label: "Ideas & Reasoning",
    note: "Mental tools, explanations, and useful intellectual habits.",
    description: "Explanations, reasoning tools, cognitive pitfalls, and reusable intellectual habits Gavin wants to keep available as part of the learning curriculum.",
  }),
  defineCategory({
    key: "bridge-games",
    label: "Bridge & Games",
    note: "Systems, scoring, puzzles, and strategic weirdness.",
    description: "Game systems and bridge ideas, currently including bidding conventions, sacrifice scoring, and a probability puzzle.",
  }),
  defineCategory({
    key: "arts-culture",
    label: "Arts & Culture",
    note: "Films, styles, endings, and cultural objects worth keeping.",
    description: "Cultural objects and styles worth remembering, currently spanning film, television, literature, authors, and interpretation.",
  }),
  defineCategory({
    key: "practical-world",
    label: "Practical World",
    note: "Everyday infrastructure, privacy, tools, and useful distinctions.",
    description: "Everyday systems and practical distinctions, currently centered on online privacy, tracking, and VPN tradeoffs.",
  }),
];

export const categoryKeys = new Set(categories.map((category) => category.key));

export function categoryFor(key: string) {
  return categories.find((category) => category.key === key) ?? {
    key,
    label: key
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    slug: key,
    title: key
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    description: "Uncategorized notes.",
    note: "Uncategorized notes.",
  };
}
