# admin-dashboard — Requirements

## Feature summary

A lightweight admin view showing key demo metrics. No complex administration required.

---

## Acceptance criteria

### Dashboard screen

**SHALL** display the following metrics, computed from local persistence:

| Metric | Source |
|---|---|
| Total bookings | COUNT(`Booking` WHERE `deleted_at IS NULL`) |
| International bookings | COUNT WHERE `visitor_type = INTERNATIONAL`) |
| Domestic bookings | COUNT WHERE `visitor_type = DOMESTIC`) |
| Payment successes | COUNT(`PaymentTransaction` WHERE `status = SUCCESS`) |
| Payment failures | COUNT(`PaymentTransaction` WHERE `status = FAILED`) |
| Active passes | COUNT(`DigitalPass` WHERE `status = VALID`) |
| Redeemed passes | COUNT(`DigitalPass` WHERE `status = REDEEMED`) |
| Demo GMV | SUM(`PaymentTransaction.amount` WHERE `status = SUCCESS`) |

**SHALL** refresh metrics automatically or on page load.

**SHALL NOT** display personally identifiable information on the dashboard.

**SHALL NOT** require authentication in the MVP demo (no login screen).

**SHALL** display "Demo metrics — no real financial data" disclaimer.

---

## Out of scope (MVP)

- Authentication / access control.
- Detailed booking list / table.
- Attraction-level redemption analytics.
- Revenue reporting.
- Export (CSV, PDF).
- Multi-period comparison.
