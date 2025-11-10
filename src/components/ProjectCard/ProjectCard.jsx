import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Eye,
  Code,
  FileText,
  Zap,
  Target,
  Sun,
  Battery,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Map project tags to appropriate icons
  const getIconForTag = tag => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('physics') || lowerTag.includes('research'))
      return Lightbulb;
    if (lowerTag.includes('battery') || lowerTag.includes('energy'))
      return Battery;
    if (lowerTag.includes('solar') || lowerTag.includes('pv')) return Sun;
    if (lowerTag.includes('analysis') || lowerTag.includes('excel'))
      return BarChart3;
    if (lowerTag.includes('data')) return Target;
    if (lowerTag.includes('code') || lowerTag.includes('development'))
      return Code;
    if (lowerTag.includes('report') || lowerTag.includes('documentation'))
      return FileText;
    return Zap; // Default icon
  };

  // Generate gradient based on project index for visual variety
  const getGradient = index => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="project-header">
        <div
          className="project-icon-wrapper"
          style={{ background: getGradient(project.index || 0) }}
        >
          {project.icon ? project.icon : <Code size={24} color="white" />}
        </div>
        <div className="project-date">{project.duration}</div>
      </div>

      <h3 className="project-title">{project.title}</h3>

      <p className="project-description">{project.description}</p>

      <div className="project-tags">
        {project.tags &&
          project.tags.map((tag, index) => {
            const IconComponent = getIconForTag(tag);
            return (
              <span
                key={index}
                className="project-tag"
                style={{
                  background: getGradient(index),
                  opacity: 0.9,
                }}
              >
                <IconComponent size={12} color="white" />
                {tag}
              </span>
            );
          })}
      </div>

      <div className="project-stats">
        {project.impact && (
          <div className="project-stat">
            <Target size={14} color="#667eea" />
            <span>{project.impact}</span>
          </div>
        )}
        {project.tech && (
          <div className="project-tech">
            <Zap size={14} color="#4facfe" />
            <span>{project.tech}</span>
          </div>
        )}
      </div>

      <div className="project-actions">
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn demo-btn"
          >
            <Eye size={16} />
            <span>Demo</span>
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn code-btn"
          >
            <Github size={16} />
            <span>Code</span>
          </a>
        )}
        {project.reportLink && (
          <a
            href={project.reportLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn report-btn"
          >
            <FileText size={16} />
            <span>Report</span>
          </a>
        )}
      </div>
    </div>
  );
};

// Specific projects for Vidya based on her portfolio
const ProjectCards = () => {
  const projects = [
    {
      index: 0,
      title: 'Synthesis & Characterization of Fe3O4 Thin Films',
      duration: 'June 2019 - April 2020',
      description:
        'Used Chemical Bath Deposition Method to synthesize and characterize Fe3O4 thin films for materials science research.',
      tags: ['Physics', 'Materials Science', 'Research', 'Thin Films'],
      impact: 'Advanced understanding of magnetic materials',
      tech: 'CBD Method, Characterization',
      icon: <Lightbulb size={24} color="white" />,
    },
    {
      index: 1,
      title: 'Formation of Core Losses of Different Magnetic Materials',
      duration: 'June 2016 - April 2017',
      description:
        'Studied core losses using transformer and hysteresis loop for various magnetic materials in electrical engineering research.',
      tags: [
        'Physics',
        'Electrical Engineering',
        'Magnetic Materials',
        'Research',
      ],
      impact: 'Improved understanding of core loss mechanisms',
      tech: 'Transformer Analysis, Hysteresis',
      icon: <Battery size={24} color="white" />,
    },
    {
      index: 2,
      title: 'Energy Market Analysis Dashboard',
      duration: 'Ongoing',
      description:
        'Excel-based dashboard for tracking energy storage markets, battery technologies, and market sizing data.',
      tags: ['Energy Sector', 'Market Research', 'Excel', 'Data Analysis'],
      impact: '500+ reports analyzed, 40% efficiency gain',
      tech: 'Advanced Excel, Power BI',
      icon: <BarChart3 size={24} color="white" />,
    },
    {
      index: 3,
      title: 'Battery Performance Characterization',
      duration: '2023',
      description:
        'Comprehensive analysis of battery performance metrics and material characterization for energy storage solutions.',
      tags: ['Battery R&D', 'Energy Storage', 'Laboratory', 'Data Analysis'],
      impact: '200+ battery tests conducted',
      tech: 'Battery Testing, Lab Equipment',
      icon: <Battery size={24} color="white" />,
    },
  ];

  return (
    <div className="projects-grid">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={{ ...project, index }} />
      ))}
    </div>
  );
};

export { ProjectCard, ProjectCards };
