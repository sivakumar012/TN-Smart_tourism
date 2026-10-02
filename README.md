# TN smart tourism

> **Explore smarter. Experience more.**

A digital tourism platform for the Chennai-Mahabalipuram pilot corridor that helps international and domestic visitors discover attractions, select bundled tourism passes, complete payment (including international card onboarding via UPI One World), receive a digital QR pass, and redeem it at participating attractions.

---

## Prototype notice

This is a prototype / MVP demonstration.

- No real payments are processed.
- No real UPI accounts are created.
- No real card credentials are collected or stored.
- No real KYC or biometric data is collected.
- Attraction data, prices, and pass packages are demo content.

---all instructions done

## Core journey

```
Discover -> Select pass -> Checkout -> International payment onboarding
-> Demo wallet funding -> UPI payment simulation -> Booking confirmation
-> Digital QR pass -> Operator redemption
```

The entire journey is demonstrable in approximately **2-3 minutes** without developer intervention.

---

## The foreign tourist problem

International tourists visiting Tamil Nadu typically do not have:
- An Indian bank account
- Indian UPI access

TN smart tourism solves this by integrating with an authorised external payment provider (UPI One World) that enables foreign tourists to load funds from an international debit/credit card into a temporary UPI-enabled wallet, then pay for a tourism pass.

> **Future production integration requires validation with an authorised UPI One World / PPI provider.**

---

## Features

| Feature | Phase | Status |
|---|---|---|
| Antigravity workspace and steering | 1 | Complete |
| Application shell and brand | 2 | Next |
| Tourist discovery | 3 | Specified |
| Pass selection | 4 | Specified |
| Foreign tourist payment onboarding | 5 | Specified |
| Demo wallet | 6 | Specified |
| Demo payment | 7 | Specified |
| Booking and digital pass | 8 | Specified |
| Redemption | 9 | Specified |
| Admin dashboard | 10 | Specified |
| End-to-end testing | 11 | Specified |
| UX refinement | 12 | Specified |

---

## Getting started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run all tests
npm test

# Run E2E tests
npm run test:e2e
```

- Tourist app: http://localhost:3000
- Operator redemption: http://localhost:3000/redeem
- Admin dashboard: http://localhost:3000/admin

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Persistence | SQLite (better-sqlite3) |
| QR codes | react-qr-code |
| Testing | Jest + Playwright |

---

## Architecture

```
src/
  app/
    (tourist)/       # Tourist-facing pages
    (operator)/      # Redemption interface
    (admin)/         # Admin dashboard
  components/        # UI components
  lib/
    payment/         # PaymentProvider interface + DemoPaymentProvider
    db/              # Data model and persistence
    booking/         # Booking business logic
    qr/              # QR token generation
    redemption/      # Redemption business logic
  data/              # Demo seed data
  types/             # Shared TypeScript types
```

### Payment provider abstraction

TN smart tourism does NOT issue a PPI, operate a wallet, or hold funds.
All payment operations go through the PaymentProvider interface:

```typescript
interface PaymentProvider {
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

The MVP uses `DemoPaymentProvider`. A real provider can be plugged in by implementing this interface.

---

## Pilot data

### Destinations
- Chennai
- Mahabalipuram

### Pass packages

| Package | Demo price | Validity |
|---|---|---|
| Heritage explorer | Rs 1,999 | 3 days |
| Coastal discovery | Rs 1,499 | 2 days |

### Attraction categories
- Heritage
- Culture
- Experience
- Coastal

---

## Workspace governance

```
.antigravity/
  settings/workspace.md        # Workspace configuration
  steering/
    product.md                 # Brand, personas, core journey
    structure.md               # Repository layout, naming
    tech.md                    # Stack, architecture, future integrations
    coding-guidelines.md       # TypeScript, testing, scope audit rules
  hooks/
    pre-commit.md              # Code quality checks

specs/
  tourist-discovery/
  pass-selection/
  foreign-payment-onboarding/  # Core MVP feature
  demo-wallet/
  demo-payment/
  digital-pass/
  redemption/
  admin-dashboard/
```

Each spec contains: `.config.antigravity`, `requirements.md`, `design.md`.

---

## Trust and compliance

TN smart tourism is a prototype and does NOT:
- Issue a PPI (Prepaid Payment Instrument) licence.
- Operate its own wallet.
- Hold or process real customer funds.
- Store card credentials, UPI PINs, passport/visa data, or biometric information.
- Claim RBI approval, NPCI partnership, or PPI licence.

All payment-related operations in this MVP are simulated by `DemoPaymentProvider`.

---

## Definition of done

The MVP is complete when a foreign tourist can experience the full journey from discovery through redemption in approximately 2-3 minutes, without developer intervention, and the required 22-step end-to-end test passes.

See `specs/foreign-payment-onboarding/requirements.md` for the core payment journey specification.

