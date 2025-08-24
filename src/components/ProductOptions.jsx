import React from 'react';

const SIZES = ['S', 'M', 'L'];
const COLORS = ['Red', 'Blue', 'Green'];

export default function ProductOptions({ size, color, qty, onChangeSize, onChangeColor, onChangeQty }) {
  return (
    <div className="mt-3">
      <div className="mb-3">
        <label className="form-label fw-semibold">Size</label>
        <div className="d-flex gap-2 flex-wrap">
          {SIZES.map(s => (
            <button key={s} type="button" className={`btn ${size === s ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => onChangeSize(s)} aria-pressed={size === s}>{s}</button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Color</label>
        <div className="d-flex gap-2 flex-wrap">
          {COLORS.map(c => (
            <button key={c} type="button" className={`btn ${color === c ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => onChangeColor(c)} aria-pressed={color === c}>{c}</button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="qty" className="form-label fw-semibold">Quantity</label>
        <input id="qty" type="number" min={1} className="form-control" value={qty} onChange={(e) => onChangeQty(Math.max(1, Number(e.target.value)))} style={{maxWidth:120}} />
      </div>

      <div className="small text-muted">
        Selected: {size ? `Size ${size}` : '—'}, {color ?? '—'}, Quantity {qty}
      </div>
    </div>
  );
}
