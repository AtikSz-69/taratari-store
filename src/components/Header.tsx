import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Menu, User, Bell, Zap, X, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const GOOGLE_CLIENT_ID = '655077512151-ja821huu8qidamfcu0v1hnkkfhk6fhfu.apps.googleusercontent.com';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { totalItems, setCartOpen } = useCart();
  const { user, signIn, signOut } = useAuth();
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const googleMobileBtnRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Initialize Google Sign-In
  useEffect(() => {
    if (user) return; // Don't render button if already signed in

    const initGoogleSignIn = () => {
      if (!window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            await signIn(response.credential);
          } catch (err) {
            console.error('Sign-in failed:', err);
          }
        },
        auto_select: false,
        context: 'signin',
      });

      // Render desktop button
      if (googleBtnRef.current) {
        googleBtnRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'medium',
          text: 'signin',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: 160,
        });
      }

      // Render mobile button
      if (googleMobileBtnRef.current) {
        googleMobileBtnRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(googleMobileBtnRef.current, {
          type: 'standard',
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 280,
        });
      }
    };

    // Try immediately, or wait for script to load
    if (window.google?.accounts?.id) {
      initGoogleSignIn();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          initGoogleSignIn();
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [user, signIn, isMenuOpen]);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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

            {/* Auth: Google Sign-In or User Profile */}
            {user ? (
              <div className="relative hidden sm:block" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-gray-100"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user.firstName}
                  </span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-4 bg-gray-50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.picture}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => { window.dispatchEvent(new Event('open-dashboard')); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                          <LayoutDashboard size={16} />
                          My Account
                        </button>
                        <button
                          onClick={() => { signOut(); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:block" ref={googleBtnRef}>
                {/* Google Sign-In button renders here */}
              </div>
            )}

            <div className="relative">
              <Button variant="outline" size="icon" className="text-gray-700 border-gray-200" onClick={() => setCartOpen(true)}>
                <ShoppingCart size={20} />
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {totalItems}
                </span>
              )}
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
                {/* Mobile Auth */}
                {user ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { window.dispatchEvent(new Event('open-dashboard')); setIsMenuOpen(false); }}
                      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                    >
                      <LayoutDashboard size={18} />
                    </button>
                    <button
                      onClick={() => { signOut(); setIsMenuOpen(false); }}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center" ref={googleMobileBtnRef}>
                    {/* Google Sign-In button renders here for mobile */}
                  </div>
                )}

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

