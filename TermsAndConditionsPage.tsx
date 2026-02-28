import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[100rem] mx-auto px-6 py-20">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-heading font-bold mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground text-lg">Last updated: February 28, 2026</p>
          </div>

          <div className="space-y-6 text-paragraph">
            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms and Conditions govern your use of our website and services. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">3. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">4. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">5. Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">6. Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">7. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may revise these terms and conditions for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">8. Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                StratoCS provides website design, development, optimization, and automation services. Specific project scope, pricing, and deliverables are defined in individual client agreements or proposals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">9. Payments & Fees</h2>
              <p className="text-muted-foreground leading-relaxed">
                Fees for services are defined in written proposals or agreements. Monthly retainers are billed in advance. Failure to pay may result in suspension of services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms are governed by the laws of Belgium. Any disputes shall be subject to the exclusive jurisdiction of the courts of Antwerp, Belgium.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
