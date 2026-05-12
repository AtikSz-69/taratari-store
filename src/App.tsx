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
    color: 'from-cyan-500 to-blue-600',
    icon: Shield,
  },
  {
    title: 'Web App Penetration Toolkit',
    description: 'Custom toolkit for testing OWASP Top 10 vulnerabilities including SQL injection, XSS, and CSRF on web applications.',
    tags: ['Burp Suite', 'SQLMap', 'Python'],
    color: 'from-red-500 to-orange-500',
    icon: Terminal,
  },
  {
    title: 'OSINT Reconnaissance Framework',
    description: 'Open-source intelligence gathering tool that aggregates data from multiple sources for digital footprint analysis.',
    tags: ['Python', 'Maltego', 'Shodan'],
    color: 'from-violet-500 to-purple-600',
    icon: Globe,
  },
  {
    title: 'Password Cracking Lab',
    description: 'Educational lab environment for understanding password security, hash cracking techniques, and credential stuffing prevention.',
    tags: ['Hashcat', 'John', 'Wordlists'],
    color: 'from-emerald-500 to-teal-600',
    icon: Lock,
  },
];

export default function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <div className="min-h-screen bg-gray-950 font-sans text-white flex flex-col">
        <Header />
        <AdminPanel />
        <UserDashboard />

        <main className="flex-1">
          <Hero />

          {/* About Section */}
          <section id="about" className="py-20 bg-gray-950 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/3 rounded-full blur-[150px]" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400 uppercase tracking-wider mb-6 border border-cyan-500/20">
                  About Me
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6">
                  Securing the Digital World,<br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">One Vulnerability at a Time.</span>
                </h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                  I'm <span className="text-white font-semibold">Atikur Rahman</span>, a cybersecurity enthusiast from Kushtia, Bangladesh. 
                  I'm deeply passionate about ethical hacking, penetration testing, and making technology safer for everyone. 
                  Currently pursuing my education while actively participating in CTF competitions, bug bounty programs, 
                  and building security tools.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  My journey into cybersecurity started with a simple curiosity: <em>"How do hackers think?"</em> 
                  That question led me down a path of learning Kali Linux, mastering network protocols, 
                  and understanding how vulnerabilities are discovered and exploited — all to help organizations 
                  defend against real-world threats.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats */}
          <StatsBar />

          {/* Skills */}
          <BentoGrid />

          {/* Projects Section */}
          <section id="projects" className="py-20 bg-gray-950 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-14"
              >
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 border border-cyan-500/20">
                  <Terminal size={12} />
                  Portfolio
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Featured Projects
                </h2>
                <p className="text-gray-500 mt-2 text-base max-w-md mx-auto">
                  Security tools and research projects I've built.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
                {PROJECTS.map((project, i) => {
                  const Icon = project.icon;
                  return (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/20 transition-all duration-300"
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${project.color} opacity-[0.04] rounded-full blur-2xl -translate-y-8 translate-x-8`} />
                      
                      <div className="relative z-10">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <a href="#" className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-cyan-400 transition-colors">
                              <Github size={16} />
                            </a>
                            <a href="#" className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-cyan-400 transition-colors">
                              <ExternalLink size={16} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Newsletter / Blog Subscribe */}
          <Newsletter />
        </main>

        <Footer />
      </div>
    </CartProvider>
    </AuthProvider>
  );
}
