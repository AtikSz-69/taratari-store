/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function App() {
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);
  const newArrivals = PRODUCTS.filter(p => p.isNew || p.category === 'ai-tools');
  const premiumSubs = PRODUCTS.filter(p => p.category === 'subscriptions' || p.category === 'vpn');

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />

        {/* Categories Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Browse Digital Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {CATEGORIES.map((cat) => {
                // Dynamic Icon Component
                const IconComponent = (Icons as any)[cat.icon] || Icons.Zap;
                
                return (
                  <a 
                    key={cat.id} 
                    href="#" 
                    className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50 transition-all duration-300 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-white group-hover:text-red-600 flex items-center justify-center transition-colors text-gray-600">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-red-700">{cat.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <Section 
          title="Trending Subscriptions" 
          action={{ label: "View All", href: "#" }}
          className="bg-gray-50"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {bestSellers.concat(bestSellers).slice(0, 5).map((product, idx) => (
              <ProductCard key={`${product.id}-${idx}`} product={product} />
            ))}
          </div>
        </Section>

        {/* New Arrivals */}
        <Section 
          title="New AI Tools & Software" 
          action={{ label: "View All", href: "#" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {newArrivals.concat(newArrivals).slice(0, 5).map((product, idx) => (
              <ProductCard key={`${product.id}-${idx}`} product={product} />
            ))}
          </div>
        </Section>

        {/* Featured Authors (Circular) - Replaced with Trusted Platforms */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Trusted Platforms</h2>
              <a href="#" className="text-red-600 font-semibold text-sm flex items-center gap-1">View All <ArrowRight size={16} /></a>
            </div>
            
            <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
              {['Netflix', 'Adobe', 'Microsoft', 'Spotify', 'Canva', 'NordVPN'].map((name, i) => (
                <div key={i} className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-red-600 transition-all bg-white flex items-center justify-center shadow-sm">
                    <span className="font-bold text-gray-400 group-hover:text-red-600">{name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-red-600 text-center">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Subs */}
        <Section 
          title="Premium Memberships" 
          action={{ label: "View All", href: "#" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {premiumSubs.concat(premiumSubs).slice(0, 5).map((product, idx) => (
              <ProductCard key={`${product.id}-${idx}`} product={product} />
            ))}
          </div>
        </Section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
