---
title: "VPNs: What They Hide and Do Not Hide"
slug: "vpns-privacy"
category: "practical-world"
topic: "privacy-tracking"
tags:
  - privacy
  - networking
  - security
date_added: "2026-08-11"
date_updated: "2026-08-12"
relationships:
  parent: []
  deeper: []
  related: 
    - first-party-third-party-tracking
related:
  - first-party-third-party-tracking
sources:
  - label: "FTC — VPN apps and privacy"
    url: "https://consumer.ftc.gov/consumer-alerts/2018/02/shopping-vpn-app-read-fine-print"
  - label: "EFF — Choosing the VPN that's right for you"
    url: "https://ssd.eff.org/module/choosing-vpn-thats-right-you"
  - label: "EFF Cover Your Tracks — fingerprinting"
    url: "https://coveryourtracks.eff.org/"
books: []
image:
  url: "/images/entry-vpns-privacy.svg"
  alt: "Explanatory diagram for VPNs: What They Hide and Do Not Hide."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "vpns-privacy:privacy-problem-vpn-solve-well-important-web"
    version: 1
    question: "What privacy problem does a VPN solve well, and what important web-tracking problems does it not solve?"
    answer: "A VPN does not remove trust; it **moves** some network visibility from your ISP/local network to the VPN provider."
    rubric: Correct if the answer conveys the canonical idea that A VPN does not remove trust; it **moves** some network visibility from your ISP/local network to the VPN provider.. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

A VPN creates an encrypted tunnel from your device to a **VPN provider**, then sends your internet traffic onward from the provider's network.

That changes who can see what.

## What it helps hide from the local network / ISP

With a correctly configured VPN, your ISP or coffee-shop network can generally see that you are communicating with the VPN server and how much traffic is flowing, but not the ordinary destination IPs/domains of each tunneled connection in the same direct way.

HTTPS already encrypts the **contents** of most modern web traffic even without a VPN. A VPN adds a network-level tunnel around the connections and changes the public IP address seen by destination sites.

## What it does not hide

A VPN does not stop a website from recognizing you through:

- logging in;
- first-party cookies/storage;
- tracking pixels;
- browser fingerprinting;
- account/payment identifiers;
- information you voluntarily provide.

It also does not make malicious downloads safe or magically protect a compromised device.

> **Big idea:** A VPN does not remove trust; it **moves** some network visibility from your ISP/local network to the VPN provider.

That makes provider policy and incentives important. A dubious “free VPN” can be a worse privacy choice than a reputable paid service.
