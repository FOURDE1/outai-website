import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  labelClassName?: string;
  label?: string;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
  labelClassName,
  label,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const controls = animate(0, value, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)]"
      >
        <span className="gradient-text">
          {prefix}
          {displayValue.toLocaleString()}
          {suffix}
        </span>
      </motion.div>
      {label && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            'mt-2 text-[var(--color-text-secondary)]',
            labelClassName
          )}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}
