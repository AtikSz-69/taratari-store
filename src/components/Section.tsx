import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export default function Section({ title, subtitle, children, action, className = "" }: SectionProps) {
  return (
    <section className={`py-14 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1 font-medium">{subtitle}</p>
            )}
          </div>

          {action && (
            <a
              href={action.href}
              className="group flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors whitespace-nowrap"
            >
              {action.label}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </motion.div>

        {children}
      </div>
    </section>
  );
}
