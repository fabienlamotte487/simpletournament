'use client'
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '../types/modal';

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    modalRef.current?.focus();

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className="modal-body"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 id="modal-title">{title}</h2>
            <button
              onClick={onClose}
              style={{color: "#5F1108", fontSize: 20, fontWeight: "bold"}}
              aria-label="Fermer la fenêtre"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
