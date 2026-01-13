import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { finalCta } from "@/content/landing";
import projectFeedback from "../../assets/project feedback.png";
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
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Main CTA Container with gradient and shadow */}
        <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-blue-50 via-blue-50/50 to-green-50 shadow-xl p-8 md:p-10 lg:p-16">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative flex items-center justify-center order-2 md:order-1">
              <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                <img 
                  src={projectFeedback} 
                  alt="AI agent analyzing table data" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Side - Text and Form */}
            <div className="space-y-6 order-1 md:order-2">
              {/* Headline */}
              <h2
                id="final-cta-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight"
              >
                Turn your lead list into a sales asset - not a liability.
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              If your sales team spends too much time researching instead of selling, this is for you.
              </p>

              {/* Form */}
              {status === "success" ? (
                <div
                  ref={messageRef}
                  tabIndex={-1}
                  className="flex flex-col items-start gap-4 p-6 md:p-8 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 shadow-lg"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-900 leading-tight">
                        {finalCta.successMessage}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Check your email for confirmation details.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col lg:flex-row gap-3"
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

                  <div className="flex-1 min-w-0 lg:min-w-[200px]">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      ref={inputRef}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      aria-describedby={status === "error" ? "email-error" : undefined}
                      aria-invalid={status === "error"}
                      className="h-12 w-full rounded-lg border-gray-300 bg-white"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    data-analytics="form:waitlist_submit"
                    className="h-12 px-6 rounded-lg bg-black text-white hover:bg-gray-800 w-full lg:w-auto lg:min-w-[140px] lg:flex-shrink-0"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="sr-only">Submitting...</span>
                      </>
                    ) : (
                      "Join the early list"
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
                  className="flex flex-col items-start gap-3 text-sm"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="flex items-center gap-2 text-red-600">
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
        </div>
      </div>
    </section>
  );
}
