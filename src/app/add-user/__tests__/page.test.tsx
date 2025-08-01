import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddUserPage from '../page';
import { UserProvider } from '../../../context/UserContext';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(<UserProvider>{component}</UserProvider>);
};

describe('AddUserPage', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders the page title', () => {
    renderWithProviders(<AddUserPage />);
    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });

  it('renders the page description', () => {
    renderWithProviders(<AddUserPage />);
    expect(
      screen.getByText(
        'Fill out the form below to add a new user to the system.'
      )
    ).toBeInTheDocument();
  });

  it('renders the back button', () => {
    renderWithProviders(<AddUserPage />);
    expect(screen.getByText('← Back to Users')).toBeInTheDocument();
  });

  it('navigates back to users when back button is clicked', () => {
    renderWithProviders(<AddUserPage />);

    const backButton = screen.getByText('← Back to Users');
    fireEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders the AddUserForm component', () => {
    renderWithProviders(<AddUserPage />);

    // Check for form elements
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = renderWithProviders(<AddUserPage />);

    // Check for main page elements
    expect(screen.getByText('Add New User')).toBeInTheDocument();
    expect(screen.getByText('← Back to Users')).toBeInTheDocument();

    // Check for proper layout classes
    const mainContainer = container.querySelector('.min-h-screen');
    expect(mainContainer).toBeInTheDocument();

    const contentContainer = container.querySelector('.max-w-4xl');
    expect(contentContainer).toBeInTheDocument();
  });

  it('renders with proper styling classes', () => {
    const { container } = renderWithProviders(<AddUserPage />);

    // Check for main container classes
    const mainContainer = container.querySelector('.min-h-screen');
    expect(mainContainer).toBeInTheDocument();

    // Check for content container
    const contentContainer = container.querySelector('.max-w-4xl');
    expect(contentContainer).toBeInTheDocument();

    // Check for form container
    const formContainer = container.querySelector('.bg-white');
    expect(formContainer).toBeInTheDocument();
  });

  it('has proper header layout', () => {
    renderWithProviders(<AddUserPage />);

    // Check that header elements exist
    expect(screen.getByText('Add New User')).toBeInTheDocument();
    expect(screen.getByText('← Back to Users')).toBeInTheDocument();

    // Check that description exists
    expect(
      screen.getByText(
        'Fill out the form below to add a new user to the system.'
      )
    ).toBeInTheDocument();
  });
});
