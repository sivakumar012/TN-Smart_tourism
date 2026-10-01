import { VisitorType, WalletStatus, TransactionStatus } from "@/types";

export interface OnboardingInput {
  visitor_type: VisitorType;
  provider?: string;
}

export interface OnboardingResult {
  payment_session_id: string;
  status: string;
}

export interface VisitorVerificationInput {
  payment_session_id: string;
  country: string;
  mobile: string;
  email: string;
}

export interface IdentityVerificationInput {
  payment_session_id: string;
  simulated_selfie?: boolean;
}

export interface VerificationResult {
  success: boolean;
  status: "VERIFIED" | "FAILED";
  message: string;
}

export interface WalletCreationInput {
  payment_session_id: string;
}

export interface WalletResult {
  wallet_session_id: string;
  demo_upi_id: string;
  demo_balance: number;
  status: WalletStatus;
}

export interface WalletLoadInput {
  wallet_session_id: string;
  amount: number;
  currency?: string;
}

export interface WalletLoadResult {
  success: boolean;
  wallet_session_id: string;
  new_balance: number;
  transaction_reference: string;
}

export interface BalanceResult {
  demo_balance: number;
  status: WalletStatus;
}

export interface PaymentInput {
  payment_session_id: string;
  wallet_session_id: string;
  amount: number;
  pass_id: string;
  pass_name: string;
}

export interface PaymentResult {
  status: TransactionStatus;
  provider_reference: string;
  amount_deducted: number;
  remaining_balance: number;
  failure_reason?: string;
}

export interface PaymentStatusResult {
  status: TransactionStatus;
  provider_reference: string;
}

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
