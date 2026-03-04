import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Loader2, MapPin, Phone, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

interface CheckoutPageProps {
    onNavigate: (page: string) => void;
    onOrderSuccess: (orderId: number) => void;
}

export default function CheckoutPage({ onNavigate, onOrderSuccess }: CheckoutPageProps) {
    const { items, totalPrice, clearCart } = useCart();
    const [form, setForm] = useState({ name: '', phone: '', address: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

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

    async function handleSubmit(ev: React.FormEvent) {
        ev.preventDefault();
        if (!validate()) return;
        if (items.length === 0) return;

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
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                }),
            });

            const data = await res.json();

            if (data.success) {
                clearCart();
                onOrderSuccess(data.orderId);
            } else {
                setApiError(data.error || 'Failed to place order');
            }
        } catch {
            setApiError('Could not connect to the server. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center text-center">
                <p className="text-text-secondary text-lg mb-4">Your cart is empty</p>
                <button
                    onClick={() => onNavigate('home')}
                    className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-colors cursor-pointer"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-8 cursor-pointer"
                    id="back-btn"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back to Shopping</span>
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-3xl font-bold font-[var(--font-display)] mb-2">Checkout</h1>
                    <p className="text-text-muted mb-8">Complete your order details below</p>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                                    <User className="w-4 h-4" /> Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="আপনার নাম"
                                    className={`w-full px-4 py-3 rounded-xl bg-surface-card border ${errors.name ? 'border-red-500' : 'border-border'
                                        } focus:border-brand-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-text-primary placeholder:text-text-muted transition-all`}
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                                    <Phone className="w-4 h-4" /> Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    placeholder="01XXXXXXXXX"
                                    className={`w-full px-4 py-3 rounded-xl bg-surface-card border ${errors.phone ? 'border-red-500' : 'border-border'
                                        } focus:border-brand-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-text-primary placeholder:text-text-muted transition-all`}
                                />
                                {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label htmlFor="address" className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                                    <MapPin className="w-4 h-4" /> Delivery Address
                                </label>
                                <textarea
                                    id="address"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন..."
                                    rows={3}
                                    className={`w-full px-4 py-3 rounded-xl bg-surface-card border ${errors.address ? 'border-red-500' : 'border-border'
                                        } focus:border-brand-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-text-primary placeholder:text-text-muted transition-all resize-none`}
                                />
                                {errors.address && <p className="text-red-400 text-xs mt-1.5">{errors.address}</p>}
                            </div>

                            {apiError && (
                                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {apiError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold transition-all duration-300 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                                id="place-order-btn"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Placing Order...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Place Order — ৳{totalPrice.toLocaleString()}
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-border bg-surface-card p-5 sticky top-24">
                                <h3 className="font-semibold text-sm text-text-secondary mb-4">Order Summary</h3>
                                <div className="space-y-3 mb-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start text-sm">
                                            <div>
                                                <p className="text-text-primary font-medium">{item.name}</p>
                                                <p className="text-text-muted text-xs">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-text-primary font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-border pt-3 flex justify-between items-center">
                                    <span className="font-semibold text-text-secondary">Total</span>
                                    <span className="text-xl font-bold text-brand-400">৳{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
