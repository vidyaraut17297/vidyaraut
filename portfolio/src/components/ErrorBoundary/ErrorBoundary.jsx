import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h2 className={styles.errorTitle}>Something went wrong</h2>
            <p className={styles.errorMessage}>
              We're sorry, but something went wrong with the application.
            </p>
            <button
              className={styles.retryButton}
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
            {import.meta.env.DEV && (
              <details className={styles.errorDetails}>
                <summary>Error details</summary>
                <p>
                  <strong>Error:</strong>{' '}
                  {this.state.error && this.state.error.toString()}
                </p>
                <p>
                  <strong>Component Stack:</strong>{' '}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </p>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
