"use client";

/**
 * DigitalPassPageClient — client wrapper for the digital pass page.
 * Tracks view_digital_pass on mount without affecting the Server Component rendering.
 */

import { useEffect } from "react";
import { trackViewDigitalPass } from "@/lib/analytics";

interface Props {
  passId?: string;
  passName?: string;
}

export function DigitalPassAnalytics({ passId, passName }: Props) {
  useEffect(() => {
    trackViewDigitalPass({
      pass_id: passId,
      pass_name: passName,
      destination: "Chennai-Mahabalipuram",
    });
  }, [passId, passName]);

  return null;
}
