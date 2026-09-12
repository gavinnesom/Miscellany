export function randomItem<T>(items: readonly T[], random = Math.random): T | undefined {
  return items[Math.floor(random() * items.length)];
}

export function randomItemExcept<T>(items: readonly T[], excluded: T | undefined, random = Math.random): T | undefined {
  const candidates = excluded === undefined ? items : items.filter((item) => item !== excluded);
  return randomItem(candidates.length > 0 ? candidates : items, random);
}
