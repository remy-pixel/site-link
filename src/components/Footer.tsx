export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-subtleborder">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl text-primary uppercase mb-4">
              Lumina
            </h3>
            <p className="font-paragraph text-sm text-secondary italic">
              Creating timeless experiences through thoughtful design and attention to detail.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm text-primary uppercase mb-4 tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <a href="/" className="font-paragraph text-sm text-secondary italic hover:text-primary transition-colors duration-300">
                Home
              </a>
              <a href="/about" className="font-paragraph text-sm text-secondary italic hover:text-primary transition-colors duration-300">
                About
              </a>
              <a href="/contact" className="font-paragraph text-sm text-secondary italic hover:text-primary transition-colors duration-300">
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-sm text-primary uppercase mb-4 tracking-wider">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3">
              <p className="font-paragraph text-sm text-secondary italic">
                Ready to start a conversation?
              </p>
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 border border-primary text-primary font-heading text-xs uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors duration-300 w-fit"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-subtleborder">
          <p className="font-paragraph text-xs text-secondary italic text-center">
            © {currentYear} Lumina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
