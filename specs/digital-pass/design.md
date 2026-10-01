# digital-pass — Design

## Booking confirmation screen

```
┌──────────────────────────────────┐
│  ✅ Booking confirmed!           │
│                                  │
│  Booking ref: BK-2024-XXXXXX    │
│  Coastal Discovery               │
│  1 pass · ₹1,499               │
│  Payment ref: PAY-DEMO-XXXXXXXX │
│                                  │
│  [View pass →]                   │
│  [My passes]                     │
└──────────────────────────────────┘
```

---

## My passes screen

```
┌──────────────────────────────────┐
│  My Passes                       │
├──────────────────────────────────┤
│  ┌────────────────────────────┐  │
│  │ Coastal Discovery          │  │
│  │ BK-2024-XXXXXX            │  │
│  │ Valid: 28 Sep – 30 Sep    │  │
│  │ Status: ● VALID            │  │
│  │ [View QR]                  │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

Status badge colours:
- VALID: teal
- REDEEMED: grey
- EXPIRED: sand

---

## Digital pass screen

```
┌──────────────────────────────────┐
│  🎫 Your Pass                    │
├──────────────────────────────────┤
│  Coastal Discovery               │
│  PASS-A3X9K2PL                  │
│                                  │
│  ┌──────────────────────────┐   │
│  │  [QR CODE — large]       │   │
│  │  TN-DEMO-PASS-XXXXXXXX  │   │
│  └──────────────────────────┘   │
│                                  │
│  Valid: 28 Sep – 30 Sep 2024    │
│  Status: VALID ●                 │
│                                  │
│  Includes:                       │
│  • Shore Temple                  │
│  • Mahabalipuram Beach           │
│  • Five Rathas                   │
│                                  │
│  ⚠️ Prototype pass —           │
│     not a real admission ticket. │
└──────────────────────────────────┘
```

---

## Design notes

- QR code: minimum 200×200 px, high contrast (black on white), centred card.
- Deep navy card background with white QR card inset — premium pass aesthetic.
- "VALID" badge: teal, pulsing dot micro-animation.
- "REDEEMED" state: QR greyed out with diagonal "REDEEMED" watermark text.
- "EXPIRED" state: QR greyed out with "EXPIRED" badge.
- Pass card: rounded corners, subtle shadow, feels like a physical ticket.
