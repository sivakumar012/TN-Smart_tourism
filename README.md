# TN Smart Tourism (தமிழ்நாடு ஸ்மார்ட் சுற்றுலா)

> **Explore smarter. Experience more.**

A digital tourism platform for Tamil Nadu's pilot corridors (**Chennai–Mahabalipuram** and **Coimbatore Heritage & Wellness Corridor**) that helps international and domestic visitors discover attractions, select bundled tourism passes, complete seamless payments (including international debit/credit card onboarding via **UPI One World**), receive digital QR passes, and redeem them at participating attraction entry points.

---

## Live Deployment & Access

- **Public Production Tunnel**: [https://smart-tourism.fluxrn.com](https://smart-tourism.fluxrn.com)
- **Local Dev Server**: `http://localhost:3000`
- **Operator Redemption Portal**: [https://smart-tourism.fluxrn.com/redeem](https://smart-tourism.fluxrn.com/redeem)
- **Department Admin Dashboard**: [https://smart-tourism.fluxrn.com/admin](https://smart-tourism.fluxrn.com/admin)

---

## Prototype Notice

This application is a functional MVP / demonstration platform for Tamil Nadu Tourism:

- **Simulated Financial Transactions**: No real debit/credit cards or bank accounts are debited.
- **Simulated Payment Gateway**: Onboarding and wallet funding rely on the `DemoPaymentProvider` abstraction.
- **No Real Credential Storage**: Passport, visa, and card inputs are verified dynamically for demo purposes without persistent storage of sensitive data.
- **Attractions & Pricing**: Package pricing and attraction data reflect realistic pilot corridor values.

---

## Core Tourist & Operator Journey

```
Discover Corridors -> Select Pass Package -> Checkout
 -> Foreign Visitor UPI One World Onboarding (Card + Passport Verification)
 -> Demo Wallet Creation & Funding -> UPI Payment Confirmation
 -> Digital Pass QR Generated -> Operator Gate Scanner / PIN Validation
```

The entire journey can be tested and demonstrated end-to-end in **2–3 minutes**.

---

## The Foreign Tourist Problem & Solution

International tourists visiting Tamil Nadu historically face friction at attraction entry gates due to:
1. Lack of an Indian domestic bank account.
2. Inability to pay using standard domestic UPI QR codes.

**TN Smart Tourism** solves this by integrating an abstraction layer for **UPI One World**, enabling international visitors to register their passport/visa details, onboard an international credit/debit card, load INR into a prepaid wallet, and scan any domestic UPI QR or buy bundled digital passes seamlessly.

---

## Feature Implementation Status

| Feature / Phase | Target Capability | Status |
|---|---|---|
| Phase 1: Workspace Governance | Antigravity steering, rules, & structure | Complete |
| Phase 2: Application Shell & Brand | Coastal Heritage design system, brand logo, bilingual switch | Complete |
| Phase 3: Tourist Discovery | Corridor filterable catalog & photo-realistic attraction cards | Complete |
| Phase 4: Pass Selection | Chennai & Coimbatore bundled passes & customization | Complete |
| Phase 5: Foreign Payment Onboarding | UPI One World card & passport verification flow | Complete |
| Phase 6: Demo Wallet | Instant balance loading & card transaction simulation | Complete |
| Phase 7: Demo Payment | Seamless checkout & transaction receipt generation | Complete |
| Phase 8: Booking & Digital Pass | Dynamic QR token generator & validity countdown | Complete |
| Phase 9: Gate Redemption | Operator camera scanner & 4-digit PIN verification | Complete |
| Phase 10: Admin Dashboard | Live analytics, revenue, pass breakdown, & redemption logs | Complete |
| Phase 11: End-to-End Testing | Automated Jest E2E test suites & property validation | Complete |
| Phase 12: UX & Aesthetics Refinement | Google Stitch aligned UI, glassmorphism, responsive hero showcase | Complete |
| Phase 13: GA4 Telemetry & Funnel Tracking | Privacy-first GA4 integration, Consent Mode v2, e-commerce funnel, zero-PII | Complete |

---

## Pilot Corridors & Packages

### 1. Chennai – Mahabalipuram Coastal Heritage Corridor
- **Attractions**: Shore Temple, Five Rathas, Arjuna's Penance, Kovalam Beach, DakshinaChitra Heritage Village, Muttukadu Boat House.
- **Bundles**: 
  - *Heritage Explorer Pass* (Rs 1,999 / 3 Days)
  - *Coastal Discovery Pass* (Rs 1,499 / 2 Days)

### 2. Coimbatore Heritage & Wellness Corridor
- **Attractions**: Adiyogi / Isha Yoga Centre, Marudhamalai Hill Temple, Siruvani Waterfalls & Dam, Gass Forest Museum, Valankulam Lake Promenade.
- **Bundles**:
  - *Coimbatore Heritage & Wellness Pass* (Rs 1,799 / 3 Days)

---

## Application Structure & Key Routes

```
src/
  app/
    page.tsx                      # Homepage with animated foreign tourist UPI banner & corridors
    explore/                      # Corridors & Attractions Filterable Catalog
    passes/                       # Bundled Pass Packages & Customization
      [id]/                       # Pass Details & Attraction Selection
    checkout/                     # Tourist Checkout & International Visitor Option
    payment/
      upi-one-world/              # International Card Onboarding & Wallet Funding
      verify-visitor/             # Passport & Visa Verification Step
      verify-identity/            # Biometric / Liveness Verification Simulation
    payment-help/                 # Foreign Tourist UPI One World FAQ & Guide
    my-passes/                    # Tourist Digital Pass Wallet & QR Generator
    redeem/                       # Attraction Gate Operator Redemption Scanner
    admin/                        # Department Metrics & Real-time Redemption Dashboard
  components/                     # Modular React Components & Layout Headers
  lib/
    payment/                      # PaymentProvider interface & DemoPaymentProvider implementation
    db/                           # Database client & persistent models
    booking/                      # Booking & Pass creation logic
    qr/                           # Encrypted QR payload generator
    redemption/                   # Entry gate validation logic
  data/
    seed.ts                       # Seed data for Chennai & Coimbatore corridors
```

---

## Design System & Aesthetics

- **Style Philosophy**: *Coastal Heritage Modernism* (aligned with Google Stitch design guidelines).
- **Typography**: `Plus Jakarta Sans` via Google Fonts.
- **Color Palette**:
  - Primary: Bay Teal (`#0D9488` / `#14B8A6`)
  - Accent: Heritage Gold / Sunset Amber (`#F59E0B` / `#D97706`)
  - Dark Navy: `#0F172A`
- **Bilingual Interface**: Native English and Tamil (`ENG | தமிழ்`) toggle.
- **Visual Assets**: Photo-realistic custom visual assets for all attractions and hero showcases.

---

## Getting Started & Development

### Installation & Server Execution

```bash
# Install dependencies
npm install

# Run TypeScript type check
npx tsc --noEmit

# Run unit and E2E test suite
npm test

# Run local Next.js development server
npm run dev
```

### Cloudflare Tunnel Setup (For Remote / Mobile Testing)

```bash
# Run named tunnel pointing to local server
cloudflared tunnel run --url http://localhost:3000 smart-tourism-tunnel
```

---

## Payment Provider Abstraction

All financial and onboarding operations route through a clean `PaymentProvider` interface:

```typescript
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

The current implementation (`DemoPaymentProvider`) simulates real-world UPI One World workflows and can be replaced with an authorized production PSP / PPI partner module seamlessly.

---

## Google Analytics 4 (GA4) Integration & Telemetry

The platform incorporates privacy-by-design GA4 event telemetry across the entire tourist journey:

### 1. Tracked Funnel & Events

- **Attractions & Passes Discovery**: `view_item_list`, `view_item`, `select_item`
- **Checkout & Payment**: `begin_checkout`, `add_payment_info`
- **UPI One World Onboarding**: `payment_onboarding_started`, `visitor_verification_completed`, `wallet_funding_completed`
- **Booking & Safety**: `purchase` (deduplicated by `transaction_id`), `booking_failed` (on payment errors, never logged as purchase)
- **Pass Usage & Gate Redemption**: `view_digital_pass`, `pass_redeemed`, `pass_redemption_failed`

### 2. Privacy & Consent Safeguards

- **Google Consent Mode v2**: Initialized with `analytics_storage: 'denied'` before `gtag.js` loads; updated dynamically when user accepts/declines via [`ConsentBanner`](file:///Users/shiva/Documents/Projects/TN%20Smart_tourism/src/components/analytics/ConsentBanner.tsx).
- **Zero PII Policy**: Event payloads strictly omit personal names, email addresses, passport/visa numbers, credit card numbers, UPI PINs, and raw QR secrets.
- **Demo Data Separation**: Events in development and staging are tagged with `is_demo: true` to prevent polluting real-world production analytics.
- **Fail-Safe Operation**: If GA4 is blocked, offline, or unconfigured, the application functions seamlessly without runtime errors.

### 3. Setup & Credentials

Create `.env.local` from [`.env.example`](file:///Users/shiva/Documents/Projects/TN%20Smart_tourism/.env.example):

```env
# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-C0637BGNB7

# Tag development/staging simulated transactions (true / false)
NEXT_PUBLIC_GA_DEMO_MODE=true
```

To view live events during development:
1. Open Google Analytics Console → **Admin** → **DebugView**.
2. Open Browser DevTools (`F12`) → Console to inspect `[GA4]` telemetry logs.
3. Visit [`/admin`](file:///Users/shiva/Documents/Projects/TN%20Smart_tourism/src/app/admin/page.tsx) to view real-time in-memory simulation metrics.

---

## Verification & Test Results

The platform includes automated testing across all core modules:
- **GA4 Analytics & Telemetry**: [`tests/analytics/ga4-analytics.test.ts`](file:///Users/shiva/Documents/Projects/TN%20Smart_tourism/tests/analytics/ga4-analytics.test.ts)
- **Property & Correctness Tests**: [`tests/property/correctness.test.ts`](file:///Users/shiva/Documents/Projects/TN%20Smart_tourism/tests/property/correctness.test.ts)
- **International Tourist Journey E2E**: [`tests/e2e/international-tourist-journey.test.ts`](file:///Users/shiva/Documents/Projects/TN%20Smart_tourism/tests/e2e/international-tourist-journey.test.ts)

**Test Status**: **40 / 40 Passing across 3 Test Suites**
```bash
PASS tests/analytics/ga4-analytics.test.ts
PASS tests/property/correctness.test.ts
PASS tests/e2e/international-tourist-journey.test.ts

Test Suites: 3 passed, 3 total
Tests:       40 passed, 40 total
```
