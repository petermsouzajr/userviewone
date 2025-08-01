'use client';

import { useRouter } from 'next/navigation';
import AddUserForm from '../../components/AddUserForm';

export default function AddUserPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const handleSuccess = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
              <p className="mt-2 text-gray-600">
                Fill out the form below to add a new user to the system.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Back to Users
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <AddUserForm
            isOpen={true}
            onClose={handleClose}
            onSuccess={handleSuccess}
            mode="page"
          />
        </div>
      </div>
    </div>
  );
}
