# demo-payment — Design

## Payment authorisation screen

```
┌──────────────────────────────────┐
│  Step 5: Pay                     │
│  ✓ ─ ✓ ─ ✓ ─ ✓ ─ ●             │
│                                  │
│  Coastal Discovery               │
│  ₹1,499                         │
│                                  │
│  Wallet: demo-A3X9K2PL@upi      │
│  Balance: ₹5,000                │
│  Provider: UPI One World (Demo)  │
│                                  │
│  ⚠️ Prototype simulation.       │
│     No real payment processed.   │
│                                  │
│  [Pay & get pass]                │
└──────────────────────────────────┘
```

- Amount: large bold navy type.
- Balance clearly visible for user confidence.
- Teal "Pay & get pass" button — full width, prominent.

---

## Payment success screen

```
┌──────────────────────────────────┐
│  🎉 Payment successful!          │
│                                  │
│  Coastal Discovery               │
│  Amount paid: ₹1,499            │
│  Ref: PAY-DEMO-XXXXXXXX         │
│                                  │
│  Your pass is being generated... │
│                                  │
│  [View my booking]               │
└──────────────────────────────────┘
```

Confetti or animated success indicator.
Deep navy background for success state — premium feel.

---

## Payment failure screen

```
┌──────────────────────────────────┐
│  ❌ Payment failed               │
│                                  │
│  Reason: Insufficient wallet     │
│  balance                         │
│                                  │
│  Your wallet: ₹800              │
│  Required:    ₹1,499            │
│                                  │
│  [Add more funds]                │
│  [Try again]                     │
└──────────────────────────────────┘
```

Red accent for failure state.
Clear breakdown of wallet vs required amount.

---

## Design notes

- Processing state: spinner overlay on "Pay & get pass" button during authorisation.
- Success animation: 1–2 second delay with animated checkmark to give weight to the moment.
- Failure: non-alarming red (#E63946) — helpful, not punishing.
