import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Compass, Navigation } from 'lucide-react';
import HorizontalSection from './HorizontalSection';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import LocationPermission from './LocationPermission';
import { Product, Section } from '../types';
import { fetchProducts } from '../services/supabase';

interface ProductDiscoveryProps {
  onBack: () => void;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

export default function ProductDiscovery({ onBack }: ProductDiscoveryProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();

        const formattedProducts: Product[] = data.map((item: any) => ({
          id: item.id,
          name: item.title,
          category: getCategoryDisplay(item.category),
          price: `$${parseFloat(item.price).toFixed(2)}`,
          image: item.image_url,
          description: item.description,
          seller: `Seller ${item.seller_id.substring(0, 8)}`,
          sellerType: item.is_mobile_seller ? 'sailboat' : 'island',
          section: item.category,
        }));

        setProducts(formattedProducts);

        const groupedSections: Section[] = [
          {
            id: 'food',
            title: 'Fresh Food & Drinks',
            description: 'Today\'s harvest and daily catches',
            products: formattedProducts.filter(p => p.section === 'food'),
          },
          {
            id: 'fish',
            title: 'Fresh Seafood',
            description: 'Catch of the day from local fishermen',
            products: formattedProducts.filter(p => p.section === 'fish'),
          },
          {
            id: 'crafts',
            title: 'Handmade & Local Crafts',
            description: 'Authentic artisan products',
            products: formattedProducts.filter(p => p.section === 'crafts'),
          },
          {
            id: 'nautical',
            title: 'Sailor Supplies',
            description: 'Everything you need for the waves',
            products: formattedProducts.filter(p => p.section === 'nautical'),
          },
        ];

        setSections(groupedSections.filter(s => s.products.length > 0));
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
    setShowLocationPrompt(true);
  }, []);

  const getCategoryDisplay = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      food: 'Food & Drinks',
      fish: 'Food & Drinks',
      crafts: 'Handmade & Crafts',
      nautical: 'Sailor Supplies',
    };
    return categoryMap[category] || category;
  };

  const handleLocationGranted = (latitude: number, longitude: number) => {
    setUserLocation({ latitude, longitude });
    setShowLocationPrompt(false);
  };

  const handleLocationSkip = () => {
    setShowLocationPrompt(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
      </div>

      <div className="relative">
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-sky-500/10 transition-smooth">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 transition-smooth group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

            <div className="flex items-center gap-2">
              {userLocation ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-lg">
                  <Navigation size={16} className="text-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-300">Location Active</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sky-200">
                  <MapPin size={18} />
                  <span className="text-sm font-medium">Browse Nearby</span>
                </div>
              )}
            </div>

            <div className="text-sky-200/60 text-sm">
              {products.length} products
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {userLocation && (
            <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-3">
                <Navigation size={20} className="text-emerald-400 animate-pulse" />
                <div>
                  <p className="text-emerald-300 font-semibold text-sm">
                    Showing products near you
                  </p>
                  <p className="text-emerald-200/70 text-xs mt-1">
                    Coordinates: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-sky-300">Loading products...</div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-sky-300">No products available</div>
            </div>
          ) : (
            <>
              {sections.map((section, idx) => (
                <div key={section.id} style={{ animation: `slideUp 0.8s ease-out ${idx * 0.1}s both` }}>
                  <HorizontalSection
                    section={section}
                    onProductClick={setSelectedProduct}
                  />
                </div>
              ))}

              <section className="mt-20">
                <div className="flex items-center gap-2 mb-8">
                  <Compass size={24} className="text-sky-300" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Browse All Products
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {products.map((product, idx) => (
                    <div
                      key={product.id}
                      style={{ animation: `slideUp 0.8s ease-out ${idx * 0.05}s both` }}
                    >
                      <div className="h-full">
                        <ProductCard
                          product={product}
                          onClick={setSelectedProduct}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          <div className="mt-20 text-center py-16 rounded-2xl bg-gradient-to-br from-sky-500/10 to-cyan-500/10 border border-sky-500/20">
            <p className="text-sky-200/80 text-lg mb-4">
              More sellers are coming online as you explore the islands
            </p>
            <p className="text-sky-300/60 text-sm">
              Check back regularly for fresh inventory and new vendors
            </p>
          </div>
        </main>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {showLocationPrompt && (
        <LocationPermission
          onLocationGranted={handleLocationGranted}
          onSkip={handleLocationSkip}
        />
      )}
    </div>
  );
}
