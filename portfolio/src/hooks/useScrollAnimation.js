import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);

  const {
    from = { y: 50, opacity: 0, scale: 0.95 },
    to = { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
    trigger = null,
    start = 'top 80%',
    end = '+=300',
    scrub = false,
    once = true,
    stagger = 0,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const target = trigger || element;

    // Set initial state
    gsap.set(element, from);

    // Create scroll trigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: target,
      start: start,
      end: end,
      scrub: scrub,
      once: once,
      onEnter: () => {
        if (stagger > 0) {
          gsap.fromTo(element, from, {
            ...to,
            stagger: stagger,
          });
        } else {
          gsap.to(element, {
            ...to,
            onComplete: () => {
              // Clean up the scroll trigger after animation if it's a one-time animation
              if (once) {
                scrollTrigger.kill();
              }
            },
          });
        }
      },
    });

    // Clean up function
    return () => {
      scrollTrigger.kill();
    };
  }, [from, to, trigger, start, end, scrub, once, stagger]);

  return elementRef;
};

export default useScrollAnimation;
