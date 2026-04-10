import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Zap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-6 relative overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand Column */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white p-1.5 rounded-lg">
                <Zap size={20} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Taratari<span className="text-red-500">.</span>
              </h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Bangladesh's fastest growing digital storehouse. Premium subscriptions, software keys, and AI tools — delivered instantly.
            </p>
            <div className="flex gap-3 pt-1">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/iamatikUr7', label: 'Facebook' },
                { icon: Twitter, href: 'https://x.com/atik_sz', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: 'https://youtube.com/@mindhackai33?si=i45WXWPXfiO1XV0y', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {['About Us', 'Contact Us', 'Terms of Service', 'Privacy Policy', 'Refund Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-red-400 transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-200" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Support</h4>
            <ul className="space-y-3 text-sm">
              {['Help Center', 'How to Buy', 'Track Your Order', 'Corporate & Bulk Orders', 'Returns & Refunds'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-red-400 transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-200" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-red-500" />
                </div>
                <div>
                  <span className="text-gray-300 font-medium">+8801991319394</span>
                  <br /><span className="text-xs text-gray-600">Sat–Thu, 9 AM – 10 PM</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-red-500" />
                </div>
                <span className="text-gray-300">iamatik69@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-red-500" />
                </div>
                <span className="text-gray-300">Kushtia, Khulna, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-white/[0.06] pt-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-xs text-gray-600 font-medium uppercase tracking-wider">We Accept</span>
            {['bKash', 'Nagad', 'Rocket', 'Visa'].map((method) => (
              <div key={method} className="px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-semibold text-gray-400">
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Taratari.com. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={10} className="text-red-500 fill-red-500" /> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
