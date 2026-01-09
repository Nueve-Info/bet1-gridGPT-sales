/**
 * Google Tag Manager adapter.
 * Pushes events to dataLayer.
 */

import type { EventPayload } from "../track";

export function gtmTrack(eventName: string, payload?: EventPayload): void {
  if (typeof window === "undefined" || !window.dataLayer) {
    return;
  }

  window.dataLayer.push({
    event: eventName,
    ...payload,
  });
}
