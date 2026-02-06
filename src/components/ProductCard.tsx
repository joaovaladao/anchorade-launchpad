import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={() => onClick(product)}
      className="group relative flex-shrink-0 w-64 cursor-pointer transition-smooth"
    >
      <div className="relative rounded-2xl overflow-hidden bg-slate-800 shadow-lg hover:shadow-2xl transition-smooth">
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>

          {product.badge && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-amber-500/90 backdrop-blur-md rounded-full text-xs font-semibold text-white">
              {product.badge}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sky-200 text-xs font-medium uppercase tracking-wider">
              {product.sellerType === 'sailboat' && '⛵ Sailboat Vendor'}
              {product.sellerType === 'island' && '🏝️ Island Seller'}
              {product.sellerType === 'tourist' && '🌍 Local Guide'}
            </p>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-sky-300 transition-smooth">
            {product.name}
          </h3>

          <p className="text-sky-200/70 text-xs mb-3 uppercase tracking-wider">
            {product.category}
          </p>

          <div className="flex items-end justify-between">
            <span className="text-xl font-bold text-sky-300">
              {product.price}
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center group-hover:bg-sky-500/40 transition-smooth">
              <span className="text-sky-300 text-lg">→</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl border border-sky-500/20 group-hover:border-sky-400/40 transition-smooth pointer-events-none"></div>
      </div>
    </div>
  );
}
