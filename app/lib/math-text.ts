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

