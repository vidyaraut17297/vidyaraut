import React from 'react';
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
          {experienceData.map(exp => (
            <div key={exp.id} className="exp-item">
              <div className="exp-date">
                <span className="exp-duration">{exp.duration}</span>
              </div>
              <div className="exp-details">
                <h3 className="exp-title">{exp.title}</h3>
                <p className="exp-company">{exp.company}</p>
                <p className="exp-location">{exp.location}</p>
                <div className="exp-description">
                  {Array.isArray(exp.description) ? (
                    exp.description.map((desc, i) => (
                      <p key={i} className="exp-bullet">
                        {desc}
                      </p>
                    ))
                  ) : (
                    <p>{exp.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
