# demo-wallet — Requirements

## Feature summary

The demo wallet feature creates and displays a simulated UPI One World wallet for international tourists, enabling them to fund it with a simulated international card and use the balance for pass payment.

---

## Acceptance criteria

### Wallet setup screen

**SHALL** create a `WalletSession` record after identity verification succeeds.

**SHALL** generate a demo UPI ID in format `demo-XXXXXXXX@upi` (random 8-character alphanumeric).

**SHALL** display: demo UPI ID, initial balance ₹0, status "Ready to fund."

**SHALL** display: "This is a demo wallet. No real UPI account is created."

**SHALL NOT** create a real UPI account or contact NPCI.

**WHEN** wallet is created, **SHALL** advance to Wallet funding.

---

### Wallet funding screen

**SHALL** display funding amount options: ₹1,000 / ₹2,500 / ₹5,000 / Custom.

**SHALL** accept custom amount input (numeric, minimum ₹100).

**SHALL** display funding source: "International debit/credit card (simulated)."

**SHALL** display card input as demo placeholders only — no real card fields with autocomplete.

**SHALL** display: "Card details are not stored. This is a prototype simulation."

**WHEN** "Add funds" is tapped, **SHALL** simulate loading state for 1–2 seconds.

**WHEN** funding simulation succeeds, **SHALL** update `WalletSession.demo_balance` by the funded amount.

**WHEN** funding simulation fails (configurable in demo), **SHALL** display an error and allow retry.

**SHALL NOT** process real card charges.

**SHALL NOT** store any card credentials.

---

### Wallet confirmation screen

**SHALL** display updated wallet balance after successful funding.

**SHALL** display: demo UPI ID, new balance, status "Funded."

**SHALL** display CTA "Continue to payment."

---

### Wallet balance rules

**IF** `demo_balance >= pass_amount`: payment is allowed to proceed.

**IF** `demo_balance < pass_amount`: payment is blocked; user prompted to add more funds.

---

## Out of scope (MVP)

- Real card processing.
- Real UPI wallet creation.
- Real NPCI or PPI API calls.
- Multiple wallets per session.
- Wallet top-up after payment (single funding per demo session).
