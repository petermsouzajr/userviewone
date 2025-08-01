'use client';

import { useState, useMemo, useCallback } from 'react';
import { User } from '../types/user';

interface UseSearchOptions {
  debounceMs?: number;
  searchFields?: (keyof User)[];
}

export const useSearch = <T extends User>(
  data: T[],
  options: UseSearchOptions = {}
) => {
  const { debounceMs = 300, searchFields = ['name', 'email', 'username'] } =
    options;
  const [searchTerm, setSearchTerm] = useState('');

  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce effect
  const debounceTimeout = useMemo(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return timeout;
  }, [searchTerm, debounceMs]);

  // Clear timeout on unmount
  const clearTimeout = useCallback(() => {
    if (debounceTimeout) {
      window.clearTimeout(debounceTimeout);
    }
  }, [debounceTimeout]);

  // Filtered data
  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return data;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();

    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchLower);
        }
        return false;
      });
    });
  }, [data, debouncedSearchTerm, searchFields]);

  // Search statistics
  const searchStats = useMemo(() => {
    const total = data.length;
    const filtered = filteredData.length;
    const hasResults = filtered > 0;
    const hasSearchTerm = debouncedSearchTerm.trim().length > 0;

    return {
      total,
      filtered,
      hasResults,
      hasSearchTerm,
      searchTerm: debouncedSearchTerm,
    };
  }, [data.length, filteredData.length, debouncedSearchTerm]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    searchStats,
    clearSearch,
    clearTimeout,
  };
};
