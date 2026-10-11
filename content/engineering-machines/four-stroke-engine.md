---
title: "Four-Stroke Engines: Pressure, Geometry, and Timing"
slug: "four-stroke-engine"
category: engineering-machines
topic: vehicles-drivetrains
tags:
  - cars
  - mechanics
  - vehicle-systems
  - engines
date_added: "2026-08-11"
date_updated: "2026-10-11"
relationships:
  parent:
    - vehicle-energy-systems-map
  deeper: []
  related:
    - torque-rotational-dynamics
    - transmission-gearing
    - entropy-heat-engines
sources:
  - label: "DOE — four-stroke principles"
    url: "https://www.energy.gov/cmei/vehicles/articles/internal-combustion-engine-basics"
  - label: "MIT 2.61 — engine operating characteristics"
    url: "https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/mit2_61s17_lec2/"
  - label: "MIT 2.61 — mixture preparation"
    url: "https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/mit2_61s17_lec7/"
  - label: "MIT 2.61 — gas exchange"
    url: "https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/mit2_61s17_lec8/"
  - label: "MIT 2.61 — spark ignition combustion"
    url: "https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/mit2_61s17_lec9/"
  - label: "Bosch — port injection"
    url: "https://www.bosch-mobility.com/en/solutions/powertrain/gasoline/gasoline-port-fuel-injection/"
  - label: "MathWorks — slider-crank geometry"
    url: "https://www.mathworks.com/help/simscape/ref/slidercrank.html"
books: []
image:
  url: "/images/vehicle-slider-crank.svg"
  alt: "Ideal slider-crank at 0, 90, and 180 degrees; equal-length rods constrain the piston. At 90 degrees it has moved 45.84 mm of an 80 mm stroke."
  credit: "Local analytical schematic; see cited technical reference"
  provenance: local
  source_url: "https://www.mathworks.com/help/simscape/ref/slidercrank.html"
video:
  youtube_id: "ZQvfHyfgBtA"
  title: "How a Car Engine Works"
  note: "Supplementary Animagraffs animation; the article remains self-contained."
quiz:
  - question_id: "four-stroke-engine:four-stroke-engine-need-two-crankshaft-revolutions"
    version: 2
    status: active
    question: "Why does a four-stroke engine need two crankshaft revolutions for one complete cycle?"
    answer: "Each piston stroke spans half a crank revolution. Intake, compression, expansion, and exhaust require four strokes, totaling two revolutions or 720 degrees. The piston reaches the same position with different gas/valve states during the cycle."
    rubric: "Require four strokes times half a revolution equals two revolutions, or an equivalent explanation of the four distinct processes and 720 degrees. One power stroke per cycle alone is incomplete."
  - question_id: "four-stroke-engine:pressure-leverage"
    version: 1
    status: active
    question: "Why does high cylinder pressure at exact top dead center not imply a large instantaneous crank torque?"
    answer: "At dead center the piston force has no crank moment arm; equivalently dx/dtheta is zero, so the ideal pressure-force contribution to torque is zero. Pressure must act as the piston moves through useful leverage."
    rubric: "Require zero moment arm or zero displacement per crank angle at dead center, not a claim that cylinder pressure is zero."
  - question_id: "four-stroke-engine:torque-power-comparison"
    version: 1
    status: active
    question: "Which produces more power: 180 N·m at 2,000 rpm or 150 N·m at 4,000 rpm, and why?"
    answer: "The second: approximately 62.8 kW versus 37.7 kW, because power equals torque multiplied by angular speed."
    rubric: "Require second operating point and torque-times-speed reasoning. Exact rounding is optional; comparing torque alone fails."
---

The four-stroke sequence explains when a cylinder breathes. It does not, by itself, explain why the crankshaft produces torque, why valves open outside the neat stroke boundaries, or why more torque is not always more power.

## Four strokes, two revolutions

In the idealized spark-ignition sequence, intake moves the piston down while charge enters; compression moves it up with valves closed; combustion raises pressure around the end of compression and the expanding gas drives the power stroke; exhaust moves the piston up while burned gas leaves. A stroke takes half a crankshaft revolution. Four strokes therefore require 720° of crank rotation.

