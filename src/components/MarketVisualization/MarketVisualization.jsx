import React from 'react';
import PropTypes from 'prop-types';
import styles from './MarketVisualization.module.css';

const MarketVisualization = ({ title, type = 'line' }) => {
  // Generate visualization based on data
  const renderChart = () => {
    if (type === 'line') {
      return (
        <div className={styles.lineChart}>
          <svg viewBox="0 0 400 100" className={styles.chartSvg}>
            <path
              d="M 20 80 Q 100 40, 180 60 T 380 30"
              stroke="#0071e3"
              strokeWidth="3"
              fill="none"
              className={styles.chartLine}
            />
            <circle
              cx="20"
              cy="80"
              r="4"
              fill="#0071e3"
              className={styles.chartPoint}
            />
            <circle
              cx="100"
              cy="40"
              r="4"
              fill="#0071e3"
              className={styles.chartPoint}
            />
            <circle
              cx="180"
              cy="60"
              r="4"
              fill="#0071e3"
              className={styles.chartPoint}
            />
            <circle
              cx="260"
              cy="45"
              r="4"
              fill="#0071e3"
              className={styles.chartPoint}
            />
            <circle
              cx="380"
              cy="30"
              r="4"
              fill="#0071e3"
              className={styles.chartPoint}
            />
          </svg>
        </div>
      );
    } else if (type === 'bar') {
      return (
        <div className={styles.barChart}>
          <svg viewBox="0 0 400 100" className={styles.chartSvg}>
            <rect
              x="40"
              y="60"
              width="40"
              height="40"
              fill="#0071e3"
              rx="4"
              className={styles.bar}
            />
            <rect
              x="100"
              y="40"
              width="40"
              height="60"
              fill="#6e6e73"
              rx="4"
              className={styles.bar}
            />
            <rect
              x="160"
              y="30"
              width="40"
              height="70"
              fill="#005bb5"
              rx="4"
              className={styles.bar}
            />
            <rect
              x="220"
              y="50"
              width="40"
              height="50"
              fill="#f5b700"
              rx="4"
              className={styles.bar}
            />
            <rect
              x="280"
              y="20"
              width="40"
              height="80"
              fill="#0071e3"
              rx="4"
              className={styles.bar}
            />
          </svg>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.marketVisualization}>
      <h4 className={styles.chartTitle}>{title}</h4>
      {renderChart()}
    </div>
  );
};

MarketVisualization.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  type: PropTypes.oneOf(['line', 'bar', 'pie']),
};

export default MarketVisualization;
