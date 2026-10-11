---
title: "Differential Gears"
slug: "differential-gears"
category: engineering-machines
topic: vehicles-drivetrains
tags:
  - cars
  - mechanics
  - vehicle-systems
  - gears
date_added: "2026-08-11"
date_updated: "2026-10-11"
relationships:
  parent:
    - vehicle-energy-systems-map
  deeper: []
  related:
    - transmission-gearing
    - steering-geometry
sources:
  - label: "Eaton — open differential operation"
    url: "https://www.eaton.com/gb/en-gb/products/differentials-traction-control/open-differential.html"
  - label: "Eaton — differential operation visualization"
    url: "https://videos.eaton.com/detail/videos/differentials/video/6162816705001/open-differential-operation?autoStart=true&page=1"
  - label: "MathWorks — wheel-path kinematics"
    url: "https://www.mathworks.com/help/robotics/ref/vehiclewheeljointconfiguration.html"
books: []
image:
  url: /images/vehicle-differential-speeds.svg
  alt: Inside and outside wheel speeds of 460 and 540 rpm average to the 500 rpm carrier speed in the worked ideal turn.
  credit: Local explanatory schematic
  provenance: local
  source_url: https://www.mathworks.com/help/robotics/ref/vehiclewheeljointconfiguration.html
quiz:
  - question_id: "differential-gears:open-differential-s-equal-torque-behavior-become"
    version: 2
    status: active
    question: "Why does an open differential's equal-torque behavior become a problem when one driven wheel is on ice?"
    answer: "In an ideal symmetric open differential the axle torques are approximately equal. Low available reaction torque at the ice-side wheel therefore limits useful torque at the high-grip wheel too; the high-grip wheel does not automatically receive the unused engine torque."
    rubric: "Require approximate equal output torque and the low-grip side limiting useful torque on both sides. Do not accept only that all power goes to the ice wheel. Friction/inertia qualifications are acceptable."
  - question_id: "differential-gears:equal-torque-unequal-power"
    version: 1
    status: active
    question: "An open differential turns its outputs at 460 and 540 rpm with equal torque. Do the wheels receive equal power?"
    answer: "No. Power is torque times angular speed, so the faster wheel receives more power. The speed sum remains twice carrier speed."
    rubric: "Require unequal power and torque-times-speed explanation. Equal torque must not be confused with equal speed or equal power."
---

Two driven wheels cannot behave like a solid pair of rollers on every turn. The outside wheel follows a longer arc, so equal tire radii require unequal rotational speeds. A differential combines a shared drive input with that freedom of relative motion.

## Sum fixed, difference free

A symmetric open differential has two side gears connected to axle shafts and small planet or spider gears carried by the rotating differential case. In straight-line motion, the assembly may turn with little spider rotation relative to its carrier. In a turn, the spiders rotate on their own axes and allow one side gear to advance relative to the case while the other falls behind.

The kinematic constraint is

$$
ω_L+ω_R=2ω_C,
$$

where \(ω_C\) is carrier speed. A convenient rewrite is \(ω_L=ω_C-Δω\), \(ω_R=ω_C+Δω\). The input sets the average; turning sets the difference. The final-drive reduction upstream sets carrier speed relative to the driveshaft.

For a hypothetical rear axle with 1.6 m track width following a turn whose rear-axle midpoint travels on a 10 m radius, the inner and outer wheel paths have radii 9.2 and 10.8 m. Their speeds are therefore 0.92 and 1.08 times the midpoint speed. If the carrier turns at 500 rpm, the wheels turn at 460 and 540 rpm. Their sum remains 1,000 rpm. This is ideal low-speed rolling geometry, not a tire-slip model.

## Why equal torque is not equal power

For a symmetric, ideal, quasi-steady open differential, neglecting internal friction and gear inertia, the two output torques are equal. One way to see why is to imagine a small permitted relative rotation: one shaft turns a little forward relative to the carrier while the other turns equally backward. With no energy stored or dissipated in that internal motion, virtual work is zero only if the two torques match.

If each output carries torque \(T\), total output power is

$$
P=Tω_L+Tω_R=2Tω_C.
$$

Unequal speeds therefore give unequal powers despite equal torques. Saying that an open differential always splits “power 50/50” is wrong.

At 460 and 540 rpm with 100 N·m on each shaft, the wheel powers are about 4.82 and 5.65 kW. Their sum, 10.47 kW, equals the carrier input of 200 N·m at 500 rpm in this lossless model.

## The low-grip limitation

Suppose one driven wheel can sustain only 40 N·m of road-reaction torque before it spins, while the other could sustain 400 N·m. In the idealized quasi-steady open differential, the high-grip side still gets only about 40 N·m; it does not automatically receive the unused 360 N·m. With 0.30 m tires, both wheels together supply only about \(80/0.30=267\) N of forward force.

The spinning side may consume much more power because its speed is high. This is the kernel of truth behind the misleading phrase “all the power goes to the wheel with no grip.” The important restriction is approximately equal axle torque, not a mechanism intelligently choosing the worst wheel. Friction, inertia, brake intervention, and finite grip make real transient behavior less exact. [Eaton's open-differential explanation and animation](https://www.eaton.com/gb/en-gb/products/differentials-traction-control/open-differential.html) illustrate the traction problem; the equations clarify its torque/power distinction.

## Different ways to change the constraint

A locked differential constrains the two axle speeds together; the output torques may then differ. That can help when one wheel has little grip, but it conflicts with unequal path lengths in a firm-surface turn, requiring tire slip or driveline compliance.

A limited-slip unit permits speed differences while adding a resisting internal torque through clutches, gearing, or another mechanism. Its ability to bias torque is finite and design-dependent. Brake-based traction control can add resistance to a spinning side, allowing more differential input torque, but dissipates energy at that brake. None of these mechanisms creates tire-road grip.

**Takeaway:** The gearbox changes the engine-to-average-wheel ratio. The differential manages the left-right difference. A symmetric open differential approximately equalizes torque, not speed or power.
