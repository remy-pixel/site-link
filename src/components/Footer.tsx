import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { RestaurantInformation } from '@/entities';
import { Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
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
    <footer className="bg-black">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl text-white mb-4 font-light">
              {restaurantInfo?.restaurantName || 'HOUSE OF KUA'}
            </h3>
            <p className="font-paragraph text-sm text-white font-light">
              {restaurantInfo?.tagline || 'Authentic Thai Cuisine'}
            </p>
          </div>

          {/* Hours */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-4 h-4 text-white flex-shrink-0" />
              <h4 className="font-heading text-base text-white font-light">Hours</h4>
            </div>
            <p className="font-paragraph text-sm text-white whitespace-pre-line font-light">
              {restaurantInfo?.openingHoursDescription || 'Mon-Sun\n17:00 - 23:00'}
            </p>
          </div>

          {/* Address */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-4 h-4 text-white flex-shrink-0" />
              <h4 className="font-heading text-base text-white font-light">Location</h4>
            </div>
            <p className="font-paragraph text-sm text-white font-light">
              {restaurantInfo?.address || 'Antwerp, Belgium'}
            </p>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-heading text-base text-white mb-4 font-light">Connect</h4>
            <div className="space-y-3">
              {restaurantInfo?.phoneNumber && (
                <a
                  href={`tel:${restaurantInfo.phoneNumber}`}
                  className="flex items-center gap-3 text-white hover:text-gold-accent transition-colors"
                >
                  <Phone className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="font-paragraph text-sm font-light">{restaurantInfo.phoneNumber}</span>
                </a>
              )}
              {restaurantInfo?.email && (
                <a
                  href={`mailto:${restaurantInfo.email}`}
                  className="flex items-center gap-3 text-white hover:text-gold-accent transition-colors"
                >

                </a>
              )}
              {restaurantInfo?.instagramUrl && (
                <a
                  href={restaurantInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-gold-accent transition-colors"
                >
                  <Instagram className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="font-paragraph text-sm font-light">Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 md:pt-12 text-center">
          <p className="font-paragraph text-xs text-white font-light">
            © {new Date().getFullYear()} {restaurantInfo?.restaurantName || 'House of Kua'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
