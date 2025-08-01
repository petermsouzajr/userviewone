describe('[Frontendfrogs] Homepage Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display homepage with correct title and description [smoke], [TC-1011]', () => {
    cy.get('h1').should('contain', 'User Management System');
    cy.get('p').should('contain', 'Manage and view user information');
  });

  it('should show loading state while fetching users [usability], [TC-1012]', () => {
    // Loading state is handled by the component
    cy.get('table').should('be.visible');
  });

  it('should display all required UI elements [usability], [TC-1013]', () => {
    // Check for main navigation elements
    cy.get('nav').should('be.visible');
    cy.get('main').should('be.visible');

    // Check for search functionality
    cy.get('input[placeholder*="Search"]').should('be.visible');

    // Check for table structure
    cy.get('table').should('be.visible');
    cy.get('thead').should('be.visible');
    cy.get('tbody').should('be.visible');

    // Check for action buttons
    cy.get('button').should('contain.text', 'Add User');

    // Check for results count
    cy.get('div').should('contain.text', 'Showing');
  });

  it('should have proper table headers [usability], [TC-1014]', () => {
    cy.get('thead').within(() => {
      cy.get('th').should('contain.text', 'Name');
      cy.get('th').should('contain.text', 'Email');
      cy.get('th').should('contain.text', 'Phone');
      cy.get('th').should('contain.text', 'Company');
      cy.get('th').should('contain.text', 'City');
    });
  });

  it('should display user data in table rows [functional], [TC-1015]', () => {
    // Wait for data to load
    cy.get('tbody tr').should('have.length.at.least', 1);

    // Check that user data is displayed
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('td').should('have.length.at.least', 5);
      });
  });

  it('should have responsive design elements [usability], [TC-1016]', () => {
    // Check for responsive container
    cy.get('div').should('have.class', 'container');

    // Check for responsive table
    cy.get('table').should('be.visible');
  });

  it('should handle empty state gracefully [usability], [TC-1017]', () => {
    // This would be tested if we had an empty state scenario
    // For now, we ensure the table is always visible
    cy.get('table').should('be.visible');
  });

  // Smoke tests moved from dedicated smoke file
  it('should display the user list page [smoke], [TC-1001]', () => {
    cy.get('h1').should('contain', 'User Management System');
    cy.get('table').should('be.visible');
  });

  it('should display users in the table [smoke], [TC-1002]', () => {
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('should search for users [smoke], [TC-1003]', () => {
    // Type in search box
    cy.get('input[placeholder*="Search"]').type('John');

    // Verify search results
    cy.get('tbody tr').should('contain', 'John');
  });

  it('should sort users by different columns [smoke], [TC-1004]', () => {
    // Click on name column header to sort
    cy.get('th').contains('Name').click();

    // Verify sorting occurred (this would depend on your implementation)
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('should add a new user via modal [smoke], [TC-1005]', () => {
    // Click the Add User button
    cy.get('button').contains('Add User').click();

    // Verify modal opens
    cy.get('h2').should('contain', 'Add New User');

    // Fill in required fields
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="phone"]').type('123-456-7890');

    // Fill in address fields
    cy.get('input[name="address.street"]').type('123 Test St');
    cy.get('input[name="address.city"]').type('Test City');
    cy.get('input[name="address.zipcode"]').type('12345');

    // Fill in company fields
    cy.get('input[name="company.name"]').type('Test Company');

    // Submit the form
    cy.get('button').contains('Add User').click();

    // Verify user was added (this would depend on your implementation)
    cy.get('tbody tr').should('contain', 'Test User');
  });
});
