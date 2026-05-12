import { Github, Twitter, Facebook, Youtube, Mail, Phone, MapPin, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-950 text-gray-400 pt-16 pb-6 relative overflow-hidden border-t border-white/5">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand Column */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-1.5 rounded-lg">
                <Shield size={20} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Atikur<span className="text-cyan-400">.</span>
              </h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Cybersecurity enthusiast & aspiring ethical hacker from Bangladesh. Passionate about penetration testing, OSINT, and making the digital world safer.
            </p>
            <div className="flex gap-3 pt-1">
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
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all duration-200"
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
              {[
                { label: 'About Me', href: '#about' },
                { label: 'Skills & Expertise', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Blog & Writeups', href: '#blog' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-cyan-400 transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-px bg-cyan-500 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Resources</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'TryHackMe', href: 'https://tryhackme.com' },
                { label: 'HackTheBox', href: 'https://hackthebox.com' },
                { label: 'OWASP Top 10', href: 'https://owasp.org/www-project-top-ten/' },
                { label: 'CVE Database', href: 'https://cve.mitre.org' },
                { label: 'Exploit-DB', href: 'https://exploit-db.com' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-px bg-cyan-500 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact Me</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-cyan-400" />
                </div>
                <div>
                  <span className="text-gray-300 font-medium">+8801991319394</span>
                  <br /><span className="text-xs text-gray-600">Available for freelance work</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-cyan-400" />
                </div>
                <span className="text-gray-300">iamatik69@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-cyan-400" />
                </div>
                <span className="text-gray-300">Kushtia, Khulna, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Atikur Rahman. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={10} className="text-cyan-500 fill-cyan-500" /> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
