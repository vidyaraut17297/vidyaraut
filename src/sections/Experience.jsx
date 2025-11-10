import React from 'react';
import Card from '../components/Card';
import { experienceData } from '../data/experience';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ExperienceSection = () => {
  const sectionRef = useScrollAnimation({
    from: { y: 50, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
    trigger: null,
    start: 'top 80%',
    once: true,
  });

  return (
    <section id="experience" ref={sectionRef} className="py-xl">
      <div className="container">
        <h1>Work Experience</h1>

        <div className="experience-timeline">
          {experienceData.map((exp, index) => (
            <div
              key={exp.id}
              className="timeline-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="exp-duration-badge">
                  <span className="exp-duration">{exp.duration}</span>
                </div>
                <Card variant="elevated" hover={true} className="exp-card">
                  <div className="exp-header">
                    <h3 className="exp-title">{exp.title}</h3>
                    <div className="exp-meta">
                      <h4 className="exp-company">{exp.company}</h4>
                      <p className="exp-location">{exp.location}</p>
                    </div>
                  </div>

                  <div className="exp-description">
                    {Array.isArray(exp.description) ? (
                      <ul className="exp-achievements">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="exp-achievement-item">
                            <span className="achievement-dot"></span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="exp-summary">{exp.description}</p>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
