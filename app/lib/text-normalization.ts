const markdownEscapedCharacters = /\\([\\`*_{}\[\]()#+\-.!<>|&%"'])/g;

export function normalizeReaderText(value: string) {
  return value.replace(markdownEscapedCharacters, "$1");
}
