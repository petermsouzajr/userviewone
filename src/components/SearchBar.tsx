'use client';

import React from 'react';
import { Input } from './ui';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  placeholder = 'Search users...',
  className = '',
}: SearchBarProps) {
  return (
    <div className={`w-full max-w-md ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
