import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false); // To prevent re-animations

  const defaultOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true, // Only trigger the animation once
    ...options,
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsVisible(true);
          setHasIntersected(true);
        } else if (!defaultOptions.triggerOnce) {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [
    defaultOptions.threshold,
    defaultOptions.rootMargin,
    defaultOptions.triggerOnce,
    hasIntersected,
  ]);

  return [elementRef, isVisible, hasIntersected];
};

export default useIntersectionObserver;
