import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
    onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, totalPrice, totalItems, isCartOpen, setCartOpen } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={() => setCartOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-surface-raised border-l border-border flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-border">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-brand-400" />
                                <h2 className="text-lg font-bold font-[var(--font-display)]">Your Cart</h2>
                                <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-semibold">
                                    {totalItems}
                                </span>
                            </div>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 rounded-xl hover:bg-surface-overlay transition-colors cursor-pointer"
                                id="close-cart"
                                aria-label="Close cart"
                            >
                                <X className="w-5 h-5 text-text-secondary" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-16 h-16 text-text-muted mb-4" />
                                    <p className="text-text-secondary font-medium">Your cart is empty</p>
                                    <p className="text-text-muted text-sm mt-1">Add some products to get started!</p>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20, height: 0 }}
                                            className="flex items-center gap-4 p-3 rounded-xl bg-surface-card border border-border"
                                        >
                                            {/* Item image */}
                                            <div className="w-14 h-14 rounded-lg bg-surface-overlay overflow-hidden flex-shrink-0">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <ShoppingBag className="w-6 h-6 text-text-muted" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Item info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-text-primary truncate">{item.name}</p>
                                                <p className="text-sm font-bold text-brand-400 mt-0.5">৳{item.price.toLocaleString()}</p>
                                            </div>

                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-lg bg-surface-overlay hover:bg-surface-card flex items-center justify-center transition-colors cursor-pointer"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="w-3.5 h-3.5 text-text-secondary" />
                                                </button>
                                                <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-lg bg-surface-overlay hover:bg-surface-card flex items-center justify-center transition-colors cursor-pointer"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-3.5 h-3.5 text-text-secondary" />
                                                </button>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-1.5 rounded-lg hover:bg-red-500/20 group transition-colors cursor-pointer"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <Trash2 className="w-4 h-4 text-text-muted group-hover:text-red-400 transition-colors" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-5 border-t border-border space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-text-secondary font-medium">Total</span>
                                    <span className="text-xl font-bold text-brand-400">৳{totalPrice.toLocaleString()}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        setCartOpen(false);
                                        onCheckout();
                                    }}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 cursor-pointer"
                                    id="checkout-btn"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
