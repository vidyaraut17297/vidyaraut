import React from 'react';
import Card from '../components/Card';
import { aboutContent } from '../utils/constants';
import useScrollAnimation from '../hooks/useScrollAnimation';

const AboutSection = () => {
  const sectionRef = useScrollAnimation({
    from: { y: 50, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
    trigger: null,
    start: 'top 80%',
    once: true,
  });

  return (
    <section id="about" ref={sectionRef} className="py-xl">
      <div className="container">
        <h1>About Me</h1>
        <div className="about-card-grid">
          <Card className="about-card" variant="elevated" hover={true}>
            <blockquote className="intro">{aboutContent.intro}</blockquote>
            <p>{aboutContent.description}</p>
            <p>
              <strong>Focus areas:</strong> {aboutContent.focusAreas}
            </p>
            <p>
              <strong>Tools:</strong> {aboutContent.tools}
            </p>
            <p>
              <strong>Looking for:</strong> {aboutContent.lookingFor}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
