import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    category?: string;
}

interface ProductCardProps {
    product: Product;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    const { addItem } = useCart();

    const handleAdd = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
            className="group relative rounded-2xl border border-border bg-surface-card overflow-hidden hover:border-brand-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/5"
        >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-surface-overlay">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart className="w-12 h-12 text-text-muted" />
                    </div>
                )}

                {/* Category Badge */}
                {product.category && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-brand-500/90 text-white">
                        {product.category}
                    </span>
                )}

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <button
                        onClick={handleAdd}
                        className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shadow-xl cursor-pointer"
                        aria-label={`Add ${product.name} to cart`}
                        id={`add-product-${product.id}`}
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="font-semibold text-text-primary text-sm leading-tight line-clamp-1 mb-1">
                    {product.name}
                </h3>
                {product.description && (
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">
                        {product.description}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-brand-400">
                        ৳{product.price.toLocaleString()}
                    </span>
                    <button
                        onClick={handleAdd}
                        className="px-3.5 py-1.5 rounded-lg bg-surface-overlay hover:bg-brand-500 text-text-secondary hover:text-white text-xs font-medium transition-all duration-200 cursor-pointer"
                        id={`add-product-btn-${product.id}`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
