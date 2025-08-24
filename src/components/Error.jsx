import React from 'react';

export default function Error({ message, onRetry }) {
  return (
    <div className="alert alert-danger d-flex justify-content-between align-items-center">
      <span>{message || 'Failed to load product.'}</span>
      {onRetry && <button className="btn btn-sm btn-dark" onClick={onRetry}>Retry</button>}
    </div>
  );
}
