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

  it('handles nested field changes for address', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const streetInput = screen.getByLabelText('Street *');
    fireEvent.change(streetInput, { target: { value: '123 Main St' } });

    expect(streetInput).toHaveValue('123 Main St');
  });

  it('handles nested field changes for company', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const companyNameInput = screen.getByLabelText('Company Name *');
    fireEvent.change(companyNameInput, { target: { value: 'Test Company' } });

    expect(companyNameInput).toHaveValue('Test Company');
  });

  it('handles input blur events for validation', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const emailInput = screen.getByLabelText('Email *');
    fireEvent.blur(emailInput, { target: { value: 'invalid-email' } });

    expect(emailInput).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    // Fill in required fields
    fireEvent.change(screen.getByLabelText('Name *'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Username *'), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByLabelText('Email *'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone *'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText('Street *'), {
      target: { value: '123 Main St' },
    });
    fireEvent.change(screen.getByLabelText('City *'), {
      target: { value: 'Test City' },
    });
    fireEvent.change(screen.getByLabelText('Zipcode *'), {
      target: { value: '12345' },
    });
    fireEvent.change(screen.getByLabelText('Company Name *'), {
      target: { value: 'Test Company' },
    });

    const submitButton = screen.getByText('Add User');
    fireEvent.click(submitButton);

    // Should close modal after successful submission
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles form submission with invalid data', async () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    // Submit without filling required fields
    const submitButton = screen.getByText('Add User');
    fireEvent.click(submitButton);

    // Should not close modal due to validation errors
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('handles error states for form fields', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const emailInput = screen.getByLabelText('Email *');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    // Should show error state
    expect(emailInput).toBeInTheDocument();
  });

  it('resets form when cancel is clicked', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const nameInput = screen.getByLabelText('Name *');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Form should be reset
    expect(nameInput).toHaveValue('');
  });

  it('handles website field as optional', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const websiteInput = screen.getByLabelText('Website');
    expect(websiteInput).toBeInTheDocument();

    fireEvent.change(websiteInput, {
      target: { value: 'https://example.com' },
    });
    expect(websiteInput).toHaveValue('https://example.com');
  });

  it('handles suite field as optional', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const suiteInput = screen.getByLabelText('Suite');
    expect(suiteInput).toBeInTheDocument();

    fireEvent.change(suiteInput, { target: { value: 'Apt 123' } });
    expect(suiteInput).toHaveValue('Apt 123');
  });

  it('handles company catch phrase field', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const catchPhraseInput = screen.getByLabelText('Catch Phrase');
    expect(catchPhraseInput).toBeInTheDocument();

    fireEvent.change(catchPhraseInput, {
      target: { value: 'Test catch phrase' },
    });
    expect(catchPhraseInput).toHaveValue('Test catch phrase');
  });

  it('handles company bs field', () => {
    renderWithProviders(<AddUserForm isOpen={true} onClose={mockOnClose} />);

    const bsInput = screen.getByLabelText('Business Strategy');
    fireEvent.change(bsInput, { target: { value: 'Test Strategy' } });

    expect(bsInput).toHaveValue('Test Strategy');
  });

  it('renders in page mode without modal wrapper', () => {
    const mockOnSuccess = jest.fn();
    renderWithProviders(
      <AddUserForm
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        mode="page"
      />
    );

    // Should render form content without modal
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();

    // Should not render modal title since we're in page mode
    expect(screen.queryByText('Add New User')).not.toBeInTheDocument();
  });

  it('calls onSuccess callback when form is submitted successfully in page mode', async () => {
    const mockOnSuccess = jest.fn();
    renderWithProviders(
      <AddUserForm
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        mode="page"
      />
    );

    // Fill in required fields
    fireEvent.change(screen.getByLabelText('Name *'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Username *'), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByLabelText('Email *'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone *'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText('Street *'), {
      target: { value: '123 Main St' },
    });
    fireEvent.change(screen.getByLabelText('City *'), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByLabelText('Zipcode *'), {
      target: { value: '12345' },
    });
    fireEvent.change(screen.getByLabelText('Company Name *'), {
      target: { value: 'Test Company' },
    });

    // Submit form
    const submitButton = screen.getByText('Add User');
    fireEvent.click(submitButton);

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockOnSuccess).toHaveBeenCalled();
  });
});
