import { Shield, Bug, Lock, Wifi, Globe, Server, Code, Database } from 'lucide-react';
import { motion } from 'motion/react';

const skills = [
  {
    icon: Shield,
    title: 'Penetration Testing',
    description: 'Identifying vulnerabilities in systems, networks, and web applications using industry-standard tools and methodologies.',
    color: 'from-cyan-400 to-blue-500',
    bgColor: 'bg-cyan-950/30',
    size: 'large',
  },
  {
    icon: Bug,
    title: 'Bug Bounty Hunting',
    description: 'Discovering and responsibly disclosing security flaws in real-world applications.',
    color: 'from-red-400 to-rose-500',
    bgColor: 'bg-red-950/20',
    size: 'small',
  },
  {
    icon: Wifi,
    title: 'Network Security',
    description: 'Analyzing network traffic, securing wireless infrastructure, and detecting intrusions.',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-950/20',
    size: 'small',
  },
  {
    icon: Globe,
    title: 'OSINT',
    description: 'Open Source Intelligence gathering, reconnaissance, and digital footprint analysis.',
    color: 'from-violet-400 to-purple-500',
    bgColor: 'bg-violet-950/20',
    size: 'small',
  },
  {
    icon: Code,
    title: 'Web App Security',
    description: 'Testing for OWASP Top 10 vulnerabilities including XSS, SQL Injection, and CSRF.',
    color: 'from-orange-400 to-amber-500',
    bgColor: 'bg-orange-950/20',
    size: 'small',
  },
  {
    icon: Lock,
    title: 'Cryptography',
    description: 'Understanding encryption protocols, hash functions, and secure communication channels. Building systems that protect data at rest and in transit.',
    color: 'from-sky-400 to-blue-600',
    bgColor: 'bg-sky-950/20',
    size: 'large',
  },
];

const tools = [
  'Kali Linux', 'Burp Suite', 'Nmap', 'Metasploit', 'Wireshark', 
  'SQLMap', 'Hashcat', 'John the Ripper', 'Hydra', 'Maltego',
  'Aircrack-ng', 'Nikto', 'OWASP ZAP', 'Gobuster', 'Shodan',
];

export default function BentoGrid() {
  return (
    <section id="skills" className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 border border-cyan-500/20">
            <Shield size={12} />
            Skills & Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Security Arsenal.
          </h2>
          <p className="text-gray-500 mt-2 text-base max-w-md mx-auto">
            Tools and techniques I use to protect digital infrastructure.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-16">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            const isLarge = skill.size === 'large';

            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`relative rounded-2xl border border-white/5 overflow-hidden hover:border-cyan-500/20 transition-colors ${
                  isLarge ? 'md:col-span-2 p-8' : 'p-6'
                } ${skill.bgColor}`}
              >
                {/* Gradient Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${skill.color} opacity-[0.06] rounded-full blur-2xl -translate-y-8 translate-x-8`} />

                <div className="relative z-10">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1.5">{skill.title}</h3>
                  <p className={`text-sm text-gray-400 leading-relaxed ${isLarge ? 'max-w-md' : ''}`}>
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-sm text-gray-400 font-medium hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
