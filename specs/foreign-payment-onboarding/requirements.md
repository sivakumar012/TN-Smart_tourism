# foreign-payment-onboarding — Requirements

## Feature summary

This is the **core MVP feature**. It presents international tourists with a clear, guided onboarding path to establish UPI One World access via an authorised external PPI provider — without requiring an Indian bank account.

---

## Acceptance criteria

### Checkout — payment selection screen

**SHALL** present payment options: "Indian payment", "International card", "UPI One World."

**WHEN** "International card" or "UPI One World" is selected, **SHALL** display the message:
> "Don't have an Indian bank account? Eligible international visitors can use UPI One World through an authorised payment provider."

**SHALL** display trust statement:
> "TN smart tourism does not hold your payment funds."

**SHALL** display CTA: "Continue with UPI One World."

**SHALL NOT** assume the international tourist has Indian UPI.

---

### UPI One World introduction screen

**SHALL** explain what UPI One World is for international visitors.

**SHALL** display the 5-step progress: Visitor verification → Identity verification → Wallet setup → Add funds → Pay.

**SHALL** display: "This onboarding is provided by an authorised payment provider. TN smart tourism does not issue a wallet or hold your funds."

**SHALL** display CTA: "Start onboarding."

---

### Visitor verification screen

**SHALL** collect (demo only): country, mobile number, email.

**SHALL** display document upload placeholders for Passport and Visa.

**SHALL** display: "Document upload is simulated. No documents are stored."

**SHALL NOT** store actual document files.

**SHALL NOT** process or transmit actual passport or visa data.

**WHEN** demo form is submitted, **SHALL** advance to Identity verification.

---

### Identity verification screen

**SHALL** simulate selfie/biometric verification with states: Not started → Verifying → Verified / Failed.

**SHALL** display: "This is a simulated verification. No biometric data is collected."

**SHALL NOT** access the device camera or collect biometric data.

**WHEN** simulation completes successfully, **SHALL** advance to Wallet setup.

**WHEN** simulation fails, **SHALL** display error state with retry option.

---

### Payment help screen

**SHALL** explain UPI One World eligibility for international visitors.

**SHALL** provide demo FAQ content.

**SHALL** display CTA to return to checkout.

---

## Trust requirements

**SHALL** display at every step of onboarding:
- "Authorised payment provider handles your verification."
- "TN smart tourism does not store your card details."
- "Prototype simulation — no real payment is processed."

---

## Out of scope (MVP)

- Real KYC verification.
- Real passport/visa document upload and parsing.
- Real biometric or selfie verification.
- Actual PPI provider API integration.
- Indian UPI onboarding (domestic path uses standard checkout).
