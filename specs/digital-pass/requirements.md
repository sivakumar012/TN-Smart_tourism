# digital-pass — Requirements

## Feature summary

The digital pass is generated upon confirmed payment, uniquely identified by a pass reference and QR token, and displayed to the tourist for use at attractions.

---

## Acceptance criteria

### Booking confirmation screen

**SHALL** display: booking reference, pass name, traveler name, quantity, total amount paid, payment reference.

**SHALL** display link/CTA: "View pass" navigating to the Digital pass screen.

**SHALL** display: "Your booking is confirmed."

**WHEN** booking is confirmed, **SHALL** have exactly one associated `DigitalPass` record.

---

### My passes screen

**SHALL** display all confirmed bookings for the current session (tourist).

**SHALL** display for each pass: pass name, booking reference, validity dates, status.

**WHEN** status is `VALID`, **SHALL** display "View QR" CTA.

**WHEN** status is `REDEEMED`, **SHALL** display "Redeemed" label (non-interactive).

**WHEN** status is `EXPIRED`, **SHALL** display "Expired" label.

---

### Digital pass screen (QR)

**SHALL** display: pass reference, booking reference, QR code, valid from/until, status, list of included attractions.

**SHALL** display QR code generated from the `qr_token` (`TN-DEMO-PASS-XXXXXXXX` format).

**SHALL** display disclaimer: "Prototype pass — not a real admission ticket."

**SHALL NOT** embed in the QR payload: passport, visa, card data, UPI PIN, email, or any PII.

**WHEN** pass status is `VALID`, **SHALL** display the QR in full colour.

**WHEN** pass status is `REDEEMED` or `EXPIRED`, **SHALL** visually indicate the pass is no longer valid (greyed out QR, status badge).

---

### Pass generation rules

**SHALL** generate `pass_reference` as a unique identifier (e.g., `PASS-XXXXXXXX`).

**SHALL** generate `qr_token` as `TN-DEMO-PASS-XXXXXXXX` where X is a random uppercase alphanumeric character.

**SHALL** guarantee uniqueness of both `pass_reference` and `qr_token` (correctness properties 1 and 2).

**SHALL** set `valid_from` = booking confirmed time, `valid_until` = `valid_from + pass_validity_days`.

**SHALL** set initial `status = VALID`.

---

## Correctness properties (must be tested)

- Property 1: Booking references are unique.
- Property 2: Pass references are unique.
- Property 5: Successful booking creates exactly one digital pass.

---

## Out of scope (MVP)

- PDF pass download.
- Apple Wallet / Google Wallet integration.
- Pass transfer between users.
- Multi-attraction concurrent redemption.
