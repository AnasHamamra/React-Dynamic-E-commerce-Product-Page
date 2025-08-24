import React from 'react';

export default function Loader() {
  return (
    <div className="py-5 text-center">
      <div className="spinner-border text-dark" role="status" />
      <div className="mt-2">Loading product…</div>
    </div>
  );
}
