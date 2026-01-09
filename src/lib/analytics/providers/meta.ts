/**
 * Meta (Facebook) Pixel adapter.
 * Sends events via fbq.
 */

import type { EventPayload } from "../track";

export function metaTrack(eventName: string, payload?: EventPayload): void {
  if (typeof window === "undefined" || !window.fbq) {
    return;
  }

  // Use trackCustom for custom events
  window.fbq("trackCustom", eventName, payload);
}
