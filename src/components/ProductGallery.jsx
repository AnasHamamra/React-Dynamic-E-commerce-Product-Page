import React from 'react';

export default function ProductGallery({ images = [], currentIndex = 0, onSelect = () => {} }) {
  const current = images[currentIndex] ?? images[0];
  return (
    <div>
      <div className="position-relative image-wrapper mb-3">
        <img src={current?.src} alt={current?.alt || 'Product image' } style={{width : 300, height: 300 }}/>
        {current?.discount && <span className="badge bg-danger badge-discount">{current.discount} OFF</span>}
      </div>

      <div className="d-flex gap-2 flex-wrap">
        {images.map((img, i) => (
          <button
            key={i}
            className={`btn p-0 thumb ${i === currentIndex ? 'active' : ''}`}
            aria-label={`Show image ${i + 1}`}
            onClick={() => onSelect(i)}
          >
            <img src={img.src} alt={img.alt || `Thumbnail ${i+1}`} style={{width : 100 }}/>
          </button>
        ))}
      </div>
    </div>
  );
}
