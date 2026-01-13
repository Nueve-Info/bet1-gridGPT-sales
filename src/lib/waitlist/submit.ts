/**
 * Waitlist submission handler.
 * Sends data to Zapier webhook configured via VITE_ZAPIER_WEBHOOK_URL.
 */

export interface WaitlistData {
  email: string;
  /** Honeypot field - should be empty for real submissions */
  hp?: string;
}

export interface WaitlistResult {
  success: boolean;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates email format.
 */
function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Submits email to waitlist via Zapier webhook.
 */
export async function submitWaitlist(data: WaitlistData): Promise<WaitlistResult> {
  const { email, hp } = data;

  // Anti-spam: honeypot check
  if (hp && hp.trim() !== "") {
    // Silently "succeed" to not tip off bots
    return {
      success: true,
      message: "You're on the list! We'll be in touch soon.",
    };
  }

  // Validate email
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return {
      success: false,
      message: "Please enter your email address.",
    };
  }

  if (!isValidEmail(trimmedEmail)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  // Check for webhook URL
  const webhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[waitlist] VITE_ZAPIER_WEBHOOK_URL is not configured");
    return {
      success: false,
      message: "Waitlist is not configured. Please try again later.",
    };
  }

  try {
    // Use no-cors mode for Zapier webhooks to bypass CORS restrictions.
    // Webhooks don't need to read the response, so this is safe.
    // Note: In no-cors mode, we can't use custom headers or read the response.
    // Zapier webhooks accept JSON data without explicit Content-Type header.
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        email: trimmedEmail,
        timestamp: new Date().toISOString(),
        source: "landing_page",
      }),
    });

    // With no-cors, we assume success if no error was thrown.
    // The webhook will receive the data even if we can't verify the response.
    return {
      success: true,
      message: "You're on the list! We'll be in touch soon.",
    };
  } catch (error) {
    console.error("[waitlist] Submission failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
