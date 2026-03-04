import { Product } from '@/data/mockData';
import { Button } from './ui/Button';
import { Star, ShoppingCart, Heart, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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

      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100">
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
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
          <Button size="sm" className="w-full bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-lg">
            <ShoppingCart size={14} className="mr-2" /> Quick Add
          </Button>
        </div>
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
      </div>
    </motion.div>
  );
}
