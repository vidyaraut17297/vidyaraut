import React from 'react';
import { heroContent } from '../../utils/constants';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section
      id="home"
      className={`${styles.heroSection} ${styles.altBg}`}
    >
      <div className={`${styles.heroContent} container`}>
        <div className={styles.heroImage}>
          <img
            src={import.meta.env.BASE_URL + 'home picture.jpeg'}
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
        <div className={styles.textContent}>
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
