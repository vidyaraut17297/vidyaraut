import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  ...props
}) => {
  const baseClasses = 'card';
  const variantClasses = variant !== 'default' ? `card--${variant}` : '';
  const hoverClasses = hover ? 'card--hover' : '';
  const customClasses = className;

  const classes = [baseClasses, variantClasses, hoverClasses, customClasses]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated', 'flat']),
  hover: PropTypes.bool,
};

export default Card;