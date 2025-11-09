import React from 'react';

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
import AIChatbot from './components/AIChatbot/AIChatbot';

import './styles/global.css';
import './styles/animations.css';
import './styles/card-layouts.css';
import './styles/mobile-friendly.css';
import './styles/dark-mode-cards.css';

function App() {
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
      </div>
    </ErrorBoundary>
  );
}

export default App;
