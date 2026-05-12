import { Shield, Bug, Wifi, Globe, Code, Lock } from 'lucide-react';
import { motion } from 'motion/react';

const skills = [
  { icon: Shield, title: 'Penetration Testing' },
  { icon: Bug, title: 'Bug Bounty Hunting' },
  { icon: Wifi, title: 'Network Security' },
  { icon: Globe, title: 'OSINT' },
  { icon: Code, title: 'Web App Security' },
  { icon: Lock, title: 'Cryptography' },
];

const tools = [
  'Kali Linux', 'Burp Suite', 'Nmap', 'Metasploit', 'Wireshark',
  'SQLMap', 'Hashcat', 'John the Ripper', 'Hydra', 'Maltego',
  'Aircrack-ng', 'Nikto', 'OWASP ZAP', 'Gobuster', 'Shodan',
];

export default function BentoGrid() {
  return (
    <section id="skills" className="relative overflow-hidden">
      {/* Green Band */}
      <div className="bg-[#013220] py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[#7cc9a5] text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              What I Do
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Skills & Expertise
            </h2>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5 max-w-4xl mx-auto mb-16">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 transition-colors">
                    <Icon size={18} className="text-[#7cc9a5]" />
                  </div>
                  <span className="text-sm font-semibold text-white/90">{skill.title}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Tools Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-center text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-2.5">
              {tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                  className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-white/60 font-medium hover:text-white hover:border-white/20 transition-colors cursor-default"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
