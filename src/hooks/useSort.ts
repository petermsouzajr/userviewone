'use client';

import { useState, useMemo, useCallback } from 'react';
import { User } from '../types/user';

interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

interface UseSortOptions<T> {
  initialSort?: SortConfig<T>;
  sortableFields?: (keyof T)[];
}

export const useSort = <T extends User>(
  data: T[],
  options: UseSortOptions<T> = {}
) => {
  const { initialSort, sortableFields } = options;
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(
    initialSort || null
  );

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      // Handle nested objects (like address.city, company.name)
      if (typeof aValue === 'object' && typeof bValue === 'object') {
        const aString = JSON.stringify(aValue);
        const bString = JSON.stringify(bValue);
        const comparison = aString.localeCompare(bString);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      // Fallback to string comparison
      const aString = String(aValue || '');
      const bString = String(bValue || '');
      const comparison = aString.localeCompare(bString);
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  // Handle sort change
  const handleSort = useCallback((key: keyof T) => {
    setSortConfig((currentSort) => {
      // If clicking the same column, toggle direction
      if (currentSort && currentSort.key === key) {
        return {
          key,
          direction: currentSort.direction === 'asc' ? 'desc' : 'asc',
        };
      }

      // If clicking a new column, sort ascending
      return {
        key,
        direction: 'asc',
      };
    });
  }, []);

  // Clear sort
  const clearSort = useCallback(() => {
    setSortConfig(null);
  }, []);

  // Get sort direction for a specific column
  const getSortDirection = useCallback(
    (key: keyof T): 'asc' | 'desc' | null => {
      if (!sortConfig || sortConfig.key !== key) {
        return null;
      }
      return sortConfig.direction;
    },
    [sortConfig]
  );

  // Check if a field is sortable
  const isSortable = useCallback(
    (key: keyof T): boolean => {
      if (!sortableFields) {
        return true; // All fields are sortable by default
      }
      return sortableFields.includes(key);
    },
    [sortableFields]
  );

  return {
    sortConfig,
    sortedData,
    handleSort,
    clearSort,
    getSortDirection,
    isSortable,
  };
};
