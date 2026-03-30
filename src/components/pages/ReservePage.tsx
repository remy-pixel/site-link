import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { RestaurantInformation } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function ReservePage() {
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInformation | null>(null);

  useEffect(() => {
    loadRestaurantInfo();
  }, []);

  const loadRestaurantInfo = async () => {
    try {
      const result = await BaseCrudService.getAll<RestaurantInformation>('restaurantinformation');
      if (result.items.length > 0) {
        setRestaurantInfo(result.items[0]);
      }
    } catch (error) {
      console.error('Error loading restaurant info:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black-bg text-light-text overflow-x-hidden font-paragraph">
      <Header />

      <main className="relative w-full pt-32">
        <section className="relative w-full py-32 bg-black-bg">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h1 className="font-pompeii text-5xl md:text-6xl text-light-text mb-6">
                Reserve Your Table
              </h1>
              <p className="font-paragraph text-lg text-light-text/70">
                Experience authentic Thai cuisine in our cosy Antwerp restaurant. Book your table for an unforgettable evening.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="aspect-[4/5] overflow-hidden rounded-lg"
              >
                <Image
                  src="https://static.wixstatic.com/media/6d0f2e_f8530a139ebc456eb054dce4b5f41631~mv2.jpg"
                  alt="House of Kua Restaurant"
                  className="w-full h-full object-cover"
                  width={500}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-heading text-3xl text-light-text mb-4">Make a Reservation</h2>
                  <p className="font-paragraph text-light-text/70 mb-6">
                    We welcome reservations for intimate dinners, celebrations, and special occasions. Our warm and welcoming team is ready to make your visit memorable.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-lg text-gold-accent mb-2">Opening Hours</h3>
                    <p className="font-paragraph text-light-text/70 whitespace-pre-line">
                      {restaurantInfo?.openingHoursDescription || 'Monday - Sunday\n17:00 - 23:00'}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg text-gold-accent mb-2">Contact</h3>
                    <div className="space-y-2">
                      {restaurantInfo?.phoneNumber && (
                        <p className="font-paragraph text-light-text/70">
                          <a href={`tel:${restaurantInfo.phoneNumber}`} className="hover:text-gold-accent transition-colors">
                            {restaurantInfo.phoneNumber}
                          </a>
                        </p>
                      )}
                      {restaurantInfo?.email && (
                        <p className="font-paragraph text-light-text/70">
                          <a href={`mailto:${restaurantInfo.email}`} className="hover:text-gold-accent transition-colors">
                            {restaurantInfo.email}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  {restaurantInfo?.reservationUrl && (
                    <a
                      href={restaurantInfo.reservationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-4 bg-gold-accent text-black-bg font-heading uppercase text-sm tracking-wider hover:bg-gold-accent/90 transition-colors rounded-full"
                    >
                      Book Now
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
