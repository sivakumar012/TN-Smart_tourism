import {
  Attraction,
  PassPackage,
  PassInclusion,
  Booking,
  DigitalPass,
  PaymentSession,
  WalletSession,
  PaymentTransaction,
  Redemption,
  PassStatus,
  WalletStatus,
  VisitorType,
  PaymentStatus,
  BookingStatus,
  TransactionStatus,
} from "@/types";
import {
  SEED_ATTRACTIONS,
  SEED_PASS_PACKAGES,
  SEED_PASS_INCLUSIONS,
} from "@/data/seed";

class DatabaseStore {
  private attractions: Attraction[] = [];
  private passPackages: PassPackage[] = [];
  private passInclusions: PassInclusion[] = [];
  private bookings: Booking[] = [];
  private digitalPasses: DigitalPass[] = [];
  private paymentSessions: PaymentSession[] = [];
  private walletSessions: WalletSession[] = [];
  private paymentTransactions: PaymentTransaction[] = [];
  private redemptions: Redemption[] = [];

  constructor() {
    this.resetDatabase();
  }

  public resetDatabase(): void {
    this.attractions = JSON.parse(JSON.stringify(SEED_ATTRACTIONS));
    this.passPackages = JSON.parse(JSON.stringify(SEED_PASS_PACKAGES));
    this.passInclusions = JSON.parse(JSON.stringify(SEED_PASS_INCLUSIONS));
    this.bookings = [];
    this.digitalPasses = [];
    this.paymentSessions = [];
    this.walletSessions = [];
    this.paymentTransactions = [];
    this.redemptions = [];
  }

