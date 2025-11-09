import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroContent } from '../../utils/constants';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Initialize animations
    if (heroRef.current && contentRef.current && imageRef.current) {
      // Initial state
      gsap.set([contentRef.current.children], { y: 50, opacity: 0 });

      // Animate in the content
      gsap.to([contentRef.current.children], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Parallax effect for hero image
      gsap.to(imageRef.current, {
        y: '+=20',
        rotation: 2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className={`${styles.heroSection} ${styles.altBg}`}
    >
      <div className={`${styles.heroContent} container`}>
        <div ref={imageRef} className={styles.heroImage}>
          <img
            src="/home picture.jpeg"
            alt="Vidya Raut portrait"
            loading="eager"
            onError={e => {
              e.target.style.display = 'none';
              // Add fallback content or icon if needed
              const fallback = document.createElement('div');
              fallback.textContent = 'VR';
              fallback.style.display = 'flex';
              fallback.style.alignItems = 'center';
              fallback.style.justifyContent = 'center';
              fallback.style.width = '100%';
              fallback.style.height = '100%';
              fallback.style.backgroundColor = 'var(--color-background-light)';
              fallback.style.borderRadius = '50%';
              fallback.style.color = 'var(--color-primary)';
              fallback.style.fontSize = '3rem';
              fallback.style.fontWeight = 'bold';
              e.target.parentNode.appendChild(fallback);
            }}
          />
        </div>
        <div ref={contentRef} className={styles.textContent}>
          <h1 className={styles.mainTitle}>{heroContent.name}</h1>
          <p className={styles.subtitle}>{heroContent.title}</p>
          <p className={styles.location}>{heroContent.location}</p>
          <a
            href="/Vidya Raut Resume.docx"
            className={`${styles.resumeBtn} btn`}
            style={{ marginTop: '1.5rem', display: 'inline-block' }}
            download
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
