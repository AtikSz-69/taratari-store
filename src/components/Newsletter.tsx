import { Button } from './ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-20">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/6 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-white/10 mb-6">
              <Sparkles size={24} className="text-red-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              Stay Ahead of the Game
            </h2>
            <p className="text-gray-400 mb-8 text-base leading-relaxed max-w-md mx-auto">
              Get exclusive deals, new product drops, and insider tips delivered weekly. No spam — we respect your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.07] border border-white/15 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-sm"
                required
              />
              <Button size="lg" className="bg-red-600 hover:bg-red-500 text-white border-0 px-6 gap-2 shadow-lg shadow-red-600/25">
                Subscribe <ArrowRight size={16} />
              </Button>
            </form>

            <p className="text-[11px] text-gray-600 mt-4">
              Join 5,000+ subscribers. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
