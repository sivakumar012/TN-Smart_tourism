export type VisitorType = "DOMESTIC" | "INTERNATIONAL";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export type PassStatus = "VALID" | "REDEEMED" | "EXPIRED" | "INVALID";

export type WalletStatus = "READY_TO_FUND" | "FUNDED" | "FAILED";

export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";

export type VerificationState = "NOT_STARTED" | "VERIFYING" | "VERIFIED" | "FAILED";

export interface Attraction {
  id: string;
  name: string;
  description: string;
  location: string;
  category: "Heritage" | "Culture" | "Experience" | "Coastal";
  image: string;
  demo_price: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PassPackage {
  id: string;
  name: string;
  description: string;
  validity_days: number;
  demo_price: number;
  benefits: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PassInclusion {
  id: string;
  pass_id: string;
  attraction_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Booking {
  id: string;
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
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DigitalPass {
  id: string;
  booking_id: string;
  pass_reference: string;
  qr_token: string;
  valid_from: string;
  valid_until: string;
  status: PassStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PaymentSession {
  id: string;
  booking_id: string | null;
  visitor_type: VisitorType;
  provider: string;
  status: "INITIATED" | "ONBOARDING" | "WALLET_FUNDED" | "AUTHORIZED" | "COMPLETED" | "FAILED";
  created_at: string;
  updated_at: string;
}

export interface WalletSession {
  id: string;
  payment_session_id: string;
  provider: string;
  demo_upi_id: string;
  demo_balance: number;
  status: WalletStatus;
  created_at: string;
  updated_at: string;
}

export interface PaymentTransaction {
  id: string;
  payment_session_id: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  provider_reference: string;
  created_at: string;
  updated_at: string;
}

export interface Redemption {
  id: string;
  pass_id: string;
  attraction_id: string | null;
  redeemed_at: string;
  status: "REDEEMED" | "FAILED";
  created_at: string;
  updated_at: string;
}
