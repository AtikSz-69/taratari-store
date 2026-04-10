import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-red-600 text-white hover:bg-red-500 shadow-sm shadow-red-600/20 border-transparent',
      secondary: 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm border-transparent',
      outline: 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 border-transparent',
      danger: 'bg-red-100 text-red-600 hover:bg-red-200 border-transparent',
      gradient: 'bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_100%] text-white border-transparent shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 btn-shine',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10 p-2 flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border magnetic-hover',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
