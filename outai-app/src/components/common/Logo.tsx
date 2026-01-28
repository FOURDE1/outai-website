import { cn } from '@/lib/utils';
import logoImage from '@/assets/common/logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

const sizeStyles = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10',
};

export function Logo({ className, size = 'md', variant = 'full' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-start to-primary-end',
          sizeStyles[size],
          'aspect-square',
          className
        )}
      >
        <span className="text-white font-bold text-lg">O</span>
      </div>
    );
  }

  return (
    <a href="/" className={cn('flex items-center', className)}>
      <img
        src={logoImage}
        alt="OUTAI"
        className={cn(
          'h-auto object-contain',
          size === 'sm' && 'w-20',
          size === 'md' && 'w-24',
          size === 'lg' && 'w-32'
        )}
      />
    </a>
  );
}
