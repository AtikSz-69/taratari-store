import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    category?: string;
}

interface HomePageProps {
    onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            setLoading(true);
            const res = await fetch('/api/products');
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
            } else {
                setError('Failed to load products');
            }
        } catch {
            setError('Could not connect to the server');
        } finally {
            setLoading(false);
        }
    }

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="hero-gradient pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6 animate-[fade-in]">
                        <Sparkles className="w-4 h-4 text-brand-400" />
                        <span className="text-sm font-medium text-brand-300">Lightning-fast Shopping</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-[var(--font-display)] tracking-tight mb-5 animate-[slide-up]">
                        Shop at{' '}
                        <span className="text-gradient">তারাতারি</span>
                        <br />
                        <span className="text-text-secondary text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            Bangladesh's Digital Storehouse
                        </span>
                    </h1>

                    <p className="text-text-muted max-w-2xl mx-auto text-base sm:text-lg mb-8 animate-[slide-up]" style={{ animationDelay: '0.1s' }}>
                        Discover premium products at incredible prices. Fast delivery, easy returns, and a seamless shopping experience.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-lg mx-auto relative animate-[slide-up]" style={{ animationDelay: '0.2s' }}>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface-card border border-border focus:border-brand-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-text-primary placeholder:text-text-muted transition-all duration-300"
                            id="search-input"
                        />
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold font-[var(--font-display)]">
                                {search ? 'Search Results' : 'Featured Products'}
                            </h2>
                            <p className="text-text-muted text-sm mt-1">
                                {loading ? 'Loading...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} available`}
                            </p>
                        </div>
                    </div>

                    {/* Loading Skeletons */}
                    {loading && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="rounded-2xl border border-border overflow-hidden">
                                    <div className="aspect-square skeleton" />
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 w-3/4 rounded skeleton" />
                                        <div className="h-3 w-1/2 rounded skeleton" />
                                        <div className="h-6 w-1/3 rounded skeleton" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-20">
                            <p className="text-text-muted text-lg mb-4">{error}</p>
                            <button
                                onClick={fetchProducts}
                                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors cursor-pointer"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Products Grid */}
                    {!loading && !error && (
                        <>
                            {filtered.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {filtered.map((product, i) => (
                                        <ProductCard key={product.id} product={product} index={i} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-text-muted text-lg">
                                        {search ? 'No products match your search.' : 'No products available yet.'}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 mt-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-text-muted text-sm">
                        © {new Date().getFullYear()} তারাতারি Store — Built with 💛 in Bangladesh
                    </p>
                </div>
            </footer>
        </div>
    );
}
