import { Product } from '../types';
import { X, MessageSquare } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      ></div>

      <div
        className="relative w-full sm:w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-t-3xl sm:rounded-3xl border border-sky-500/20 backdrop-blur-xl shadow-2xl pointer-events-auto overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-smooth"
        >
          <X size={20} className="text-sky-200" />
        </button>

        <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8">
          <div className="w-full sm:w-1/2">
            <div className="relative rounded-2xl overflow-hidden bg-slate-700 aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 right-4 px-4 py-2 bg-amber-500/90 backdrop-blur-md rounded-full text-sm font-semibold text-white">
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          <div className="w-full sm:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {product.name}
                </h1>
              </div>

              <p className="text-sky-300 text-sm uppercase tracking-wider font-medium mb-6">
                {product.category}
              </p>

              <p className="text-sky-100/80 text-base leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="space-y-4 mb-8 p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
                <div>
                  <p className="text-sky-200/70 text-xs uppercase tracking-wider mb-2">
                    Seller Information
                  </p>
                  <p className="text-white font-semibold">{product.seller}</p>
                  <p className="text-sky-300/80 text-sm mt-1">
                    {product.sellerType === 'sailboat' && '⛵ Sailboat Vendor'}
                    {product.sellerType === 'island' && '🏝️ Island Seller'}
                    {product.sellerType === 'tourist' && '🌍 Local Guide'}
                  </p>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold text-sky-300">
                  {product.price}
                </span>
                <span className="text-sky-200/60 text-sm">per unit</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-smooth flex items-center justify-center gap-2 group button-hover-glow">
                <MessageSquare size={20} />
                Contact Seller
              </button>

              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-sky-300 font-semibold rounded-xl transition-smooth"
              >
                Keep Browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
