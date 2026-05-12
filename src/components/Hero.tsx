import { Button } from './ui/Button';
import { ArrowRight, Shield, Terminal, Bug, Network, Lock, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-[90vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/5 rounded-full blur-[80px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Animated scan line */}
        <motion.div
          animate={{ y: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
        />
      </div>

      <div className="container mx-auto px-4 py-14 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-7"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-cyan-500/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              Cybersecurity Enthusiast
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.1] tracking-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Atikur Rahman
              </span>
              <br />
              <span className="text-gray-400 font-semibold text-2xl md:text-3xl lg:text-4xl">
                Aspiring Ethical Hacker & Security Researcher
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-lg leading-relaxed">
              Passionate about finding vulnerabilities before the bad guys do. 
              I specialize in penetration testing, network security, and OSINT.
              <span className="text-white font-medium"> Let's make the digital world safer.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a href="#projects">
                <Button variant="gradient" size="lg" className="gap-2 px-8 border-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20">
                  View My Work <ArrowRight size={18} />
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" size="lg" className="bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                  🔒 Contact Me
                </Button>
              </a>
            </div>

            {/* Expertise Badges */}
            <div className="flex items-center gap-5 pt-2 text-sm text-gray-500 font-medium flex-wrap">
              {[
                { icon: Shield, label: 'Penetration Testing', color: 'text-cyan-400' },
                { icon: Network, label: 'Network Security', color: 'text-emerald-400' },
                { icon: Eye, label: 'OSINT', color: 'text-violet-400' },
              ].map(({ icon: Icon, label, color }, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Icon className={`${color}`} size={14} />
                  <span className="text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Content — Cyber Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Terminal Window */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-white/10 bg-gray-900"
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-gray-500 ml-2 font-mono">atikur@kali:~</span>
                </div>
                {/* Terminal Content */}
                <div className="p-5 font-mono text-sm space-y-2">
                  <div className="text-gray-500">$ nmap -sV -sC target.com</div>
                  <div className="text-green-400">Starting Nmap 7.94 ( https://nmap.org )</div>
                  <div className="text-cyan-400">PORT    STATE SERVICE  VERSION</div>
                  <div className="text-gray-300">22/tcp  open  ssh      OpenSSH 8.9</div>
                  <div className="text-gray-300">80/tcp  open  http     Apache/2.4</div>
                  <div className="text-yellow-400">443/tcp open  https    nginx 1.24</div>
                  <div className="text-gray-500 mt-3">$ sqlmap -u "target.com/page?id=1"</div>
                  <div className="text-red-400">[!] injectable parameter found</div>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                  />
                </div>
              </motion.div>

              {/* Floating Badge — Skills */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-md bg-gray-900/90 rounded-2xl shadow-2xl border border-white/10 px-6 py-4 min-w-[220px] z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Bug size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">50+</div>
                    <div className="text-xs font-semibold text-gray-400 tracking-wide">Bugs Reported</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge — Tools */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-2 -right-2 backdrop-blur-md bg-gray-900/90 rounded-xl shadow-xl border border-white/10 px-4 py-2.5 z-20"
              >
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-cyan-400" />
                  <span className="text-sm font-bold text-white">Kali Linux</span>
                </div>
                <div className="text-[10px] text-gray-500 font-medium">Primary OS</div>
              </motion.div>

              {/* Lock Icon Badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/4 -left-6 backdrop-blur-md bg-gray-900/90 rounded-xl shadow-xl border border-white/10 px-3 py-2 z-20"
              >
                <Lock size={20} className="text-emerald-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
}
