'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserTable from './UserTable';
import UserModal from './UserModal';
import AddUserModal from './AddUserModal';
import ErrorBoundary from './ErrorBoundary';
import { Button } from './ui';

export default function UserListPage() {
  const router = useRouter();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const handleOpenAddUser = () => {
    setIsAddUserOpen(true);
  };

  const handleCloseAddUser = () => {
    setIsAddUserOpen(false);
  };

  const handleNavigateToAddUser = () => {
    router.push('/add-user');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleOpenAddUser}>
              Quick Add (Modal)
            </Button>
            <Button variant="secondary" onClick={handleNavigateToAddUser}>
              Add User (Page)
            </Button>
          </div>
        </div>
        <ErrorBoundary>
          <UserTable />
        </ErrorBoundary>
        <UserModal />
        <AddUserModal isOpen={isAddUserOpen} onClose={handleCloseAddUser} />
      </div>
    </div>
  );
}
