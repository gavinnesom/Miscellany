---
title: "The Battery, Starter, and Alternator"
slug: "vehicle-starting-charging"
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
    - current-resistance-power
    - electromagnetic-induction
sources:
  - label: "DENSO — starters"
    url: "https://www.denso-am.eu/products/rotating-electrics/starter"
  - label: "DENSO — alternators"
    url: "https://www.denso-am.eu/products/rotating-electrics/alternator"
  - label: "DENSO — starter/alternator technical manual"
    url: "https://assets.denso-am.eu/production/attachments/Starter-Alternator-Manual-English.pdf"
  - label: "DENSO — electrical loads and generation"
    url: "https://www.denso-am.eu/news/june-newsletter-alternator-technology-powered-by-change"
books: []
image:
  url: "/images/vehicle-electrical-bus.svg"
  alt: "Functional conventional negative-ground circuit: battery, rectified alternator, and load branches share a bus and return; starter contact switches its motor branch. Not a service wiring diagram."
  credit: "Local analytical schematic; see cited technical reference"
  provenance: local
  source_url: "https://www.denso-am.eu/products/rotating-electrics/alternator"
quiz:
  - question_id: "vehicle-starting-charging:starting-voltage-drop"
    version: 1
    status: active
    question: "Why can a small added circuit resistance cause a large problem during starting but have little effect on a small lamp?"
    answer: "The starter's much larger current produces a larger IR voltage drop and I-squared-R heating through the same resistance, reducing voltage and useful power at the motor."
    rubric: "Require current-dependent voltage drop or heating and its effect on starter supply; battery capacity alone is insufficient."
  - question_id: "vehicle-starting-charging:bus-direction"
    version: 1
    status: active
    question: "Does the alternator have to charge the battery before it can power the lights? Explain the circuit topology."
    answer: "No. Alternator, battery, and loads share a parallel bus. The alternator can supply loads directly; net battery current is charging if generation exceeds loads and discharging if loads exceed generation."
    rubric: "Require parallel/shared-bus topology and changing direction of net battery current; reject a mandatory series alternator-battery-load path."
  - question_id: "vehicle-starting-charging:generation-load"
    version: 1
    status: active
    question: "If an alternator supplies 600 W at 60% efficiency, what shaft power does it require and where does the difference go?"
    answer: "1,000 W mechanical input, with about 400 W dissipated as heat. Electrical output is an engine load."
    rubric: "Require 1,000 W input and 400 W loss with an energy-conservation explanation."
---

A running engine can supply its own electrical power, but it cannot initially rotate itself from rest. The battery and starter solve that bootstrapping problem. The alternator then replenishes energy and supplies ongoing loads. These are three different functions, even when newer vehicles combine machines or add hybrid systems.

## Starting turns stored chemical energy into rotation

The battery stores chemical energy and can deliver large current for a short interval. A starter motor converts that electrical input into torque, usually through reduction gearing and a pinion engaging the engine's ring gear. A switching/engagement mechanism connects the heavy-current path and manages engagement; an overrunning arrangement prevents the running engine from simply driving the starter at excessive speed. The exact mechanism depends on design. [DENSO starter principles](https://www.denso-am.eu/products/rotating-electrics/starter).

The starter must overcome compression, friction, and inertia while creating enough rotational speed for mixture preparation and ignition to sustain combustion. A spark-ignition engine also needs electricity for ignition; modern systems add controllers, sensors, injectors, and pumps. A battery can have energy remaining yet fail to deliver enough instantaneous power if internal resistance or circuit resistance causes excessive voltage drop.

## Why small resistances matter

Model an illustrative battery as an ideal 12.6 V source with 0.015 Ω internal resistance. At a hypothetical 150 A starting current, the internal drop is

$$
Δ V=IR=150(0.015)=2.25 V.
$$

Its terminal voltage would be 10.35 V in this simplified model. Internal heating is \(I^2R=337.5\) W. Add 0.005 Ω elsewhere in the current loop and another 0.75 V is lost, with 112.5 W heating there. These are illustrative resistances, not diagnostic limits; real battery voltage and resistance vary with state, temperature, and time.

Both outgoing and return paths matter. In a common negative-ground vehicle, parts of the metal structure provide the return path, but “ground” is not a place where current disappears. Current must complete the circuit to the battery. [Current, resistance, and power](/entry/current-resistance-power) explain why a seemingly small resistance matters far more at 150 A than at 1 A.

## Charging turns engine work into electricity

An alternator's rotating magnetic field changes magnetic flux through stator windings, inducing alternating voltage. Rectifier diodes direct the generated current so the vehicle bus receives DC of one polarity. A regulator adjusts field excitation to control output voltage as shaft speed and demand change. [DENSO alternator explanation](https://www.denso-am.eu/products/rotating-electrics/alternator) and [technical manual, rectification and regulation](https://assets.denso-am.eu/production/attachments/Starter-Alternator-Manual-English.pdf).

The battery and loads are connected to the electrical bus in parallel, not in a mandatory alternator → battery → lights chain. When alternator output exceeds current load demand, net current can charge the battery. When demand exceeds available alternator output, the battery supplies the shortfall. The direction of net battery current changes with operating conditions. The alternator's rated current is a capability under specified conditions, not a current forced through every connected component.

Electrical generation loads the engine mechanically. If hypothetical loads need 600 W and alternator efficiency is 60%, shaft input is 1,000 W; about 400 W becomes generator heat. There is no free electrical energy merely because the engine is already turning. [Electromagnetic induction](/entry/electromagnetic-induction) explains both generated voltage and the opposing mechanical reaction.

## Current ratings, capacity, and protection

A battery's ampere-hour rating describes charge delivered under a specified test, not guaranteed starting power or a fixed number of starts. Multiplying nominal voltage by ampere-hours gives a rough nominal energy estimate, but discharge rate, temperature, cutoff voltage, and battery chemistry affect what is usable. A motor's instantaneous starting requirement is a power/current problem as well as an energy problem.

A fuse opens when excessive current produces enough heating; it primarily protects its designed circuit against damaging overcurrent. A relay lets a low-current command operate a higher-current path. Neither creates power. Real starter and charging protection arrangements vary, so the accompanying circuit is a functional teaching model, not a wiring diagram for construction or diagnosis.

## The systems meet at the engine

Ignition and electrical fuel delivery depend on the electrical bus; the alternator depends on engine rotation; temperature affects battery performance and oil viscosity; oil viscosity affects the mechanical burden of cranking. These interactions explain why understanding isolated component names is insufficient. They do not identify a fault in a particular vehicle without measurements and model-specific information.

**Takeaway:** The battery stores, the starter motors, and the alternator generates. Voltage is a potential difference, current completes a loop, and every watt ultimately comes from stored energy or mechanical work.
