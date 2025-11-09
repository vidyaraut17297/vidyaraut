import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll to update active section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = document.querySelectorAll('section[id]');
          let currentSection = 'home';

          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
              window.scrollY >= sectionTop - 100 &&
              window.scrollY < sectionBottom - 100
            ) {
              currentSection = section.getAttribute('id') || 'home';
            }
          });

          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Delay initial execution to ensure sections are rendered
    const initializeScrollDetection = () => {
      const sections = document.querySelectorAll('section[id]');
      if (sections.length > 0) {
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
      } else {
        setTimeout(() => {
          handleScroll();
          window.addEventListener('scroll', handleScroll, { passive: true });
        }, 100);
      }
    };

    setTimeout(initializeScrollDetection, 0);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (e, targetId) => {
    e.preventDefault();

    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setActiveSection('home');
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });

      setTimeout(() => {
        setActiveSection(targetId);
      }, 100);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
    { id: 'fun-crossword', label: 'Game' },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer} aria-label="Main Navigation">
        <div className={styles.navInner}>
          <div className={styles.navLeft}>
            <a
              href="#home"
              className={styles.logoLink}
              aria-label="Home"
              onClick={e => scrollToSection(e, 'home')}
            >
              <img
                src="/logo.png"
                alt="Vidya Raut Logo"
                className={styles.logo}
                onError={e => {
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.textContent = 'VR';
                  fallback.style.display = 'flex';
                  fallback.style.alignItems = 'center';
                  fallback.style.justifyContent = 'center';
                  fallback.style.width = '40px';
                  fallback.style.height = '40px';
                  fallback.style.backgroundColor = 'var(--color-primary)';
                  fallback.style.borderRadius = '50%';
                  fallback.style.color = 'white';
                  fallback.style.fontWeight = 'bold';
                  e.target.parentNode.appendChild(fallback);
                }}
              />
            </a>
          </div>

          <div className={styles.navCenter}>
            <ul className={styles.navList}>
              {navItems.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                    onClick={e => scrollToSection(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.navRight}>
            <ThemeToggle />
            <button
              className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`${styles.mobileNavList} ${isMobileMenuOpen ? styles.active : ''}`}
        >
          <button
            className={styles.mobileCloseButton}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            ✕
          </button>
          <ul className={styles.mobileNavItems}>
            {navItems.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={e => {
                    scrollToSection(e, item.id);
                    setIsMobileMenuOpen(false); // Close menu after navigation
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
