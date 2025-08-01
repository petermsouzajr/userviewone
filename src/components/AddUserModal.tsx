'use client';

import AddUserForm from './AddUserForm';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  if (!isOpen) {
    return null;
  }

  return <AddUserForm isOpen={isOpen} onClose={onClose} />;
}
