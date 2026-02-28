import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex items-center justify-between md:justify-center gap-4 md:gap-20">
        <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity md:absolute md:left-6">
          <Image
            src="https://static.wixstatic.com/media/6d0f2e_b7607d5e5a424d0a928f3908784b6a62~mv2.png"
            width={8}
            height={8}
            className="object-contain"
            originWidth={30}
            originHeight={30}
            alt="StratoCS Logo"
          />
          <span className="text-xl md:text-3xl font-heading font-bold text-foreground">StratoCS</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          <Link to="/" className="text-lg font-paragraph text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-lg font-paragraph text-foreground hover:text-primary transition-colors">
            Services
          </Link>
          <Link to="/about" className="text-lg font-paragraph text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-lg font-paragraph text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-base font-paragraph text-foreground hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-base font-paragraph text-foreground hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-base font-paragraph text-foreground hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-base font-paragraph text-foreground hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
