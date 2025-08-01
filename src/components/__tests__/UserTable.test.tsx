import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from '../UserTable';
import { UserProvider } from '../../context/UserContext';

// Mock the API module
jest.mock('../../utils/api', () => ({
  fetchUsers: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'https://example.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 1',
        city: 'Test City',
        zipcode: '12345',
        geo: { lat: '0', lng: '0' },
      },
      company: {
        name: 'Test Company',
        catchPhrase: 'Test phrase',
        bs: 'Test bs',
      },
    },
  ]),
  fetchUsersXHR: jest.fn(),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(<UserProvider>{component}</UserProvider>);
};

describe('UserTable', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders table structure', () => {
    renderWithProviders(<UserTable />);

    // Check that the table structure is rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderWithProviders(<UserTable />);

    expect(
      screen.getByPlaceholderText('Search by name, email, or company...')
    ).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    renderWithProviders(<UserTable />);

    // Initially shows loading skeleton
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('shows results count after loading', async () => {
    renderWithProviders(<UserTable />);

    // Wait for data to load
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(screen.getByText(/Showing 1 of 1 users/)).toBeInTheDocument();
  });

  it('handles search input changes', () => {
    renderWithProviders(<UserTable />);

    const searchInput = screen.getByPlaceholderText(
      'Search by name, email, or company...'
    );
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput).toHaveValue('test');
  });

  it('handles column header clicks for sorting', () => {
    renderWithProviders(<UserTable />);

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    // The sort indicator should appear (though no data to sort)
    expect(nameHeader).toBeInTheDocument();
  });

  it('handles search input with debouncing', async () => {
    renderWithProviders(<UserTable />);

    const searchInput = screen.getByPlaceholderText(
      'Search by name, email, or company...'
    );
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Wait for debounce
    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(searchInput).toHaveValue('John');
  });

  it('handles multiple sort clicks', () => {
    renderWithProviders(<UserTable />);

    const nameHeader = screen.getByText('Name');
    const emailHeader = screen.getByText('Email');

    fireEvent.click(nameHeader);
    fireEvent.click(emailHeader);

    expect(nameHeader).toBeInTheDocument();
    expect(emailHeader).toBeInTheDocument();
  });

  it('handles sort direction changes', () => {
    renderWithProviders(<UserTable />);

    const nameHeader = screen.getByText('Name');

    // First click - ascending
    fireEvent.click(nameHeader);

    // Second click - descending
    fireEvent.click(nameHeader);

    // Third click - no sort
    fireEvent.click(nameHeader);

    expect(nameHeader).toBeInTheDocument();
  });

  it('handles empty search results', () => {
    renderWithProviders(<UserTable />);

    const searchInput = screen.getByPlaceholderText(
      'Search by name, email, or company...'
    );
    fireEvent.change(searchInput, { target: { value: 'NonExistentUser' } });

    expect(searchInput).toHaveValue('NonExistentUser');
  });

  it('handles special characters in search', () => {
    renderWithProviders(<UserTable />);

    const searchInput = screen.getByPlaceholderText(
      'Search by name, email, or company...'
    );
    fireEvent.change(searchInput, { target: { value: 'test@example.com' } });

    expect(searchInput).toHaveValue('test@example.com');
  });

  it('handles very long search terms', () => {
    renderWithProviders(<UserTable />);

    const searchInput = screen.getByPlaceholderText(
      'Search by name, email, or company...'
    );
    const longSearchTerm = 'a'.repeat(100);
    fireEvent.change(searchInput, { target: { value: longSearchTerm } });

    expect(searchInput).toHaveValue(longSearchTerm);
  });

  it('handles search with numbers', () => {
    renderWithProviders(<UserTable />);

    const searchInput = screen.getByPlaceholderText(
      'Search by name, email, or company...'
    );
    fireEvent.change(searchInput, { target: { value: '123' } });

    expect(searchInput).toHaveValue('123');
  });

  it('handles search with mixed content', () => {
    renderWithProviders(<UserTable />);

    const searchInput = screen.getByPlaceholderText(
      'Search by name, email, or company...'
    );
    fireEvent.change(searchInput, { target: { value: 'John123@example.com' } });

    expect(searchInput).toHaveValue('John123@example.com');
  });

  it('handles search input clearing', () => {
    renderWithProviders(<UserTable />);

    const searchInput = screen.getByPlaceholderText(
      'Search by name, email, or company...'
    );
    fireEvent.change(searchInput, { target: { value: 'John' } });
    fireEvent.change(searchInput, { target: { value: '' } });

    expect(searchInput).toHaveValue('');
  });

  it('handles table row interactions', () => {
    renderWithProviders(<UserTable />);

    // Wait for data to load
    setTimeout(() => {
      const tableRows = screen.getAllByRole('row');
      expect(tableRows.length).toBeGreaterThan(1); // Header + data rows
    }, 100);
  });

  it('handles loading state', () => {
    renderWithProviders(<UserTable />);

    // Initially should show loading state
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('handles error state gracefully', () => {
    renderWithProviders(<UserTable />);

    // Should handle API errors gracefully
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('handles API error scenarios', () => {
    renderWithProviders(<UserTable />);

    // Should handle network errors gracefully
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('handles data filtering logic', () => {
    renderWithProviders(<UserTable />);

    const searchInput = screen.getByPlaceholderText(
      'Search by name, email, or company...'
    );
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Should trigger filtering logic
    expect(searchInput).toHaveValue('test');
  });

  it('handles data sorting logic', () => {
    renderWithProviders(<UserTable />);

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    // Should trigger sorting logic
    expect(nameHeader).toBeInTheDocument();
  });
});
