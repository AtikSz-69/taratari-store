import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, ShoppingBag, Star, TrendingUp } from 'lucide-react';

interface StatItem {
  icon: any;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Customers', color: 'text-blue-500' },
  { icon: ShoppingBag, value: 25000, suffix: '+', label: 'Products Sold', color: 'text-emerald-500' },
  { icon: Star, value: 4.9, suffix: '/5', label: 'Avg. Rating', color: 'text-yellow-500' },
  { icon: TrendingUp, value: 99, suffix: '%', label: 'Satisfaction Rate', color: 'text-red-500' },
];

function AnimatedCounter({ target, suffix, isFloat }: { target: number; suffix: string; isFloat?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      current = Math.min(current + increment, target);

      // Ease-out: slow down towards end
      const progress = frame / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isFloat ? parseFloat((target * eased).toFixed(1)) : Math.floor(target * eased));

      if (frame >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target, isFloat]);

  return (
    <span ref={ref} className="tabular-nums">
      {isFloat ? count.toFixed(1) : count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Liquid Gradient Background */}
      <div className="absolute inset-0 liquid-gradient opacity-[0.06]" />
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            Numbers That Speak
          </h2>
          <p className="text-sm text-gray-500 mt-1.5">Real results, real trust</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-white group-hover:shadow-lg transition-all duration-300 mb-4 border border-gray-100">
                  <Icon size={24} className={`${stat.color} transition-transform group-hover:scale-110`} />
                </div>
                <div className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isFloat={stat.value < 10}
                  />
                </div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
