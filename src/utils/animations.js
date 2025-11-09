import { gsap } from 'gsap';

// Utility function for card animations
export const animateCards = (selector, stagger = 0.1) => {
  const cards = document.querySelectorAll(selector);
  if (cards.length > 0) {
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: stagger,
        ease: 'power2.out',
        delay: 0.4,
      }
    );
  }
};

// Utility function for hover animations
export const addHoverEffects = selector => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    element.addEventListener('mouseleave', () => {
      gsap.to(element, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
};

// Utility function for button animations
export const addButtonHoverEffects = selector => {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  });
};

// Page load animation
export const pageLoadAnimation = () => {
  gsap.set('body', { autoAlpha: 0 });
  gsap.to('body', { autoAlpha: 1, duration: 0.5 });
};
