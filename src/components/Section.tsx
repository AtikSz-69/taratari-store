import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionProps {
  title: string;
  children: ReactNode;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export default function Section({ title, children, action, className = "" }: SectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative pl-4">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-full"></span>
            {title}
          </h2>
          
          {action && (
            <a 
              href={action.href} 
              className="group flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              {action.label}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>
        
        {children}
      </div>
    </section>
  );
}
