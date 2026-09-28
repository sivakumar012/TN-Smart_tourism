# TN smart tourism — Product steering

## Product identity

- **Name:** TN smart tourism
- **Tagline:** Explore smarter. Experience more.
- **Hero line:** Discover Tamil Nadu your way.
- **Pilot corridor:** Chennai → Mahabalipuram
- **Do NOT use "TN-Pass" as the product or brand name.**
  - "Pass" is a feature, not the brand.

---

## Core proposition

TN smart tourism is a digital tourism platform that helps visitors:

1. Discover participating attractions.
2. Select bundled tourism passes.
3. Establish digital payment access (including international card onboarding via UPI One World).
4. Purchase a pass.
5. Receive a digital QR pass.
6. Redeem the pass at participating attractions.

---

## Primary persona — International tourist

> "I am a foreign tourist visiting Chennai and Mahabalipuram.
> I do not have an Indian bank account.
> I do not already use Indian UPI.
> I have an international debit/credit card."

### Critical constraints
- Do NOT assume the international tourist has Indian UPI.
- Do NOT treat payment onboarding as future scope.
- The foreign tourist payment problem is a **core MVP problem**.

---

## Secondary persona — Domestic tourist

Domestic tourists may pay via standard Indian payment options (UPI, card, net banking). The MVP supports domestic checkout but the primary demonstration is the international journey.

---

## Non-negotiable core journey

```
Discover → select pass → checkout → international payment onboarding
→ wallet funding → payment → booking → digital QR pass → redemption
```

The MVP is complete ONLY when a foreign tourist can experience the entire journey above without developer intervention, demonstrable in approximately 2–3 minutes.

---

## Pilot geography

- **Destination:** Chennai–Mahabalipuram corridor
- **Prototype packages:** Heritage explorer, Coastal discovery
- **Categories:** Heritage, Culture, Experience, Coastal

---

## Trust and transparency requirements

The application MUST display at all relevant points:
- "Payment handled by an authorised payment provider."
- "TN smart tourism does not store your card details."
- "Prototype simulation — no real payment is processed."

The application MUST NOT claim:
- RBI approval
- NPCI partnership
- PPI licence
- Payment-provider partnership

…unless such evidence is explicitly provided.

---

## Scope control

Do NOT add features that dilute the primary journey. Every feature must directly serve:
1. Discovery
2. Pass selection
3. Payment onboarding (especially for international tourists)
4. Booking
5. Digital pass and redemption

Future integrations are documented in `tech.md` — do NOT implement them in the MVP.
