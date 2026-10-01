import { db } from "@/lib/db";
import { DigitalPass, Redemption, Attraction } from "@/types";

export type RedemptionResultCode = "VALID" | "ALREADY_REDEEMED" | "EXPIRED" | "INVALID";

export interface RedemptionValidationResult {
  resultCode: RedemptionResultCode;
  digitalPass: DigitalPass | null;
  passPackageName?: string;
  travelerName?: string;
  bookingRef?: string;
  inclusions?: Attraction[];
  message: string;
}

export function validatePassForRedemption(passReference: string): RedemptionValidationResult {
  const trimmed = passReference.trim();
  if (!trimmed) {
    return {
      resultCode: "INVALID",
      digitalPass: null,
      message: "Please enter a valid pass reference or scan a QR code.",
    };
  }

  const pass = db.getDigitalPassByRef(trimmed);
  if (!pass) {
    return {
      resultCode: "INVALID",
      digitalPass: null,
      message: "Pass reference not found. Check the code and try again.",
    };
  }

  const booking = db.getBookingByRef(
    db.getBookings().find((b) => b.id === pass.booking_id)?.booking_reference || ""
  ) || db.getBookings().find((b) => b.id === pass.booking_id);

  const passPackage = booking ? db.getPassPackageById(booking.pass_id) : null;
  const inclusions = booking ? db.getPassInclusions(booking.pass_id) : [];

  // Property 10: Redeemed passes cannot be redeemed again.
  if (pass.status === "REDEEMED") {
    return {
      resultCode: "ALREADY_REDEEMED",
      digitalPass: pass,
      passPackageName: passPackage?.name,
      travelerName: booking?.traveler_name,
      bookingRef: booking?.booking_reference,
      inclusions,
      message: "This pass has already been redeemed. Duplicate redemption blocked.",
    };
  }

  // Property 11: Expired passes cannot be redeemed.
  const now = new Date();
  const validUntil = new Date(pass.valid_until);
  if (validUntil < now || pass.status === "EXPIRED") {
    // Automatically flag as EXPIRED if past validity
    if (pass.status !== "EXPIRED") {
      db.updateDigitalPassStatus(pass.id, "EXPIRED");
    }
    return {
      resultCode: "EXPIRED",
      digitalPass: pass,
      passPackageName: passPackage?.name,
      travelerName: booking?.traveler_name,
      bookingRef: booking?.booking_reference,
      inclusions,
      message: "This pass has expired and can no longer be redeemed.",
    };
  }

  // Property 9: Valid passes can be redeemed.
  return {
    resultCode: "VALID",
    digitalPass: pass,
    passPackageName: passPackage?.name,
    travelerName: booking?.traveler_name,
    bookingRef: booking?.booking_reference,
    inclusions,
    message: "Pass is valid and eligible for redemption.",
  };
}

export function redeemPass(
  passReference: string,
  attractionId?: string
): { success: boolean; resultCode: RedemptionResultCode; redemption: Redemption | null; message: string } {
  const validation = validatePassForRedemption(passReference);

  if (validation.resultCode !== "VALID" || !validation.digitalPass) {
    return {
      success: false,
      resultCode: validation.resultCode,
      redemption: null,
      message: validation.message,
    };
  }

  // Transition status VALID -> REDEEMED
  const updatedPass = db.updateDigitalPassStatus(validation.digitalPass.id, "REDEEMED");
  if (!updatedPass) {
    return {
      success: false,
      resultCode: "INVALID",
      redemption: null,
      message: "Failed to update pass status.",
    };
  }

  const redemption = db.createRedemption({
    pass_id: updatedPass.id,
    attraction_id: attractionId || null,
    status: "REDEEMED",
  });

  return {
    success: true,
    resultCode: "VALID",
    redemption,
    message: "Pass redeemed successfully!",
  };
}
