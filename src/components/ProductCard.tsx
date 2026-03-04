import { Product } from '@/data/mockData';
import { Star, ShoppingCart, Heart, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, setCartOpen } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.discount > 0 && (
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            NEW
          </span>
        )}
      </div>

      {/* Wishlist Button — always visible */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm">
        <Heart size={16} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
            {product.platform}
          </span>
          <div className="flex items-center gap-1 ml-auto text-yellow-500">
            <Star size={10} className="fill-current" />
            <span className="text-xs font-medium text-gray-600">{product.rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors" title={product.title}>
          {product.title}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-red-600">৳{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">৳{product.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <Zap size={12} className="fill-current" />
            <span>Instant</span>
          </div>
        </div>

        {/* Always-visible action buttons */}
        <div className="flex flex-col gap-2 mt-4 w-full">
          <button
            onClick={() => addItem(product)}
            className="bg-gray-100 text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>

          <button
            onClick={() => {
              addItem(product);
              setCartOpen(true);
            }}
            className="bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
