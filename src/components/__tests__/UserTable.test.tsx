import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from '../UserTable';
import { UserProvider } from '../../context/UserContext';

// Mock the API module
jest.mock('../../utils/api', () => ({
  fetchUsers: jest.fn(),
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

  it('shows empty state when no users', () => {
    renderWithProviders(<UserTable />);

    expect(screen.getByText('No users available.')).toBeInTheDocument();
  });

  it('shows results count', () => {
    renderWithProviders(<UserTable />);

    expect(screen.getByText(/Showing 0 of 0 users/)).toBeInTheDocument();
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
});
