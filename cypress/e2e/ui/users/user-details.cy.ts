describe('[Backendteam] User Details and Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display user details in table rows [usability], [TC-1044]', () => {
    cy.get('tbody tr').should('have.length.at.least', 1);

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('td').should('have.length.at.least', 5);
      });
  });

  it('should show user name in table [functional], [TC-1045]', () => {
    cy.get('tbody tr').first().should('contain', 'John');
  });

  it('should show user email in table [functional], [TC-1046]', () => {
    cy.get('tbody tr').first().should('contain', '@');
  });

  it('should show user phone in table [functional], [TC-1047]', () => {
    cy.get('tbody tr').first().should('contain', '+');
  });

  it('should show user company in table [functional], [TC-1048]', () => {
    cy.get('tbody tr').first().should('contain', 'Inc');
  });

  it('should have action buttons for each user [usability], [TC-1049]', () => {
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).find('button').should('exist');
    });
  });

  it('should display user information correctly after adding new user [functional], [TC-1050]', () => {
    // Add a new user first
    cy.get('button').contains('Add User').click();
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="phone"]').type('123-456-7890');
    cy.get('button[type="submit"]').click();

    // Verify the new user appears in the table
    cy.get('tbody tr').should('contain', 'Test User');
    cy.get('tbody tr').should('contain', 'test@example.com');
  });

  it('should maintain user details after search [functional], [TC-1051]', () => {
    // Search for a user
    cy.get('input[placeholder*="Search"]').type('John');

    // Verify user details are still displayed
    cy.get('tbody tr').should('contain', 'John');
    cy.get('tbody tr').should('contain', '@');
  });

  it('should maintain user details after sorting [functional], [TC-1052]', () => {
    // Sort by name
    cy.get('th').contains('Name').click();

    // Verify user details are still displayed
    cy.get('tbody tr').should('contain', 'John');
    cy.get('tbody tr').should('contain', '@');
  });

  it('should display user details in correct format [usability], [TC-1053]', () => {
    cy.get('tbody tr')
      .first()
      .within(() => {
        // Check that each cell has content
        cy.get('td').each(($cell) => {
          cy.wrap($cell).should('not.be.empty');
        });
      });
  });

  it('should handle user data persistence [functional], [TC-1054]', () => {
    // Add a user
    cy.get('button').contains('Add User').click();
    cy.get('input[name="name"]').type('Persistent User');
    cy.get('input[name="username"]').type('persistentuser');
    cy.get('input[name="email"]').type('persistent@example.com');
    cy.get('input[name="phone"]').type('555-123-4567');
    cy.get('button[type="submit"]').click();

    // Refresh the page
    cy.reload();

    // Verify user data persists
    cy.get('tbody tr').should('contain', 'Persistent User');
  });

  it('should display user details in responsive layout [usability], [TC-1055]', () => {
    // Test on mobile viewport
    cy.viewport(375, 667);

    // Verify table is still visible and functional
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('should handle multiple users with different details [functional], [TC-1056]', () => {
    // Add multiple users with different details
    cy.get('button').contains('Add User').click();
    cy.get('input[name="name"]').type('User One');
    cy.get('input[name="username"]').type('userone');
    cy.get('input[name="email"]').type('user1@example.com');
    cy.get('input[name="phone"]').type('111-111-1111');
    cy.get('button[type="submit"]').click();

    cy.get('button').contains('Add User').click();
    cy.get('input[name="name"]').type('User Two');
    cy.get('input[name="username"]').type('usertwo');
    cy.get('input[name="email"]').type('user2@example.com');
    cy.get('input[name="phone"]').type('222-222-2222');
    cy.get('button[type="submit"]').click();

    // Verify both users are displayed
    cy.get('tbody tr').should('contain', 'User One');
    cy.get('tbody tr').should('contain', 'User Two');
  });
});
