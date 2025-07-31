'use client';

import { useState, useEffect } from 'react';
import { fetchUsers, fetchUsersXHR } from '../utils/api';
import { User } from '../types/user';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try fetch first
        try {
          const fetchedUsers = await fetchUsers();
          setUsers(fetchedUsers);
          return;
        } catch (fetchError) {
          console.log('Fetch failed, trying XHR...', fetchError);
        }

        // Try XHR as fallback
        try {
          const fetchedUsers = await fetchUsersXHR();
          setUsers(fetchedUsers);
          return;
        } catch (xhrError) {
          console.log('XHR also failed:', xhrError);
        }

        // If both methods fail, show error
        throw new Error('Unable to fetch users from API');
      } catch (err) {
        console.error('All methods failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-600 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Users ({users.length})
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {user.name}
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Company:</span>{' '}
                {user.company.name}
              </p>
              <p>
                <span className="font-medium">City:</span> {user.address.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
