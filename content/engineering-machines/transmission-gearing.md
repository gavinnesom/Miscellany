---
title: "Gearing, Clutches, and Automatic Transmissions"
slug: "transmission-gearing"
category: engineering-machines
topic: vehicles-drivetrains
tags:
  - cars
  - mechanics
  - vehicle-systems
date_added: "2026-10-11"
relationships:
  parent:
    - vehicle-energy-systems-map
  deeper: []
  related:
    - four-stroke-engine
    - differential-gears
sources:
  - label: "MathWorks — ideal planetary constraints"
    url: "https://www.mathworks.com/help/sdl/ref/planetarygear.html"
  - label: "ZF — clutches"
    url: "https://aftermarket.zf.com/en/aftermarket-portal/our-portfolio/passenger-cars/products/clutches/"
  - label: "ZF — torque converter"
    url: "https://www.zf.com/products/en/cars/products_65854.html?pageLink=details_divider658792"
  - label: "MIT — torque and power"
    url: "https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/mit2_61s17_lec2/"
  - label: "TREMEC — synchronizers and constant-mesh operation"
    url: "https://tremec-blog.com/manual-transmission-synchronizers-101/"
  - label: "MathWorks — torque converter behavior"
    url: "https://www.mathworks.com/help/sdl/ref/torqueconverter.html"
books: []
image:
  url: "/images/vehicle-gearing-tradeoff.svg"
  alt: "Two hypothetical gear selections at the same engine torque and speed: low gear gives three times wheel torque and one third wheel speed, with equal 40.7 kW wheel power."
  credit: "Local analytical schematic; see cited technical reference"
  provenance: local
  source_url: "https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/mit2_61s17_lec2/"
quiz:
  - question_id: "transmission-gearing:reduction-tradeoff"
    version: 1
    status: active
    question: "If a lossless gear reduction triples output torque, what must happen to output speed and power?"
    answer: "Output angular speed is one third of input speed; power is unchanged because torque times angular speed is conserved."
    rubric: "Require one-third speed and unchanged ideal power with torque-times-speed reasoning. Real losses may be mentioned separately."
  - question_id: "transmission-gearing:converter-stall"
    version: 1
    status: active
    question: "How can a torque converter deliver a large stationary output torque while delivering zero output power?"
    answer: "Power is torque times angular speed; stationary output has zero angular speed. The running input supplies energy that is dissipated mainly as heat in the fluid instead of useful output work."
    rubric: "Require P equals torque times angular speed and zero output speed; require heat dissipation rather than energy multiplication."
  - question_id: "transmission-gearing:planetary-ratio"
    version: 1
    status: active
    question: "A simple planetary set has 30 sun teeth and 70 ring teeth. With the ring fixed and sun at 1,000 rpm, how fast is the carrier?"
    answer: "300 rpm in the sun's direction, since (30+70) times carrier speed equals 30 times 1,000."
    rubric: "Require 300 rpm and either the stated constraint or a correct 3.33:1 reduction. Do not accept a 70/30 simple gear ratio with the moving carrier ignored."
---

A combustion engine cannot deliver useful operation at every possible wheel speed. It must keep rotating while the car stops, and its useful torque and power vary with rpm. The powertrain solves two different problems: **disconnect or permit slip when necessary**, and **choose the speed-to-torque conversion**.

## A ratio changes torque, not the energy budget

Define a reduction ratio \(G=ω(in)/ω(out)\). With negligible acceleration of the gears themselves and efficiency \(η\),

$$
ω(out)=(ω(in))/(G),
τ(out)=η Gτ(in).
$$

The ideal result follows directly from \(P=τω\). Gear teeth constrain relative motion; the larger output torque acts through a smaller angle. A 3:1 reduction does not triple power.

The gearbox ratio multiplies the final-drive ratio. For a hypothetical engine at 2,400 rpm and 180 N·m, a 3.0:1 gear with a 3.5:1 final drive gives an overall 10.5:1 reduction. At 90% total drivetrain efficiency, the axle receives 1,701 N·m at 228.6 rpm. With a 0.30 m effective rolling radius, that corresponds to 25.9 km/h and approximately 5,670 N total drive force, before road resistance and rotational-inertia effects.

