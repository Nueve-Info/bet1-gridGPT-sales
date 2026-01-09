import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { finalCta } from "@/content/landing";
import { submitWaitlist } from "@/lib/waitlist";
import { track } from "@/lib/analytics";
import { useReveal, useRevealClass } from "@/hooks/useReveal";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function FinalCta() {
  const { ref, isVisible } = useReveal();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const messageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (status === "loading") return;

      setStatus("loading");
      track("form:waitlist_submit", { email });

      const result = await submitWaitlist({ email, hp: honeypot });

      if (result.success) {
        setStatus("success");
        track("form:waitlist_success");
        // Focus on success message for a11y
        setTimeout(() => messageRef.current?.focus(), 100);
      } else {
        setStatus("error");
        setErrorMessage(result.message);
        track("form:waitlist_error", { message: result.message });
        // Focus on error message for a11y
        setTimeout(() => messageRef.current?.focus(), 100);
      }
    },
    [email, honeypot, status]
  );

  const handleRetry = () => {
    setStatus("idle");
    setErrorMessage("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <section
      id="waitlist"
      ref={ref}
      className={`py-16 md:py-24 ${useRevealClass(isVisible)}`}
      aria-labelledby="final-cta-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {/* Headline */}
          <h2
            id="final-cta-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            {finalCta.headline}
          </h2>

          {/* Description */}
          <p className="text-muted-foreground md:text-lg">
            {finalCta.description}
          </p>

          {/* Form */}
          {status === "success" ? (
            <div
              ref={messageRef}
              tabIndex={-1}
              className="flex flex-col items-center gap-4 p-6 rounded-lg bg-muted/50"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 className="w-12 h-12 text-primary" />
              <p className="font-medium">{finalCta.successMessage}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:flex-row sm:gap-2 max-w-md mx-auto"
              noValidate
            >
              {/* Honeypot field - hidden from real users */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="flex-1 relative">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <Input
                  ref={inputRef}
                  id="email"
                  type="email"
                  placeholder={finalCta.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  aria-describedby={status === "error" ? "email-error" : undefined}
                  aria-invalid={status === "error"}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={status === "loading"}
                data-analytics="form:waitlist_submit"
                className="min-w-[100px]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="sr-only">Submitting...</span>
                  </>
                ) : (
                  finalCta.buttonText
                )}
              </Button>
            </form>
          )}

          {/* Error Message */}
          {status === "error" && (
            <div
              ref={messageRef}
              tabIndex={-1}
              id="email-error"
              className="flex flex-col items-center gap-3 text-sm"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRetry}>
                Try again
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
