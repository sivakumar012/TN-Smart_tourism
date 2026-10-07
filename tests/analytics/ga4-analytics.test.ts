/**
 * GA4 Analytics Module Tests
 *
 * Tests that verify:
 * 1. GA4 initializes only when configured and permitted.
 * 2. Page views are recorded correctly.
 * 3. Events fire only when conditions are met.
 * 4. Successful simulated purchases generate the expected test event.
 * 5. Failed payments never generate a successful purchase event.
 * 6. Duplicate booking submissions do not generate duplicate purchase events.
 * 7. Redemption events fire only after successful redemption.
 * 8. Failed or repeated redemption attempts produce the correct failure events.
 * 9. No PII appears in analytics payloads.
 * 10. Missing configuration or blocked analytics does not break the app.
 * 11. Consent withdrawal prevents subsequent analytics transmission.
 */

// We test the analytics module in a Node environment (no window by default)

describe("Analytics Module — Configuration Guards", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("isGaConfigured returns false when Measurement ID is not set", () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "";
    const { isGaConfigured } = require("@/lib/analytics");
    expect(isGaConfigured()).toBe(false);
  });

  it("isGaConfigured returns false when Measurement ID is the placeholder", () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
    const { isGaConfigured } = require("@/lib/analytics");
    expect(isGaConfigured()).toBe(false);
  });

  it("isGaConfigured returns true when a real-looking ID is configured", () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123456";
    const { isGaConfigured } = require("@/lib/analytics");
    expect(isGaConfigured()).toBe(true);
  });

  it("GA_DEMO_MODE is true when NEXT_PUBLIC_GA_DEMO_MODE is 'true'", () => {
    process.env.NEXT_PUBLIC_GA_DEMO_MODE = "true";
    const { GA_DEMO_MODE } = require("@/lib/analytics");
    expect(GA_DEMO_MODE).toBe(true);
  });
});

describe("Analytics Module — trackEvent guards", () => {
  let gtagMock: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123456";
    process.env.NEXT_PUBLIC_GA_DEMO_MODE = "true";

    // Simulate browser environment
    (global as any).window = {
      gtag: jest.fn(),
      localStorage: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
    };
    gtagMock = (global as any).window.gtag;
  });

  afterEach(() => {
    delete (global as any).window;
  });

  it("trackEvent does NOT fire when gtag is unavailable", () => {
    (global as any).window.gtag = undefined;
    const { trackEvent } = require("@/lib/analytics");

    // Should not throw
    expect(() => trackEvent("test_event")).not.toThrow();
  });

  it("trackEvent does NOT fire when consent is denied", () => {
    (global as any).window.localStorage.getItem = jest.fn().mockReturnValue("denied");
    const { trackEvent } = require("@/lib/analytics");

    trackEvent("test_event", { foo: "bar" });
    expect(gtagMock).not.toHaveBeenCalledWith("event", expect.anything(), expect.anything());
  });

  it("trackEvent fires correctly when configured and consent granted", () => {
    (global as any).window.localStorage.getItem = jest.fn().mockReturnValue("granted");
    const { trackEvent } = require("@/lib/analytics");

    trackEvent("test_event", { value: 123 });
    expect(gtagMock).toHaveBeenCalledWith(
      "event",
      "test_event",
      expect.objectContaining({ value: 123, is_demo: true })
    );
  });

  it("trackEvent adds is_demo flag from GA_DEMO_MODE", () => {
    (global as any).window.localStorage.getItem = jest.fn().mockReturnValue("granted");
    process.env.NEXT_PUBLIC_GA_DEMO_MODE = "true";
    const { trackEvent } = require("@/lib/analytics");

    trackEvent("any_event");
    expect(gtagMock).toHaveBeenCalledWith(
      "event",
      "any_event",
      expect.objectContaining({ is_demo: true })
    );
  });
});

