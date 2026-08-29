export function randomItem<T>(items: readonly T[], random = Math.random): T | undefined {
  return items[Math.floor(random() * items.length)];
}
