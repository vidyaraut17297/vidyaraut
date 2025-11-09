import React from 'react';
import Card from '../components/Card';
import useScrollAnimation from '../hooks/useScrollAnimation';

const FunCrosswordSection = () => {
  const sectionRef = useScrollAnimation({
    from: { y: 50, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
    trigger: null,
    start: 'top 80%',
    once: true,
  });

  return (
    <section id="fun-crossword" ref={sectionRef} className="py-xl">
      <div className="container">
        <div className="crossword-container">
          <h2 className="crossword-title">Fun: Marathi Crossword Game</h2>
          <Card variant="elevated" className="crossword-card">
            <iframe
              className="crossword-iframe"
              src="https://marathigames.in/Crossword/crossword.html"
              title="Marathi Crossword Game"
              width="100%"
              height="420"
              style={{
                borderRadius: '1rem',
                border: '2px solid #e2e8f0',
                background: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
              loading="lazy"
            ></iframe>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FunCrosswordSection;
