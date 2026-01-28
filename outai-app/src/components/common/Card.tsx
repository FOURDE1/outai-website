import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  className,
  hover = false,
  gradient = false,
  padding = 'md',
  onClick,
}: CardProps) {
  const Component = hover ? motion.div : 'div';

  const baseStyles = cn(
    'rounded-xl bg-[var(--color-bg-secondary)]',
    'border border-[var(--color-border)]',
    paddingStyles[padding],
    gradient && 'gradient-border',
    onClick && 'cursor-pointer',
    className
  );

  if (hover) {
    return (
      <motion.div
        variants={cardHover}
        initial="initial"
        whileHover="hover"
        className={baseStyles}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Component className={baseStyles} onClick={onClick}>
      {children}
    </Component>
  );
}

// Card Header
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

// Card Title
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({ children, className, as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component className={cn('text-xl font-bold text-[var(--color-text-primary)]', className)}>
      {children}
    </Component>
  );
}

// Card Description
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-[var(--color-text-secondary)] mt-1', className)}>
      {children}
    </p>
  );
}

// Card Content
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}

// Card Footer
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-[var(--color-border)]', className)}>
      {children}
    </div>
  );
}
