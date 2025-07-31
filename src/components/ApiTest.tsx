'use client';

import { useEffect } from 'react';
import { fetchUsers, fetchUsersXHR } from '../utils/api';
import { useUserContext, userActions } from '../context/UserContext';

export default function UserList() {
  const { state, dispatch } = useUserContext();
  const { users, loading, error } = state;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        dispatch(userActions.setLoading(true));
        dispatch(userActions.setError(null));

        // Try fetch first
        try {
          const fetchedUsers = await fetchUsers();
          dispatch(userActions.setUsers(fetchedUsers));
          return;
        } catch (fetchError) {
          console.log('Fetch failed, trying XHR...', fetchError);
        }

        // Try XHR as fallback
        try {
          const fetchedUsers = await fetchUsersXHR();
          dispatch(userActions.setUsers(fetchedUsers));
          return;
        } catch (xhrError) {
          console.log('XHR also failed:', xhrError);
        }

        // If both methods fail, show error
        throw new Error('Unable to fetch users from API');
      } catch (err) {
        console.error('All methods failed:', err);
        dispatch(
          userActions.setError(
            err instanceof Error ? err.message : 'Failed to fetch users'
          )
        );
      }
    };

    loadUsers();
  }, [dispatch]);

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
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Users ({users.length})
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => dispatch(userActions.selectUser(user))}
          >
            <h3 className="font-semibold text-xl text-gray-900 mb-2">
              {user.name}
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-md font-semibold">Email:</span>{' '}
                {user.email}
              </p>
              <p>
                <span className="text-md font-semibold">Company:</span>{' '}
                {user.company.name}
              </p>
              <p>
                <span className="text-md font-semibold">City:</span>{' '}
                {user.address.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
