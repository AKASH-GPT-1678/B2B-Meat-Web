// ConfirmLogoutModal.tsx

import React from 'react';

interface ConfirmLogoutModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmLogoutModal: React.FC<ConfirmLogoutModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
