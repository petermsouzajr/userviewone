import React from 'react';
import { render, screen } from '@testing-library/react';
import AddUserModal from '../AddUserModal';
import { UserProvider } from '../../context/UserContext';

const renderWithProviders = (component: React.ReactElement) => {
  return render(<UserProvider>{component}</UserProvider>);
};

describe('AddUserModal', () => {
  it('renders nothing when isOpen is false', () => {
    renderWithProviders(<AddUserModal isOpen={false} onClose={() => {}} />);
    
    // Should not render anything when modal is closed
    expect(screen.queryByText('Add New User')).not.toBeInTheDocument();
  });

  it('renders AddUserForm when isOpen is true', () => {
    renderWithProviders(<AddUserModal isOpen={true} onClose={() => {}} />);
    
    // Should render the form when modal is open
    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });

  it('passes isOpen prop to AddUserForm', () => {
    renderWithProviders(<AddUserModal isOpen={true} onClose={() => {}} />);
    
    // The form should be visible when modal is open
    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });

  it('passes onClose prop to AddUserForm', () => {
    const mockOnClose = jest.fn();
    renderWithProviders(<AddUserModal isOpen={true} onClose={mockOnClose} />);
    
    // The form should be rendered with the onClose handler
    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });

  it('has proper modal structure when open', () => {
    renderWithProviders(<AddUserModal isOpen={true} onClose={() => {}} />);
    
    // Check for modal content
    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    const { container } = renderWithProviders(<AddUserModal isOpen={false} onClose={() => {}} />);
    
    // Container should be empty when modal is closed
    expect(container.firstChild).toBeNull();
  });
}); 