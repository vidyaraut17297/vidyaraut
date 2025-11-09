import React from 'react';
import Card from '../components/Card';
import { certificationsData } from '../data/certifications';
import useScrollAnimation from '../hooks/useScrollAnimation';

const CertificationsSection = () => {
  const sectionRef = useScrollAnimation({
    from: { y: 50, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
    trigger: null,
    start: 'top 80%',
    once: true,
  });

  return (
    <section id="certifications" className="py-xl" ref={sectionRef}>
      <div className="container">
        <h1>Certifications</h1>
        <div className="cert-card-grid">
          {certificationsData.map((cert, index) => (
            <Card
              key={cert.id}
              className="cert-card entrance-fade"
              variant="elevated"
              hover={true}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="cert-icon">
                <div className="energy-icon">🏆</div>
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-description">{cert.description}</p>
              {cert.date && <p className="cert-date">{cert.date}</p>}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
