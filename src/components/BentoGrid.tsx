import { Zap, Shield, Clock, CreditCard, Headphones, Gift } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Zap,
    title: 'Instant Delivery',
    description: 'Get your digital products within seconds of purchase. No waiting, no delays.',
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-50',
    size: 'large',
  },
  {
    icon: Shield,
    title: '100% Genuine',
    description: 'Every license, key, and subscription is authentic and verified.',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
    size: 'small',
  },
  {
    icon: CreditCard,
    title: 'bKash & Nagad',
    description: 'Pay with your preferred Bangladeshi payment method.',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
    size: 'small',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our team is always ready to help via call, chat, or email — any time, any day.',
    color: 'from-sky-400 to-blue-500',
    bgColor: 'bg-sky-50',
    size: 'small',
  },
  {
    icon: Gift,
    title: 'Loyalty Rewards',
    description: 'Earn points on every purchase and unlock exclusive discounts.',
    color: 'from-violet-400 to-purple-500',
    bgColor: 'bg-violet-50',
    size: 'small',
  },
  {
    icon: Clock,
    title: 'Hassle-Free Refunds',
    description: 'Not satisfied? Get a full refund within 24 hours. We guarantee your satisfaction with every purchase.',
    color: 'from-red-400 to-red-600',
    bgColor: 'bg-red-50',
    size: 'large',
  },
];

export default function BentoGrid() {
  return (
    <section className="py-16 bg-white relative noise-overlay overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">
            <Shield size={12} />
            Why 10,000+ trust Taratari
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Built Different.
          </h2>
          <p className="text-gray-500 mt-2 text-base max-w-md mx-auto">
            Premium features that set us apart from the rest.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isLarge = feature.size === 'large';

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`bento-item relative rounded-2xl border border-gray-100 overflow-hidden ${
                  isLarge ? 'md:col-span-2 p-8' : 'p-6'
                } ${feature.bgColor}`}
              >
                {/* Gradient Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.color} opacity-[0.08] rounded-full blur-2xl -translate-y-8 translate-x-8`} />

                <div className="relative z-10">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">{feature.title}</h3>
                  <p className={`text-sm text-gray-600 leading-relaxed ${isLarge ? 'max-w-md' : ''}`}>
                    {feature.description}
                  </p>
                </div>

                {/* Hover gradient border overlay */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-gradient-to-r opacity-0 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
