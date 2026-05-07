import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollTrigger(callback: () => void, dependencies: any[] = []) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      onEnter: () => callback(),
      onEnterBack: () => callback(),
    });

    return () => {
      trigger.kill();
    };
  }, dependencies);

  return ref;
}

export function useStickySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return ref;
}
