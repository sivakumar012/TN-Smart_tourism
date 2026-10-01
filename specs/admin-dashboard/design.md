# admin-dashboard — Design

## Dashboard screen

```
┌──────────────────────────────────────────────────┐
│  TN smart tourism — Admin                        │
│  Demo metrics — no real financial data           │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Total    │  │ Intl     │  │ Domestic │       │
│  │ Bookings │  │ Bookings │  │ Bookings │       │
│  │   24     │  │   18     │  │    6     │       │
│  └──────────┘  └──────────┘  └──────────┘       │
│                                                  │
│  ┌──────────┐  ┌──────────┐                      │
│  │ Payment  │  │ Payment  │                      │
│  │ Success  │  │ Failures │                      │
│  │   22     │  │    2     │                      │
│  └──────────┘  └──────────┘                      │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Active   │  │ Redeemed │  │ Demo GMV │       │
│  │ Passes   │  │ Passes   │  │          │       │
│  │   18     │  │    6     │  │ ₹32,978  │       │
│  └──────────┘  └──────────┘  └──────────┘       │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Design notes

- Metric cards: deep navy background, white large number, teal label.
- Layout: 3-column grid on desktop, 2-column on mobile, 1-column on small mobile.
- "Demo metrics" disclaimer: sand (#F4A261) info banner at top.
- International vs domestic: could include a simple donut chart (optional, Phase 12 refinement).
- No tables, no PII, no detailed records.
- Accessible: all metric cards have ARIA labels.
