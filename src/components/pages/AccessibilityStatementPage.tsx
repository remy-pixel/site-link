import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function AccessibilityStatementPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[100rem] mx-auto px-6 py-20">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-heading font-bold mb-4">Accessibility Statement</h1>
            <p className="text-muted-foreground text-lg">Last updated: February 28, 2026</p>
          </div>

          <div className="space-y-6 text-paragraph">
            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">Our Commitment to Accessibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to ensuring that our website is accessible to all people, regardless of their abilities or disabilities. We strive to provide an inclusive experience for everyone who visits our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">Accessibility Standards</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website is designed to comply with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. We aim to comply with EU accessibility standards where applicable. We continuously work to improve the accessibility of our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">Accessibility Features</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Our website includes the following accessibility features:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Keyboard navigation support for all interactive elements</li>
                <li>Alt text for all images to assist screen reader users</li>
                <li>Proper heading structure for better content organization</li>
                <li>High contrast color schemes for improved readability</li>
                <li>Resizable text and responsive design for various devices</li>
                <li>Video captions and transcripts where applicable</li>
                <li>Skip navigation links for easier page navigation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">Assistive Technology Support</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website is compatible with common assistive technologies including screen readers, voice recognition software, and magnification tools. We test our website regularly with these technologies to ensure compatibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">Known Accessibility Issues</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to make our website fully accessible, there may be some areas that do not yet meet our accessibility standards. We are actively working to identify and resolve any accessibility barriers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">Feedback and Support</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you encounter any accessibility issues while using our website, or if you have suggestions for improvement, please contact us. We welcome your feedback and are committed to making our website more accessible.
              </p>
              <div className="mt-3 text-muted-foreground">
                <p>Email: info@stratocs.com</p>
                <p>Phone: +32 472 43 07 34</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">Third-Party Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to ensure all content on our website is accessible, some third-party content may not meet our accessibility standards. If you encounter inaccessible third-party content, please let us know so we can work with the provider to improve accessibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">Continuous Improvement</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to continuously improving the accessibility of our website. We regularly review and update our accessibility practices to ensure we meet or exceed current standards and best practices in web accessibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold mb-3">Additional Resources</h2>
              <p className="text-muted-foreground leading-relaxed">
                For more information about web accessibility, please visit:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                <li>Web Content Accessibility Guidelines (WCAG)</li>
                <li>Accessible Rich Internet Applications (ARIA)</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
