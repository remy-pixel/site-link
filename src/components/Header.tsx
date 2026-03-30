import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const desktopNavLinks = [
    { name: 'Menu', path: '/menu' },
    { name: 'Order', path: '/order-pickup' },
    { name: 'Reserve', path: '/reserve' },
  ];

  const mobileMenuLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Order', path: '/order-pickup' },
    { name: 'Reserve', path: '/reserve' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';
  const isBlackHeaderPage = ['/menu', '/order-pickup', '/reserve', '/about', '/contact'].includes(location.pathname);
  const headerBgColor = isBlackHeaderPage ? 'bg-black-bg' : isHomePage ? 'bg-transparent' : 'bg-cream-bg';
  const textColor = isBlackHeaderPage ? 'text-white' : isHomePage ? 'text-black' : 'text-black';
  const textColorSecondary = isBlackHeaderPage ? 'text-white/60 hover:text-white' : isHomePage ? 'text-black/60 hover:text-black' : 'text-black/60 hover:text-black';
  const hamburgerLineColor = isBlackHeaderPage ? 'bg-white' : 'bg-black';

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const hamburgerButton = document.querySelector('[aria-label="Toggle menu"]');
        if (hamburgerButton && !hamburgerButton.contains(event.target as Node)) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgColor}`}>
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        {/* Hamburger Menu Button - Minimalist Design */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20 rounded transition-all duration-200"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <motion.div
            animate={isMenuOpen ? { rotate: 45, y: 12 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-5 h-px ${hamburgerLineColor}`}
          />
          <motion.div
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-5 h-px ${hamburgerLineColor}`}
          />
          <motion.div
            animate={isMenuOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-5 h-px ${hamburgerLineColor}`}
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12 mx-auto">
          {desktopNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-paragraph text-xs uppercase tracking-[0.15em] transition-colors duration-300 font-light ${
                isActive(link.path) 
                  ? 'text-gold-accent' 
                  : textColorSecondary
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Spacer for desktop */}
        <div className="hidden md:block w-5"></div>
      </div>

      {/* Left Sidebar Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel - Left Sidebar */}
            <motion.div
              ref={menuRef}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed left-0 top-0 h-screen w-72 bg-white z-40 overflow-y-auto shadow-lg"
            >
              {/* Menu Content */}
              <div className="pt-24 px-8 pb-8">
                <nav className="flex flex-col gap-8">
                  {mobileMenuLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`font-paragraph text-base uppercase tracking-[0.1em] transition-all duration-200 font-light relative group ${
                        isActive(link.path) 
                          ? 'text-gold-accent font-medium' 
                          : 'text-black/70 hover:text-black'
                      }`}
                    >
                      {link.name}
                      <span className={`absolute bottom-0 left-0 h-px bg-gold-accent transition-all duration-300 ${
                        isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
