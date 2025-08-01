describe('User Management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the user list page', () => {
    cy.get('h1').should('contain', 'User Management');
    cy.get('input[placeholder*="Search"]').should('be.visible');
    cy.get('table').should('be.visible');
    cy.get('button').contains('Add User (Page)').should('be.visible');
    cy.get('button').contains('Quick Add (Modal)').should('be.visible');
  });

  it('should navigate to add user page', () => {
    cy.get('button').contains('Add User (Page)').click();
    cy.url().should('include', '/add-user');
    cy.get('h1').should('contain', 'Add New User');
  });

  it('should add a new user successfully', () => {
    cy.addUser({
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '1234567890',
      website: 'https://johndoe.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 4B',
        city: 'New York',
        zipcode: '10001',
      },
      company: {
        name: 'Tech Corp',
        catchPhrase: 'Innovation at its best',
        bs: 'synergize scalable supply-chains',
      },
    });

    // Should redirect back to user list
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Should show the new user in the list
    cy.contains('John Doe').should('be.visible');
    cy.contains('john@example.com').should('be.visible');
    cy.contains('Tech Corp').should('be.visible');
  });

  it('should show validation errors for empty form submission', () => {
    cy.visit('/add-user');

    // Submit empty form
    cy.get('button[type="submit"]').click();

    // Should show validation errors
    cy.get('.text-red-600').should('be.visible');
    cy.contains('Please fix the').should('be.visible');

    // Should highlight required fields
    cy.get('input[name="name"]').should('have.class', 'border-red-300');
    cy.get('input[name="username"]').should('have.class', 'border-red-300');
    cy.get('input[name="email"]').should('have.class', 'border-red-300');
    cy.get('input[name="phone"]').should('have.class', 'border-red-300');
  });

  it('should clear field errors when user starts typing', () => {
    cy.visit('/add-user');

    // Submit empty form to trigger errors
    cy.get('button[type="submit"]').click();

    // Verify errors are shown
    cy.get('input[name="name"]').should('have.class', 'border-red-300');

    // Start typing in the name field
    cy.get('input[name="name"]').type('John');

    // Error should disappear
    cy.get('input[name="name"]').should('not.have.class', 'border-red-300');
  });

  it('should search for users', () => {
    // Add a user first
    cy.addUser({
      name: 'Alice Smith',
      username: 'alicesmith',
      email: 'alice@example.com',
      phone: '9876543210',
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        zipcode: '90210',
      },
      company: {
        name: 'Design Studio',
      },
    });

    // Search for the user
    cy.searchUsers('Alice');

    // Should show the user
    cy.contains('Alice Smith').should('be.visible');

    // Search for non-existent user
    cy.searchUsers('NonExistentUser');

    // Should show no results
    cy.contains('No users found').should('be.visible');
  });

  it('should sort users by different columns', () => {
    // Add multiple users
    cy.addUser({
      name: 'Bob Wilson',
      username: 'bobwilson',
      email: 'bob@example.com',
      phone: '5551234567',
      address: {
        street: '789 Pine St',
        city: 'Chicago',
        zipcode: '60601',
      },
      company: {
        name: 'Marketing Inc',
      },
    });

    cy.addUser({
      name: 'Carol Johnson',
      username: 'caroljohnson',
      email: 'carol@example.com',
      phone: '5559876543',
      address: {
        street: '321 Elm St',
        city: 'Boston',
        zipcode: '02101',
      },
      company: {
        name: 'Finance Corp',
      },
    });

    // Sort by name
    cy.sortUsersBy('Name');
    cy.get('tbody tr').first().should('contain', 'Alice Smith');

    // Sort by email
    cy.sortUsersBy('Email');
    cy.get('tbody tr').first().should('contain', 'alice@example.com');

    // Sort by company
    cy.sortUsersBy('Company');
    cy.get('tbody tr').first().should('contain', 'Design Studio');
  });

  it('should handle form validation for invalid data', () => {
    cy.visit('/add-user');

    // Fill form with invalid data
    cy.get('input[name="name"]').type('A'); // Too short
    cy.get('input[name="username"]').type('user@123'); // Invalid characters
    cy.get('input[name="email"]').type('invalid-email'); // Invalid email
    cy.get('input[name="phone"]').type('123'); // Too short
    cy.get('input[name="website"]').type('not-a-url'); // Invalid URL

    // Submit form
    cy.get('button[type="submit"]').click();

    // Should show validation errors
    cy.contains('Name must be at least 2 characters').should('be.visible');
    cy.contains(
      'Username can only contain letters, numbers, and underscores'
    ).should('be.visible');
    cy.contains('Invalid email format').should('be.visible');
    cy.contains('Phone number must be at least 10 digits').should('be.visible');
    cy.contains('Website must be a valid URL').should('be.visible');
  });

  it('should navigate back from add user page', () => {
    cy.visit('/add-user');

    // Click back button
    cy.contains('← Back to Users').click();

    // Should return to user list
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('h1').should('contain', 'User Management');
  });
});
