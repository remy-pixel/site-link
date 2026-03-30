import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OrderPickupPage() {
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formContainerRef.current) return;

    // Load Jotform script into the specific container
    const script = document.createElement('script');
    script.src = 'https://form.jotform.com/jsform/260604481492053';
    script.type = 'text/javascript';
    script.async = true;
    formContainerRef.current.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (formContainerRef.current && script.parentNode === formContainerRef.current) {
        formContainerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black-bg text-light-text font-paragraph">
      <Header />
      <main className="flex-1 w-full pt-32 pb-24">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h1 className="font-pompeii text-5xl md:text-6xl text-light-text mb-6">
              Order Online
            </h1>
            <p className="font-paragraph text-lg text-light-text/70">
              Enjoy House of Kua at home. Order now for pickup.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-4xl mx-auto border-gold-accent/20 rounded-lg bg-background border border-none md:p-0 p-0"
          >
            <div ref={formContainerRef} className="w-full overflow-x-hidden">
              {/* Jotform will be injected here */}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
