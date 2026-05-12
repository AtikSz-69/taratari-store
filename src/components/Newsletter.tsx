import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
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
    <section id="blog" className="py-20 bg-[#f7f7f5] border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-[#013220] uppercase tracking-[0.2em] mb-4">
              Stay Updated
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Security insights,<br />delivered.
            </h2>
            <p className="text-gray-500 mb-8 text-base leading-relaxed">
              Get my latest cybersecurity research, CTF writeups, and security tips delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013220]/20 focus:border-[#013220] transition-all text-sm"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[#013220] text-white rounded-lg hover:bg-[#024a2e] transition-colors disabled:opacity-60"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <>Subscribe <ArrowRight size={14} /></>}
              </button>
            </form>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 ${
                  result.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}
              >
                {result.type === 'success' && <CheckCircle size={15} />}
                {result.message}
              </motion.div>
            )}

            <p className="text-xs text-gray-400 mt-4">
              No spam — only security insights. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
