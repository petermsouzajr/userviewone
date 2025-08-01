'use client';

import { useMemo } from 'react';
import { User } from '../types/user';
import { useSearch } from './useSearch';
import { useSort } from './useSort';

interface UseUsersOptions {
  searchDebounceMs?: number;
  searchFields?: (keyof User)[];
  sortableFields?: (keyof User)[];
  initialSort?: {
    key: keyof User;
    direction: 'asc' | 'desc';
  };
}

export const useUsers = (users: User[], options: UseUsersOptions = {}) => {
  const {
    searchDebounceMs = 300,
    searchFields = ['name', 'email', 'username'],
    sortableFields = ['name', 'email', 'username'],
    initialSort,
  } = options;

  // Search functionality
  const { searchTerm, setSearchTerm, filteredData, searchStats, clearSearch } =
    useSearch(users, {
      debounceMs: searchDebounceMs,
      searchFields,
    });

  // Sort functionality
  const {
    sortConfig,
    sortedData,
    handleSort,
    clearSort,
    getSortDirection,
    isSortable,
  } = useSort(filteredData, {
    initialSort,
    sortableFields,
  });

  // Combined data (searched then sorted)
  const processedData = useMemo(() => {
    return sortedData;
  }, [sortedData]);

  // Combined statistics
  const stats = useMemo(() => {
    return {
      total: users.length,
      filtered: searchStats.filtered,
      displayed: processedData.length,
      hasSearchTerm: searchStats.hasSearchTerm,
      hasSortConfig: !!sortConfig,
      searchTerm,
      sortConfig,
    };
  }, [users.length, searchStats, processedData.length, searchTerm, sortConfig]);

  // Combined actions
  const actions = {
    setSearchTerm,
    clearSearch,
    handleSort,
    clearSort,
    clearAll: () => {
      clearSearch();
      clearSort();
    },
  };

  return {
    data: processedData,
    searchTerm,
    sortConfig,
    stats,
    actions,
    getSortDirection,
    isSortable,
  };
};
