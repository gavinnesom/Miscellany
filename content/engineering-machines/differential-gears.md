---
title: "Differential Gears"
slug: "differential-gears"
category: "engineering-machines"
topic: "vehicles-drivetrains"
tags:
  - cars
  - gears
  - mechanics
date_added: "2026-08-11"
date_updated: "2026-08-12"
relationships:
  parent: []
  deeper: []
  related: []
related: []
sources:
  - label: "Eaton — Differential basics / locking and limited-slip orientation"
    url: "https://www.eaton.com/us/en-us/products/differentials-traction-control.html"
  - label: "HowStuffWorks can be a useful secondary animation if desired"
    url: "https://auto.howstuffworks.com/differential.htm"
books: []
image:
  url: "/images/entry-differential-gears.svg"
  alt: "Explanatory diagram for Differential Gears."
  credit: "Local explanatory diagram"
  provenance: "local"
quiz:
  - question_id: "differential-gears:open-differential-s-equal-torque-behavior-become"
    version: 1
    question: "Why does an open differential's equal-torque behavior become a problem when one driven wheel is on ice?"
    answer: "an open differential delivers essentially equal axle torque to both sides, so usable drive can be limited by the wheel with the least traction. If one wheel can support only a small torque on ice, the other wheel does not automatically get all the spare engine torque."
    rubric: Correct if the answer conveys the canonical idea that an open differential delivers essentially equal axle torque to both sides, so usable drive can be limited by the wheel with the least traction. If one wheel can support only a. Equivalent wording is acceptable; do not pass answers that omit the essential cause, contrast, condition, or distinction.
---

When a car turns, the outside driven wheel travels a longer arc than the inside wheel, so it must rotate faster. A **differential** lets the two axle shafts turn at different speeds while both are driven by one input.

For a simple symmetric open differential, wheel speeds satisfy

$$
\omega_L+\omega_R=2\omega_C,
$$

where \(\omega_C\) is the differential-carrier speed. If both wheels turn equally fast, each matches the carrier. If one slows in a turn, the other speeds up correspondingly.

The clever mechanism is the spider/side gears: during straight-line driving they can rotate together as a locked-looking assembly; when wheel resistance/speed demands differ, the spider gears rotate on their own axes and permit relative axle motion.

> **The open-differential catch:** an open differential delivers essentially equal axle torque to both sides, so usable drive can be limited by the wheel with the least traction. If one wheel can support only a small torque on ice, the other wheel does not automatically get all the spare engine torque.

**Limited-slip differentials** add friction, clutches, gears, or other mechanisms to bias torque toward the wheel that can use it. A locking differential goes farther and forces the axle speeds together when locked.
