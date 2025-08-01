'use client';

import UserList from '../components/ApiTest';
import UserModal from '../components/UserModal';
import AddUserForm from '../components/AddUserForm';
import { Button } from '../components/ui';
import { useState } from 'react';

export default function Home() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
          <Button variant="secondary" onClick={() => setIsAddUserOpen(true)}>
            Add User
          </Button>
        </div>
        <UserList />
        <UserModal />
        <AddUserForm
          isOpen={isAddUserOpen}
          onClose={() => setIsAddUserOpen(false)}
        />
      </div>
    </div>
  );
}
