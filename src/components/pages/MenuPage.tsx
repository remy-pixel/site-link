import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { Import1 } from '@/entities';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full mb-6 flex items-center justify-center">
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 ease-out hover:scale-[1.02]"
        />
      </div>
      <h3 className="font-heading text-lg font-light text-light-text mb-2 tracking-wide">
        {item.name}
      </h3>
      <p className="font-paragraph text-sm font-light text-light-text/70 max-w-xs">
        {item.description}
      </p>
    </div>
  );
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const result = await BaseCrudService.getAll<Import1>('Import1', {
          singleRef: ['reference']
        });
        
        const fallbackImage = 'https://static.wixstatic.com/media/e6114d_fb120178e3f14735ae9fcda707386509~mv2.png?originWidth=384&originHeight=384';
        
        const items: MenuItem[] = result.items
          .filter(item => item.name)
          .map(item => {
            const imageUrl = item.reference?.image || fallbackImage;
            return {
              id: item._id,
              name: item.name || '',
              description: item.description || '',
              image: imageUrl,
            };
          });
        
        setMenuItems(items);
      } catch (error) {
        console.error('Failed to load menu items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-black-bg">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 bg-black-bg">
        <div className="max-w-[120rem] mx-auto text-center">
          <h1 className="font-pompeii text-6xl md:text-7xl font-light text-light-text mb-6 tracking-wide">
            Menu
          </h1>
          <p className="font-paragraph text-base md:text-lg text-light-text/60 font-light max-w-2xl mx-auto">
            Authentic Thai cuisine crafted with premium ingredients and traditional techniques
          </p>
        </div>
      </div>

      {/* Menu Items Grid */}
      {isLoading ? (
        <div className="w-full py-24 md:py-32 px-6 md:px-12 bg-black-bg flex justify-center">
          <LoadingSpinner />
        </div>
      ) : menuItems.length > 0 ? (
        <section className="w-full py-24 md:py-32 px-6 md:px-12 bg-black-bg">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {menuItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="w-full py-24 md:py-32 px-6 md:px-12 bg-black-bg">
          <div className="max-w-[120rem] mx-auto text-center">
            <p className="font-paragraph text-lg text-light-text/60">
              No menu items available at the moment.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
