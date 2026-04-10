import { Product } from '@/data/mockData';
import { Star, ShoppingCart, Heart, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, setCartOpen } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isWished, setIsWished] = useState(false);

  function handleAddToCart() {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.discount > 0 && (
          <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md shadow-red-600/20">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md shadow-blue-600/20">
            NEW
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWished(!isWished)}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 shadow-sm ${
          isWished
            ? 'bg-red-50 text-red-500 scale-110'
            : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white'
        }`}
      >
        <Heart size={15} className={isWished ? 'fill-current' : ''} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover card-image-zoom"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Subtle gradient overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
            {product.platform}
          </span>
          <div className="flex items-center gap-1 ml-auto">
            <Star size={10} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
            <span className="text-[10px] text-gray-400">({product.reviews > 1000 ? `${(product.reviews / 1000).toFixed(1)}k` : product.reviews})</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 line-clamp-2 mb-3 text-sm leading-snug group-hover:text-red-600 transition-colors duration-200" title={product.title}>
          {product.title}
        </h3>

        {/* Price Block */}
        <div className="mt-auto">
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-gray-900">৳{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">৳{product.originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              <Zap size={10} className="fill-current" />
              Instant
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isAdded
                  ? 'bg-emerald-500 text-white scale-[0.97]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-[0.97]'
              }`}
            >
              {isAdded ? (
                <>✓ Added</>
              ) : (
                <><ShoppingCart size={15} /> Cart</>
              )}
            </button>
            <button
              onClick={() => { addItem(product); setCartOpen(true); }}
              className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-red-500 transition-all duration-200 active:scale-[0.97] shadow-sm shadow-red-600/20"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
