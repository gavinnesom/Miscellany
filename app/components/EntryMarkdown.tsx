"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { Entry, EntryImage } from "../lib/content";
import { normalizeReaderText } from "../lib/text-normalization";

const superscripts: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "+": "⁺",
  "-": "⁻",
  T: "ᵀ",
};

const subscripts: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  k: "ₖ",
  B: "ᵦ",
  C: "꜀",
  i: "ᵢ",
};

function scriptText(value: string, map: Record<string, string>) {
  return value.split("").map((character) => map[character] ?? character).join("");
}

export function renderMathText(value: string) {
  return value
    .replace(/\\operatorname\{([^}]+)\}/g, "$1")
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\\vec\s*\{?([A-Za-z])\}?/g, "$1⃗")
    .replace(/\\sqrt\{\\frac\{([^{}]+)\}\{([^{}]+)\}\}/g, "√($1/$2)")
    .replace(/\\frac\{([^{}]+)\}\{\\sqrt\{([^{}]+)\}\}/g, "$1/√($2)")
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "$1/$2")
    .replace(/\\frac([0-9])([0-9])/g, "$1/$2")
    .replace(/\\sqrt\{([^{}]+)\}/g, "√($1)")
    .replace(/\\left\b|\\right\b/g, "")
    .replace(/\\qquad/g, "   ")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\delta/g, "δ")
    .replace(/\\tau/g, "τ")
    .replace(/\\theta/g, "θ")
    .replace(/\\alpha/g, "α")
    .replace(/\\rho/g, "ρ")
    .replace(/\\ell/g, "ℓ")
    .replace(/\\pi/g, "π")
    .replace(/\\gamma/g, "γ")
    .replace(/\\lambda/g, "λ")
    .replace(/\\Omega/g, "Ω")
    .replace(/\\omega/g, "ω")
    .replace(/\\forall/g, "∀")
    .replace(/\\exists/g, "∃")
    .replace(/\\neg/g, "¬")
    .replace(/\\land/g, "∧")
    .replace(/\\lor/g, "∨")
    .replace(/\\rightarrow/g, "→")
    .replace(/\\leftrightarrow/g, "↔")
    .replace(/\\Box/g, "□")
    .replace(/\\Diamond/g, "◇")
    .replace(/\\vdash/g, "⊢")
    .replace(/\\in/g, "∈")
    .replace(/\\equiv/g, "≡")
    .replace(/\\neq/g, "≠")
    .replace(/\\propto/g, "∝")
    .replace(/\\mu/g, "μ")
    .replace(/\\times/g, "×")
    .replace(/\\%/g, "%")
    .replace(/\\sum/g, "Σ")
    .replace(/\\int/g, "∫")
    .replace(/\\cdot/g, "·")
    .replace(/\\sin/g, "sin")
    .replace(/\\cos/g, "cos")
    .replace(/\\perp/g, "⊥")
    .replace(/\\le/g, "≤")
    .replace(/\\approx/g, "≈")
    .replace(/\\sim/g, "~")
    .replace(/\\ge/g, "≥")
    .replace(/\\ll/g, "≪")
    .replace(/\\ln/g, "ln")
    .replace(/\\ldots/g, "…")
    .replace(/\\mid/g, "|")
    .replace(/\\prod/g, "∏")
    .replace(/\\,/g, " ")
    .replace(/\\ /g, " ")
    .replace(/_\{([^{}]+)\}/g, (_, script: string) => scriptText(script, subscripts))
    .replace(/\^\{([^{}]+)\}/g, (_, script: string) => scriptText(script, superscripts))
    .replace(/\^([0-9T+-]+)/g, (_, script: string) => scriptText(script, superscripts))
    .replace(/_([0-9A-Za-z])/g, (_, script: string) => scriptText(script, subscripts))
    .replace(/Δ\s+([A-Za-zτ])/g, "Δ$1")
    .replace(/\\([A-Za-z]+)/g, "$1");
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`\n]+`|\\\([^)]+\\\)|\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const code = part.match(/^`([^`\n]+)`$/);
    if (code) return <code className="entry-inline-code" key={index}>{code[1]}</code>;

    const math = part.match(/^\\\((.*)\\\)$/);
    if (math) return <span className="math-inline" key={index}>{renderMathText(math[1])}</span>;

    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={index}>{normalizeReaderText(bold[1])}</strong>;

    const italic = part.match(/^\*([^*\n]+)\*$/);
    if (italic) return <em key={index}>{normalizeReaderText(italic[1])}</em>;

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={index} href={link[2]} target={link[2].startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {normalizeReaderText(link[1])}
        </a>
      );
    }

    return normalizeReaderText(part);
  });
}

function parseCallout(block: string) {
  const match = block.match(/^>?\s*\*\*(Big idea|Takeaway|Main message|Main point):\*\*\s*([\s\S]*)$/i);
  if (!match) return undefined;
  return {
    label: match[1].slice(0, 1).toUpperCase() + match[1].slice(1).toLowerCase(),
    text: match[2].replace(/^>\s*/gm, "").trim(),
  };
}

function stripBlockquoteMarker(block: string) {
  if (!block.startsWith(">")) return "";
  return block.replace(/^>\s?/gm, "").trim();
}

function orderedListItems(block: string) {
  const items: { text: string; children: string[] }[] = [];

  for (const line of block.split("\n")) {
    const ordered = line.match(/^\d+\.\s+(.*)$/);
    if (ordered) {
      items.push({ text: ordered[1], children: [] });
      continue;
    }

    const nestedBullet = line.match(/^[\t ]+[-*+]\s+(.*)$/);
    if (nestedBullet && items.length > 0) {
      items[items.length - 1].children.push(nestedBullet[1]);
      continue;
    }

    if (items.length > 0 && line.trim()) {
      items[items.length - 1].text = `${items[items.length - 1].text} ${line.trim()}`;
    }
  }

  return items;
}

function imageProvenanceLabel(provenance: EntryImage["provenance"]) {
  if (provenance === "local") return "Local explanatory diagram";
  if (provenance === "collaborative") return "Created with Gavin";
  if (provenance === "user") return "Gavin's image";
  return "";
}

export function EntryFigure({ entry }: { entry: Entry }) {
  const [failedUrl, setFailedUrl] = useState("");
  const image = entry.image;

  if (!image) return null;

  const provenanceLabel = imageProvenanceLabel(image.provenance);
  const imageFailed = failedUrl === image.url;
  const creditLabel = image.credit === provenanceLabel ? "" : image.credit;

  return (
    <figure className="entry-figure">
      {imageFailed ? (
        <div className="entry-image-fallback" role="img" aria-label={image.alt ?? "Image unavailable"}>
          Image unavailable
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="entry-image" src={image.url} alt={image.alt ?? ""} onError={() => setFailedUrl(image.url)} />
      )}
      {creditLabel || image.source_url || provenanceLabel ? (
        <figcaption>
          {provenanceLabel ? <span>{provenanceLabel}</span> : null}
          {image.source_url ? (
            <a href={image.source_url} target="_blank" rel="noreferrer">{creditLabel || "Image source"}</a>
          ) : creditLabel ? <span>{creditLabel}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function EntryMarkdown({ body, afterIntro }: { body: string; afterIntro?: ReactNode }) {
  const blocks = body.split(/\n{2,}/).filter(Boolean);
  const imageInsertionIndex = afterIntro ? blocks.findIndex((block) => !block.startsWith("## ")) : -1;

  return (
    <div className="entry-body">
      {blocks.map((block, index) => {
        const renderedBlock = (() => {
          const image = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
          if (image) {
            return (
              <figure className="inline-figure" key={index}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="inline-image" src={image[2]} alt={image[1]} />
                {image[1] ? <figcaption>{image[1]}</figcaption> : null}
              </figure>
            );
          }

          const codeBlock = block.match(/^```[a-zA-Z0-9_-]*\n([\s\S]*?)\n?```$/);
          if (codeBlock) {
            return (
              <pre className="entry-code-block" key={index}>
                <code>{codeBlock[1]}</code>
              </pre>
            );
          }

          if (block.split("\n").every((line) => /^[\t ]*[-*+]\s+/.test(line))) {
            return (
              <ul key={index}>
                {block.split("\n").map((item) => (
                  <li key={item}>{renderInline(item.replace(/^[\t ]*[-*+]\s+/, ""))}</li>
                ))}
              </ul>
            );
          }

          if (/^\|.+\|\n\|[-:\s|]+\|/.test(block)) {
            const [headerLine, , ...rows] = block.split("\n");
            const headers = headerLine.split("|").slice(1, -1).map((cell) => cell.trim());

            return (
              <div className="table-wrap" key={index}>
                <table>
                  <thead>
                    <tr>
                      {headers.map((header) => <th key={header}>{renderInline(header)}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => {
                      const cells = row.split("|").slice(1, -1).map((cell) => cell.trim());
                      return (
                        <tr key={row}>
                          {cells.map((cell, cellIndex) => <td key={`${row}-${cellIndex}`}>{renderInline(cell)}</td>)}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }

          if (block.startsWith("$$") && block.endsWith("$$")) {
            return (
              <div className="math-block" key={index}>
                {block.replace(/^\$\$\n?|\n?\$\$$/g, "").split("\n").map((line) => (
                  <div key={line}>{renderMathText(line)}</div>
                ))}
              </div>
            );
          }

          if (/^\d+\. /.test(block)) {
            return (
              <ol key={index}>
                {orderedListItems(block).map((item) => (
                  <li key={item.text}>
                    {renderInline(item.text)}
                    {item.children.length ? (
                      <ul>
                        {item.children.map((child) => <li key={child}>{renderInline(child)}</li>)}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ol>
            );
          }

          const heading = block.match(/^#{2,6}\s*(\S[\s\S]*)$/);
          if (heading) {
            return <h3 key={index}>{renderInline(heading[1].trim())}</h3>;
          }

          const callout = parseCallout(block);
          if (callout) {
            return (
              <p className="entry-callout" key={index}>
                <strong>{callout.label}:</strong>{" "}{renderInline(callout.text)}
              </p>
            );
          }

          const unquoted = stripBlockquoteMarker(block);
          if (unquoted) {
            return <p className="entry-callout" key={index}>{renderInline(unquoted)}</p>;
          }

          return <p key={index}>{renderInline(block)}</p>;
        })();

        if (index === imageInsertionIndex) {
          return (
            <div className="entry-intro-group" key={`intro-${index}`}>
              {renderedBlock}
              {afterIntro}
            </div>
          );
        }

        return renderedBlock;
      })}
      {afterIntro && imageInsertionIndex === -1 ? afterIntro : null}
    </div>
  );
}

export function EntryVideo({ entry }: { entry: Entry }) {
  if (!entry.video) return null;

  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(entry.video.youtube_id)}`;

  return (
    <figure className="entry-video">
      <div className="video-frame">
        <iframe
          src={src}
          title={entry.video.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {entry.video.note ? <figcaption>{entry.video.note}</figcaption> : null}
    </figure>
  );
}
