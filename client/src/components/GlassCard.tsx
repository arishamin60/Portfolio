import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface GlassCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

export default function GlassCard({
  children,
  className = '',
  intensity = 'medium',
  ...motionProps
}: GlassCardProps) {
  const intensityClasses = {
    light: 'backdrop-blur-md bg-white/5 dark:bg-white/3 border border-white/10 dark:border-white/5',
    medium: 'backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10',
    heavy: 'backdrop-blur-xl bg-white/15 dark:bg-white/8 border border-white/30 dark:border-white/15',
  };

  return (
    <motion.div
      className={`rounded-2xl shadow-xl transition-all duration-300 ${intensityClasses[intensity]} ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
