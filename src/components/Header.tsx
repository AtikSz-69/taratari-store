import { useState, useEffect, useRef } from 'react';
import { Menu, X, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';

const GOOGLE_CLIENT_ID = '655077512151-ja821huu8qidamfcu0v1hnkkfhk6fhfu.apps.googleusercontent.com';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) return;
    const initGoogleSignIn = () => {
      if (!window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try { await signIn(response.credential); } catch (err) { console.error('Sign-in failed:', err); }
        },
        auto_select: false,
        context: 'signin',
      });
      if (googleBtnRef.current) {
        googleBtnRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(googleBtnRef.current, { type: 'standard', theme: 'outline', size: 'medium', text: 'signin', shape: 'rectangular', logo_alignment: 'left', width: 140 });
      }
      if (googleMobileBtnRef.current) {
        googleMobileBtnRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(googleMobileBtnRef.current, { type: 'standard', theme: 'filled_blue', size: 'large', text: 'signin_with', shape: 'rectangular', width: 260 });
      }
    };
    if (window.google?.accounts?.id) { initGoogleSignIn(); }
    else {
      const interval = setInterval(() => { if (window.google?.accounts?.id) { initGoogleSignIn(); clearInterval(interval); } }, 200);
      return () => clearInterval(interval);
    }
  }, [user, signIn, isMenuOpen]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <span className="font-heading text-2xl font-bold text-[#013220] tracking-tight">
              Atikur Rahman
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="editorial-underline text-sm font-medium text-gray-600 hover:text-[#013220] transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative hidden sm:block" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
                  <span className="text-sm font-medium text-gray-700 max-w-[80px] truncate">{user.firstName}</span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-gray-50">
                        <div className="flex items-center gap-2.5">
                          <img src={user.picture} alt={user.name} className="w-9 h-9 rounded-full" referrerPolicy="no-referrer" />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-1.5">
                        <button onClick={() => { window.dispatchEvent(new Event('open-dashboard')); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                          <LayoutDashboard size={15} /> My Account
                        </button>
                        <button onClick={() => { signOut(); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:block" ref={googleBtnRef} />
            )}

            <a href="#contact" className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-semibold bg-[#013220] text-white rounded-lg hover:bg-[#024a2e] transition-colors">
              Let's Talk
            </a>

            <button className="md:hidden p-2 text-gray-700" onClick={() => setIsMenuOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50 md:hidden" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[75%] max-w-sm bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <span className="font-heading text-lg font-bold text-[#013220]">Menu</span>
                <button className="p-1 text-gray-500" onClick={() => setIsMenuOpen(false)}><X size={20} /></button>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                {user ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-2">
                    <img src={user.picture} alt={user.name} className="w-9 h-9 rounded-full" referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button onClick={() => { window.dispatchEvent(new Event('open-dashboard')); setIsMenuOpen(false); }} className="p-2 text-gray-400 hover:text-[#013220]"><LayoutDashboard size={16} /></button>
                    <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="p-2 text-red-400"><LogOut size={16} /></button>
                  </div>
                ) : (
                  <div className="flex justify-center mb-3" ref={googleMobileBtnRef} />
                )}
                {NAV_LINKS.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className="py-3 px-2 text-gray-700 font-medium border-b border-gray-50 hover:text-[#013220] transition-colors">
                    {link.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="mt-4 w-full text-center py-3 text-sm font-semibold bg-[#013220] text-white rounded-lg">
                  Let's Talk
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
