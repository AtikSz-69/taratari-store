import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, CheckCircle, Loader2, Phone, MapPin, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { useCart } from '@/context/CartContext';

type View = 'cart' | 'checkout' | 'success';

export default function CheckoutDrawer() {
    const { items, removeItem, updateQuantity, totalPrice, totalItems, isCartOpen, setCartOpen, clearCart } = useCart();
    const [view, setView] = useState<View>('cart');
    const [form, setForm] = useState({ name: '', phone: '', address: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const [orderId, setOrderId] = useState<number | null>(null);

    function resetAndClose() {
        setView('cart');
        setForm({ name: '', phone: '', address: '' });
        setErrors({});
        setApiError('');
        setCartOpen(false);
    }

    function validate() {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.phone.trim()) e.phone = 'Phone number is required';
        else {
            const phoneClean = form.phone.replace(/[\s-]/g, '');
            if (!/^(\+?880|0)?1[3-9]\d{8}$/.test(phoneClean)) e.phone = 'Enter a valid Bangladeshi number';
        }
        if (!form.address.trim()) e.address = 'Delivery address is required';
        else if (form.address.trim().length < 10) e.address = 'Please enter a more detailed address';
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function handleSubmitOrder() {
        if (!validate()) return;
        setSubmitting(true);
        setApiError('');

        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    phone: form.phone.trim(),
                    address: form.address.trim(),
                    cart: items.map((item) => ({
                        id: Number(item.id),
                        name: item.title,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                }),
            });

            const data = await res.json();

            if (data.success) {
                setOrderId(data.orderId);
                clearCart();
                setView('success');
            } else {
                setApiError(data.error || 'Failed to place order');
            }
        } catch {
            setApiError('Could not connect to the server. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={resetAndClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-white shadow-xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={20} className="text-red-600" />
                                <h2 className="text-lg font-bold">
                                    {view === 'cart' && 'Your Cart'}
                                    {view === 'checkout' && 'Checkout'}
                                    {view === 'success' && 'Order Placed!'}
                                </h2>
                                {view === 'cart' && totalItems > 0 && (
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <Button variant="ghost" size="icon" onClick={resetAndClose}>
                                <X size={20} />
                            </Button>
                        </div>

                        {/* ============ CART VIEW ============ */}
                        {view === 'cart' && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {items.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center py-16">
                                            <ShoppingBag size={48} className="text-gray-300 mb-4" />
                                            <p className="text-gray-500 font-medium">Your cart is empty</p>
                                            <p className="text-gray-400 text-sm mt-1">Add some products to get started!</p>
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
                                                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                                                >
                                                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                                        <p className="text-sm font-bold text-red-600">৳{item.price}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-7 h-7 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-7 h-7 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    )}
                                </div>

                                {items.length > 0 && (
                                    <div className="p-4 border-t border-gray-100 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 font-medium">Total</span>
                                            <span className="text-xl font-bold text-red-600">৳{totalPrice.toLocaleString()}</span>
                                        </div>
                                        <Button
                                            className="w-full"
                                            onClick={() => setView('checkout')}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* ============ CHECKOUT VIEW ============ */}
                        {view === 'checkout' && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {/* Order Summary */}
                                    <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                                        <h3 className="text-sm font-semibold text-gray-500 mb-3">Order Summary</h3>
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between text-sm py-1.5">
                                                <span className="text-gray-700">{item.title} <span className="text-gray-400">×{item.quantity}</span></span>
                                                <span className="font-medium">৳{(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
                                            <span>Total</span>
                                            <span className="text-red-600">৳{totalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <div className="space-y-3">
                                        <div>
                                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                                                <User size={14} /> Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                placeholder="আপনার নাম"
                                                className={`w-full px-3 py-2.5 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-200'} focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 text-sm`}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                                                <Phone size={14} /> Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                placeholder="01XXXXXXXXX"
                                                className={`w-full px-3 py-2.5 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-gray-200'} focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 text-sm`}
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                                                <MapPin size={14} /> Delivery Address
                                            </label>
                                            <textarea
                                                value={form.address}
                                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                                placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন..."
                                                rows={3}
                                                className={`w-full px-3 py-2.5 rounded-lg border ${errors.address ? 'border-red-400' : 'border-gray-200'} focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 text-sm resize-none`}
                                            />
                                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                        </div>
                                    </div>

                                    {apiError && (
                                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                                            {apiError}
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 border-t border-gray-100 space-y-2">
                                    <Button
                                        className="w-full"
                                        isLoading={submitting}
                                        onClick={handleSubmitOrder}
                                    >
                                        Confirm Order — ৳{totalPrice.toLocaleString()}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full text-gray-500"
                                        onClick={() => setView('cart')}
                                    >
                                        ← Back to Cart
                                    </Button>
                                </div>
                            </>
                        )}

                        {/* ============ SUCCESS VIEW ============ */}
                        {view === 'success' && (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                                >
                                    <CheckCircle size={40} className="text-green-600" />
                                </motion.div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-2">ধন্যবাদ!</h3>
                                <p className="text-gray-600 mb-1">Your order has been placed successfully</p>
                                {orderId && (
                                    <p className="text-sm text-gray-400 mb-6">
                                        Order ID: <span className="font-mono font-bold text-red-600">#{orderId}</span>
                                    </p>
                                )}

                                <div className="rounded-xl bg-gray-50 border border-gray-100 p-5 mb-6 text-left w-full max-w-xs">
                                    <h4 className="text-sm font-semibold text-gray-500 mb-3">What happens next?</h4>
                                    <ul className="space-y-2.5 text-sm text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
                                            We'll confirm via phone call
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">2</span>
                                            Items will be delivered digitally
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">3</span>
                                            Pay on delivery — bKash accepted
                                        </li>
                                    </ul>
                                </div>

                                <Button onClick={resetAndClose}>
                                    Continue Shopping
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
