import React from 'react';
import Card from '../components/Card';
import { allSkills } from '../data/skills';
import useScrollAnimation from '../hooks/useScrollAnimation';

const SkillsSection = () => {
  const sectionRef = useScrollAnimation({
    from: { y: 50, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
    trigger: null,
    start: 'top 80%',
    once: true,
  });

  return (
    <section id="skills" className="py-xl alt-bg" ref={sectionRef}>
      <div className="container">
        <h1>Skills & Technologies</h1>
        <div className="skills-card-grid">
          {allSkills.map((skillCategory, index) => (
            <Card
              key={index}
              className="skills-card"
              variant="elevated"
              hover={true}
            >
              <h3>{skillCategory.category}</h3>
              <table className="skills-table">
                {skillCategory.items.map((skill, idx) => (
                  <tr key={idx}>
                    <td>{skill}</td>
                  </tr>
                ))}
              </table>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
