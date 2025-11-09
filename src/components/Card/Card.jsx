import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  ...props
}) => {
  const cardClassNames = [
    styles.card,
    styles[`card--${variant}`],
    hover ? styles['card--hover'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClassNames} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated', 'flat']),
  hover: PropTypes.bool,
  className: PropTypes.string,
};

export default Card;
