import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { RestaurantInformation } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';

export default function ContactPage() {
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
                Get in Touch
              </h1>
              <p className="font-paragraph text-lg text-light-text/70">
                We'd love to hear from you. Reach out with any questions or to make a reservation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-heading text-3xl text-light-text mb-8">Contact Information</h2>
                </div>

                <div className="space-y-6">
                  {restaurantInfo?.address && (
                    <div className="flex gap-4">
                      <MapPin className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-heading text-lg text-light-text mb-2">Location</h3>
                        <p className="font-paragraph text-light-text/70">{restaurantInfo.address}</p>
                      </div>
                    </div>
                  )}

                  {restaurantInfo?.phoneNumber && (
                    <div className="flex gap-4">
                      <Phone className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-heading text-lg text-light-text mb-2">Phone</h3>
                        <a href={`tel:${restaurantInfo.phoneNumber}`} className="font-paragraph text-light-text/70 hover:text-gold-accent transition-colors">
                          {restaurantInfo.phoneNumber}
                        </a>
                      </div>
                    </div>
                  )}

                  {restaurantInfo?.email && (
                    <div className="flex gap-4">
                      <Mail className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-heading text-lg text-light-text mb-2">Email</h3>
                        <a href={`mailto:${restaurantInfo.email}`} className="font-paragraph text-light-text/70 hover:text-gold-accent transition-colors">
                          {restaurantInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {restaurantInfo?.openingHoursDescription && (
                    <div className="flex gap-4">
                      <Clock className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-heading text-lg text-light-text mb-2">Hours</h3>
                        <p className="font-paragraph text-light-text/70 whitespace-pre-line">
                          {restaurantInfo.openingHoursDescription}
                        </p>
                      </div>
                    </div>
                  )}

                  {restaurantInfo?.instagramUrl && (
                    <div className="flex gap-4">
                      <Instagram className="w-6 h-6 text-gold-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-heading text-lg text-light-text mb-2">Follow Us</h3>
                        <a 
                          href={restaurantInfo.instagramUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-paragraph text-light-text/70 hover:text-gold-accent transition-colors"
                        >
                          Instagram
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-dark-gray rounded-lg p-12 flex flex-col justify-center border border-white/20"
              >
                <h2 className="font-heading text-3xl text-light-text mb-8">Visit Us</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-lg text-gold-accent mb-3">Dine In</h3>
                    <p className="font-paragraph text-light-text/70 mb-4">
                      Experience the full House of Kua atmosphere in our cosy restaurant. Walk-ins welcome, but reservations recommended.
                    </p>
                    {restaurantInfo?.reservationUrl && (
                      <a
                        href={restaurantInfo.reservationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-gold-accent text-black-bg font-heading uppercase text-sm tracking-wider hover:bg-gold-accent/90 transition-colors rounded-full"
                      >
                        Reserve Table
                      </a>
                    )}
                  </div>

                  <div className="border-t border-gold-accent/20 pt-6">
                    <h3 className="font-heading text-lg text-gold-accent mb-3">Takeaway & Delivery</h3>
                    <p className="font-paragraph text-light-text/70 mb-4">
                      Enjoy House of Kua at home. Order online for pickup or delivery.
                    </p>
                  </div>
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
