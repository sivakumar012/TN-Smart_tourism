# foreign-payment-onboarding — Design

## Progress indicator (displayed on all steps 1–5)

```
● Visitor verification → ○ Identity → ○ Wallet → ○ Funds → ○ Pay
```
Active step: teal filled circle. Completed: navy. Pending: grey.

---

## Payment selection screen

```
┌──────────────────────────────────┐
│  How would you like to pay?      │
│                                  │
│  ○ Indian payment (UPI/Cards)    │
│  ○ International card            │
│  ● UPI One World                 │
│                                  │
│  ────────────────────────────    │
│  Don't have an Indian bank       │
│  account?                        │
│  Eligible international visitors │
│  can use UPI One World through   │
│  an authorised payment provider. │
│                                  │
│  🔒 TN smart tourism does not   │
│     hold your payment funds.     │
│                                  │
│  [Continue with UPI One World]   │
│  [Payment help]                  │
└──────────────────────────────────┘
```

---

## UPI One World introduction screen

```
┌──────────────────────────────────┐
│  UPI One World for              │
│  International Visitors          │
│                                  │
│  What is UPI One World?          │
│  [Explanation paragraph]         │
│                                  │
│  Your 5-step journey:            │
│  1. Visitor verification         │
│  2. Identity verification        │
│  3. Wallet setup                 │
│  4. Add funds                    │
│  5. Pay                          │
│                                  │
│  ℹ️ Provided by an authorised   │
│     payment provider.            │
│  ℹ️ Prototype simulation.       │
│                                  │
│  [Start onboarding]              │
└──────────────────────────────────┘
```

---

## Visitor verification screen

```
┌──────────────────────────────────┐
│  Step 1: Visitor verification    │
│  ● ─ ○ ─ ○ ─ ○ ─ ○             │
│                                  │
│  Country      [Select ▼]         │
│  Mobile       [+XX XXXXXXXXX]    │
│  Email        [email@...]        │
│                                  │
│  Documents (simulated)           │
│  [📄 Upload passport]            │
│  [📄 Upload visa]                │
│                                  │
│  ⚠️ Document upload is          │
│     simulated. Nothing stored.   │
│                                  │
│  [Continue]                      │
└──────────────────────────────────┘
```

---

## Identity verification screen

```
┌──────────────────────────────────┐
│  Step 2: Identity verification   │
│  ✓ ─ ● ─ ○ ─ ○ ─ ○             │
│                                  │
│  [Selfie simulation graphic]     │
│                                  │
│  Status: Verifying...            │
│  ████████░░ 80%                  │
│                                  │
│  ℹ️ Simulated. No biometric    │
│     data collected.              │
│                                  │
│  [Verify (simulate)]             │
└──────────────────────────────────┘
```

States: idle → verifying (spinner) → verified (green checkmark) → failed (red x + retry).

---

## Design notes

- All screens share the 5-step progress bar.
- Trust statements appear in a teal info box at the bottom of each screen.
- Sand accent colour used for warnings/disclaimers.
- Mobile-first: full-screen flow like a native app.
