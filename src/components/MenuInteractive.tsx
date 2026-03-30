import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Menu } from '@/entities';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MenuInteractiveProps {
  items: Menu[];
  isLoading?: boolean;
  showViewToggle?: boolean;
  defaultView?: 'grid' | 'showcase';
}

type ViewMode = 'grid' | 'showcase';

export default function MenuInteractive({
  items,
  isLoading = false,
  showViewToggle = true,
  defaultView = 'grid',
}: MenuInteractiveProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultView);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  // Get unique categories in order
  const categoryOrder = ['Starters', 'Mains', 'Noodles', 'Curries', 'Salads', 'Desserts', 'Drinks'];
  const categories = useMemo(() => {
    const uniqueCats = categoryOrder.filter(cat => items.some(item => item.category === cat));
    return uniqueCats.length > 0 ? uniqueCats : [];
  }, [items]);

  // Set initial category
  const activeCategory = selectedCategory || categories[0] || '';

  // Filter items by category
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === activeCategory);
  }, [items, activeCategory]);

  // Ensure showcase index is valid
  const validShowcaseIndex = Math.min(showcaseIndex, Math.max(0, filteredItems.length - 1));
  const currentShowcaseItem = filteredItems[validShowcaseIndex];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowcaseIndex(0);
  };

  const handleNextShowcase = () => {
    setShowcaseIndex(prev => (prev + 1) % filteredItems.length);
  };

  const handlePrevShowcase = () => {
    setShowcaseIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Category Selector */}
      <div className="mb-12 md:mb-16">
        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`font-paragraph text-xs md:text-sm uppercase tracking-[0.15em] px-4 md:px-6 py-2 md:py-3 transition-all duration-300 relative ${
                activeCategory === category
                  ? 'text-deep-red'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
              {activeCategory === category && (
                <motion.div
                  layoutId="categoryUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-deep-red"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      {showViewToggle && (
        <div className="mb-12 md:mb-16 flex justify-center gap-4">
          <motion.button
            onClick={() => setViewMode('grid')}
            className={`font-paragraph text-xs uppercase tracking-[0.15em] px-6 py-2 rounded-full transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-deep-red text-cream-bg'
                : 'border border-foreground/30 text-foreground/60 hover:border-foreground/60'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Grid View
          </motion.button>
          <motion.button
            onClick={() => setViewMode('showcase')}
            className={`font-paragraph text-xs uppercase tracking-[0.15em] px-6 py-2 rounded-full transition-all duration-300 ${
              viewMode === 'showcase'
                ? 'bg-deep-red text-cream-bg'
                : 'border border-foreground/30 text-foreground/60 hover:border-foreground/60'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Showcase View
          </motion.button>
        </div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <GridView key="grid" items={filteredItems} />
        ) : (
          <ShowcaseView
            key="showcase"
            item={currentShowcaseItem}
            index={validShowcaseIndex}
            total={filteredItems.length}
            onNext={handleNextShowcase}
            onPrev={handlePrevShowcase}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Grid View Component
function GridView({ items }: { items: Menu[] }) {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-24"
      >
        <p className="font-paragraph text-lg text-foreground/50">
          No menu items available in this category
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
    >
      {items.map((item, index) => (
        <GridCard key={item._id} item={item} index={index} />
      ))}
    </motion.div>
  );
}

// Grid Card Component
function GridCard({ item, index }: { item: Menu; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center text-center group cursor-pointer"
    >
      {/* Image Container */}
      {item.dishImage && (
        <div className="relative w-full aspect-square mb-6 md:mb-8 overflow-hidden rounded-sm">
          <Image
            src={item.dishImage}
            alt={item.dishName || 'Menu item'}
            className="w-full h-full object-cover"
            width={400}
          />

          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/12 flex flex-col items-center justify-center"
              >
                {/* Thai Name */}
                {item.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="font-heading text-sm md:text-base text-cream-bg mb-4 italic"
                  >
                    {item.description}
                  </motion.p>
                )}

                {/* Price */}
                {item.price !== undefined && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="font-heading text-lg md:text-xl text-warm-gold font-semibold"
                  >
                    ${item.price.toFixed(2)}
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle Zoom Effect */}
          <motion.div
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
          />
        </div>
      )}

      {/* Dish Name */}
      <h3 className="font-heading text-lg md:text-xl text-foreground tracking-tight">
        {item.dishName}
      </h3>

      {/* Mobile: Show price below on tap */}
      <div className="md:hidden mt-3">
        {item.price !== undefined && (
          <p className="font-paragraph text-sm text-warm-gold">
            ${item.price.toFixed(2)}
          </p>
        )}
        {item.description && (
          <p className="font-heading text-xs text-foreground/60 italic mt-1">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// Showcase View Component
function ShowcaseView({
  item,
  index,
  total,
  onNext,
  onPrev,
}: {
  item: Menu | undefined;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!item) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-24"
      >
        <p className="font-paragraph text-lg text-foreground/50">
          No menu items available
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px]"
    >
      <div className="w-full max-w-2xl px-6">
        {/* Image */}
        <motion.div
          key={item._id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="relative w-full aspect-square mb-12 overflow-hidden rounded-sm"
        >
          {item.dishImage && (
            <Image
              src={item.dishImage}
              alt={item.dishName || 'Menu item'}
              className="w-full h-full object-cover"
              width={600}
            />
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          key={`content-${item._id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center space-y-6"
        >
          {/* English Name */}
          <h2 className="font-heading text-4xl md:text-5xl text-foreground tracking-tight">
            {item.dishName}
          </h2>

          {/* Thai Name */}
          {item.description && (
            <p className="font-heading text-lg md:text-xl text-foreground/70 italic">
              {item.description}
            </p>
          )}

          {/* Price */}
          {item.price !== undefined && (
            <p className="font-heading text-2xl md:text-3xl text-warm-gold font-semibold">
              ${item.price.toFixed(2)}
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="flex-1 h-px bg-foreground/20" />
            <div className="w-2 h-2 rounded-full bg-deep-red" />
            <div className="flex-1 h-px bg-foreground/20" />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 md:gap-12 pt-8">
            <motion.button
              onClick={onPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full border border-foreground/30 text-foreground hover:border-foreground/60 transition-colors"
              aria-label="Previous dish"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <span className="font-paragraph text-sm text-foreground/60 min-w-[60px]">
              {index + 1} / {total}
            </span>

            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full border border-foreground/30 text-foreground hover:border-foreground/60 transition-colors"
              aria-label="Next dish"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
