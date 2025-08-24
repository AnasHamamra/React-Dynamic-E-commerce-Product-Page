import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap'; 

export default function AddToCartModal({ open, onClose, summary = {} }) {
  const ref = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    if (!modalInstance.current) {
      modalInstance.current = new Modal(ref.current, { backdrop: 'static' });
    }

    if (open) modalInstance.current.show();
    else modalInstance.current.hide();

    const handler = () => onClose?.();
    ref.current.addEventListener('hidden.bs.modal', handler);

    return () => {
      ref.current?.removeEventListener('hidden.bs.modal', handler);
    };
  }, [open, onClose]);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={ref}
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 id="cartModalLabel" className="modal-title">
              Added to Cart
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p className="mb-1">
              <strong>Product:</strong> {summary.title}
            </p>
            <p className="mb-1">
              <strong>Size:</strong> {summary.size}
            </p>
            <p className="mb-1">
              <strong>Color:</strong> {summary.color}
            </p>
            <p className="mb-0">
              <strong>Quantity:</strong> {summary.qty}
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-dark" data-bs-dismiss="modal">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
