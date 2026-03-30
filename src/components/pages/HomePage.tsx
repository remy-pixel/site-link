import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Menu, RestaurantInformation } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuInteractive from '@/components/MenuInteractive';

export default function HomePage() {
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInformation | null>(null);
  const [allDishes, setAllDishes] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [infoResult, menuResult] = await Promise.all([
        BaseCrudService.getAll<RestaurantInformation>('restaurantinformation'),
        BaseCrudService.getAll<Menu>('menu'),
      ]);

      if (infoResult.items.length > 0) {
        setRestaurantInfo(infoResult.items[0]);
      }

      setAllDishes(menuResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black-bg text-light-text overflow-x-hidden font-paragraph">
      <Header />

      <main className="relative w-full">
        <HeroSection />
        <AtmosphereSection />
      </main>

      <Footer />
    </div>
  );
}

// --- SUB-COMPONENTS ---

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#f7f7f4] flex items-center justify-center">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="font-pompeii text-5xl md:text-7xl text-black font-light tracking-tight w-full md:w-[65%] mx-auto">
            HOUSE OF KUA
          </h1>
          <p className="font-pompeii text-3xl md:text-4xl text-black font-light tracking-tight w-full md:w-[65%] mx-auto mt-4">
            ANTWERP
          </p>
        </motion.div>
      </div>

      {/* Thin vertical line at bottom center with shrink animation */}
      <motion.div
        initial={{ scaleY: 1, transformOrigin: 'bottom' }}
        animate={{ scaleY: 0, transformOrigin: 'bottom' }}
        transition={{ delay: 0.5, duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-20 bg-black"
      />
    </section>
  );
};

const AtmosphereSection = () => {
  return (
    <section className="relative w-full py-24 md:py-40 bg-black-bg">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-32 text-center">
          <p className="font-paragraph text-xs text-light-text/40 uppercase tracking-[0.3em] mb-8">
            OUR ATMOSPHERE
          </p>
          <p className="font-pompeii text-4xl md:text-5xl text-light-text font-light">
            FROM THAILAND TO BELGIUM
          </p>
          <p className="font-pompeii text-sm md:text-base text-light-text/80 leading-relaxed max-w-3xl mx-auto mt-8">
            House of Kua is not just a restaurant. It is a place where people come to discover the excellence of Thai food and culture, brought to life in the heart of Antwerp. It is timeless and vibrant, where the warmth of Thai hospitality meets a modern, relaxed atmosphere. Each dish reflects a balance of tradition and simplicity, allowing fresh ingredients, bold flavours, and careful preparation to speak for themselves. From the first bite to the last, the experience is designed to feel effortless yet memorable, whether you are sharing with friends, enjoying a quiet dinner, or exploring something new. House of Kua is where culture, flavour, and atmosphere come together in a way that feels both authentic and easy to return to.
          </p>
        </div>
      </div>
    </section>
  );
};



