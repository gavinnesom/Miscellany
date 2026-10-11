---
title: "Electric Flux and Gauss’s Law: When Symmetry Does the Work"
slug: "electric-flux-gauss-law"
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
    - electric-fields-superposition
    - electric-potential-energy
    - capacitors-rc-circuits
sources:
  - label: "OpenStax University Physics Volume 2 — Electric flux"
    url: "https://openstax.org/books/university-physics-volume-2/pages/6-1-electric-flux"
  - label: "OpenStax University Physics Volume 2 — Explaining Gauss’s law"
    url: "https://openstax.org/books/university-physics-volume-2/pages/6-2-explaining-gausss-law"
  - label: "OpenStax University Physics Volume 2 — Applying Gauss’s law"
    url: "https://openstax.org/books/university-physics-volume-2/pages/6-3-applying-gausss-law"
  - label: "OpenStax University Physics Volume 2 — Conductors in equilibrium"
    url: "https://openstax.org/books/university-physics-volume-2/pages/6-4-conductors-in-electrostatic-equilibrium"
books: []
quiz:
  - question_id: "electric-flux-gauss-law:zero-flux"
    version: 1
    status: "active"
    question: "A closed surface encloses no charge. Must its electric field be zero everywhere?"
    answer: "No. Its net electric flux is zero, but an external field can enter on one side and leave on another. Gauss’s law constrains the integral, not each local field value."
    rubric: "Require distinction between zero net flux and nonzero local field."
  - question_id: "electric-flux-gauss-law:sphere-interior"
    version: 1
    status: "active"
    question: "Why does a uniformly charged insulating solid sphere have E proportional to r inside, rather than proportional to 1/r squared?"
    answer: "Enclosed charge grows as r cubed while Gaussian sphere area grows as r squared, leaving E proportional to r. The full total charge is not enclosed at interior radii."
    rubric: "Require enclosed-charge r cubed and area r squared reasoning."
image:
  url: "/images/physics-gauss-sphere.svg"
  alt: "Calculated field for a uniformly charged insulating solid sphere rises linearly inside and falls as inverse square outside."
  credit: "Original calculated schematic; references in Sources."
  provenance: "local"
---

Gauss's law is always true for electric fields, but it is not always a shortcut for finding them. Its power comes from combining a global accounting rule with enough symmetry to determine a local field.

## Flux counts the normal component

For uniform field through a flat area, electric flux is \(Φ_E=EA\cos\theta\), where \(\theta\) is measured from the surface **normal**, not the surface itself. For a curved closed surface,

$$
Φ_E=∮\vec E\cdot d\vec A=(Q_{enclosed})/(ε_0).
$$

The area vectors point outward. Inward field contributions are negative. Flux is not current: no material needs to flow through the surface. A uniform external field passing through an empty box gives equal inward and outward contributions and hence zero net flux, although the field is nonzero on its faces.

For a point charge at the center of a sphere, Coulomb's law gives

$$
Φ_E=\left((Q)/(4\piε_0r^2)\right)(4\pi r^2)=Q/ε_0.
$$

Moving the surface outward reduces field strength by precisely the factor by which area grows. The general law survives distorted surfaces, off-center sources, and superposition. But writing \(EA\) for the integral requires proving that the relevant normal field component is constant over the chosen area.

## A solid sphere is not a conducting shell

Take a nonconducting sphere of radius \(R\), carrying a fixed, uniform volume charge density \(\rho\). Spherical symmetry makes the field radial and constant in magnitude on a concentric Gaussian sphere. Inside,

$$
E(4\pi r^2)=(\rho(4\pi r^3/3))/(ε_0),\qquad E=(\rho r)/(3ε_0) (r<R).
$$

Outside, all charge \(Q\) is enclosed and E=Q/(4πε₀r²). Thus the field starts at zero, rises linearly, reaches its maximum at the surface, and falls inversely with distance squared. Applying the outside formula inside would predict an unphysical divergence at the center because it incorrectly counts charge outside the Gaussian surface as enclosed.

For \(Q=3.0\ nC\), \(R=0.20\  m\), the surface field is about \(674\ N/C\). Halfway to the surface it is \(337\ N/C\); at twice the sphere's radius it is \(169\ N/C\). The two factors of two describe different charge-enclosure regimes.

## Conductors rearrange the sources

A conductor contains mobile charge. In electrostatic equilibrium its material has zero electric field: otherwise free charges would keep moving. Its connected surface is an equipotential. Excess charge sits on surfaces, and the external field at a smooth surface is perpendicular to it; a tangential component would drive surface motion.

A Gaussian surface lying wholly within the conductor's material has zero flux and therefore encloses zero net charge. If an internal cavity contains a charge, induced charge on the cavity wall balances it for this accounting. “The field is zero inside a conductor” refers to the conducting material; an occupied cavity can contain a field. A current-carrying resistive wire is also not in electrostatic equilibrium and generally has a nonzero internal field.

## Two other symmetries worth recognizing

For an ideal infinite line of charge, a coaxial cylinder gives E(2π rL)=λ L/ε₀, so E=λ/(2πε₀r). A line's field falls as \(1/r\), not \(1/r^2\), because the source is extended.

For an infinite sheet with uniform surface charge density \(σ\), a pillbox has flux through its two flat ends: \(2EA=σ A/ε_0\). Therefore each side has E=σ/(2ε₀). Two large oppositely charged plates approximately cancel outside and add inside, giving \(E\approxσ/ε_0\) away from edges. That is the field model behind a [parallel-plate capacitor](/entry/capacitors-rc-circuits).

Finite lines and plates only approximate these results where their edges are sufficiently remote. Symmetry is a physical assumption, not a permission to ignore inconvenient geometry.
