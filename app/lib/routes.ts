export function entryPath(slug: string) {
  return `/entry/${slug}`;
}

export function reviewEntryPath(slug: string) {
  return `${entryPath(slug)}?review=1`;
}

export function categoryPath(key: string) {
  return `/category/${key}`;
}

export function topicPath(key: string) {
  return `/topic/${key}`;
}

export function tagPath(slug: string) {
  return `/tag/${slug}`;
}

export function quizTopicPath(key: string) {
  return `/quiz?topic=${encodeURIComponent(key)}`;
}
