import React from 'react';
import {
  BarChart3,
  Battery,
  Sun,
  Target,
  Briefcase,
  Award,
  Code,
  GraduationCap,
  FileText,
  Lightbulb,
  Heart,
  Star,
  Zap,
  TrendingUp,
  Download,
  Mail,
  ExternalLink,
} from 'lucide-react';
import './SkillIcons.module.css';

const SkillIcon = ({
  icon,
  label,
  gradient,
  size = 24,
  animation = 'pulse',
}) => {
  const IconComponent = icon;
  return (
    <div
      className={`skill-icon ${animation}`}
      style={{
        background: gradient,
        width: `${size + 12}px`,
        height: `${size + 12}px`,
      }}
    >
      <IconComponent size={size} color="white" />
      {label && <span className="skill-label">{label}</span>}
    </div>
  );
};

const SkillIcons = () => {
  const skillCategories = {
    technical: {
      title: 'Technical Skills',
      icon: BarChart3,
      skills: [
        {
          icon: BarChart3,
          label: 'Excel',
          gradient: 'linear-gradient(135deg, #217346 0%, #4CAF50 100%)',
          animation: 'bounce',
        },
        {
          icon: TrendingUp,
          label: 'Power BI',
          gradient: 'linear-gradient(135deg, #F2C811 0%, #F7B731 100%)',
          animation: 'pulse',
        },
        {
          icon: Battery,
          label: 'BMS',
          gradient: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
          animation: 'float',
        },
        {
          icon: Sun,
          label: 'Solar',
          gradient: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 100%)',
          animation: 'glow',
        },
        {
          icon: Target,
          label: 'Analysis',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          animation: 'rotate',
        },
        {
          icon: Lightbulb,
          label: 'R&D',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          animation: 'wiggle',
        },
      ],
    },
    domain: {
      title: 'Domain Expertise',
      icon: Briefcase,
      skills: [
        {
          icon: Zap,
          label: 'Energy',
          gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
          animation: 'pulse',
        },
        {
          icon: Battery,
          label: 'Storage',
          gradient: 'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)',
          animation: 'float',
        },
        {
          icon: Sun,
          label: 'Solar PV',
          gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          animation: 'glow',
        },
        {
          icon: Target,
          label: 'Market',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          animation: 'bounce',
        },
        {
          icon: TrendingUp,
          label: 'Sizing',
          gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          animation: 'rotate',
        },
        {
          icon: Award,
          label: 'Intelli',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          animation: 'wiggle',
        },
      ],
    },
    soft: {
      title: 'Soft Skills',
      icon: Heart,
      skills: [
        {
          icon: Heart,
          label: 'Analytical',
          gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
          animation: 'pulse',
        },
        {
          icon: Lightbulb,
          label: 'Think',
          gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
          animation: 'float',
        },
        {
          icon: Star,
          label: 'Detail',
          gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
          animation: 'glow',
        },
        {
          icon: Download,
          label: 'Learner',
          gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
          animation: 'bounce',
        },
        {
          icon: Mail,
          label: 'Comm',
          gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
          animation: 'rotate',
        },
        {
          icon: ExternalLink,
          label: 'Team',
          gradient: 'linear-gradient(135deg, #a6c0fe 0%, #f68084 100%)',
          animation: 'wiggle',
        },
      ],
    },
  };

  return (
    <div className="skill-icons-container">
      {Object.entries(skillCategories).map(([key, category]) => (
        <div key={key} className="skill-category">
          <h3 className="skill-category-title">
            <category.icon size={20} style={{ marginRight: '8px' }} />
            {category.title}
          </h3>
          <div className="skill-icons-grid">
            {category.skills.map((skill, index) => (
              <SkillIcon
                key={index}
                icon={skill.icon}
                label={skill.label}
                gradient={skill.gradient}
                animation={skill.animation}
                size={24}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillIcons;
