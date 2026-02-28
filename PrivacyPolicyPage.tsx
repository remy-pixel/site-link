import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[100rem] mx-auto px-6 py-20">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-heading font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">Last updated: February 28, 2026</p>
          </div>

          <div className="space-y-6 text-paragraph">
            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We may collect information about you in a variety of ways. The information we may collect on the site includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact information you voluntarily provide</li>
                <li><strong>Device Information:</strong> Browser type, IP address, and operating system</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and links clicked</li>
                <li><strong>Cookies:</strong> Information stored on your device to enhance your experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">3. Use of Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send periodic emails regarding your order or other products and services</li>
                <li>Improve our website and services</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues and fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">4. Disclosure of Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may disclose your information when required by law or when we believe in good faith that such disclosure is necessary to protect our rights or the rights of others.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">5. Security of Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">6. Legal Basis for Processing</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We process personal data based on one or more of the following legal grounds:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Your consent</li>
                <li>Performance of a contract</li>
                <li>Legal obligations</li>
                <li>Legitimate business interests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">7. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain personal data only as long as necessary to fulfill the purposes outlined in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">8. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Under the General Data Protection Regulation (GDPR), you have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request erasure ("right to be forgotten")</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with the Belgian Data Protection Authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-3 text-muted-foreground">
                <p>Email: info@stratocs.com</p>
                <p>Phone: +32 472 43 07 34</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">10. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by updating the "Last updated" date of this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
