import { useEffect } from "react";
import { Header, Footer } from "@/sections";

export function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-8 md:px-16 lg:px-24 py-12 md:py-16">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy for gridGPT</h1>
          
          <p className="text-muted-foreground mb-8">
            <strong>Effective Date:</strong> January 13, 2026
          </p>

          <p className="mb-6">
            Welcome to gridGPT! Your privacy matters to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services available at{" "}
            <a href="https://gridgpt.tech" className="text-primary hover:underline">
              https://gridgpt.tech
            </a>{" "}
            ("Service," "we," "us," or "our").
          </p>

          <p className="mb-8">
            By accessing or using the Service, you agree to this Privacy Policy and consent to the data practices described below.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you voluntarily provide to us, as well as information that is automatically collected when you use the Service.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">A. Personal Information You Provide</h3>
            <p className="mb-4">
              We may collect personal information when you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Create an account</li>
              <li>Use features of the Service</li>
              <li>Contact support or communicate with us</li>
            </ul>
            <p className="mb-4">This may include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Username</li>
              <li>Payment and billing information</li>
              <li>Any other information you choose to provide</li>
            </ul>
            <p className="mb-4">
              We use this information to operate the Service, manage accounts, process payments, communicate with users, and provide customer support.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">B. Automatically Collected Information</h3>
            <p className="mb-4">
              When you access or use gridGPT, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IP address</li>
              <li>Device identifiers, browser type, and operating system</li>
              <li>Usage data such as pages visited, actions taken, and feature interactions</li>
              <li>Log files and diagnostic data</li>
            </ul>
            <p className="mb-4">
              This information is used for analytics, performance optimization, product improvement, and security purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Remember user preferences</li>
              <li>Understand how users interact with the Service</li>
              <li>Improve functionality and performance</li>
            </ul>
            <p className="mb-4">
              You can control cookies through your browser settings. Please note that disabling cookies may limit certain features of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide, maintain, and improve gridGPT</li>
              <li>Create and manage user accounts</li>
              <li>Process subscriptions and payments</li>
              <li>Communicate with users about updates, features, and support</li>
              <li>Monitor and prevent fraud, abuse, or security incidents</li>
              <li>Comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Sharing of Information</h2>
            <p className="mb-4 font-semibold">We do not sell your personal data.</p>
            <p className="mb-4">
              We may share information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Service Providers:</strong> trusted third parties who assist us with hosting, payments, analytics, or infrastructure
              </li>
              <li>
                <strong>Legal Requirements:</strong> when required by law, regulation, or legal process
              </li>
              <li>
                <strong>Business Transfers:</strong> in connection with a merger, acquisition, or sale of assets
              </li>
            </ul>
            <p className="mb-4">
              All third parties are required to safeguard your data and use it only for authorized purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
            <p className="mb-4">
              We retain personal information only for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide the Service</li>
              <li>Fulfill legal and contractual obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
            </ul>
            <p className="mb-4">
              When data is no longer needed, it is securely deleted or anonymized.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Correct or update inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict certain data processing</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us using the details below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
            <p className="mb-4">
              We implement reasonable administrative, technical, and organizational safeguards to protect your personal information. However, no system is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries outside of your country of residence. By using the Service, you consent to such transfers in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p className="mb-4">
              gridGPT is not intended for individuals under the age of 13 (or the minimum legal age in your jurisdiction). We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted on gridgpt.tech with an updated Effective Date. Continued use of the Service after changes means you accept the revised Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-none space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:info@nueve.design" className="text-primary hover:underline">
                  info@nueve.design
                </a>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a href="https://gridgpt.tech" className="text-primary hover:underline">
                  https://gridgpt.tech
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
