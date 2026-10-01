# redemption — Requirements

## Feature summary

The operator redemption interface allows attraction staff to validate and redeem digital passes by entering a pass reference or scanning a QR code.

---

## Acceptance criteria

### Redemption input

**SHALL** provide a text input field for pass reference entry.

**SHALL** provide an optional QR scan capability using the browser's camera (best-effort; degraded gracefully if camera unavailable).

**WHEN** a pass reference is submitted, **SHALL** look up the `DigitalPass` record.

---

### Validation results

**WHEN** `DigitalPass.status = VALID` AND `valid_until >= NOW()`:
- **SHALL** display result: **VALID**
- **SHALL** display: pass name, traveler (booking reference), inclusions, validity.
- **SHALL** display CTA: "Redeem pass."

**WHEN** `DigitalPass.status = REDEEMED`:
- **SHALL** display result: **ALREADY REDEEMED**
- **SHALL** display redemption timestamp.
- **SHALL NOT** display "Redeem pass" CTA.

**WHEN** `valid_until < NOW()` AND `status != REDEEMED`:
- **SHALL** display result: **EXPIRED**
- **SHALL NOT** display "Redeem pass" CTA.

**WHEN** pass reference not found:
- **SHALL** display result: **INVALID**
- **SHALL NOT** display "Redeem pass" CTA.

---

### Redemption action

**WHEN** "Redeem pass" is tapped on a VALID pass:
- **SHALL** update `DigitalPass.status` to `REDEEMED`.
- **SHALL** create a `Redemption` record with `redeemed_at = NOW()` and `status = REDEEMED`.
- **SHALL** display: "Pass successfully redeemed."

**WHEN** a second redemption is attempted on an already-redeemed pass:
- **SHALL** return: **ALREADY REDEEMED** (status re-queried from database).
- **SHALL NOT** create a duplicate `Redemption` record.

---

## Correctness properties (must be tested)

- Property 9: Valid passes can be redeemed.
- Property 10: Redeemed passes cannot be redeemed again.
- Property 11: Expired passes cannot be redeemed.

---

## Out of scope (MVP)

- Per-attraction redemption tracking within a multi-attraction pass.
- Operator authentication / login.
- Offline redemption.
- Printed ticket integration.
