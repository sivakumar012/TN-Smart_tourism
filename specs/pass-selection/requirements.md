# pass-selection — Requirements

## Feature summary

Pass selection presents the prototype bundled tourism packages, their inclusions, validity, and demo pricing, enabling tourists to choose a pass and proceed to checkout.

---

## Acceptance criteria

### Pass list screen

**SHALL** display all active pass packages where `deleted_at IS NULL`.

**SHALL** display for each pass: name, description, included attractions (count), validity, demo price, and key benefits.

**SHALL** mark each pass with "Prototype package" label.

**SHALL NOT** display official Government of Tamil Nadu or TTDC pricing.

**SHALL** display a CTA "View pass" that navigates to Pass details.

---

### Pass details screen

**SHALL** display: name, full description, full list of included attractions, validity period, demo price, and all stated benefits.

**SHALL** display "Prototype package" label prominently.

**SHALL** display a CTA "Select this pass" navigating to Checkout.

**WHEN** a pass is soft-deleted, **SHALL** return 404 or redirect to Passes list.

---

### Prototype packages (MVP seed data)

#### Heritage explorer
- Included attractions: At minimum 3 heritage/cultural sites in the pilot corridor.
- Validity: 3 days from activation.
- Demo price: ₹1,999.
- Benefits: Heritage site entry, guided tour access (demo).

#### Coastal discovery
- Included attractions: At minimum 3 coastal/experience sites in the pilot corridor.
- Validity: 2 days from activation.
- Demo price: ₹1,499.
- Benefits: Beach experience entry, boat experience (demo).

---

### Pass inclusions

**WHERE** a pass includes an attraction, **SHALL** display the attraction name and a thumbnail.

**IF** an included attraction is soft-deleted, **SHALL** still display it within the pass detail (pass inclusions are historical) but mark it as "Currently unavailable."

---

## Out of scope (MVP)

- Multi-pass cart (single pass per checkout session).
- Dynamic pricing.
- Seasonal availability.
- Group pricing.
