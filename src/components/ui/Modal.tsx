import React, { useEffect } from 'react';

interface ModalProps {
  title: string | null;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  // Close modal on pressing "Escape"
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Modal title */}
        <h2 className="mb-4 text-xl font-semibold">{title}</h2>

        {/* Modal content */}
        <div className="mb-6">{children}</div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              // Placeholder: Add additional action if needed
            }}
            className="btn btn-primary"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
