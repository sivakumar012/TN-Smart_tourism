/**
 * TN Smart Tourism — GA4 Analytics Module
 *
 * Central analytics abstraction. All tracking calls go through this module.
 * - No analytics call will throw or interrupt the user journey.
 * - Privacy: never log PII, passport/visa numbers, card numbers, UPI PINs,
 *   full booking references, or QR tokens.
 * - Demo safety: demo/test events are tagged with is_demo=true.
 */

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/** True when running in demo/test mode — prevents mixing simulated data with real revenue */
export const GA_DEMO_MODE =
  process.env.NEXT_PUBLIC_GA_DEMO_MODE === "true" ||
  process.env.NODE_ENV === "development";

/** GA4 is ready only when a non-empty Measurement ID is configured */
export function isGaConfigured(): boolean {
  return (
    typeof GA_MEASUREMENT_ID === "string" &&
    GA_MEASUREMENT_ID.length > 0 &&
    GA_MEASUREMENT_ID !== "G-XXXXXXXXXX"
  );
}

// ---------------------------------------------------------------------------
// Consent management
// ---------------------------------------------------------------------------

const CONSENT_KEY = "tn_analytics_consent";

export type ConsentState = "granted" | "denied" | "pending";

export function getConsentState(): ConsentState {
  if (typeof window === "undefined") return "pending";
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "granted") return "granted";
  if (stored === "denied") return "denied";
  return "pending";
}

export function setConsentState(state: "granted" | "denied"): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, state);

  // Update GA4 Consent Mode
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: state === "granted" ? "granted" : "denied",
    });
  }
}

/** Returns true if the user has granted analytics consent */
export function hasAnalyticsConsent(): boolean {
  return getConsentState() === "granted";
}

// ---------------------------------------------------------------------------
// TypeScript types for supported events and parameters
// ---------------------------------------------------------------------------

export type VisitorType = "domestic" | "international";

export type Destination =
  | "Chennai-Mahabalipuram"
  | "Coimbatore"
  | "Chennai"
  | "Mahabalipuram"
  | string;

export type PaymentMethod =
  | "upi_one_world"
  | "international_card"
  | "indian_payment"
  | string;

export type PaymentStatus = "success" | "failed" | "pending";

export type BookingStatus = "confirmed" | "failed" | "pending";

export type RedemptionStatus = "success" | "failed" | "already_redeemed" | "expired" | "invalid";

export type FailureReason =
  | "insufficient_balance"
  | "payment_failed"
  | "pass_not_found"
  | "pass_already_redeemed"
  | "pass_expired"
  | "pass_invalid"
  | "booking_creation_failed"
  | "session_error"
  | "unknown";

export type FlowStep =
  | "upi_intro_viewed"
  | "visitor_verification"
  | "identity_verification"
  | "wallet_setup"
  | "wallet_funding"
  | "payment_authorization"
  | "booking_confirmed"
  | "pass_viewed";

/** Base parameters common to most events */
export interface BaseEventParams {
  visitor_type?: VisitorType;
  destination?: Destination;
  is_demo?: boolean;
}

/** Standard GA4 item for e-commerce events */
export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  price?: number;
  quantity?: number;
  currency?: string;
}

/** Parameters for attraction list / pass list events */
export interface ItemListParams extends BaseEventParams {
  item_list_id: string;
  item_list_name: string;
  items: AnalyticsItem[];
}

/** Parameters for select_item events */
export interface SelectItemParams extends BaseEventParams {
  item_list_id: string;
  item_list_name: string;
  item: AnalyticsItem;
}

/** Parameters for view_item events */
export interface ViewItemParams extends BaseEventParams {
  item: AnalyticsItem;
  attraction_id?: string;
  pass_id?: string;
}

/** Parameters for begin_checkout */
export interface BeginCheckoutParams extends BaseEventParams {
  currency: string;
  value: number;
  pass_id: string;
  pass_name: string;
  quantity: number;
  items: AnalyticsItem[];
}

/** Parameters for add_payment_info */
export interface AddPaymentInfoParams extends BaseEventParams {
  currency: string;
  value: number;
  payment_method: PaymentMethod;
  pass_id: string;
  pass_name: string;
  items: AnalyticsItem[];
}

/** Parameters for purchase (successful booking) */
export interface PurchaseParams extends BaseEventParams {
  transaction_id: string;
  currency: string;
  value: number;
  pass_id: string;
  pass_name: string;
  quantity: number;
  payment_method?: PaymentMethod;
  items: AnalyticsItem[];
}

