import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export function Container({
  children,
  className,
  as: Component = 'div',
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn('container-custom', className)}
    >
      {children}
    </Component>
  );
}

// Section wrapper with padding
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'primary' | 'secondary' | 'tertiary' | 'none';
}

const backgroundStyles = {
  primary: 'bg-[var(--color-bg-primary)]',
  secondary: 'bg-[var(--color-bg-secondary)]',
  tertiary: 'bg-[var(--color-bg-tertiary)]',
  none: '',
};

export function Section({
  children,
  className,
  id,
  background = 'none',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-20 lg:py-24',
        backgroundStyles[background],
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

// Section Header with title and description
interface SectionHeaderProps {
  tag?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionHeader({
  tag,
  title,
  description,
  className,
  align = 'center',
}: SectionHeaderProps) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn('max-w-3xl mb-12 md:mb-16', alignStyles[align], className)}>
      {tag && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary-start/10 text-primary-start">
          {tag}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}
