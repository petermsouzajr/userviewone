import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddUserForm from '../AddUserForm';
import { UserProvider } from '../../context/UserContext';

const renderWithProviders = (component: React.ReactElement) => {
  return render(<UserProvider>{component}</UserProvider>);
};

describe('AddUserForm', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders form fields when modal is open', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Add New User')).toBeInTheDocument();
    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone *')).toBeInTheDocument();
    expect(screen.getByLabelText('Username *')).toBeInTheDocument();
  });

  it('handles form field changes', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const nameInput = screen.getByLabelText('Name *');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    expect(nameInput).toHaveValue('John Doe');
  });

  it('closes modal when cancel button is clicked', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not render when modal is closed', () => {
    renderWithProviders(<AddUserForm isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText('Add New User')).not.toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Add User')).toBeInTheDocument();
  });

  it('renders all required form sections', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });
});
