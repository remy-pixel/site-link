import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { RestaurantInformation, Images } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInformation | null>(null);
  const [kuaImage, setKuaImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<Images[]>([]);

  useEffect(() => {
    loadRestaurantInfo();
    loadKuaImage();
    loadGalleryImages();
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

  const loadKuaImage = async () => {
    try {
      const result = await BaseCrudService.getAll<Images>('Images');
      const kuaItem = result.items.find(item => item.title?.toUpperCase() === 'KUA');
      if (kuaItem?.image) {
        setKuaImage(kuaItem.image);
      }
    } catch (error) {
      console.error('Error loading KUA image:', error);
    }
  };

  const loadGalleryImages = async () => {
    try {
      const result = await BaseCrudService.getAll<Images>('Images');
      // Filter images with titles 1-8
      const filtered = result.items.filter(item => {
        const title = item.title?.trim();
        return title && /^[1-8]$/.test(title);
      }).sort((a, b) => {
        const aNum = parseInt(a.title || '0');
        const bNum = parseInt(b.title || '0');
        return aNum - bNum;
      });
      setGalleryImages(filtered);
    } catch (error) {
      console.error('Error loading gallery images:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black-bg text-light-text overflow-x-hidden font-paragraph">
      <Header />
      <main className="relative w-full pt-32">
        <section className="relative w-full py-32 bg-black-bg">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 space-y-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="font-pompeii text-5xl md:text-6xl text-light-text mb-6">
                About House of Kua
              </h1>
              <p className="font-paragraph text-lg text-light-text/70">
                Bringing authentic Thai flavors and warm hospitality to Antwerp
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="aspect-[3/4] overflow-hidden rounded-lg"
              >
                <Image
                  src={kuaImage || "https://static.wixstatic.com/media/6d0f2e_87698e1379af4c869a7be228895f33f4~mv2.jpg"}
                  alt="Kua Namsaeng"
                  className="w-full h-full object-cover"
                  width={500}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-pompeii text-3xl text-light-text mb-4">Our Story</h2>
                  <p className="font-paragraph text-lg text-light-text/70 leading-relaxed">
                    {restaurantInfo?.aboutDescription || 'Founded by Kua Namsaeng, House of Kua brings authentic Thai flavors and warm hospitality to Antwerp. Every dish is prepared with passion, using traditional recipes passed down through generations.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-pompeii text-2xl text-light-text">Our Philosophy</h3>
                  <p className="font-paragraph text-light-text/70 leading-relaxed">
                    We believe in creating more than just a meal—we create an experience. From the moment you step through our doors, you're transported to the warmth and authenticity of Thailand. Every ingredient is carefully selected, every dish is crafted with care, and every guest is treated like family.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg p-12 md:p-16 bg-background"
            >
              <h2 className="font-heading text-3xl text-light-text mb-8 text-center">Why Choose House of Kua?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                  <h3 className="font-heading text-xl text-light-text mb-4">Authentic Recipes</h3>
                  <p className="font-paragraph text-light-text/70">
                    Traditional Thai recipes prepared with genuine ingredients and time-honored techniques.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-xl text-light-text mb-4">Warm Atmosphere</h3>
                  <p className="font-paragraph text-light-text/70">
                    A cosy, intimate setting perfect for dates, celebrations, and memorable moments.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-xl text-light-text mb-4">Exceptional Service</h3>
                  <p className="font-paragraph text-light-text/70">
                    Our team is dedicated to making your visit special with attentive and genuine hospitality.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-pompeii text-4xl md:text-5xl text-light-text mb-12 text-center">Gallery</h2>
              <div className="rounded-lg overflow-hidden bg-background">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] gap-4 p-6 md:p-8">
                  {galleryImages.map((image, index) => {
                    // Create varied grid positions for visual interest
                    const isLarge = index === 0 || index === 3 || index === 6;
                    const isMedium = index === 1 || index === 4 || index === 7;
                    const gridColSpan = isLarge ? 'sm:col-span-2' : '';
                    const gridRowSpan = isLarge ? 'sm:row-span-2' : isMedium ? 'row-span-1' : '';
                    
                    return (
                      <motion.div
                        key={image._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        className={`overflow-hidden rounded-lg group cursor-pointer ${gridColSpan} ${gridRowSpan}`}
                      >
                        <div className="relative w-full h-full overflow-hidden bg-dark-gray">
                          <Image
                            src={image.image || "https://static.wixstatic.com/media/e6114d_a8f09bfbeff5415fa6c5a2d1fb298dbb~mv2.png?originWidth=256&originHeight=256"}
                            alt={image.title || `Gallery image ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            width={400}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                {galleryImages.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-light-text/50">Gallery images coming soon</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
