import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Heart,
  Target,
  TrendingUp,
  Battery,
} from 'lucide-react';
import './Timeline.module.css';

const Timeline = ({
  items = [],
  title = 'Timeline',
  icon: TitleIcon = Briefcase,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Define icons for different types of timeline items
  const getIconForType = type => {
    switch (type) {
      case 'education':
        return GraduationCap;
      case 'experience':
        return Briefcase;
      case 'project':
        return Code;
      case 'certification':
        return Award;
      case 'achievement':
        return Target;
      case 'skill':
        return TrendingUp;
      default:
        return Briefcase;
    }
  };

  // Define gradient for different types
  const getGradientForType = type => {
    switch (type) {
      case 'education':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'experience':
        return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      case 'project':
        return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
      case 'certification':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'achievement':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'skill':
        return 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <TitleIcon size={28} className="timeline-header-icon" />
        <h2 className="timeline-header-title">{title}</h2>
      </div>

      <div className="timeline">
        {items.map((item, index) => {
          const IconComponent = getIconForType(item.type) || TitleIcon;
          const gradient = getGradientForType(item.type);

          return (
            <div
              key={index}
              className={`timeline-item ${activeIndex === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="timeline-dot" style={{ background: gradient }}>
                <IconComponent size={16} color="white" />
              </div>

              <div
                className="timeline-content"
                style={{
                  borderLeft: `3px solid ${getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#667eea'}`,
                }}
              >
                <div className="timeline-date">
                  {item.date || item.duration}
                </div>
                <h3 className="timeline-title">{item.title || item.role}</h3>
                <p className="timeline-subtitle">
                  {item.subtitle || item.company}
                </p>

                {item.description && (
                  <p className="timeline-description">{item.description}</p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="timeline-highlights">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="timeline-highlight">
                        <span className="highlight-bullet">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {item.skills && item.skills.length > 0 && (
                  <div className="timeline-skills">
                    {item.skills.map((skill, idx) => (
                      <span key={idx} className="timeline-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Specific experience timeline component for Vidya
const ExperienceTimeline = () => {
  const experienceData = [
    {
      type: 'experience',
      date: 'Jul 2023 - Jun 2024',
      role: 'Market Research Analyst',
      company: 'Customized Energy Solutions',
      description:
        'Analyzed energy sector reports and created strategic dashboards to support market decisions.',
      highlights: [
        'Analyzed 500+ energy sector reports',
        'Created strategic dashboards in Excel',
        'Provided market insights for decisions worth $10M+',
        'Reduced report generation time by 40%',
      ],
      skills: ['Excel', 'Market Research', 'Data Analysis', 'Report Writing'],
    },
    {
      type: 'experience',
      date: 'Jan 2023 - Jun 2023',
      role: 'Laboratory Intern',
      company: 'Customized Energy Solutions',
      description:
        'Conducted battery tests and assisted with R&D material characterization.',
      highlights: [
        'Conducted 200+ battery tests',
        'Assisted with R&D material characterization',
        'Maintained lab safety protocols',
        'Analyzed battery performance data',
      ],
      skills: ['Battery Testing', 'Lab Safety', 'Data Analysis'],
    },
    {
      type: 'experience',
      date: 'Nov 2017 - Apr 2018',
      role: 'Data Analyst',
      company: 'Customized Energy Solutions',
      description:
        'Developed interactive Excel dashboards and presented findings to management.',
      highlights: [
        'Developed interactive Excel dashboards',
        'Presented findings to management',
        'Improved decision-making processes',
      ],
      skills: ['Excel', 'Power BI', 'Data Visualization'],
    },
    {
      type: 'experience',
      date: 'May 2021 - Oct 2021',
      role: 'Teaching Professional',
      company: 'S.S.V.M. & Jr. College',
      description:
        'Taught Science and Mathematics, developed lesson plans, and mentored students.',
      highlights: [
        'Taught Science and Mathematics',
        'Developed lesson plans',
        'Mentored students',
      ],
      skills: ['Communication', 'Presentation', 'Mentoring'],
    },
  ];

  return (
    <Timeline
      items={experienceData}
      title="Professional Experience"
      icon={Briefcase}
    />
  );
};

// Education timeline component
const EducationTimeline = () => {
  const educationData = [
    {
      type: 'education',
      date: 'July 2025 - May 2027',
      title: 'M.Tech in Energy Technology',
      subtitle: 'Savitribai Phule Pune University',
      description:
        'Currently pursuing advanced studies in energy technology and systems.',
      status: 'In Progress',
    },
    {
      type: 'education',
      date: 'Sep 2020 - Apr 2022',
      title: 'Bachelor of Education (B.Ed) - Science & Mathematics',
      subtitle: "Shri Shivaji Maratha Society's Adhyapak Mahavidyalaya",
      description:
        'Completed teacher training program with specialization in Science and Mathematics.',
    },
    {
      type: 'education',
      date: 'Jun 2018 - Apr 2020',
      title: 'Master of Science (M.Sc) - Physics',
      subtitle: 'H.V.Desai Senior College',
      description:
        'Advanced studies in Physics with focus on materials science and research.',
    },
    {
      type: 'education',
      date: 'Aug 2014 - Oct 2017',
      title: 'Bachelor of Science (B.Sc) - Physics',
      subtitle: 'PES Modern College',
      description:
        'Foundation studies in Physics with emphasis on theoretical and experimental physics.',
    },
  ];

  return (
    <Timeline
      items={educationData}
      title="Educational Journey"
      icon={GraduationCap}
    />
  );
};

export { Timeline, ExperienceTimeline, EducationTimeline };
