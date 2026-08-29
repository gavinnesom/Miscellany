---
title: "First-Party vs Third-Party Tracking"
slug: "first-party-third-party-tracking"
category: "practical-world"
topic: "privacy-tracking"
tags:
  - privacy
  - web
  - tracking
date_added: "2026-08-11"
date_updated: "2026-08-12"
relationships:
  parent: []
  deeper: []
  related:
    - vpns-privacy
sources:
  - label: "MDN — Third-party cookies"
    url: "https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Third-party_cookies"
  - label: "MDN — State partitioning"
    url: "https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/State_Partitioning"
  - label: "EFF — browser fingerprinting orientation"
    url: "https://coveryourtracks.eff.org/learn"
books: []
image:
  url: "/images/entry-first-party-third-party-tracking.svg"
  alt: "Explanatory diagram for First-Party vs Third-Party Tracking."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "first-party-third-party-tracking:amazon-remember-browser-behavior-even-third-party"
    version: 1
    question: "Why can Amazon remember browser behavior even when third-party cookies are blocked and you are logged out?"
    answer: "Blocking third-party cookies closes one important tracking channel. It does not make the browser anonymous or stop the site you are visiting from remembering you."
    rubric: Correct if the answer conveys the canonical idea that Blocking third-party cookies closes one important tracking channel. It does not make the browser anonymous or stop the site you are visiting from remembering you.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

“First party” and “third party” describe **who is interacting with you in the current site context**, not whether the tracking is good or bad.

If you visit `example.com`:

- storage/scripts operated by `example.com` in that context are **first-party**;
- resources from another domain — advertising, analytics, embedded widgets, etc. — are **third-party**.

Historically, third-party cookies made cross-site tracking straightforward: the same advertising domain embedded on thousands of sites could recognize the same browser. Modern browsers increasingly **block or partition third-party cookies/storage**, reducing that particular technique.

But “third-party cookies blocked” does not mean “not tracked.” Sites and ad systems can still use:

- first-party identifiers and server-side data;
- logins and email/account linkage;
- URL parameters and link decoration;
- browser/device fingerprinting;
- IP/network information;
- data shared between companies outside the browser.

Likewise, first-party data can persist between visits even when you are logged out. A site can store cookies/local storage under its own domain or associate behavior with other identifiers.

> **Takeaway:** Blocking third-party cookies closes one important tracking channel. It does not make the browser anonymous or stop the site you are visiting from remembering you.
