import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import BentoGrid from '@/components/BentoGrid';
import StatsBar from '@/components/StatsBar';
import { motion } from 'motion/react';
import { ExternalLink, Github, Shield, Terminal, Globe, Lock } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Network Security Monitor',
    description: 'An automated Python tool that monitors network health, detects anomalies, and ensures infrastructure stays protected around the clock.',
    tags: ['Python', 'Networking', 'Automation'],
    icon: Shield,
  },
  {
    title: 'Web Security Analyzer',
    description: 'A comprehensive testing toolkit that helps organizations identify and fix security gaps in their web applications before they become problems.',
    tags: ['Security', 'Web Apps', 'Python'],
    icon: Terminal,
  },
  {
    title: 'Digital Intelligence Platform',
    description: 'An open-source intelligence platform that aggregates publicly available data to help researchers understand digital footprints and online presence.',
    tags: ['Python', 'Data Analysis', 'OSINT'],
    icon: Globe,
  },
  {
    title: 'Cryptography Learning Lab',
    description: 'An interactive educational environment for understanding encryption, secure communications, and modern cryptographic protocols.',
    tags: ['Cryptography', 'Education', 'Security'],
    icon: Lock,
  },
];

const MILESTONES = [
  { year: '2024', title: 'Discovered My Passion', desc: 'Fell in love with technology and cybersecurity — started my self-learning journey.' },
  { year: '2024', title: 'First Security Challenge', desc: 'Participated in my first Capture The Flag competition and got hooked on problem-solving.' },
  { year: '2025', title: 'Contributing to Safety', desc: 'Started responsibly reporting security issues to help organizations protect their users.' },
  { year: '2026', title: 'Building & Creating', desc: 'Developing my own security tools and sharing knowledge with the community.' },
];

export default function App() {
  return (
      <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
        <Header />

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
                    Driven by curiosity,<br />
                    <span className="text-[#013220]">powered by</span><br />
                    passion for technology.
                  </h2>
                  <div className="space-y-4 text-gray-500 text-base leading-relaxed">
                    <p>
                      I'm <span className="text-gray-900 font-semibold">Atikur Rahman</span>, a creative 
                      technologist from Kushtia, Bangladesh. My journey into tech began with a simple curiosity: 
                      <em className="text-gray-700"> "How does the digital world really work?"</em>
                    </p>
                    <p>
                      That curiosity led me to explore cybersecurity, software development, 
                      and digital innovation — learning how systems work, how to protect them, 
                      and how to build meaningful solutions for real-world problems.
                    </p>
                    <p>
                      Currently pursuing my education while actively participating in security challenges, 
                      building creative tools, and contributing to the tech community. I believe in 
                      using technology to create positive impact.
                    </p>
                  </div>
                  
                  {/* Personal Editorial Photo */}
                  <div className="mt-10 rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-[#013220]/5 relative group max-w-sm">
                    <img 
                      src="/about-portrait.jpg" 
                      alt="Atikur Personal" 
                      className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
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
        </main>

        <Footer />
      </div>
  );
}