describe("Analytics Module — Page View Tracking", () => {
  let gtagMock: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123456";

    (global as any).window = {
      gtag: jest.fn(),
      localStorage: {
        getItem: jest.fn().mockReturnValue("granted"),
        setItem: jest.fn(),
      },
    };
    gtagMock = (global as any).window.gtag;
  });

  afterEach(() => {
    delete (global as any).window;
  });

  it("trackPageView fires page_view event with correct path", () => {
    const { trackPageView } = require("@/lib/analytics");
    trackPageView("/explore");

    expect(gtagMock).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({ page_path: "/explore" })
    );
  });

  it("trackPageView deduplicates identical consecutive paths", () => {
    const { trackPageView } = require("@/lib/analytics");
    trackPageView("/explore");
    trackPageView("/explore");

    const pageViewCalls = gtagMock.mock.calls.filter(
      (call) => call[1] === "page_view"
    );
    expect(pageViewCalls).toHaveLength(1);
  });

  it("trackPageView tracks distinct paths separately", () => {
    const { trackPageView } = require("@/lib/analytics");
    trackPageView("/explore");
    trackPageView("/passes");

    const pageViewCalls = gtagMock.mock.calls.filter(
      (call) => call[1] === "page_view"
    );
    expect(pageViewCalls).toHaveLength(2);
  });

  it("trackPageView does not fire when consent is denied", () => {
    (global as any).window.localStorage.getItem = jest.fn().mockReturnValue("denied");
    const { trackPageView } = require("@/lib/analytics");
    trackPageView("/passes");

    const pageViewCalls = gtagMock.mock.calls.filter(
      (call) => call[1] === "page_view"
    );
    expect(pageViewCalls).toHaveLength(0);
  });
});

describe("Analytics Module — Purchase Event Safety", () => {
  let gtagMock: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123456";

    (global as any).window = {
      gtag: jest.fn(),
      localStorage: {
        getItem: jest.fn().mockReturnValue("granted"),
        setItem: jest.fn(),
      },
    };
    gtagMock = (global as any).window.gtag;
  });

  afterEach(() => {
    delete (global as any).window;
  });

  it("trackPurchase fires purchase event with transaction_id, currency, value", () => {
    const { trackPurchase } = require("@/lib/analytics");

    trackPurchase({
      transaction_id: "PAY-DEMO-UNIQUE01",
      currency: "INR",
      value: 1499,
      pass_id: "pass-coastal-discovery",
      pass_name: "Coastal Discovery Pass",
      quantity: 1,
      payment_method: "upi_one_world",
      visitor_type: "international",
      destination: "Chennai-Mahabalipuram",
      items: [
        {
          item_id: "pass-coastal-discovery",
          item_name: "Coastal Discovery Pass",
          price: 1499,
          quantity: 1,
          currency: "INR",
        },
      ],
    });

    expect(gtagMock).toHaveBeenCalledWith(
      "event",
      "purchase",
      expect.objectContaining({
        transaction_id: "PAY-DEMO-UNIQUE01",
        currency: "INR",
        value: 1499,
      })
    );
  });

  it("trackPurchase deduplicates events with the same transaction_id", () => {
    const { trackPurchase } = require("@/lib/analytics");
    const params = {
      transaction_id: "PAY-DEMO-DEDUP01",
      currency: "INR",
      value: 1999,
      pass_id: "pass-heritage-explorer",
      pass_name: "Heritage Explorer Pass",
      quantity: 1,
      payment_method: "upi_one_world" as const,
      visitor_type: "international" as const,
      destination: "Chennai-Mahabalipuram",
      items: [{ item_id: "pass-heritage-explorer", item_name: "Heritage Explorer Pass", price: 1999, quantity: 1, currency: "INR" }],
    };

    trackPurchase(params);
    trackPurchase(params); // Duplicate submission

    const purchaseCalls = gtagMock.mock.calls.filter((c) => c[1] === "purchase");
    expect(purchaseCalls).toHaveLength(1);
  });

  it("trackBookingFailed fires booking_failed — never purchase", () => {
    const { trackBookingFailed } = require("@/lib/analytics");

    trackBookingFailed({
      pass_id: "pass-coastal-discovery",
      pass_name: "Coastal Discovery Pass",
      currency: "INR",
      value: 1499,
      payment_method: "upi_one_world",
      failure_reason: "insufficient_balance",
      booking_status: "failed",
      visitor_type: "international",
      destination: "Chennai-Mahabalipuram",
    });

    const purchaseCalls = gtagMock.mock.calls.filter((c) => c[1] === "purchase");
    const failedCalls = gtagMock.mock.calls.filter((c) => c[1] === "booking_failed");

    expect(purchaseCalls).toHaveLength(0);
    expect(failedCalls).toHaveLength(1);
    expect(failedCalls[0][2]).toMatchObject({
      booking_status: "failed",
      failure_reason: "insufficient_balance",
    });
  });

  it("trackPurchase payload must not contain PII fields", () => {
    const { trackPurchase } = require("@/lib/analytics");

    trackPurchase({
      transaction_id: "PAY-DEMO-PII01",
      currency: "INR",
      value: 1499,
      pass_id: "pass-coastal-discovery",
      pass_name: "Coastal Discovery Pass",
      quantity: 1,
      visitor_type: "international",
      destination: "Chennai-Mahabalipuram",
      items: [{ item_id: "pass-coastal-discovery", item_name: "Coastal Discovery Pass", price: 1499, quantity: 1, currency: "INR" }],
    });

    const purchaseCall = gtagMock.mock.calls.find((c) => c[1] === "purchase");
    expect(purchaseCall).toBeDefined();
    const payload = purchaseCall![2];

    // PII fields that must never appear
    expect(payload).not.toHaveProperty("email");
    expect(payload).not.toHaveProperty("traveler_name");
    expect(payload).not.toHaveProperty("traveler_email");
    expect(payload).not.toHaveProperty("mobile");
    expect(payload).not.toHaveProperty("passport");
    expect(payload).not.toHaveProperty("card_number");
    expect(payload).not.toHaveProperty("upi_pin");
    expect(payload).not.toHaveProperty("booking_reference");
    expect(payload).not.toHaveProperty("pass_reference");
    expect(payload).not.toHaveProperty("qr_token");
  });
});

