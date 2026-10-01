/**
 * Safe Demo QR Token Generator
 * 
 * Payload format: TN-DEMO-PASS-XXXXXXXX (8 random uppercase alphanumeric chars)
 * CRITICAL RULE: QR payload MUST ONLY contain a safe demo identifier.
 * MUST NOT contain: passport, visa, card data, UPI PIN, email, or other PII.
 */
export function generateQrToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < 8; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TN-DEMO-PASS-${token}`;
}

export function generatePassReference(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "";
  for (let i = 0; i < 8; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PASS-${ref}`;
}

export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "";
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `BK-${year}-${ref}`;
}