Using a 1.0:1 gear at the same engine operating point gives 567 N·m, 685.7 wheel rpm, and 77.6 km/h. The wheel power is the same 40.7 kW in both examples. The first offers more force at lower speed; the second more speed with less force. Real engines do not maintain arbitrary torque at any rpm, and road grip may limit the force before the engine does.

At a fixed road speed, selecting a lower gear raises engine rpm. That can place the engine in a more powerful operating region, which is why acceleration depends on the complete engine curve and gearing, not just the engine's advertised peak torque.

## What a manual transmission actually selects

A friction clutch clamps a disc between rotating surfaces to couple engine and gearbox. While fully engaged without slip, both sides have the same speed; during slipping, the speed difference dissipates power approximately as

$$
P(slip)=τ(ω(engine)-ω(input)).
$$

Slip permits a stationary car to begin moving while the engine continues rotating, but it generates heat. It is a transitional state, not free speed conversion.

In a common constant-mesh manual gearbox, the gear pairs remain meshed. Selection locks the appropriate freely rotating gear to its shaft through a coupling. Synchronizers use friction to bring relevant rotational speeds together before dog teeth engage; they are not the main clutch between engine and gearbox. [TREMEC describes the constant-mesh mechanism and synchronizer sequence](https://tremec-blog.com/manual-transmission-synchronizers-101/). Neutral leaves no selected through-power path, even though some internals may still rotate. [ZF's clutch overview](https://aftermarket.zf.com/en/aftermarket-portal/our-portfolio/passenger-cars/products/clutches/) supplies the component context; the energy equations explain the tradeoff.

## An automatic has two mechanisms, not one

A conventional hydraulic automatic often combines a **torque converter** with **planetary gearsets**.

The converter's engine-driven impeller transfers angular momentum to fluid; fluid drives a turbine connected to the transmission. A stator redirects returning flow and supplies a reaction torque during torque multiplication. The reaction is why a converter can do more than a simple two-element fluid coupling. As speeds converge, multiplication falls. With the output stationary, output power is zero even if output torque is large: input power becomes heat. A lock-up clutch can connect input and output mechanically to reduce ongoing slip losses. [Converter fluid paths](https://www.mathworks.com/help/sdl/ref/torqueconverter.html) and [ZF lock-up context](https://www.zf.com/products/en/cars/products_65854.html?pageLink=details_divider658792).

Planetary gearing contains a central sun, planet gears carried on an arm, and an internally toothed ring. Its ratio depends on which member is driven, held, or connected to another member. Clutches and brakes alter those constraints; the gears need not slide into and out of mesh.

For a simple ideal set with tooth counts \(N_s,N_r\),

$$
(N_s+N_r)ω_c=N_sω_s+N_rω_r.
$$

This is the ordinary sun-to-ring gear relationship viewed from the moving carrier. Holding the carrier gives the familiar opposite rotations; adding carrier speed back yields the equation. With a 30-tooth sun and 70-tooth ring held stationary, \(ω_c=0.30ω_s\): a 3.33:1 reduction. Locking sun and ring together forces all three members to rotate together at 1:1. Holding the carrier and driving the sun makes the ring rotate oppositely at \(-30/70\) of sun speed. [MathWorks' explicit planetary constraints](https://www.mathworks.com/help/sdl/ref/planetarygear.html).

Actual automatics combine sets to obtain several useful ratios. Dual-clutch transmissions and continuously variable transmissions achieve automatic operation differently. “Automatic” describes how the driver experiences ratio selection, not one universal internal construction.

## The differential is a separate kind of freedom

After the selected overall reduction, a [differential](/entry/differential-gears) allows left and right driven wheels to turn at different speeds. Gear selection chooses their average speed relative to the engine; the differential accommodates the difference required by a turn. Confusing those tasks hides the elegance of the system.