describe("Analytics Module — Redemption Event Safety", () => {
  let gtagMock: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123456";

    (global as any).window = {
      gtag: jest.fn(),
      localStorage: {
        getItem: jest.fn().mockReturnValue("granted"),
        setItem: jest.fn(),
      },
    };
    gtagMock = (global as any).window.gtag;
  });

  afterEach(() => {
    delete (global as any).window;
  });

  it("trackPassRedeemed fires pass_redeemed with redemption_status=success", () => {
    const { trackPassRedeemed } = require("@/lib/analytics");

    trackPassRedeemed({
      pass_name: "Coastal Discovery Pass",
      redemption_status: "success",
      destination: "Chennai-Mahabalipuram",
    });

    const call = gtagMock.mock.calls.find((c) => c[1] === "pass_redeemed");
    expect(call).toBeDefined();
    expect(call![2]).toMatchObject({ redemption_status: "success" });
  });

  it("trackPassRedemptionFailed fires pass_redemption_failed for invalid pass", () => {
    const { trackPassRedemptionFailed } = require("@/lib/analytics");

    trackPassRedemptionFailed({
      pass_name: undefined,
      redemption_status: "invalid",
      failure_reason: "pass_not_found",
      destination: "Chennai-Mahabalipuram",
    });

    const call = gtagMock.mock.calls.find((c) => c[1] === "pass_redemption_failed");
    expect(call).toBeDefined();
    expect(call![2]).toMatchObject({
      redemption_status: "invalid",
      failure_reason: "pass_not_found",
    });
  });

  it("trackPassRedemptionFailed fires pass_redemption_failed for already-redeemed pass", () => {
    const { trackPassRedemptionFailed } = require("@/lib/analytics");

    trackPassRedemptionFailed({
      redemption_status: "already_redeemed",
      failure_reason: "pass_already_redeemed",
      destination: "Chennai-Mahabalipuram",
    });

    const call = gtagMock.mock.calls.find((c) => c[1] === "pass_redemption_failed");
    expect(call![2]).toMatchObject({
      redemption_status: "already_redeemed",
      failure_reason: "pass_already_redeemed",
    });
  });

  it("failed redemption never fires pass_redeemed", () => {
    const { trackPassRedemptionFailed } = require("@/lib/analytics");

    trackPassRedemptionFailed({
      redemption_status: "expired",
      failure_reason: "pass_expired",
    });

    const redeemCalls = gtagMock.mock.calls.filter((c) => c[1] === "pass_redeemed");
    expect(redeemCalls).toHaveLength(0);
  });
});

