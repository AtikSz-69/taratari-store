import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import AdminPanel from '@/components/AdminPanel';
import BentoGrid from '@/components/BentoGrid';
import StatsBar from '@/components/StatsBar';
import UserDashboard from '@/components/UserDashboard';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { motion } from 'motion/react';
import { ExternalLink, Github, Shield, Terminal, Globe, Lock } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Network Vulnerability Scanner',
    description: 'Automated tool built with Python to scan networks for common vulnerabilities, open ports, and misconfigured services.',
    tags: ['Python', 'Nmap', 'Scapy'],
    icon: Shield,
  },
  {
    title: 'Web App Penetration Toolkit',
    description: 'Custom toolkit for testing OWASP Top 10 vulnerabilities including SQL injection, XSS, and CSRF on web applications.',
    tags: ['Burp Suite', 'SQLMap', 'Python'],
    icon: Terminal,
  },
  {
    title: 'OSINT Reconnaissance Framework',
    description: 'Open-source intelligence gathering tool that aggregates data from multiple sources for digital footprint analysis.',
    tags: ['Python', 'Maltego', 'Shodan'],
    icon: Globe,
  },
  {
    title: 'Password Cracking Lab',
    description: 'Educational lab environment for understanding password security, hash cracking techniques, and credential stuffing prevention.',
    tags: ['Hashcat', 'John', 'Wordlists'],
    icon: Lock,
  },
];

const MILESTONES = [
  { year: '2024', title: 'Started Cybersecurity Journey', desc: 'Began self-learning ethical hacking and network security fundamentals.' },
  { year: '2024', title: 'First CTF Competition', desc: 'Participated in TryHackMe and HackTheBox challenges.' },
  { year: '2025', title: 'Bug Bounty Programs', desc: 'Started reporting vulnerabilities in real-world applications.' },
  { year: '2026', title: 'Building Security Tools', desc: 'Developing custom penetration testing and reconnaissance tools.' },
];

export default function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
        <Header />
        <AdminPanel />
        <UserDashboard />

        <main className="flex-1">
          <Hero />

          {/* Stats */}
          <StatsBar />

          {/* About Section */}
          <section id="about" className="py-20 lg:py-28 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left — Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm font-semibold text-[#013220] uppercase tracking-[0.2em] mb-4">
                    About Me
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
                    Passionate about finding<br />
                    <span className="text-[#013220]">vulnerabilities</span> before<br />
                    the bad guys do.
                  </h2>
                  <div className="space-y-4 text-gray-500 text-base leading-relaxed">
                    <p>
                      I'm <span className="text-gray-900 font-semibold">Atikur Rahman</span>, a cybersecurity 
                      enthusiast from Kushtia, Bangladesh. My journey into security began with a simple question: 
                      <em className="text-gray-700"> "How do hackers think?"</em>
                    </p>
                    <p>
                      That curiosity led me down a path of learning Kali Linux, mastering network protocols, 
                      and understanding how vulnerabilities are discovered and exploited — all to help 
                      organizations defend against real-world threats.
                    </p>
                    <p>
                      Currently pursuing my education while actively participating in CTF competitions, 
                      bug bounty programs, and building security tools. I believe in making 
                      the digital world safer, one vulnerability at a time.
                    </p>
                  </div>
                </motion.div>

                {/* Right — Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-8">
                    My Journey
                  </p>
                  <div className="space-y-8">
                    {MILESTONES.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-5"
                      >
                        {/* Dot + Line */}
                        <div className="flex flex-col items-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#013220] border-[3px] border-[#013220]/20 flex-shrink-0 mt-1" />
                          {i < MILESTONES.length - 1 && (
                            <div className="w-px flex-1 bg-gray-200 mt-2" />
                          )}
                        </div>
                        {/* Content */}
                        <div className="pb-6">
                          <span className="text-xs font-bold text-[#013220] uppercase tracking-wider">{m.year}</span>
                          <h4 className="text-base font-bold text-gray-900 mt-1">{m.title}</h4>
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{m.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <BentoGrid />

          {/* Projects Section */}
          <section id="projects" className="py-20 lg:py-28 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-14"
              >
                <p className="text-sm font-semibold text-[#013220] uppercase tracking-[0.2em] mb-4">
                  Portfolio
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                  Featured Projects
                </h2>
                <p className="text-gray-500 mt-3 text-base max-w-md mx-auto">
                  Security tools and research I've been working on.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {PROJECTS.map((project, i) => {
                  const Icon = project.icon;
                  return (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="card-clean group rounded-xl p-7 bg-white hover-lift"
                    >
                      <div className="w-11 h-11 rounded-lg bg-[#013220]/5 flex items-center justify-center mb-5 group-hover:bg-[#013220]/10 transition-colors">
                        <Icon size={20} className="text-[#013220]" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-[#013220] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-5">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#f7f7f5] text-gray-500 border border-gray-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <a href="#" className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-[#013220] transition-colors">
                            <Github size={15} />
                          </a>
                          <a href="#" className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-[#013220] transition-colors">
                            <ExternalLink size={15} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <Newsletter />
        </main>

        <Footer />
      </div>
    </CartProvider>
    </AuthProvider>
  );
}
