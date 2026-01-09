/**
 * Analytics tracking layer.
 * Currently a no-op; ready to wire up GTM, Meta Pixel, etc.
 */

export type EventPayload = Record<string, unknown>;

/**
 * Gate function – returns true if tracking is allowed.
 * Extend this to check for consent, environment, etc.
 */
function shouldTrack(): boolean {
  // Always return false for now (no-op)
  // In production, check for user consent, environment, etc.
  return false;
}

/**
 * Main tracking function.
 * @param eventName - Event name in format "category:action"
 * @param payload - Optional event data
 */
export function track(eventName: string, payload?: EventPayload): void {
  if (!shouldTrack()) {
    // Development: log to console for debugging
    if (import.meta.env.DEV) {
      console.debug("[analytics]", eventName, payload);
    }
    return;
  }

  // When ready to enable:
  // gtmTrack(eventName, payload);
  // metaTrack(eventName, payload);
}

/**
 * Utility to extract analytics data from an element's data-analytics attribute.
 * Format: "category:action"
 */
export function getAnalyticsData(
  element: HTMLElement
): { category: string; action: string } | null {
  const attr = element.getAttribute("data-analytics");
  if (!attr) return null;

  const [category, action] = attr.split(":");
  if (!category || !action) return null;

  return { category, action };
}
