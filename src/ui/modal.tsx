'use client'
import { createPortal } from 'react-dom';
import { ModalProps } from '../types/modal';

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2>{title}</h2>
            <button onClick={onClose} style={{color: "#5F1108", fontSize: 20, fontWeight: "bold"}}>
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