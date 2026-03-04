import React from 'react';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ThankYouPageProps {
    orderId: number | null;
    onNavigate: (page: string) => void;
}

export default function ThankYouPage({ orderId, onNavigate }: ThankYouPageProps) {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-md w-full text-center"
            >
                {/* Animated Checkmark */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/30"
                >
                    <motion.div
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-extrabold font-[var(--font-display)] mb-3"
                >
                    <span className="text-gradient">ধন্যবাদ!</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-text-secondary text-lg mb-2"
                >
                    Your order has been placed successfully
                </motion.p>

                {orderId && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-text-muted text-sm mb-8"
                    >
                        Order ID: <span className="font-mono text-brand-400 font-semibold">#{orderId}</span>
                    </motion.p>
                )}

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="rounded-2xl border border-border bg-surface-card p-6 mb-8 text-left"
                >
                    <h3 className="text-sm font-semibold text-text-secondary mb-3">What happens next?</h3>
                    <ul className="space-y-3 text-sm text-text-muted">
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                            <span>We'll confirm your order via phone call</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                            <span>Your items will be packed and shipped</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                            <span>Pay on delivery — cash or bKash accepted</span>
                        </li>
                    </ul>
                </motion.div>

                {/* CTA */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    onClick={() => onNavigate('home')}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold transition-all duration-300 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 cursor-pointer"
                    id="continue-shopping-btn"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Continue Shopping
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </motion.div>
        </div>
    );
}
