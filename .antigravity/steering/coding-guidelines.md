# TN smart tourism — Coding guidelines

## General principles

1. **TypeScript strict mode** — no `any`, no implicit returns without type annotations.
2. **Functional components** — no class components.
3. **Server components by default** — use `"use client"` only when interactivity requires it.
4. **Co-location** — keep component logic close to the component file.
5. **No dead code** — remove unused imports, variables, and functions.
6. **No console.log in production paths** — use structured logger in `src/lib/logger.ts`.

---

## File and directory naming

| Type | Convention | Example |
|---|---|---|
| Pages | kebab-case directory + `page.tsx` | `explore/page.tsx` |
| Components | PascalCase file | `PassCard.tsx` |
| Utilities / lib | camelCase | `generateQrToken.ts` |
| Types | PascalCase | `BookingTypes.ts` |
| Tests | Suffix `.test.ts` / `.spec.ts` | `booking.test.ts` |

---

## Component structure

```tsx
// 1. Imports (external → internal → types)
// 2. Type definitions local to this file
// 3. Constants
// 4. Component function (named export preferred)
// 5. Default export at bottom if required by Next.js page convention
```

---

## Business logic rules

### Payment
- Never call a real payment API.
- All payment logic MUST go through the `PaymentProvider` interface.
- `DemoPaymentProvider` is the ONLY implementation in MVP.
- Never persist real card numbers, UPI PINs, or biometric data — not even temporarily.

### Booking
- A booking record MUST only be created AFTER `authorizePayment()` returns success.
- A digital pass MUST only be created AFTER a confirmed booking exists.
- Use database transactions where atomicity is required.

### Redemption
- Redemption status transitions: `VALID → REDEEMED` only.
- Once `REDEEMED`, status is immutable.
- Always re-query pass status from the database at redemption time — never trust cached state.

### Soft delete
- All list/discovery queries MUST include `WHERE deleted_at IS NULL`.
- Never hard-delete attraction, pass, booking, or digital-pass records in the MVP.

---

## QR token rules

```typescript
// Correct
const qrToken = `TN-DEMO-PASS-${generateAlphanumeric(8)}`;

// NEVER embed PII in QR payload
// NEVER embed: email, passport, card data, UPI PIN
```

---

## Error handling

- All async functions must use try/catch and return typed results (no unhandled promise rejections).
- API routes must return structured JSON errors: `{ error: string; code: string }`.
- Payment failures must return `PaymentResult` with `status: 'FAILED'` — never throw.

---

## Testing requirements

### Every feature spec MUST have:
- Unit tests for all business logic functions.
- At minimum one happy-path integration test.
- The 12 correctness-property tests (see `tests/property/correctness.test.ts`).

### E2E
- The required 22-step international tourist journey MUST pass before the MVP is considered complete.
- E2E tests must not require developer intervention to run.

---

## Commit hygiene

- Commits must be atomic and reference a feature or fix.
- Never commit `.env` files.
- Never commit real credentials, even in test fixtures.

---

## Scope audit checklist

Before adding any new feature, ask:
1. Does this directly serve the core journey (discover → select → pay → pass → redeem)?
2. Is this in the MVP spec?
3. Will this delay the primary international tourist demonstration?

If the answer to 1 or 2 is NO, do not build it.

---

## Accessibility

- All interactive elements must have accessible labels.
- Colour contrast must meet WCAG AA minimum.
- Touch targets must be at least 44×44 px on mobile.
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, `<section>`, `<h1>`…).
