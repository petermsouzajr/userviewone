'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useUserContext, userActions } from '../context/UserContext';
import { User } from '../types/user';
import { fetchUsers, fetchUsersXHR } from '../utils/api';
import { useDebounce } from '../hooks/useDebounce';
import TableSkeleton from './TableSkeleton';

const UserTableComponent = React.memo(function UserTableComponent() {
  const { state, dispatch } = useUserContext();
  const { users, loading, error, searchTerm, sortConfig } = state;
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  // Fetch users on component mount
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
          if (process.env.NODE_ENV !== 'test') {
            console.log('Fetch failed, trying XHR...', fetchError);
          }
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

  // Handle search - memoized callback
  const handleSearch = useCallback((value: string) => {
    setLocalSearchTerm(value);
  }, []);

  // Update search term when debounced value changes
  useEffect(() => {
    dispatch(userActions.setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  // Handle sort - memoized callback
  const handleSort = useCallback(
    (key: keyof User) => {
      const direction =
        sortConfig?.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc';

      dispatch(userActions.setSortConfig({ key, direction }));
    },
    [dispatch, sortConfig]
  );

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    return filtered;
  }, [users, searchTerm, sortConfig]);

  // Sort indicator component - memoized
  const SortIndicator = React.memo(function SortIndicator({
    columnKey,
  }: {
    columnKey: keyof User;
  }) {
    if (sortConfig?.key !== columnKey) return null;

    return (
      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
    );
  });

  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-600 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={localSearchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  <SortIndicator columnKey="name" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center">
                  Email
                  <SortIndicator columnKey="email" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('phone')}
              >
                <div className="flex items-center">
                  Phone
                  <SortIndicator columnKey="phone" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('company')}
              >
                <div className="flex items-center">
                  Company
                  <SortIndicator columnKey="company" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('address')}
              >
                <div className="flex items-center">
                  City
                  <SortIndicator columnKey="address" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => dispatch(userActions.selectUser(user))}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.company.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.address.city}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredAndSortedUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {searchTerm
              ? 'No users found matching your search.'
              : 'No users available.'}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedUsers.length} of {users.length} users
        </div>
      </div>
    </div>
  );
});

export default UserTableComponent;
