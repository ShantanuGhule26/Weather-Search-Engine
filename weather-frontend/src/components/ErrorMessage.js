import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="error-banner">
      <span>⚠️ {message}</span>
    </div>
  );
}

export default ErrorMessage;
