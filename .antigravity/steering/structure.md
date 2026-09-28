# TN smart tourism — Structure steering

## Repository layout

```
tn-smart-tourism/
├── .antigravity/
│   ├── settings/
│   ├── steering/
│   │   ├── product.md
│   │   ├── structure.md
│   │   ├── tech.md
│   │   └── coding-guidelines.md
│   ├── hooks/
│   │   └── pre-commit.md
│   └── skills/
├── .antigravityignore
├── README.md
│
├── specs/
│   ├── tourist-discovery/
│   │   ├── .config.antigravity
│   │   ├── requirements.md
│   │   └── design.md
│   ├── pass-selection/
│   ├── foreign-payment-onboarding/
│   ├── demo-wallet/
│   ├── demo-payment/
│   ├── digital-pass/
│   ├── redemption/
│   └── admin-dashboard/
│
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── (tourist)/              # Tourist-facing route group
│   │   │   ├── page.tsx            # Home
│   │   │   ├── explore/
│   │   │   ├── attraction/[id]/
│   │   │   ├── passes/
│   │   │   ├── passes/[id]/
│   │   │   ├── checkout/
│   │   │   ├── payment/
│   │   │   │   ├── select/
│   │   │   │   ├── upi-one-world/
│   │   │   │   ├── verify-visitor/
│   │   │   │   ├── verify-identity/
│   │   │   │   ├── wallet-setup/
│   │   │   │   ├── wallet-funding/
│   │   │   │   ├── wallet-confirm/
│   │   │   │   ├── authorize/
│   │   │   │   └── result/
│   │   │   ├── booking/[ref]/
│   │   │   ├── my-passes/
│   │   │   ├── pass/[ref]/
│   │   │   └── payment-help/
│   │   ├── (operator)/             # Operator redemption route group
│   │   │   └── redeem/
│   │   └── (admin)/                # Admin dashboard route group
│   │       └── admin/
│   │
│   ├── components/
│   │   ├── ui/                     # Generic UI primitives
│   │   ├── tourist/                # Tourist-facing components
│   │   ├── payment/                # Payment flow components
│   │   ├── pass/                   # Pass and QR components
│   │   ├── operator/               # Redemption components
│   │   └── admin/                  # Admin components
│   │
│   ├── lib/
│   │   ├── payment/
│   │   │   ├── PaymentProvider.ts  # Interface
│   │   │   └── DemoPaymentProvider.ts
│   │   ├── db/
│   │   │   └── schema.ts           # Data model definitions
│   │   ├── qr/                     # QR generation utilities
│   │   ├── booking/                # Booking business logic
│   │   └── redemption/             # Redemption business logic
│   │
│   ├── data/
│   │   └── seed.ts                 # Demo attractions and passes seed data
│   │
│   └── types/
│       └── index.ts                # Shared TypeScript types
│
├── tests/
│   ├── e2e/
│   │   └── international-tourist-journey.test.ts   # Required E2E scenario
│   ├── unit/
│   │   ├── payment/
│   │   ├── booking/
│   │   └── redemption/
│   └── property/
│       └── correctness.test.ts     # 12 correctness properties
│
├── public/
│   └── images/
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## Naming conventions

| Area | Convention |
|---|---|
| Files | kebab-case |
| React components | PascalCase |
| TypeScript types/interfaces | PascalCase |
| Database fields | snake_case |
| API routes | kebab-case |
| Environment variables | SCREAMING_SNAKE_CASE |

---

## Route group conventions

- `(tourist)` — all tourist-facing pages
- `(operator)` — attraction operator redemption interface
- `(admin)` — lightweight admin dashboard

---

## Spec structure

Every feature spec in `specs/` MUST contain:
- `.config.antigravity` — Antigravity feature configuration
- `requirements.md` — SHALL/WHEN/IF/WHERE/WHILE acceptance criteria
- `design.md` — UX and interaction design notes

---

## Synchronisation rules

1. `README.md` must stay synchronised with the actual codebase.
2. Spec requirements must be traceable to tests.
3. Data model in specs must match `src/lib/db/schema.ts`.
4. New screens must be registered in `structure.md`.
