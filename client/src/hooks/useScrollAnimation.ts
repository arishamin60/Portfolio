import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export function useScrollAnimation() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return {
    ref,
    scaleProgress,
    opacityProgress,
  };
}

export function useParallax(offset: number = 50) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * 0.5 - offset);

  return { ref, y };
}
