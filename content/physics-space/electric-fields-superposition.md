---
title: "Electric Fields: Charge, Superposition, and Cancellation"
slug: "electric-fields-superposition"
category: "physics-space"
topic: "electricity-magnetism"
tags:
  - physics
  - electromagnetism
date_added: "2026-10-11"
relationships:
  parent: []
  deeper: []
  related:
    - work-energy-power
    - electric-flux-gauss-law
    - electric-potential-energy
sources:
  - label: "OpenStax University Physics Volume 2 — Coulomb’s law"
    url: "https://openstax.org/books/university-physics-volume-2/pages/5-3-coulombs-law"
  - label: "OpenStax University Physics Volume 2 — Electric field"
    url: "https://openstax.org/books/university-physics-volume-2/pages/5-4-electric-field"
books: []
quiz:
  - question_id: "electric-fields-superposition:dipole-midpoint"
    version: 1
    status: "active"
    question: "At the midpoint between equal positive and negative charges, do the electric fields cancel? Explain directions."
    answer: "No. The positive charge’s field points away from it and the negative charge’s field points toward it, so both point from positive to negative at the midpoint and add."
    rubric: "Require both field directions and addition; zero net charge does not imply zero field."
  - question_id: "electric-fields-superposition:zero-force"
    version: 1
    status: "active"
    question: "A negative test charge is placed where the electric field points right. Which way is its force, and does its sign reverse the source field?"
    answer: "Its force points left because F=qE. The source field is unchanged in the test-charge approximation; field direction is defined by force on a positive charge."
    rubric: "Require opposite force and unchanged source field, with the test-charge assumption."
image:
  url: "/images/physics-dipole-midpoint.svg"
  alt: "At the midpoint between equal opposite charges, both field contributions point from positive to negative while their scalar potentials cancel."
  credit: "Original calculated schematic; references in Sources."
  provenance: "local"
---

Why can a neutral object respond to electricity, and why does zero total charge not imply zero field? The answer requires separating **sources**, **fields**, and **the charge experiencing a force**.

This sequence extends mechanics in a useful order: fields and their symmetry → potential and energy → current and circuits → magnetic force and induction. [Thermal physics](/entry/temperature-heat-ideal-gases) then follows energy into microscopic motion. These are tractable models, not a claim that all electrical devices reduce to ideal resistors.

## Charge produces a field

Electric charge is conserved. In ordinary matter, electrons carry negative charge and protons positive charge; a neutral body has balanced totals, not an absence of charged constituents. Charge can redistribute without changing the body's total. This polarization explains how a charged object can attract neutral matter.

For a stationary point source charge \(Q\) in vacuum,

$$
\vec E(\vec r)=k(Q)/(r^2)r̂,\qquad k=(1)/(4\piε_0)\approx8.99\times10^9\ N\,m^2/C^2.
$$

Here \(r\) is distance from the source and \(r̂\) points from source to observation point. Positive \(Q\) gives an outward field; negative \(Q\) an inward one. The force on a test charge is \(\vec F=q\vec E\). A negative charge therefore accelerates opposite to the field. “Test” means small enough that its presence does not appreciably rearrange the sources.

Coulomb's law is an experimentally grounded law, not a consequence of the definition of field. The inverse-square dependence also explains why flux through concentric spheres stays constant: sphere area grows as \(r^2\). [Gauss's law](/entry/electric-flux-gauss-law) develops that connection.

## Add vectors, not magnitudes

In electrostatics the field of several source charges is the sum of their individual fields:

$$
\vec E=\sum_i k(Q_i)/(r_i^2)r̂_i.
$$

For continuous distributions, replace the sum by \(\int kr̂\,dq/r^2\). Break vectors into components before integrating unless symmetry already determines the direction. The charges may rearrange in response to each other; superposition applies to their actual arrangement, not necessarily the arrangement before they interacted.

Place \(+2.0\ nC\) at \(x=-0.10\  m\) and \(-2.0\ nC\) at \(x=+0.10\  m\). At the origin, each field has magnitude

$$
E_1=((8.99\times10^9)(2.0\times10^{-9}))/((0.10)^2)=1798\ N/C.
$$

Both point right. The total is approximately \(3.60\times10^3\ N/C\) rightward, despite zero total charge. A \(-1.0\ nC\) test charge there experiences \(3.60\ \mu N\) leftward. If both source charges were positive, the fields would cancel at the midpoint instead. Moving off that point generally restores a field.

## Cancellation has a geometry

For two equal positive charges at \(x=± a\), consider a point on the perpendicular bisector (0,y). The horizontal components cancel and vertical components add. Each distance is √(a² + y²), and the vertical projection contributes a factor y/√(a² + y²):

$$
E_y=(2kQy)/((a^2+y^2)^(3/2)).
$$

At \(y=0\) the field vanishes. Far away, \(y≫ a\), it approaches \(2kQ/y^2\): the unresolved pair behaves approximately like one charge \(2Q\). Equal opposite charges instead have a faster-decaying far field because their leading contributions cancel. The details of arrangement survive after net charge has told us too little.

Field lines are a visualization: their tangent gives field direction and their density suggests strength. They are neither physical threads nor, in general, particle trajectories. A moving particle retains velocity and responds to acceleration; it need not follow a field line.
