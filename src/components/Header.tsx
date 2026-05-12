import { useState, useEffect, useRef } from 'react';
import { Menu, User, X, LogOut, ChevronDown, LayoutDashboard, Shield } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';

const GOOGLE_CLIENT_ID = '655077512151-ja821huu8qidamfcu0v1hnkkfhk6fhfu.apps.googleusercontent.com';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signIn, signOut } = useAuth();
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const googleMobileBtnRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Track scroll for header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Google Sign-In
  useEffect(() => {
    if (user) return;

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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/10 border-b border-white/5' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-1.5 rounded-lg shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <Shield size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              ATIKUR<span className="text-cyan-400">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auth: Google Sign-In or User Profile */}
            {user ? (
              <div className="relative hidden sm:block" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-cyan-500/30"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-sm font-medium text-gray-300 max-w-[100px] truncate">
                    {user.firstName}
                  </span>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-gray-900 rounded-xl shadow-xl border border-white/10 overflow-hidden z-50"
                    >
                      <div className="p-4 bg-gray-800/50 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.picture}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => { window.dispatchEvent(new Event('open-dashboard')); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors font-medium"
                        >
                          <LayoutDashboard size={16} />
                          My Account
                        </button>
                        <button
                          onClick={() => { signOut(); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors font-medium"
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

            <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30">
              Hire Me
            </a>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-gray-950 z-50 shadow-xl flex flex-col border-l border-white/5"
            >
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <span className="font-bold text-lg text-white">Menu</span>
                <Button variant="ghost" size="icon" className="text-gray-400" onClick={() => setIsMenuOpen(false)}>
                  <X size={20} />
                </Button>
              </div>

              <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
                {/* Mobile Auth */}
                {user ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { window.dispatchEvent(new Event('open-dashboard')); setIsMenuOpen(false); }}
                      className="p-2 rounded-lg text-gray-400 hover:bg-white/10"
                    >
                      <LayoutDashboard size={18} />
                    </button>
                    <button
                      onClick={() => { signOut(); setIsMenuOpen(false); }}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"
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
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Navigation</h3>
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg text-gray-300 font-medium"
                    >
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4 w-full text-center px-5 py-3 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
