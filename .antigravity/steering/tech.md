# TN smart tourism — Technology steering

## Preferred stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 14+ (App Router) | TypeScript throughout |
| Language | TypeScript | Strict mode enabled |
| Styling | Tailwind CSS | Mobile-first, custom design tokens |
| Persistence | Lightweight local (SQLite via better-sqlite3 or JSON file store) | No real DB infrastructure required for MVP |
| QR codes | `qrcode` or `react-qr-code` | Demo QR only |
| Testing | Jest + React Testing Library + Playwright | Unit, property, E2E |
| State management | React Context / Zustand (lightweight) | No Redux |

---

## Architecture principles

- **Simple modular architecture** — co-locate related logic.
- **No microservices** — single Next.js application.
- **No Kafka, Kubernetes, Redis clusters** — not required for a demo MVP.
- **No real banking infrastructure** — DemoPaymentProvider only.
- **No real PPI infrastructure** — external service boundary only.

---

## Payment provider abstraction

```typescript
// src/lib/payment/PaymentProvider.ts

export interface PaymentProvider {
  initializeOnboarding(session: OnboardingInput): Promise<OnboardingResult>;
  verifyVisitor(data: VisitorVerificationInput): Promise<VerificationResult>;
  verifyIdentity(data: IdentityVerificationInput): Promise<VerificationResult>;
  createWallet(session: WalletCreationInput): Promise<WalletResult>;
  loadWallet(session: WalletLoadInput): Promise<WalletLoadResult>;
  getWalletBalance(walletId: string): Promise<BalanceResult>;
  authorizePayment(payment: PaymentInput): Promise<PaymentResult>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatusResult>;
}
```

### DemoPaymentProvider rules
- Simulates all steps without real network calls.
- Generates demo UPI IDs in the format `demo-XXXXXXXX@upi`.
- Demo wallet balance is stored in `WalletSession` only.
- Never collects real card credentials, UPI PIN, passport, visa, or biometric data.
- Configurable delay to simulate realistic async behaviour.

### Future production integration
> **Future production integration requires validation with an authorised UPI One World / PPI provider.**
> The `PaymentProvider` interface is the integration boundary. A real provider implementation must:
> - Be licensed as a PPI issuer by the RBI.
> - Comply with NPCI UPI One World guidelines for foreign tourists.
> - Perform real KYC and biometric verification.
> - Issue real wallets and process real card charges.
> - Never expose PII to TN smart tourism servers.

---

## Data persistence (MVP)

Use a simple local persistence layer. Recommended options:

1. **SQLite** via `better-sqlite3` — structured, supports transactions, suitable for correctness testing.
2. **JSON file store** — simpler, sufficient for pure demo.

The data model (tables/collections) is defined in `src/lib/db/schema.ts` and must exactly match the canonical data model in `specs/`.

### Soft-delete pattern
All entities use `deleted_at` for soft deletion. Discovery queries MUST filter `WHERE deleted_at IS NULL`.

---

## QR code rules

- Payload format: `TN-DEMO-PASS-XXXXXXXX` (8 random uppercase alphanumeric characters).
- Payload MUST NOT contain: passport number, visa number, card data, UPI PIN, email, or any other PII.
- QR codes are demo-only and marked "Prototype pass — not a real admission ticket."

---

## Design tokens

```
Primary (deep navy):   #0B1F3A
Accent (teal):         #00A896
Highlight (turquoise): #02C9B3
Background (white):    #FFFFFF
Accent sand:           #F4A261
```

---

## Environment variables

```
# Application
NEXT_PUBLIC_APP_NAME="TN smart tourism"
NEXT_PUBLIC_APP_ENV="demo"

# Payment provider (demo — no real credentials)
PAYMENT_PROVIDER=demo

# Database
DATABASE_URL=./data/tn-tourism.db
```

---

## Future integrations — DOCUMENT ONLY, DO NOT IMPLEMENT

The following are out of MVP scope. They are documented here for architectural awareness:

- Authorised UPI One World / PPI provider (real integration)
- Real international card processing
- Real KYC and biometric verification
- Real wallet issuance
- CMRL (Chennai Metro)
- TNSTC / SETC (bus)
- TTDC (tourism development)
- ASI (Archaeological Survey of India)
- Museums
- Live ticket inventory
- Real attraction redemption terminal
- Hotel distribution
- Experience marketplace
- AI itinerary planner
- Government analytics dashboard
- Multi-state expansion
