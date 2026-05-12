import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Flag, Bug, Award, Folder } from 'lucide-react';

interface StatItem {
  icon: any;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: Flag, value: 30, suffix: '+', label: 'CTFs Completed' },
  { icon: Bug, value: 50, suffix: '+', label: 'Bugs Reported' },
  { icon: Award, value: 5, suffix: '+', label: 'Certifications' },
  { icon: Folder, value: 20, suffix: '+', label: 'Projects Built' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
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
      setCount(Math.floor(target * eased));
      if (frame >= steps) { setCount(target); clearInterval(timer); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="py-16 bg-[#f7f7f5] border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#013220]/5 mb-4">
                  <Icon size={18} className="text-[#013220]" />
                </div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 font-medium tracking-wide">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
