import React from 'react';
import Card from '../components/Card';
import MarketVisualization from '../components/MarketVisualization/MarketVisualization';
import useScrollAnimation from '../hooks/useScrollAnimation';

const EnergyInsightsSection = () => {
  const sectionRef = useScrollAnimation({
    from: { y: 50, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
    trigger: null,
    start: 'top 80%',
    once: true,
  });

  const energyData = [
    {
      title: 'Energy Storage Systems Growth',
      description: 'Global ESS market expected to reach $54B by 2030',
      insight:
        'Focus on lithium-ion and emerging technologies like solid-state batteries',
    },
    {
      title: 'Renewable Energy Integration',
      description:
        'Solar and wind power now cost-competitive with fossil fuels',
      insight:
        'Grid stability solutions and smart grid technologies driving growth',
    },
    {
      title: 'Power Market Dynamics',
      description:
        'Intraday trading volumes increasing with renewable volatility',
      insight:
        'Advanced analytics and forecasting tools becoming critical infrastructure',
    },
  ];

  return (
    <section id="insights" ref={sectionRef} className="py-xl alt-bg">
      <div className="container">
        <h1>Energy Market Insights</h1>
        <p
          className="text-center mb-xl"
          style={{ maxWidth: '800px', margin: '0 auto 2rem' }}
        >
          Data-driven insights from my research in energy storage, power
          markets, and renewable integration
        </p>
        <div className="energy-insights-grid">
          {energyData.map((item, index) => (
            <Card
              key={index}
              className="energy-card entrance-fade"
              variant="elevated"
              hover={true}
            >
              <MarketVisualization
                title={item.title}
                type={index % 2 === 0 ? 'line' : 'bar'}
              />
              <h3>{item.title}</h3>
              <p>
                <strong>{item.description}</strong>
              </p>
              <p>{item.insight}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnergyInsightsSection;
