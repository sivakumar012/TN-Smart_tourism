# demo-payment — Requirements

## Feature summary

Demo payment authorises the pass purchase against the demo wallet balance, enforces business rules, creates the booking record, and routes to success or failure.

---

## Acceptance criteria

### Payment authorisation screen

**SHALL** display: pass name, amount, current demo wallet balance, payment provider name ("UPI One World (Demo)").

**SHALL** display CTA: "Pay & get pass."

**SHALL** display: "Prototype simulation — no real payment is processed."

**WHEN** "Pay & get pass" is tapped, **SHALL** call `PaymentProvider.authorizePayment()`.

**IF** `demo_balance >= pass_amount`:
- **SHALL** deduct `pass_amount` from `WalletSession.demo_balance`.
- **SHALL** create a `PaymentTransaction` with `status: SUCCESS`.
- **SHALL** update `PaymentSession.status` to `COMPLETED`.
- **SHALL** navigate to Payment success screen.

**IF** `demo_balance < pass_amount`:
- **SHALL** set `PaymentTransaction.status` to `FAILED`.
- **SHALL NOT** deduct any balance.
- **SHALL NOT** create a confirmed booking.
- **SHALL** navigate to Payment failure screen with message "Insufficient wallet balance."

---

### Payment success screen

**SHALL** display payment confirmation details: pass name, amount paid, payment reference.

**SHALL** display CTA: "View my booking."

**SHALL** create exactly one `Booking` record with `payment_status: PAID` and `booking_status: CONFIRMED`.

**SHALL** trigger digital pass generation (exactly one `DigitalPass` record).

---

### Payment failure screen

**SHALL** display error message relevant to failure reason.

**WHEN** failure reason is insufficient balance, **SHALL** display "Add more funds to your wallet" with link to Wallet funding.

**SHALL** display CTA: "Try again" returning to Payment authorisation.

**SHALL NOT** create a `Booking` record on failure.

---

## Correctness properties (must be tested)

- Property 3: Successful payment creates exactly one booking.
- Property 4: Failed payment creates no confirmed booking.
- Property 7: Successful payment reduces demo balance correctly.
- Property 8: Insufficient balance blocks payment.

---

## Out of scope (MVP)

- Real card processing.
- Real UPI payment rails.
- Refunds.
- Partial payments.
