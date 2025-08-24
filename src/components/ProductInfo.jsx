import React from 'react';

export default function ProductInfo({ title, price, description }) {
  return (
    <div>
      <h1 className="h3 mb-2" id="productListing">{title}</h1>
      <p className="text-muted mb-2">{description}</p>
      <div className="d-flex align-items-baseline gap-3">
        <span className="h4 mb-0">{price}</span>
      </div>
    </div>
  );
}
