import React from 'react';
import AddUserForm from '../../src/components/AddUserForm';

describe('AddUserForm Component', () => {
  const mockOnClose = cy.stub().as('onClose');
  const mockOnSuccess = cy.stub().as('onSuccess');

  beforeEach(() => {
    cy.mount(
      <AddUserForm
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        mode="page"
      />
    );
  });

  it('should render all form fields', () => {
    // Basic Information
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="phone"]').should('be.visible');
    cy.get('input[name="website"]').should('be.visible');

    // Address Information
    cy.get('input[name="address.street"]').should('be.visible');
    cy.get('input[name="address.suite"]').should('be.visible');
    cy.get('input[name="address.city"]').should('be.visible');
    cy.get('input[name="address.zipcode"]').should('be.visible');

    // Company Information
    cy.get('input[name="company.name"]').should('be.visible');
    cy.get('input[name="company.catchPhrase"]').should('be.visible');
    cy.get('input[name="company.bs"]').should('be.visible');
  });

  it('should handle form submission with valid data', () => {
    // Fill in the form
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="website"]').type('https://johndoe.com');
    cy.get('input[name="address.street"]').type('123 Main St');
    cy.get('input[name="address.city"]').type('New York');
    cy.get('input[name="address.zipcode"]').type('10001');
    cy.get('input[name="company.name"]').type('Tech Corp');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should call onSuccess
    cy.get('@onSuccess').should('have.been.called');
  });

  it('should show validation errors for empty form', () => {
    // Submit empty form
    cy.get('button[type="submit"]').click();

    // Should show validation errors
    cy.get('.text-red-600').should('be.visible');
    cy.contains('Please fix the').should('be.visible');

    // Required fields should be highlighted
    cy.get('input[name="name"]').should('have.class', 'border-red-300');
    cy.get('input[name="username"]').should('have.class', 'border-red-300');
    cy.get('input[name="email"]').should('have.class', 'border-red-300');
    cy.get('input[name="phone"]').should('have.class', 'border-red-300');
  });

  it('should clear field errors when user starts typing', () => {
    // Submit empty form to trigger errors
    cy.get('button[type="submit"]').click();

    // Verify error is shown
    cy.get('input[name="name"]').should('have.class', 'border-red-300');

    // Start typing
    cy.get('input[name="name"]').type('John');

    // Error should disappear
    cy.get('input[name="name"]').should('not.have.class', 'border-red-300');
  });

  it('should handle cancel button', () => {
    cy.get('button').contains('Cancel').click();
    cy.get('@onClose').should('have.been.called');
  });

  it('should validate email format', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email format').should('be.visible');
  });

  it('should validate phone number format', () => {
    cy.get('input[name="phone"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('Phone number must be at least 10 digits').should('be.visible');
  });

  it('should validate website URL format', () => {
    cy.get('input[name="website"]').type('not-a-url');
    cy.get('button[type="submit"]').click();
    cy.contains('Website must be a valid URL').should('be.visible');
  });
});