  // --- Attraction operations ---
  public getAttractions(category?: string, search?: string): Attraction[] {
    return this.attractions.filter((item) => {
      if (item.deleted_at !== null) return false;
      if (!item.active) return false;
      if (category && category !== "All" && item.category !== category) return false;
      if (search) {
        const query = search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesLoc && !matchesDesc) return false;
      }
      return true;
    });
  }

  public getAttractionById(id: string): Attraction | null {
    const found = this.attractions.find((a) => a.id === id);
    if (!found || found.deleted_at !== null) return null;
    return found;
  }

  public softDeleteAttraction(id: string): boolean {
    const attraction = this.attractions.find((a) => a.id === id);
    if (attraction) {
      attraction.deleted_at = new Date().toISOString();
      return true;
    }
    return false;
  }

  // --- PassPackage operations ---
  public getPassPackages(): PassPackage[] {
    return this.passPackages.filter((p) => p.deleted_at === null && p.active);
  }

  public getPassPackageById(id: string): PassPackage | null {
    const found = this.passPackages.find((p) => p.id === id);
    if (!found || found.deleted_at !== null) return null;
    return found;
  }

  public getPassInclusions(passId: string): Attraction[] {
    const incs = this.passInclusions.filter(
      (pi) => pi.pass_id === passId && pi.deleted_at === null
    );
    const attrIds = incs.map((i) => i.attraction_id);
    return this.attractions.filter((a) => attrIds.includes(a.id));
  }

  // --- Booking operations ---
  public createBooking(data: {
    booking_reference: string;
    traveler_name: string;
    traveler_email: string;
    visitor_type: VisitorType;
    pass_id: string;
    quantity: number;
    total_amount: number;
    payment_reference: string;
    payment_status: PaymentStatus;
    booking_status: BookingStatus;
  }): Booking {
    const now = new Date().toISOString();
    const booking: Booking = {
      id: `bk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...data,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    };
    this.bookings.push(booking);
    return booking;
  }

  public getBookingByRef(ref: string): Booking | null {
    return this.bookings.find((b) => b.booking_reference === ref) || null;
  }

  public getBookings(): Booking[] {
    return this.bookings.filter((b) => b.deleted_at === null);
  }

  // --- DigitalPass operations ---
  public createDigitalPass(data: {
    booking_id: string;
    pass_reference: string;
    qr_token: string;
    valid_from: string;
    valid_until: string;
    status: PassStatus;
  }): DigitalPass {
    const now = new Date().toISOString();
    const digitalPass: DigitalPass = {
      id: `dp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...data,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    };
    this.digitalPasses.push(digitalPass);
    return digitalPass;
  }

  public getDigitalPassByRef(passRef: string): DigitalPass | null {
    return (
      this.digitalPasses.find(
        (dp) =>
          dp.pass_reference.toLowerCase() === passRef.toLowerCase() ||
          dp.qr_token.toLowerCase() === passRef.toLowerCase()
      ) || null
    );
  }

  public getDigitalPassByBookingId(bookingId: string): DigitalPass | null {
    return this.digitalPasses.find((dp) => dp.booking_id === bookingId) || null;
  }

  public getDigitalPasses(): DigitalPass[] {
    return this.digitalPasses.filter((dp) => dp.deleted_at === null);
  }

  public updateDigitalPassStatus(id: string, status: PassStatus): DigitalPass | null {
    const pass = this.digitalPasses.find((dp) => dp.id === id);
    if (!pass) return null;
    pass.status = status;
    pass.updated_at = new Date().toISOString();
    return pass;
  }

  // --- PaymentSession operations ---
  public createPaymentSession(data: {
    booking_id: string | null;
    visitor_type: VisitorType;
    provider: string;
  }): PaymentSession {
    const now = new Date().toISOString();
    const session: PaymentSession = {
      id: `ps-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...data,
      status: "INITIATED",
      created_at: now,
      updated_at: now,
    };
    this.paymentSessions.push(session);
    return session;
  }

  public getPaymentSession(id: string): PaymentSession | null {
    return this.paymentSessions.find((ps) => ps.id === id) || null;
  }

  public updatePaymentSessionStatus(id: string, status: PaymentSession["status"]): void {
    const session = this.paymentSessions.find((ps) => ps.id === id);
    if (session) {
      session.status = status;
      session.updated_at = new Date().toISOString();
    }
  }

  // --- WalletSession operations ---
  public createWalletSession(data: {
    payment_session_id: string;
    provider: string;
    demo_upi_id: string;
    demo_balance: number;
    status: WalletStatus;
  }): WalletSession {
    const now = new Date().toISOString();
    const wallet: WalletSession = {
      id: `ws-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...data,
      created_at: now,
      updated_at: now,
    };
    this.walletSessions.push(wallet);
    return wallet;
  }

  public getWalletSession(id: string): WalletSession | null {
    return this.walletSessions.find((ws) => ws.id === id) || null;
  }

  public getWalletSessionByPaymentSessionId(paymentSessionId: string): WalletSession | null {
    return this.walletSessions.find((ws) => ws.payment_session_id === paymentSessionId) || null;
  }

  public updateWalletBalance(id: string, newBalance: number, status?: WalletStatus): WalletSession | null {
    const wallet = this.walletSessions.find((ws) => ws.id === id);
    if (!wallet) return null;
    wallet.demo_balance = newBalance;
    if (status) wallet.status = status;
    wallet.updated_at = new Date().toISOString();
    return wallet;
  }

  // --- PaymentTransaction operations ---
  public createPaymentTransaction(data: {
    payment_session_id: string;
    amount: number;
    currency: string;
    status: TransactionStatus;
    provider_reference: string;
  }): PaymentTransaction {
    const now = new Date().toISOString();
    const tx: PaymentTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...data,
      created_at: now,
      updated_at: now,
    };
    this.paymentTransactions.push(tx);
    return tx;
  }

  public getPaymentTransactions(): PaymentTransaction[] {
    return this.paymentTransactions;
  }

  // --- Redemption operations ---
  public createRedemption(data: {
    pass_id: string;
    attraction_id: string | null;
    status: "REDEEMED" | "FAILED";
  }): Redemption {
    const now = new Date().toISOString();
    const redemption: Redemption = {
      id: `rd-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...data,
      redeemed_at: now,
      created_at: now,
      updated_at: now,
    };
    this.redemptions.push(redemption);
    return redemption;
  }

  public getRedemptions(): Redemption[] {
    return this.redemptions;
  }
}

// Singleton global instance
export const db = new DatabaseStore();
