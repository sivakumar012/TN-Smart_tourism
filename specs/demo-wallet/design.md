# demo-wallet — Design

## Wallet setup screen

```
┌──────────────────────────────────┐
│  Step 3: Wallet setup            │
│  ✓ ─ ✓ ─ ● ─ ○ ─ ○             │
│                                  │
│  Your demo UPI wallet            │
│                                  │
│  UPI ID: demo-A3X9K2PL@upi      │
│  Balance: ₹0                    │
│  Status:  Ready to fund         │
│                                  │
│  ℹ️ Demo wallet. No real UPI   │
│     account is created.          │
│                                  │
│  [Fund wallet]                   │
└──────────────────────────────────┘
```

---

## Wallet funding screen

```
┌──────────────────────────────────┐
│  Step 4: Add funds               │
│  ✓ ─ ✓ ─ ✓ ─ ● ─ ○             │
│                                  │
│  Select amount                   │
│  [₹1,000]  [₹2,500]             │
│  [₹5,000]  [Custom ___]          │
│                                  │
│  Funding via international card  │
│  (simulated)                     │
│                                  │
│  Card: **** **** **** DEMO       │
│  Exp:  12/99  CVV: ***           │
│                                  │
│  ⚠️ Card details not stored.    │
│     Prototype simulation.        │
│                                  │
│  [Add funds]                     │
└──────────────────────────────────┘
```

Amount option chips: teal border, active = teal fill.
Card fields: visually present but clearly marked as demo/simulated.

---

## Wallet confirmation screen

```
┌──────────────────────────────────┐
│  ✅ Wallet funded!               │
│                                  │
│  UPI ID: demo-A3X9K2PL@upi      │
│  Balance: ₹5,000                │
│  Status:  Funded                 │
│                                  │
│  [Continue to payment]           │
└──────────────────────────────────┘
```

Success icon: large teal checkmark.
Balance displayed prominently: large navy type.

---

## Design notes

- Progress bar continues from onboarding (step 4 of 5).
- Amount chips are touch-friendly (min 44×44 px).
- Demo card fields use visual styling of real card inputs but are clearly labelled as simulation.
- Insufficient balance state: red warning banner with "Add more funds" CTA.
