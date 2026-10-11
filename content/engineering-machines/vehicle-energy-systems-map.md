---
title: "A Car as an Energy System"
slug: "vehicle-energy-systems-map"
category: engineering-machines
topic: vehicles-drivetrains
tags:
  - cars
  - mechanics
  - vehicle-systems
date_added: "2026-10-11"
relationships:
  parent: []
  deeper:
    - four-stroke-engine
    - transmission-gearing
    - brakes-hydraulics-abs
  related:
    - work-energy-power
sources:
  - label: "DOE — combustion engine overview"
    url: "https://www.energy.gov/cmei/vehicles/articles/internal-combustion-engine-basics"
  - label: "DOE/EPA — where vehicle energy goes"
    url: "https://www.fueleconomy.gov/feg/atv.shtml"
books: []
image:
  url: "/images/vehicle-energy-paths.svg"
  alt: "Functional energy paths: combustion splits into crankshaft work and heat; shaft work supplies traction and electrical loads, while brakes dissipate motion. Widths are not quantitative."
  credit: "Local analytical schematic; see cited technical reference"
  provenance: local
  source_url: "https://www.fueleconomy.gov/feg/atv.shtml"
quiz:
  - question_id: "vehicle-energy-systems-map:uphill-balance"
    version: 1
    status: active
    question: "Why can a car consume substantial fuel at constant speed uphill, even though its kinetic energy is unchanged?"
    answer: "Wheel power increases gravitational potential energy and overcomes drag and rolling resistance. Engine and drivetrain losses require a larger fuel-energy input than wheel power."
    rubric: "Require both gravitational potential-energy increase and resistive losses; distinguish unchanged kinetic energy from zero power. Credit engine/drivetrain losses as the reason fuel input exceeds wheel output."
  - question_id: "vehicle-energy-systems-map:downhill-heat"
    version: 1
    status: active
    question: "In the worked descent, gravity supplies 13.7 kW and road resistance removes 8.0 kW. What must happen to the remaining power to hold speed?"
    answer: "About 5.7 kW must be absorbed, for example by engine braking and/or friction brakes; sustained absorption becomes a heat-rejection problem."
    rubric: "Require subtraction to approximately 5.7 kW, an absorbing mechanism, and explanation that otherwise the car accelerates. Do not accept that the energy disappears."
---

An engine can run while the car stands still. A car can move while its engine does no work. Brakes can become intensely hot although they contain no fuel. These are not exceptions: they reveal the difference between **producing energy conversion, transmitting power, storing energy, and controlling forces**.

This sequence follows a conventional combustion-engine car. Hybrids and electric cars rearrange important paths, especially during braking, but the conservation laws remain the same.

## Three different things travel through the car

**Matter:** air and fuel enter; combustion products leave through the exhaust. Coolant and oil mainly circulate in separate loops rather than being consumed as fuels. Their circuits must not be confused with the path taken by intake air.

**Energy:** fuel's chemical energy becomes hot gas, mechanical work, and heat transferred out of the engine. Shaft power travels through the clutch or torque converter, gearbox, final drive, and differential to driven wheels. The [differential](/entry/differential-gears) permits unequal wheel speeds; it is not the mechanism that chooses the driver's gear ratio.

**Commands and feedback:** the driver requests acceleration, braking, or a turn. Mechanical linkages, hydraulic pressure, and electrical signals implement those requests. Modern controllers use sensors to adjust fuel, ignition, braking, and other actuators. A control signal can govern a large energy flow without supplying that energy itself.

The map is a functional schematic, not a drawing of where components sit in a particular car. Front-wheel-drive transaxles combine functions that a rear-wheel-drive layout distributes along the vehicle.

## Where the energy ends up

The engine cannot turn all incoming chemical energy into crankshaft work. Exhaust carries energy away, the cooling system transfers heat to air, and friction and gas pumping consume work. Electricity for lights or a cooling fan normally comes through the alternator and therefore also imposes a mechanical load on the engine.

At the wheels, power can increase translational and rotational kinetic energy, lift the car uphill, or overcome aerodynamic drag and rolling resistance. On a level road at constant speed, kinetic energy is unchanged, yet fuel is still required because resistive forces continue to take energy from the car. The federal FuelEconomy.gov analysis estimates that roughly 12–30% of fuel energy moves a conventional vehicle down the road over its example driving cycles; this is a cycle-dependent vehicle figure, not a universal engine efficiency or a measurement of Gavin's Mustang. [Energy accounting and limitations](https://www.fueleconomy.gov/feg/atv.shtml).

For a steadily climbing car, a useful simplified balance is

$$
P(wheels)=(F(drag)+F(roll)+mgsinα)v.
$$

Here \(v\) is road speed and \(α\) the road angle. Accelerating adds the rate of change of kinetic energy. This is [work and power](/entry/work-energy-power), not an extra automobile-specific law.

## A hill exposes the supporting systems

Take a hypothetical 1,400 kg car climbing a 5% grade at 20 m/s, with 400 N of combined aerodynamic and rolling resistance. A 5% grade means a rise/run ratio of 0.05, so \(sinα≈0.04994\). The uphill gravitational force is about 686 N. The wheels therefore need about \((686+400)20=21.7\) kW simply to hold speed.

If the drivetrain passes 90% of engine output to the wheels and the engine turns 25% of fuel energy into that output at this operating point, the corresponding fuel-energy rate is about \(21.7/(0.90×0.25)=96.5\) kW. These efficiencies are illustrative assumptions. The difference is not all radiator load: exhaust, engine heat, friction, and driveline losses share it.

Now descend the same hill at the same speed. Gravity supplies 13.7 kW; road resistance removes 8.0 kW. About 5.7 kW still needs absorbing to prevent acceleration. Depending on operation, that can be engine braking and/or friction braking. Over ten minutes, 5.7 kW is about 3.4 MJ. The difficulty is sustained heat disposal, not merely having enough braking torque for one stop.

## Why the supporting loops are essential

- [Cooling and lubrication](/entry/engine-cooling-lubrication) keep temperatures, friction, and clearances compatible with sustained combustion. Oil also transfers heat; coolant does not lubricate the crankshaft bearings.
- [Starting and charging](/entry/vehicle-starting-charging) solve a bootstrapping problem: a stationary engine needs external rotation before combustion can sustain it.
- [Steering](/entry/steering-geometry) requests lateral tire force. [Suspension](/entry/car-suspension-basics) controls body/wheel motion and changes the tire's contact conditions.
- [Brakes](/entry/brakes-hydraulics-abs) create resisting wheel torque, but the tire-road contact supplies the external force that slows the car. Larger brake torque cannot bypass limited road grip.

**Takeaway:** Follow energy to explain motion and heat; follow matter to understand combustion and circulation; follow signals to understand control. A part name alone rarely tells you all three.
