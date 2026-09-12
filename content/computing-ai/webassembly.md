---
title: "WebAssembly"
slug: "webassembly"
category: "computing-ai"
topic: "web-runtime-technology"
tags:
  - wasm
  - browsers
  - performance
date_added: "2026-08-11"
date_updated: "2026-08-12"
relationships:
  parent: []
  deeper: []
  related: []
sources:
  - label: "WebAssembly official site/specification"
    url: "https://webassembly.org/"
  - label: "W3C WebAssembly specification"
    url: "https://www.w3.org/TR/wasm-core-2/"
  - label: "WebAssembly design goals"
    url: "https://webassembly.org/docs/high-level-goals/"
books: []
image:
  url: "/images/entry-webassembly.svg"
  alt: "Explanatory diagram for WebAssembly."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "webassembly:wasm-module-access-itself-must-supplied-host"
    version: 1
    question: "What can a Wasm module access by itself, and what must be supplied by its host?"
    answer: "WebAssembly is a portable machine-code-like target with a deliberately constrained interface to its host."
    rubric: Correct if the answer conveys the canonical idea that WebAssembly is a portable machine-code-like target with a deliberately constrained interface to its host.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

**WebAssembly (Wasm)** is a compact, portable binary instruction format designed as a compilation target for languages such as C, C++, and Rust. In a browser it runs inside a sandbox alongside JavaScript rather than replacing the browser or DOM.

A useful mental model is:

**source language → compiler → Wasm module → host runtime**.

The Wasm module gets computation, linear memory, tables, and explicitly imported host functions. It does **not** inherently get arbitrary access to files, sockets, the DOM, or the operating system; the host decides which capabilities to expose.

> **Big idea:** WebAssembly is a portable machine-code-like target with a deliberately constrained interface to its host.

Wasm is often fast because browsers can validate/compile its typed low-level instructions efficiently and because it lets mature native-language code run on the web. But **Wasm is not automatically faster than JavaScript**. Highly optimized JavaScript can be excellent, and crossing the JS↔Wasm boundary or manipulating the DOM can dominate workloads.

Outside browsers, systems such as **WASI** define standardized host interfaces for Wasm runtimes, making the format useful for plugins, edge/server workloads, and portable sandboxed components too.

This is why your GA Playground could keep its C++ core and compile it to a browser demo instead of rewriting the algorithm in JavaScript.
