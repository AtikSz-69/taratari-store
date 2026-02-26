import { useState } from 'react';
import { Search, ShoppingCart, Menu, User, Bell, Zap, X } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '@/data/mockData';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar - Promotion */}
      <div className="bg-red-50 text-red-600 text-xs py-1 text-center font-medium hidden sm:block">
        🎉 Get 25% OFF on your first order! Use code: TARATARI25
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="bg-red-600 text-white p-1.5 rounded-lg">
              <Zap size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Taratari<span className="text-red-600">.</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className={`flex w-full items-center border-2 rounded-lg overflow-hidden transition-colors ${isSearchFocused ? 'border-red-600' : 'border-gray-200'}`}>
              <div className="pl-3 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for subscriptions, software, or tools..."
                className="w-full px-3 py-2.5 outline-none text-gray-700 placeholder:text-gray-400"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Button className="rounded-none h-full px-6 bg-red-600 hover:bg-red-700 border-0">
                Search
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-600">
              <Bell size={20} />
            </Button>
            
            <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-gray-700 font-medium">
              <User size={20} />
              <span>Sign In</span>
            </Button>

            <div className="relative">
              <Button variant="outline" size="icon" className="text-gray-700 border-gray-200">
                <ShoppingCart size={20} />
              </Button>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                3
              </span>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="flex w-full items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <div className="pl-3 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 py-2 border-t border-gray-100 text-sm font-medium text-gray-600 overflow-x-auto">
          <a href="#" className="hover:text-red-600 transition-colors whitespace-nowrap">Premium Subs</a>
          <a href="#" className="hover:text-red-600 transition-colors whitespace-nowrap">Video Editing</a>
          <a href="#" className="hover:text-red-600 transition-colors whitespace-nowrap">VPN & Security</a>
          <a href="#" className="hover:text-red-600 transition-colors whitespace-nowrap">Graphic Design</a>
          <a href="#" className="hover:text-red-600 transition-colors whitespace-nowrap">Software Keys</a>
          <a href="#" className="hover:text-red-600 transition-colors whitespace-nowrap">AI Tools</a>
          <a href="#" className="hover:text-red-600 transition-colors whitespace-nowrap">Gift Cards</a>
          <a href="#" className="ml-auto text-red-600 hover:text-red-700 whitespace-nowrap">Flash Sale ⚡</a>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 shadow-xl flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <span className="font-bold text-lg">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X size={20} />
                </Button>
              </div>
              
              <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
                <Button className="w-full justify-start gap-2" variant="primary">
                  <User size={18} /> Sign In / Register
                </Button>
                
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categories</h3>
                  {CATEGORIES.map((cat) => (
                    <a 
                      key={cat.id} 
                      href="#" 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md text-gray-700"
                    >
                      <span>{cat.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
