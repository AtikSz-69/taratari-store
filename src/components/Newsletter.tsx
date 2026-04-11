import { useState } from 'react';
import { Button } from './ui/Button';
import { Sparkles, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ type: 'success', message: data.message || 'Subscribed successfully!' });
        setEmail('');
      } else {
        setResult({ type: 'error', message: data.error || 'Failed to subscribe' });
      }
    } catch {
      setResult({ type: 'error', message: 'Network error. Please try again later.' });
    }
    setSubmitting(false);
  }

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

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.07] border border-white/15 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-sm"
                required
              />
              <Button type="submit" size="lg" disabled={submitting} className="bg-red-600 hover:bg-red-500 text-white border-0 px-6 gap-2 shadow-lg shadow-red-600/25 disabled:opacity-75">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <>Subscribe <ArrowRight size={16} /></>}
              </Button>
            </form>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 ${
                  result.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                {result.type === 'success' && <CheckCircle size={16} />}
                {result.message}
              </motion.div>
            )}

            <p className="text-[11px] text-gray-600 mt-4">
              Join 5,000+ subscribers. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
