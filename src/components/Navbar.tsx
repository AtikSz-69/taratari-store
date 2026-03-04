import React from 'react';
import { ShoppingCart, Store, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
    const { totalItems, setCartOpen, isCartOpen } = useCart();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <button
                        onClick={() => onNavigate('home')}
                        className="flex items-center gap-2 group cursor-pointer"
                        id="nav-logo"
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Store className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold font-[var(--font-display)] tracking-tight">
                            <span className="text-gradient">তারাতারি</span>
                            <span className="text-text-secondary text-sm font-normal ml-1.5 hidden sm:inline">Store</span>
                        </span>
                    </button>

                    {/* Nav Links */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => onNavigate('home')}
                            className={`text-sm font-medium transition-colors duration-200 cursor-pointer ${currentPage === 'home'
                                    ? 'text-brand-400'
                                    : 'text-text-secondary hover:text-text-primary'
                                }`}
                            id="nav-home"
                        >
                            Products
                        </button>

                        {/* Cart Button */}
                        <button
                            onClick={() => setCartOpen(!isCartOpen)}
                            className="relative p-2.5 rounded-xl hover:bg-surface-overlay transition-all duration-200 group cursor-pointer"
                            id="nav-cart"
                            aria-label="Shopping cart"
                        >
                            <ShoppingCart className="w-5 h-5 text-text-secondary group-hover:text-brand-400 transition-colors duration-200" />
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center animate-[pulse-glow]">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
