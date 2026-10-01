# redemption — Design

## Redemption input screen

```
┌──────────────────────────────────┐
│  🎫 Pass Redemption              │
│  (Operator interface)            │
├──────────────────────────────────┤
│                                  │
│  Enter pass reference            │
│  [PASS-XXXXXXXX         ] [→]   │
│                                  │
│  — or —                          │
│                                  │
│  [📷 Scan QR code]               │
│                                  │
└──────────────────────────────────┘
```

---

## Validation result — VALID

```
┌──────────────────────────────────┐
│  ✅ VALID                        │
│                                  │
│  Coastal Discovery               │
│  Ref: PASS-A3X9K2PL             │
│  Booking: BK-2024-XXXXXX        │
│  Valid until: 30 Sep 2024       │
│                                  │
│  Includes:                       │
│  • Shore Temple                  │
│  • Mahabalipuram Beach           │
│                                  │
│  [Redeem pass]                   │
└──────────────────────────────────┘
```

VALID badge: large teal, high contrast.

---

## Validation result — ALREADY REDEEMED

```
┌──────────────────────────────────┐
│  ⚠️ ALREADY REDEEMED            │
│                                  │
│  This pass was redeemed at       │
│  28 Sep 2024, 14:32 IST         │
│                                  │
│  [Check another pass]            │
└──────────────────────────────────┘
```

---

## Validation result — EXPIRED

```
┌──────────────────────────────────┐
│  ⏰ EXPIRED                      │
│                                  │
│  This pass expired on            │
│  30 Sep 2024.                   │
│                                  │
│  [Check another pass]            │
└──────────────────────────────────┘
```

---

## Validation result — INVALID

```
┌──────────────────────────────────┐
│  ❌ INVALID                      │
│                                  │
│  Pass reference not found.       │
│                                  │
│  [Try again]                     │
└──────────────────────────────────┘
```

---

## Post-redemption screen

```
┌──────────────────────────────────┐
│  🎉 Pass redeemed!               │
│                                  │
│  PASS-A3X9K2PL                  │
│  Redeemed at: 28 Sep, 14:33 IST │
│                                  │
│  [Check another pass]            │
└──────────────────────────────────┘
```

---

## Design notes

- Operator interface: clean, high-contrast, designed for tablet/desktop use at an attraction gate.
- Status results use large, full-width coloured banners: teal (VALID), amber (REDEEMED), red (INVALID/EXPIRED).
- "Redeem pass" button only appears for VALID passes.
- After redemption, auto-clear the input field after 5 seconds to prepare for next visitor.
