import React from 'react';

function LoadingSpinner() {
  return (
    <div className="loading-wrapper">
      <div className="spinner"></div>
      <p>Fetching weather...</p>
    </div>
  );
}

export default LoadingSpinner;
