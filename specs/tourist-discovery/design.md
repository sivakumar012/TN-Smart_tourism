# tourist-discovery — Design

## Design language

- **Palette:** Deep navy (#0B1F3A), teal (#00A896), white (#FFFFFF), warm sand (#F4A261).
- **Typography:** Inter or similar sans-serif; large headings, clean body.
- **Mobile-first:** All layouts designed for 390px width upward.
- **Imagery:** Large, full-bleed hero images on Home and Attraction detail.

---

## Home screen layout

```
┌──────────────────────────────────┐
│  [Logo]  TN smart tourism        │
│  Explore smarter. Experience more│
├──────────────────────────────────┤
│                                  │
│  [Full-bleed hero image:         │
│   Mahabalipuram shore temple]    │
│                                  │
│  "Discover Tamil Nadu your way." │
│                                  │
│  Chennai → Mahabalipuram  [▼]    │
│                                  │
│  [Explore passes]   ← primary    │
│  [Plan my visit]    ← secondary  │
│                                  │
└──────────────────────────────────┘
```

- Hero image occupies ≥60% of viewport height.
- CTA buttons: full-width on mobile; teal fill for primary, outlined for secondary.

---

## Explore screen layout

```
┌──────────────────────────────────┐
│  ← Back   Explore                │
├──────────────────────────────────┤
│  🔍 Search attractions...        │
├──────────────────────────────────┤
│  [All] [Heritage] [Culture]      │
│  [Experience] [Coastal]          │
├──────────────────────────────────┤
│  ┌────────────────────────┐      │
│  │ [image]                │      │
│  │ Shore Temple           │      │
│  │ Mahabalipuram · Heritage│      │
│  │ ₹XXX (demo)            │      │
│  └────────────────────────┘      │
│  ... more cards                  │
└──────────────────────────────────┘
```

- Category chips: horizontally scrollable row.
- Attraction cards: image 16:9, rounded corners, subtle shadow.

---

## Attraction detail screen layout

```
┌──────────────────────────────────┐
│  ← Back                          │
│  [Full-width image]              │
├──────────────────────────────────┤
│  Shore Temple                    │
│  📍 Mahabalipuram                │
│  🏛 Heritage                     │
│                                  │
│  [Description paragraph]         │
│                                  │
│  Demo price: ₹XXX                │
│  (Prototype — not official price) │
│                                  │
│  [View passes]                   │
└──────────────────────────────────┘
```

---

## Interaction notes

- Attraction cards: subtle scale + shadow on hover/press.
- Category filter chips: teal background when active, outlined when inactive.
- Search: debounced at 300ms.
- Smooth page transitions using Next.js View Transitions or CSS opacity fade.
