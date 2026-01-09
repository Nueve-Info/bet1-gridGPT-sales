/**
 * Global type declarations for analytics providers.
 * Single source of truth for Window extensions.
 */

interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

interface FacebookPixelEvent {
  (action: "track", eventName: string, parameters?: Record<string, unknown>): void;
  (action: "trackCustom", eventName: string, parameters?: Record<string, unknown>): void;
  (action: "init", pixelId: string): void;
}

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    fbq?: FacebookPixelEvent;
  }
}

export {};