/** Parameters for booking_failed */
export interface BookingFailedParams extends BaseEventParams {
  pass_id?: string;
  pass_name?: string;
  currency?: string;
  value?: number;
  payment_method?: PaymentMethod;
  failure_reason: FailureReason;
  booking_status: "failed";
}

/** Parameters for view_digital_pass */
export interface ViewDigitalPassParams extends BaseEventParams {
  pass_id?: string;
  pass_name?: string;
}

/** Parameters for pass_redeemed */
export interface PassRedeemedParams extends BaseEventParams {
  pass_id?: string;
  pass_name?: string;
  redemption_status: "success";
  attraction_id?: string;
}

/** Parameters for pass_redemption_failed */
export interface PassRedemptionFailedParams extends BaseEventParams {
  pass_id?: string;
  pass_name?: string;
  redemption_status: Exclude<RedemptionStatus, "success">;
  failure_reason: FailureReason;
  attraction_id?: string;
}

/** Parameters for payment_onboarding_started */
export interface PaymentOnboardingStartedParams extends BaseEventParams {
  flow_step: FlowStep;
}

/** Parameters for visitor_verification_completed */
export interface VisitorVerificationCompletedParams extends BaseEventParams {
  flow_step: FlowStep;
  payment_status: PaymentStatus;
}

/** Parameters for wallet_funding_completed */
export interface WalletFundingCompletedParams extends BaseEventParams {
  flow_step: FlowStep;
  currency: string;
  value: number;
}

/** Parameters for payment_result */
export interface PaymentResultParams extends BaseEventParams {
  currency: string;
  value: number;
  payment_method?: PaymentMethod;
  payment_status: PaymentStatus;
  pass_id?: string;
  pass_name?: string;
  failure_reason?: FailureReason;
}

// ---------------------------------------------------------------------------
// Duplicate-event protection
// ---------------------------------------------------------------------------

const firedEvents = new Set<string>();

function getDedupKey(name: string, params?: Record<string, unknown>): string {
  const key = params?.transaction_id ?? params?.pass_id ?? params?.item?.item_id;
  return key ? `${name}:${key}` : "";
}

// ---------------------------------------------------------------------------
// Core tracking primitive
// ---------------------------------------------------------------------------

/**
 * Send an event to GA4 via gtag.
 * - No-ops silently if GA is not configured, consent is denied, or gtag is unavailable.
 * - Never throws; analytics failures must not interrupt the user journey.
 */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
): void {
  try {
    if (typeof window === "undefined") return;
    if (!isGaConfigured()) return;
    if (!hasAnalyticsConsent()) return;
    if (typeof window.gtag !== "function") return;

    const enriched: Record<string, unknown> = {
      ...params,
      is_demo: GA_DEMO_MODE,
    };

    window.gtag("event", name, enriched);

    if (process.env.NODE_ENV === "development") {
      console.debug("[GA4]", name, enriched);
    }
  } catch {
    // Analytics must never interrupt the booking journey
  }
}

/**
 * Track a page view — called by the route-change listener.
 * Deduplicated by path to prevent double-firing in React Strict Mode.
 */
let lastTrackedPath = "";

export function trackPageView(path: string): void {
  try {
    if (!isGaConfigured()) return;
    if (!hasAnalyticsConsent()) return;
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    if (path === lastTrackedPath) return;

    lastTrackedPath = path;

    window.gtag("event", "page_view", {
      page_path: path,
      is_demo: GA_DEMO_MODE,
    });

    if (process.env.NODE_ENV === "development") {
      console.debug("[GA4] page_view", { page_path: path });
    }
  } catch {
    // silent
  }
}

// ---------------------------------------------------------------------------
// Tourism funnel event helpers
// ---------------------------------------------------------------------------

