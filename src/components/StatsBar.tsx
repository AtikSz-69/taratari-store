import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Flag, Bug, Award, Folder } from 'lucide-react';

interface StatItem {
  icon: any;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  { icon: Flag, value: 30, suffix: '+', label: 'CTFs Completed', color: 'text-cyan-500' },
  { icon: Bug, value: 50, suffix: '+', label: 'Bugs Reported', color: 'text-red-500' },
  { icon: Award, value: 5, suffix: '+', label: 'Certifications', color: 'text-yellow-500' },
  { icon: Folder, value: 20, suffix: '+', label: 'Projects Built', color: 'text-emerald-500' },
];

function AnimatedCounter({ target, suffix, isFloat }: { target: number; suffix: string; isFloat?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
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
    <section className="relative py-20 overflow-hidden bg-gray-950">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Numbers That Speak
          </h2>
          <p className="text-sm text-gray-500 mt-1.5">Security journey milestones</p>
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
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] group-hover:bg-white/[0.06] group-hover:shadow-lg transition-all duration-300 mb-4 border border-white/5">
                  <Icon size={24} className={`${stat.color} transition-transform group-hover:scale-110`} />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1">
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
