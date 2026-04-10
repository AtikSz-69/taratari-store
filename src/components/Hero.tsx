import { Button } from './ui/Button';
import { ArrowRight, Zap, Shield, Clock, Star, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[80px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
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
              className="inline-flex items-center gap-2 bg-white/[0.08] text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Bangladesh's #1 Digital Store
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.1] tracking-tight">
              Upgrade Your{' '}
              <span className="gradient-text">
                Digital Lifestyle
              </span>
              <br />
              <span className="text-gray-400 font-semibold text-2xl md:text-3xl lg:text-4xl">
                in seconds, not hours.
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-lg leading-relaxed">
              Instant access to Premium Subscriptions, Software Keys, and AI Tools.
              <span className="text-white font-medium"> 100% Genuine. Zero Wait.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button variant="gradient" size="lg" className="gap-2 px-8 border-0">
                Browse Shop <ArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg" className="bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                ⚡ Flash Deals
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-5 pt-2 text-sm text-gray-500 font-medium flex-wrap">
              {[
                { icon: Zap, label: 'Instant Delivery', color: 'text-yellow-400' },
                { icon: Shield, label: 'Secure Payment', color: 'text-emerald-400' },
                { icon: Clock, label: '24/7 Support', color: 'text-sky-400' },
              ].map(({ icon: Icon, label, color }, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Icon className={`${color} fill-current`} size={14} />
                  <span className="text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Product Showcase Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="space-y-4"
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600"
                      alt="Video Editing Tools"
                      className="w-full aspect-[4/5] object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
                  className="pt-8 space-y-4"
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=600"
                      alt="Premium Streaming"
                      className="w-full aspect-[4/5] object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Floating Stats Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-2xl shadow-2xl border border-white/20 px-6 py-4 min-w-[220px] z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-lg shadow-red-600/30">
                    <TrendingUp size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">10,000+</div>
                    <div className="text-xs font-semibold text-gray-500 tracking-wide">Happy Customers</div>
                  </div>
                </div>
              </motion.div>

              {/* Rating Badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-2 -right-2 glass rounded-xl shadow-xl border border-white/20 px-4 py-2.5 z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">4.9</span>
                </div>
                <div className="text-[10px] text-gray-500 font-medium">Avg. Rating</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}
