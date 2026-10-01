import { db } from "@/lib/db";
import { Booking, DigitalPass, VisitorType } from "@/types";
import {
  generateBookingReference,
  generatePassReference,
  generateQrToken,
} from "@/lib/qr";

export interface CreateBookingInput {
  traveler_name: string;
  traveler_email: string;
  visitor_type: VisitorType;
  pass_id: string;
  quantity: number;
  payment_reference: string;
  payment_status: "PAID" | "FAILED";
}

export function processBookingAndPass(
  input: CreateBookingInput
): { booking: Booking | null; digitalPass: DigitalPass | null; error?: string } {
  // Business rule 11: Failed payment must NOT create a confirmed booking.
  if (input.payment_status !== "PAID") {
    return {
      booking: null,
      digitalPass: null,
      error: "Payment status is not PAID. Booking creation rejected.",
    };
  }

  const passPackage = db.getPassPackageById(input.pass_id);
  if (!passPackage) {
    return {
      booking: null,
      digitalPass: null,
      error: "Selected pass package was not found or is no longer active.",
    };
  }

  const totalAmount = passPackage.demo_price * input.quantity;
  const bookingRef = generateBookingReference();

  // Property 3: Successful payment creates exactly one booking.
  const booking = db.createBooking({
    booking_reference: bookingRef,
    traveler_name: input.traveler_name,
    traveler_email: input.traveler_email,
    visitor_type: input.visitor_type,
    pass_id: input.pass_id,
    quantity: input.quantity,
    total_amount: totalAmount,
    payment_reference: input.payment_reference,
    payment_status: "PAID",
    booking_status: "CONFIRMED",
  });

  const validFrom = new Date();
  const validUntil = new Date();
  validUntil.setDate(validFrom.getDate() + passPackage.validity_days);

  const passRef = generatePassReference();
  const qrToken = generateQrToken();

  // Property 5: Successful booking creates exactly one digital pass.
  const digitalPass = db.createDigitalPass({
    booking_id: booking.id,
    pass_reference: passRef,
    qr_token: qrToken,
    valid_from: validFrom.toISOString(),
    valid_until: validUntil.toISOString(),
    status: "VALID",
  });

  return {
    booking,
    digitalPass,
  };
}
