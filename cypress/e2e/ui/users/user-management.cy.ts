describe('[Frontendfrogs] User Management E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the user list page [smoke], [TC-1001]', () => {
    cy.get('h1').should('contain', 'User Management System');
    cy.get('table').should('be.visible');
  });

  it('should display users in the table [functional], [TC-1002]', () => {
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('should search for users [functional], [TC-1003]', () => {
    cy.get('input[placeholder*="Search"]').type('John');
    cy.get('tbody tr').should('contain', 'John');
  });

  it('should sort users by different columns [functional], [TC-1004]', () => {
    cy.get('th').contains('Name').click();
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('should add a new user via modal [functional], [TC-1005]', () => {
    cy.get('button').contains('Add User').click();
    cy.get('h2').should('contain', 'Add New User');

    // Fill form
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="phone"]').type('123-456-7890');
    cy.get('button[type="submit"]').click();

    // Verify user was added
    cy.get('tbody tr').should('contain', 'Test User');
  });

  it('should add a new user via dedicated page [functional], [TC-1006]', () => {
    cy.visit('/add-user');
    cy.get('h1').should('contain', 'Add New User');

    // Fill form
    cy.get('input[name="name"]').type('Page User');
    cy.get('input[name="username"]').type('pageuser');
    cy.get('input[name="email"]').type('page@example.com');
    cy.get('input[name="phone"]').type('987-654-3210');
    cy.get('button[type="submit"]').click();

    // Verify redirect and user was added
    cy.url().should('include', '/');
    cy.get('tbody tr').should('contain', 'Page User');
  });

  it('should show validation errors for empty form submission [functional], [TC-1007]', () => {
    cy.get('button').contains('Add User').click();
    cy.get('button[type="submit"]').click();

    cy.get('ul').should('contain', 'Name is required');
    cy.get('ul').should('contain', 'Email is required');
  });

  it('should clear field errors when user starts typing [usability], [TC-1008]', () => {
    cy.get('button').contains('Add User').click();
    cy.get('button[type="submit"]').click();

    // Verify error is shown
    cy.get('ul').should('contain', 'Name is required');

    // Type in name field
    cy.get('input[name="name"]').type('John');

    // Verify error is cleared
    cy.get('ul').should('not.contain', 'Name is required');
  });

  it('should handle form validation for invalid data [regression], [TC-1009]', () => {
    cy.get('button').contains('Add User').click();

    // Fill with invalid data
    cy.get('input[name="name"]').type('A');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="phone"]').type('123');
    cy.get('button[type="submit"]').click();

    // Verify validation errors
    cy.get('ul').should('contain', 'Name must be at least 2 characters');
    cy.get('ul').should('contain', 'Invalid email format');
    cy.get('ul').should('contain', 'Phone must be in format');
  });

  it('should navigate back from add user page [functional], [TC-1010]', () => {
    cy.visit('/add-user');
    cy.get('a').contains('Back').click();

    cy.url().should('not.include', '/add-user');
  });

  // Regression tests moved from dedicated regression file
  it('should handle user data persistence [regression], [TC-1054]', () => {
    // Add a user
    cy.get('button').contains('Add User').click();
    cy.get('input[name="name"]').type('Regression User');
    cy.get('input[name="username"]').type('regressionuser');
    cy.get('input[name="email"]').type('regression@example.com');
    cy.get('input[name="phone"]').type('555-123-4567');
    cy.get('button[type="submit"]').click();

    // Verify user was added
    cy.get('tbody tr').should('contain', 'Regression User');

    // Refresh the page
    cy.reload();

    // Verify user data persists
    cy.get('tbody tr').should('contain', 'Regression User');
  });

  it('should handle multiple users with different details [regression], [TC-1056]', () => {
    // Add first user
    cy.get('button').contains('Add User').click();
    cy.get('input[name="name"]').type('User One');
    cy.get('input[name="username"]').type('userone');
    cy.get('input[name="email"]').type('user1@example.com');
    cy.get('input[name="phone"]').type('111-111-1111');
    cy.get('button[type="submit"]').click();

    // Add second user
    cy.get('button').contains('Add User').click();
    cy.get('input[name="name"]').type('User Two');
    cy.get('input[name="username"]').type('usertwo');
    cy.get('input[name="email"]').type('user2@example.com');
    cy.get('input[name="phone"]').type('222-222-2222');
    cy.get('button[type="submit"]').click();

    // Verify both users are displayed
    cy.get('tbody tr').should('contain', 'User One');
    cy.get('tbody tr').should('contain', 'User Two');
    cy.get('tbody tr').should('contain', 'user1@example.com');
    cy.get('tbody tr').should('contain', 'user2@example.com');
  });
});
