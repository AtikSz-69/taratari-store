import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-semibold text-[#013220] uppercase tracking-[0.2em] mb-4"
              >
                Cybersecurity Enthusiast
              </motion.p>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight">
                Securing the
                <br />
                <span className="text-[#013220]">digital world</span>
              </h1>
            </div>

            <p className="text-lg text-gray-500 max-w-md leading-relaxed">
              I'm Atikur Rahman — an aspiring ethical hacker and security researcher 
              from Bangladesh, specializing in penetration testing, network security, and OSINT.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#013220] text-white rounded-lg hover:bg-[#024a2e] transition-colors"
              >
                View My Work <ArrowRight size={16} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:border-[#013220] hover:text-[#013220] transition-colors"
              >
                About Me
              </a>
            </div>
          </motion.div>

          {/* Portrait / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Main portrait area */}
              <div className="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#013220] to-[#024a2e] shadow-2xl shadow-[#013220]/20">
                <div className="w-full h-full flex items-center justify-center">
                  {/* Abstract cyber pattern instead of photo */}
                  <div className="text-center space-y-4 p-8">
                    <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <span className="font-heading text-3xl font-bold text-white">AR</span>
                    </div>
                    <div className="space-y-2">
                      <div className="font-mono text-xs text-white/60">
                        <div>$ whoami</div>
                        <div className="text-white/90 mt-1">atikur_rahman</div>
                      </div>
                      <div className="font-mono text-xs text-white/60">
                        <div>$ cat role.txt</div>
                        <div className="text-white/90 mt-1">ethical_hacker</div>
                      </div>
                      <div className="font-mono text-xs text-white/60">
                        <div>$ echo $LOCATION</div>
                        <div className="text-white/90 mt-1">Kushtia, BD</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent shapes */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-[#013220]/5 border border-[#013220]/10"
              />
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[#013220]/5 border border-[#013220]/10"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="hidden lg:flex justify-center mt-16"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-gray-300 hover:text-[#013220] transition-colors">
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <ArrowDown size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