The piston reaches the top twice per cycle, once between compression and expansion and once between exhaust and intake. These positions look identical geometrically but have different gas and valve states. A conventional camshaft turns once for every two crank revolutions so its lobes distinguish those two visits. An overhead-valve design can transmit cam motion through lifters, pushrods, and rockers; an overhead-cam design puts the camshaft in the cylinder head. Both solve the same timing problem. [DOE overview](https://www.energy.gov/cmei/vehicles/articles/internal-combustion-engine-basics).

Multiple cylinders spread power events across the cycle. An evenly firing six-cylinder four-stroke engine has an event every \(720°/6=120°\) of crank rotation. That is a timing principle, not a claim about an individual car's firing order. Gavin's straight-six Mustang is a useful reminder that six cylinders can occupy one line; the calculations here are generic, not specifications for that vehicle.

## The connecting rod makes the motion asymmetric

Let crank radius be \(r\), connecting-rod length \(l\), and crank angle \(θ\) measured from top dead center. For an in-line slider-crank with no pin offset, piston displacement downward from the top is

$$
x(θ)=r(1-cosθ)+l-√(l^2-r^2sin^2θ).
$$

The formula comes from adding the crank's projection along the bore to the rod's projection, then subtracting that total from \(r+l\). The stroke is \(2r\). Only in the limit of a very long rod does the motion approach a pure cosine. [Reference mechanism and geometric parameters](https://www.mathworks.com/help/simscape/ref/slidercrank.html).

For an illustrative \(r=40\) mm and \(l=140\) mm, at 90° the piston has moved \(40+140-√(140^2-40^2)=45.84\) mm. Half of the 80 mm stroke would be 40 mm. The piston is already beyond halfway: equal crank-angle intervals do not imply equal piston travel. The inclined rod also pushes sideways on the piston/cylinder interface.

Ignoring inertia and friction for a moment, virtual work gives

$$
τ dθ=F_p dx,    τ=F_p(dx)/(dθ).
$$

Thus high cylinder pressure is not enough: leverage matters. At either dead center, \(dx/dθ=0\), so the ideal piston force has no instantaneous crank moment. Real instantaneous torque also includes acceleration of the reciprocating parts, friction, and loads from other cylinders. Flywheel inertia smooths these fluctuations; it does not create energy.

## Why ignition and valves anticipate motion

Combustion is a finite-duration flame process, not an instantaneous push at top dead center. Spark timing is chosen so pressure develops at a useful crank angle. Too early can create excessive opposing work during compression or knock; too late sacrifices expansion work and can increase exhaust energy. Knock is autoignition of unburned end gas with pressure oscillations, not a synonym for normal spark-initiated combustion. [MIT: combustion phasing](https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/mit2_61s17_lec9/).

Likewise, a valve cannot open infinitely quickly and moving gas has inertia. An intake valve may close after bottom dead center to exploit continuing inflow at speed. The same timing can permit reverse flow at lower speeds. Early exhaust opening sacrifices some expansion but lets high-pressure gas blow down before the piston must expel it. Valve overlap can aid gas exchange under favorable conditions but can also cause backflow. There is no universally best fixed timing for all speeds and loads. [MIT: gas exchange](https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/mit2_61s17_lec8/).

## Metering fuel and air

A carburetor uses pressure differences associated with intake airflow to draw fuel through metering passages. Its mixture response depends on several circuits because idle, acceleration, and high load demand different behavior. Electronic fuel injection separates fuel metering more directly from that airflow signal: a controller commands injector opening using sensor information and calibration.

Port injection introduces fuel upstream of the intake valve; gasoline direct injection introduces it into the cylinder. Neither distinction alone determines whether ignition is by spark or compression. A conventional diesel compresses air and injects fuel into sufficiently hot gas; a gasoline direct-injection engine still normally uses a spark. Cold vaporization, wall wetting, transient airflow, and exhaust feedback make mixture control more than “add the right number of drops.” [MIT: mixture preparation](https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/mit2_61s17_lec7/) and [Bosch: port injection](https://www.bosch-mobility.com/en/solutions/powertrain/gasoline/gasoline-port-fuel-injection/).

## Torque and power describe different questions

Torque measures turning moment; power measures how quickly work is delivered. With angular speed \(ω\) in radians per second,

$$
P=τω,    P(kW)=(τ(N m) n(rpm))/(9549.3).
$$

An engine delivering 180 N·m at 2,000 rpm produces 37.7 kW. At 4,000 rpm, even a reduced 150 N·m produces 62.8 kW. Peak torque and peak power therefore need not coincide. These are invented operating points, not a Mustang torque curve.

The useful cycle work is the pressure-volume integral \(∮ p dV\); shaft output is lower after mechanical losses. Engine speed determines how often cycles occur. [MIT: operating characteristics](https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/mit2_61s17_lec2/). The [transmission](/entry/transmission-gearing) trades shaft speed for torque while keeping power approximately conserved, less its losses.
