import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface AnimatedSectionProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  ...motionProps
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
