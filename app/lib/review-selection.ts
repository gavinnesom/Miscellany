export function selectedTextWithinElement(selection: Selection | null, container: HTMLElement | null, maxLength = 1000) {
  if (!selection || selection.isCollapsed || selection.rangeCount === 0 || !container) return "";

  const range = selection.getRangeAt(0);
  if (!container.contains(range.commonAncestorContainer)) return "";

  return selection.toString().replace(/\s+/g, " ").trim().slice(0, maxLength);
}
