import React from 'react';
import { render, screen } from '@testing-library/react';
import TableSkeleton from '../TableSkeleton';

describe('TableSkeleton', () => {
  it('renders the skeleton table structure', () => {
    render(<TableSkeleton />);
    
    // Check for table structure
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders skeleton header rows', () => {
    const { container } = render(<TableSkeleton />);
    
    // Check for header skeleton elements
    const headerCells = container.querySelectorAll('th .animate-pulse');
    expect(headerCells.length).toBeGreaterThan(0);
  });

  it('renders skeleton data rows', () => {
    const { container } = render(<TableSkeleton />);
    
    // Check for data row skeleton elements
    const dataCells = container.querySelectorAll('td .animate-pulse');
    expect(dataCells.length).toBeGreaterThan(0);
  });

  it('has proper table styling', () => {
    const { container } = render(<TableSkeleton />);
    
    const table = container.querySelector('table');
    expect(table).toHaveClass('min-w-full');
    expect(table).toHaveClass('divide-y');
    expect(table).toHaveClass('divide-gray-200');
  });

  it('has proper header styling', () => {
    const { container } = render(<TableSkeleton />);
    
    const thead = container.querySelector('thead');
    expect(thead).toHaveClass('bg-gray-50');
  });

  it('renders multiple skeleton rows', () => {
    const { container } = render(<TableSkeleton />);
    
    // Should render multiple skeleton rows for realistic loading state
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(1);
  });

  it('has proper skeleton animation classes', () => {
    const { container } = render(<TableSkeleton />);
    
    // Check for animation classes
    const skeletonElements = container.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });
}); 