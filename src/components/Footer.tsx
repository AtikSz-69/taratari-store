import { Github, Twitter, Facebook, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="font-heading text-2xl font-bold text-[#013220] tracking-tight">
              Atikur Rahman
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Cybersecurity enthusiast & aspiring ethical hacker from Bangladesh.
            </p>
            <div className="flex gap-2.5 pt-1">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/iamatikUr7', label: 'Facebook' },
                { icon: Twitter, href: 'https://x.com/atik_sz', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Youtube, href: 'https://youtube.com/@mindhackai33?si=i45WXWPXfiO1XV0y', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#013220] hover:text-[#013220] hover:bg-[#013220]/5 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Navigation</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Newsletter', href: '#blog' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-[#013220] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Resources</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'TryHackMe', href: 'https://tryhackme.com' },
                { label: 'HackTheBox', href: 'https://hackthebox.com' },
                { label: 'OWASP Top 10', href: 'https://owasp.org/www-project-top-ten/' },
                { label: 'Exploit-DB', href: 'https://exploit-db.com' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#013220] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#013220] flex-shrink-0" />
                <span className="text-gray-600">+8801991319394</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#013220] flex-shrink-0" />
                <span className="text-gray-600">iamatik69@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={14} className="text-[#013220] flex-shrink-0" />
                <span className="text-gray-600">Kushtia, Khulna, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Atikur Rahman. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={10} className="text-[#013220] fill-[#013220]" /> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