/** Attraction list displayed — view_item_list */
export function trackViewAttractionList(params: ItemListParams): void {
  trackEvent("view_item_list", {
    item_list_id: params.item_list_id,
    item_list_name: params.item_list_name,
    items: params.items,
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/** Pass list displayed — view_item_list */
export function trackViewPassList(params: ItemListParams): void {
  trackEvent("view_item_list", {
    item_list_id: params.item_list_id,
    item_list_name: params.item_list_name,
    items: params.items,
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/** User selects an attraction or pass — select_item */
export function trackSelectItem(params: SelectItemParams): void {
  trackEvent("select_item", {
    item_list_id: params.item_list_id,
    item_list_name: params.item_list_name,
    items: [params.item],
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/** Attraction or pass detail page viewed — view_item */
export function trackViewItem(params: ViewItemParams): void {
  trackEvent("view_item", {
    items: [params.item],
    visitor_type: params.visitor_type,
    destination: params.destination,
    attraction_id: params.attraction_id,
    pass_id: params.pass_id,
  });
}

/** User starts checkout — begin_checkout */
export function trackCheckoutStarted(params: BeginCheckoutParams): void {
  trackEvent("begin_checkout", {
    currency: params.currency,
    value: params.value,
    items: params.items,
    pass_id: params.pass_id,
    pass_name: params.pass_name,
    quantity: params.quantity,
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/** User selects payment method — add_payment_info */
export function trackPaymentMethodSelected(params: AddPaymentInfoParams): void {
  trackEvent("add_payment_info", {
    currency: params.currency,
    value: params.value,
    payment_type: params.payment_method,
    items: params.items,
    pass_id: params.pass_id,
    pass_name: params.pass_name,
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/**
 * Successful simulated booking — purchase.
 * Deduplicated by transaction_id to prevent double-firing on remount.
 * IMPORTANT: Only call this after a confirmed PAID booking — never on failure.
 */
export function trackPurchase(params: PurchaseParams): void {
  const dedupKey = getDedupKey("purchase", {
    transaction_id: params.transaction_id,
  });
  if (dedupKey && firedEvents.has(dedupKey)) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[GA4] Duplicate purchase event suppressed:", dedupKey);
    }
    return;
  }
  if (dedupKey) firedEvents.add(dedupKey);

  trackEvent("purchase", {
    transaction_id: params.transaction_id,
    currency: params.currency,
    value: params.value,
    items: params.items,
    pass_id: params.pass_id,
    pass_name: params.pass_name,
    quantity: params.quantity,
    payment_method: params.payment_method,
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/** Payment or booking failure — booking_failed */
export function trackBookingFailed(params: BookingFailedParams): void {
  trackEvent("booking_failed", {
    pass_id: params.pass_id,
    pass_name: params.pass_name,
    currency: params.currency,
    value: params.value,
    payment_method: params.payment_method,
    failure_reason: params.failure_reason,
    booking_status: "failed",
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/** Payment result (success or failure) — payment_result */
export function trackPaymentResult(params: PaymentResultParams): void {
  trackEvent("payment_result", {
    currency: params.currency,
    value: params.value,
    payment_method: params.payment_method,
    payment_status: params.payment_status,
    pass_id: params.pass_id,
    pass_name: params.pass_name,
    failure_reason: params.failure_reason,
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/** User opens digital pass — view_digital_pass */
export function trackViewDigitalPass(params: ViewDigitalPassParams): void {
  trackEvent("view_digital_pass", {
    pass_id: params.pass_id,
    pass_name: params.pass_name,
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/** Operator successfully redeems a valid pass — pass_redeemed */
export function trackPassRedeemed(params: PassRedeemedParams): void {
  trackEvent("pass_redeemed", {
    pass_id: params.pass_id,
    pass_name: params.pass_name,
    redemption_status: "success",
    attraction_id: params.attraction_id,
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/** Failed or blocked redemption attempt — pass_redemption_failed */
export function trackPassRedemptionFailed(
  params: PassRedemptionFailedParams
): void {
  trackEvent("pass_redemption_failed", {
    pass_id: params.pass_id,
    pass_name: params.pass_name,
    redemption_status: params.redemption_status,
    failure_reason: params.failure_reason,
    attraction_id: params.attraction_id,
    visitor_type: params.visitor_type,
    destination: params.destination,
  });
}

/** International visitor starts UPI One World onboarding — payment_onboarding_started */
export function trackPaymentOnboardingStarted(
  params: PaymentOnboardingStartedParams
): void {
  trackEvent("payment_onboarding_started", {
    flow_step: params.flow_step,
    visitor_type: params.visitor_type ?? "international",
    destination: params.destination,
  });
}

/** Visitor or identity verification completed — visitor_verification_completed */
export function trackVisitorVerificationCompleted(
  params: VisitorVerificationCompletedParams
): void {
  trackEvent("visitor_verification_completed", {
    flow_step: params.flow_step,
    payment_status: params.payment_status,
    visitor_type: params.visitor_type ?? "international",
    destination: params.destination,
  });
}

/** Simulated wallet funding completed — wallet_funding_completed */
export function trackWalletFundingCompleted(
  params: WalletFundingCompletedParams
): void {
  trackEvent("wallet_funding_completed", {
    flow_step: params.flow_step,
    currency: params.currency,
    value: params.value,
    visitor_type: params.visitor_type ?? "international",
    destination: params.destination,
  });
}

// ---------------------------------------------------------------------------
// Window type augmentation (gtag global)
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "consent" | "set" | "js",
      target: string | Date | Gtag.ConsentParams,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
