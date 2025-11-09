import React from 'react';
import Card from '../components/Card';
import { projectsData } from '../data/projects';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ProjectsSection = () => {
  const sectionRef = useScrollAnimation({
    from: { y: 50, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
    trigger: null,
    start: 'top 80%',
    once: true,
  });

  return (
    <section id="projects" ref={sectionRef} className="py-xl">
      <div className="container">
        <h1>Projects</h1>
        <div className="projects-card-grid">
          {projectsData.map(project => (
            <Card
              key={project.id}
              className="projects-card"
              variant="elevated"
              hover={true}
            >
              <h3>{project.title}</h3>
              <table className="projects-table">
                <tr>
                  <td>{project.description}</td>
                </tr>
                <tr>
                  <td>
                    <span className="project-date">{project.duration}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="project-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx}>{tag}</span>
                      ))}
                    </span>
                  </td>
                </tr>
              </table>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
