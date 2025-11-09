import React from 'react';
import Card from '../components/Card';
import { educationData } from '../data/education';
import { educationIcons } from '../utils/icons';
import useScrollAnimation from '../hooks/useScrollAnimation';

const EducationSection = () => {
  const sectionRef = useScrollAnimation({
    from: { y: 50, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
    trigger: null,
    start: 'top 80%',
    once: true,
  });

  return (
    <section id="education" ref={sectionRef} className="py-xl">
      <div className="container">
        <h1>Education</h1>
        <div className="education-cards">
          {educationData.map((edu, index) => (
            <Card
              key={edu.id}
              className="edu-card entrance-fade"
              variant="elevated"
              hover={true}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="edu-icon"
                dangerouslySetInnerHTML={{ __html: educationIcons[edu.icon] }}
              />
              <div className="edu-content">
                <h3 className="edu-institution">{edu.institution}</h3>
                <p className="edu-degree">{edu.degree}</p>
                <p className="edu-date">{edu.duration}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
