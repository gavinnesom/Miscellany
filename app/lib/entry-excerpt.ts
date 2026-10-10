import { renderMathText } from "./math-text.ts";

export function entryExcerpt(markdown: string) {
  const paragraph = markdown.split(/\r?\n\s*\r?\n|\r?\n\s*[-*+]\s+/)[0];
  return paragraph
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]|\$\$([\s\S]*?)\$\$/g,
      (_, inline: string, display: string, dollars: string) => renderMathText(inline ?? display ?? dollars))
    .replace(/^\s*(?:#{1,6}\s+|>\s?|[-*+]\s+)/gm, "")
    .replace(/[*`]/g, "")
    .trim();
}
