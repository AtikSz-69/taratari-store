import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Taratari<span className="text-red-600">.</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Bangladesh's fastest growing digital store house. We believe in the power of knowledge and the joy of reading.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/iamatikUr7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="https://x.com/atik_sz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="https://youtube.com/@mindhackai33?si=i45WXWPXfiO1XV0y" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white font-bold mb-6">Customer Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">How to Buy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Corporate & Bulk Orders</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-red-600 mt-0.5" />
                <span>+8801991319394<br/><span className="text-xs text-gray-500">9:00 AM - 10:00 PM</span></span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-red-600" />
                <span>iamatik69@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-600 mt-0.5" />
                <span>Kushtia, Khulna, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Taratari.com. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>We Accept:</span>
            <div className="flex gap-2">
              {/* Payment Icons Placeholders */}
              <div className="w-8 h-5 bg-white rounded-sm"></div>
              <div className="w-8 h-5 bg-white rounded-sm"></div>
              <div className="w-8 h-5 bg-white rounded-sm"></div>
              <div className="w-8 h-5 bg-white rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
