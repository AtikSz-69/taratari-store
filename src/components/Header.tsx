import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
