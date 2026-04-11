import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import CheckoutDrawer from '@/components/CheckoutDrawer';
import AdminPanel from '@/components/AdminPanel';
import BentoGrid from '@/components/BentoGrid';
import StatsBar from '@/components/StatsBar';
import UserDashboard from '@/components/UserDashboard';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [liveProducts, setLiveProducts] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products?.length > 0) {
          setLiveProducts(data.products);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProducts = liveProducts.filter((p: any) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bestSellers = filteredProducts.filter((p: any) => p.isBestSeller !== false);

  const platformLogos: Record<string, string> = {
    Netflix: '🎬',
    Adobe: '🎨',
    Microsoft: '💻',
    Spotify: '🎵',
    Canva: '✏️',
    NordVPN: '🔒',
  };

  return (
    <AuthProvider>
    <CartProvider>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
        <Header onSearchChange={setSearchQuery} />
        <CheckoutDrawer />
        <AdminPanel />
        <UserDashboard />

        <main className="flex-1">
          <Hero />

          {/* Animated Stats */}
          <StatsBar />

          {/* Categories Grid */}
          <section className="py-14 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Browse Digital Services</h2>
                <p className="text-sm text-gray-500 mt-1.5 font-medium">Find exactly what you need</p>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {CATEGORIES.map((cat, i) => {
                  const IconComponent = (Icons as any)[cat.icon] || Icons.Zap;

                  return (
                    <motion.a
                      key={cat.id}
                      href="#"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300 text-center"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-white group-hover:text-red-600 group-hover:shadow-md group-hover:shadow-red-100 flex items-center justify-center transition-all duration-300 text-gray-500">
                        <IconComponent size={22} />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 group-hover:text-red-700 transition-colors">{cat.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Best Sellers */}
          <Section
            title="💎 Featured Product"
            subtitle="Premium access, instant delivery"
            action={{ label: "Buy Now", href: "#" }}
            className="bg-gray-50"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {bestSellers.map((product, idx) => (
                <ProductCard key={`${product.id}-${idx}`} product={product} />
              ))}
            </div>
          </Section>

          {/* Bento Grid — Why Taratari */}
          <BentoGrid />

          {/* Trusted Platforms */}
          <section className="py-14 bg-gray-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Trusted Platforms</h2>
                <p className="text-sm text-gray-500 mt-1.5 font-medium">We partner with the world's best</p>
              </motion.div>

              <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
                {Object.entries(platformLogos).map(([name, emoji], i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex flex-col items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-white border-2 border-gray-100 group-hover:border-red-200 group-hover:shadow-lg group-hover:shadow-red-100/40 flex items-center justify-center transition-all duration-300">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{emoji}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Newsletter />
        </main>

        <Footer />
      </div>
    </CartProvider>
    </AuthProvider>
  );
}
