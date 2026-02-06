import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product, Section } from '../types';

interface HorizontalSectionProps {
  section: Section;
  onProductClick: (product: Product) => void;
}

export default function HorizontalSection({ section, onProductClick }: HorizontalSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="mb-16 animate-slide-up">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-sky-200/70 text-sm">
              {section.description}
            </p>
          )}
        </div>
      </div>

      <div className="relative group">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory hide-scrollbar"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {section.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
            />
          ))}
        </div>

        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-16 w-10 h-10 rounded-full bg-sky-500/20 hover:bg-sky-500/40 flex items-center justify-center transition-smooth opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronLeft size={20} className="text-sky-300" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 w-10 h-10 rounded-full bg-sky-500/20 hover:bg-sky-500/40 flex items-center justify-center transition-smooth opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight size={20} className="text-sky-300" />
          </button>
        )}
      </div>
    </section>
  );
}
