import React from 'react';
import './RelatedProducts.css'; // أضفنا ملف CSS منفصل

export default function RelatedProducts({ items = [], onSelect = () => {} }) {
  return (
    <section className="mt-5" aria-label="Related products">
      <h2 className="h5 mb-3">Related Products</h2>
      <div className="row g-4">
        {items.slice(0, 4).map(p => (
          <div className="col-12 col-md-6" key={p.id}>
            <button
              className="card w-100 text-start related-card"
              onClick={() => onSelect(p.id)}
              aria-label={`Open ${p.title}`}
            >
              <div className="image-wrapper1">
                <img
                  src={p.images[0].src}
                  alt={p.images[0].alt || p.title}
                  className="related-img"
                />
              </div>
              <div className="card-body text-center">
                <div className="small text-muted">{p.title}</div>
                <div className="fw-semibold">{p.price}</div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
