import {
  PaymentProvider,
  OnboardingInput,
  OnboardingResult,
  VisitorVerificationInput,
  IdentityVerificationInput,
  VerificationResult,
  WalletCreationInput,
  WalletResult,
  WalletLoadInput,
  WalletLoadResult,
  BalanceResult,
  PaymentInput,
  PaymentResult,
  PaymentStatusResult,
} from "./PaymentProvider";
import { db } from "@/lib/db";

/**
 * DemoPaymentProvider
 * 
 * Simulated payment provider implementing the UPI One World foreign tourist payment abstraction.
 * TN smart tourism MUST NOT issue a PPI, operate its own wallet, or hold customer funds.
 * 
 * Document: Future production integration requires validation with an authorised UPI One World/PPI provider.
 */
export class DemoPaymentProvider implements PaymentProvider {
  private generateId(prefix: string): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let random = "";
    for (let i = 0; i < 8; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${random}`;
  }

  public async initializeOnboarding(session: OnboardingInput): Promise<OnboardingResult> {
    const paymentSession = db.createPaymentSession({
      booking_id: null,
      visitor_type: session.visitor_type,
      provider: session.provider || "UPI One World (Demo)",
    });

    db.updatePaymentSessionStatus(paymentSession.id, "ONBOARDING");

    return {
      payment_session_id: paymentSession.id,
      status: "ONBOARDING",
    };
  }

  public async verifyVisitor(data: VisitorVerificationInput): Promise<VerificationResult> {
    const session = db.getPaymentSession(data.payment_session_id);
    if (!session) {
      return {
        success: false,
        status: "FAILED",
        message: "Invalid payment session",
      };
    }

    return {
      success: true,
      status: "VERIFIED",
      message: "Visitor contact verification completed (Demo simulation)",
    };
  }

  public async verifyIdentity(data: IdentityVerificationInput): Promise<VerificationResult> {
    const session = db.getPaymentSession(data.payment_session_id);
    if (!session) {
      return {
        success: false,
        status: "FAILED",
        message: "Invalid payment session",
      };
    }

    if (data.simulated_selfie === false) {
      return {
        success: false,
        status: "FAILED",
        message: "Identity verification failed in simulation",
      };
    }

    return {
      success: true,
      status: "VERIFIED",
      message: "Identity verification verified (Demo simulation - no biometrics stored)",
    };
  }

  public async createWallet(session: WalletCreationInput): Promise<WalletResult> {
    const paymentSession = db.getPaymentSession(session.payment_session_id);
    if (!paymentSession) {
      throw new Error("Payment session not found");
    }

    const existingWallet = db.getWalletSessionByPaymentSessionId(session.payment_session_id);
    if (existingWallet) {
      return {
        wallet_session_id: existingWallet.id,
        demo_upi_id: existingWallet.demo_upi_id,
        demo_balance: existingWallet.demo_balance,
        status: existingWallet.status,
      };
    }

    const upiSuffix = Math.random().toString(36).substring(2, 10).toUpperCase();
    const demoUpiId = `demo-${upiSuffix}@upi`;

    const wallet = db.createWalletSession({
      payment_session_id: session.payment_session_id,
      provider: "UPI One World (Demo PPI)",
      demo_upi_id: demoUpiId,
      demo_balance: 0,
      status: "READY_TO_FUND",
    });

    return {
      wallet_session_id: wallet.id,
      demo_upi_id: wallet.demo_upi_id,
      demo_balance: wallet.demo_balance,
      status: wallet.status,
    };
  }

  public async loadWallet(session: WalletLoadInput): Promise<WalletLoadResult> {
    const wallet = db.getWalletSession(session.wallet_session_id);
    if (!wallet) {
      return {
        success: false,
        wallet_session_id: session.wallet_session_id,
        new_balance: 0,
        transaction_reference: "",
      };
    }

    const newBalance = wallet.demo_balance + session.amount;
    const updated = db.updateWalletBalance(wallet.id, newBalance, "FUNDED");
    db.updatePaymentSessionStatus(wallet.payment_session_id, "WALLET_FUNDED");

    const txRef = this.generateId("TX-FUND");

    db.createPaymentTransaction({
      payment_session_id: wallet.payment_session_id,
      amount: session.amount,
      currency: session.currency || "INR",
      status: "SUCCESS",
      provider_reference: txRef,
    });

    return {
      success: true,
      wallet_session_id: wallet.id,
      new_balance: updated?.demo_balance || newBalance,
      transaction_reference: txRef,
    };
  }

  public async getWalletBalance(walletId: string): Promise<BalanceResult> {
    const wallet = db.getWalletSession(walletId);
    if (!wallet) {
      return { demo_balance: 0, status: "FAILED" };
    }
    return {
      demo_balance: wallet.demo_balance,
      status: wallet.status,
    };
  }

  public async authorizePayment(payment: PaymentInput): Promise<PaymentResult> {
    const wallet = db.getWalletSession(payment.wallet_session_id);
    if (!wallet) {
      return {
        status: "FAILED",
        provider_reference: "",
        amount_deducted: 0,
        remaining_balance: 0,
        failure_reason: "Wallet session not found",
      };
    }

    // Business rule: If wallet balance < amount, payment fails with insufficient balance
    if (wallet.demo_balance < payment.amount) {
      const failedTxRef = this.generateId("PAY-FAIL");
      db.createPaymentTransaction({
        payment_session_id: payment.payment_session_id,
        amount: payment.amount,
        currency: "INR",
        status: "FAILED",
        provider_reference: failedTxRef,
      });

      return {
        status: "FAILED",
        provider_reference: failedTxRef,
        amount_deducted: 0,
        remaining_balance: wallet.demo_balance,
        failure_reason: `Insufficient wallet balance. Available: ₹${wallet.demo_balance}, Required: ₹${payment.amount}`,
      };
    }

    // Business rule: If wallet balance >= amount, payment succeeds & reduces balance
    const newBalance = wallet.demo_balance - payment.amount;
    db.updateWalletBalance(wallet.id, newBalance, "FUNDED");

    const payTxRef = this.generateId("PAY-DEMO");
    db.createPaymentTransaction({
      payment_session_id: payment.payment_session_id,
      amount: payment.amount,
      currency: "INR",
      status: "SUCCESS",
      provider_reference: payTxRef,
    });

    db.updatePaymentSessionStatus(payment.payment_session_id, "COMPLETED");

    return {
      status: "SUCCESS",
      provider_reference: payTxRef,
      amount_deducted: payment.amount,
      remaining_balance: newBalance,
    };
  }

  public async getPaymentStatus(paymentId: string): Promise<PaymentStatusResult> {
    const txs = db.getPaymentTransactions();
    const tx = txs.find((t) => t.provider_reference === paymentId || t.id === paymentId);
    if (!tx) {
      return {
        status: "FAILED",
        provider_reference: paymentId,
      };
    }
    return {
      status: tx.status,
      provider_reference: tx.provider_reference,
    };
  }
}

export const demoPaymentProvider = new DemoPaymentProvider();
