import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-12">
            {/* Brand Section */}
            <div>
              <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity mb-3 sm:mb-4">
                <Image
                  src="https://static.wixstatic.com/media/6d0f2e_b7607d5e5a424d0a928f3908784b6a62~mv2.png"
                  width={20}
                  height={20}
                  className="object-contain"
                  originWidth={30}
                  originHeight={30}
                  alt="StratoCS Logo"
                />
                <span className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-foreground">StratoCS</span>
              </Link>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Clean websites. Built for growth.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-foreground font-heading font-bold mb-3 sm:mb-4 md:mb-6 text-sm md:text-base">Quick Links</h3>
              <div className="flex flex-col gap-2 sm:gap-3">
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  Home
                </Link>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  Services
                </Link>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  About
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-foreground font-heading font-bold mb-3 sm:mb-4 md:mb-6 text-sm md:text-base">Contact</h3>
              <div className="flex flex-col gap-2 sm:gap-3">
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  Get in Touch
                </Link>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  stratocs.com
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />
        </div>

        {/* Legal Links */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border">
          <Link
            to="/terms-and-conditions"
            className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy-policy"
            className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
          >
            Private Policy
          </Link>
          <Link
            to="/accessibility-statement"
            className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
          >
            Accessibility Statement
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-xs sm:text-sm">
            © 2026 stratocs.com - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
