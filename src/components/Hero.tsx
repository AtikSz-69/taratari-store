import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

// Replace this URL with your personal photo
const PROFILE_IMAGE = '/hero-portrait.jpg';

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
                Creative Technologist
              </motion.p>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight">
                Hi, I'm
                <br />
                <span className="text-[#013220]">Atikur Rahman</span>
              </h1>
            </div>

            <p className="text-lg text-gray-500 max-w-md leading-relaxed">
              A passionate tech enthusiast and creative mind from Bangladesh — 
              specializing in cybersecurity, digital innovation, and building 
              things that make an impact.
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

          {/* Animated Portrait — like alejavirivera.com */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Main portrait with floating animation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="w-72 h-80 md:w-80 md:h-[420px] rounded-2xl overflow-hidden shadow-2xl shadow-[#013220]/15"
              >
                <img
                  src={PROFILE_IMAGE}
                  alt="Atikur Rahman"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Floating accent shapes */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 w-24 h-24 rounded-2xl bg-[#013220]/5 border border-[#013220]/10 -z-10"
              />
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-[#013220]/5 border border-[#013220]/10 -z-10"
              />

              {/* Small floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-3 right-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 z-10"
              >
                <div className="text-xs font-semibold text-[#013220]">🇧🇩 Kushtia, Bangladesh</div>
              </motion.div>

              {/* Top-right floating badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -top-2 -left-3 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 z-10"
              >
                <div className="text-xs font-semibold text-gray-700">✨ Creative Technologist</div>
              </motion.div>
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
