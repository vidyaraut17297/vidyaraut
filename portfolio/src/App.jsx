import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import AboutSection from './sections/About';
import SkillsSection from './sections/Skills';
import ProjectsSection from './sections/Projects';
import CertificationsSection from './sections/Certifications';
import ExperienceSection from './sections/Experience';
import EducationSection from './sections/Education';
import FunCrosswordSection from './sections/FunCrossword';
import ContactSection from './sections/Contact';
import Footer from './components/Footer/Footer';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import AIChatbot from './components/AIChatbot/AIChatbot';

import './styles/global.css';
import './styles/animations.css';
import './styles/card-layouts.css';
import './styles/mobile-friendly.css';
import './styles/dark-mode-cards.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize animation effects only - theme is handled by ThemeToggle component
    // Set initial state for page load animation
    gsap.set('body', { autoAlpha: 0 });

    // Fade in the entire page with elegant transition
    gsap.to('body', { autoAlpha: 1, duration: 0.8, ease: 'power2.out' });

    // Enhanced scroll animations for sections (keeping section animations)
    gsap.utils.toArray('section').forEach(section => {
      gsap.fromTo(
        section,
        {
          y: 50,
          opacity: 0,
          scale: 0.98,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <Navigation />
        <main>
          <Hero />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificationsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
          <FunCrosswordSection />
        </main>
        <Footer />
        <AIChatbot />
        <ThemeToggle />
      </div>
    </ErrorBoundary>
  );
}

export default App;