describe("Analytics Module — Consent Management", () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string): string | null => store[key] ?? null),
      setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
      clear: () => { store = {}; },
    };
  })();

  beforeEach(() => {
    jest.resetModules();
    localStorageMock.clear();
    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123456";

    (global as any).window = {
      gtag: jest.fn(),
      localStorage: localStorageMock,
    };
  });

  afterEach(() => {
    delete (global as any).window;
  });

  it("getConsentState returns 'pending' when no preference is stored", () => {
    localStorageMock.getItem.mockReturnValue(null);
    const { getConsentState } = require("@/lib/analytics");
    expect(getConsentState()).toBe("pending");
  });

  it("getConsentState returns 'granted' when stored as granted", () => {
    localStorageMock.getItem.mockReturnValue("granted");
    const { getConsentState } = require("@/lib/analytics");
    expect(getConsentState()).toBe("granted");
  });

  it("getConsentState returns 'denied' when stored as denied", () => {
    localStorageMock.getItem.mockReturnValue("denied");
    const { getConsentState } = require("@/lib/analytics");
    expect(getConsentState()).toBe("denied");
  });

  it("setConsentState stores preference and updates gtag consent", () => {
    localStorageMock.getItem.mockReturnValue("granted");
    const { setConsentState } = require("@/lib/analytics");
    setConsentState("granted");

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "tn_analytics_consent",
      "granted"
    );
    expect((global as any).window.gtag).toHaveBeenCalledWith(
      "consent",
      "update",
      expect.objectContaining({ analytics_storage: "granted" })
    );
  });

  it("setConsentState denied stops analytics from being sent", () => {
    // Initially consent granted, then withdrawn
    localStorageMock.getItem
      .mockReturnValueOnce("granted") // first call: hasAnalyticsConsent during initial event fire
      .mockReturnValue("denied"); // subsequent calls after withdrawal

    const { setConsentState, trackEvent } = require("@/lib/analytics");
    trackEvent("test_pre_withdrawal");

    setConsentState("denied");

    // After denial, trackEvent should not fire
    trackEvent("test_post_withdrawal");
    const eventCalls = (global as any).window.gtag.mock.calls.filter(
      (c: any[]) => c[1] === "test_post_withdrawal"
    );
    expect(eventCalls).toHaveLength(0);
  });
});

describe("Analytics Module — App resilience", () => {
  it("trackEvent does not throw when window is undefined (SSR)", () => {
    jest.resetModules();
    // window is not defined in Node test environment by default
    const { trackEvent } = require("@/lib/analytics");
    expect(() => trackEvent("ssr_event", { value: 1 })).not.toThrow();
  });

  it("trackPurchase does not throw when gtag is missing", () => {
    jest.resetModules();
    (global as any).window = { localStorage: { getItem: jest.fn().mockReturnValue("granted") } };
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123456";
    const { trackPurchase } = require("@/lib/analytics");
    expect(() =>
      trackPurchase({
        transaction_id: "PAY-SAFE",
        currency: "INR",
        value: 1499,
        pass_id: "pass-coastal-discovery",
        pass_name: "Coastal Discovery Pass",
        quantity: 1,
        visitor_type: "international",
        destination: "Chennai-Mahabalipuram",
        items: [],
      })
    ).not.toThrow();
    delete (global as any).window;
  });
});
