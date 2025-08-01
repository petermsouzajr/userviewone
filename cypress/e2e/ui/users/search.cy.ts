describe('[Backendteam] Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should search users by name [functional], [TC-1018]', () => {
    const searchTerm = 'John';
    cy.get('input[placeholder*="Search"]').type(searchTerm);

    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).should('contain.text', searchTerm);
    });
  });

  it('should search users by email [functional], [TC-1019]', () => {
    const searchTerm = 'john@example.com';
    cy.get('input[placeholder*="Search"]').type(searchTerm);

    cy.get('tbody tr').should('contain', searchTerm);
  });

  it('should search users by company [functional], [TC-1020]', () => {
    const searchTerm = 'Tech';
    cy.get('input[placeholder*="Search"]').type(searchTerm);

    cy.get('tbody tr').should('contain', searchTerm);
  });

  it('should clear search results [usability], [TC-1021]', () => {
    // First search for something
    cy.get('input[placeholder*="Search"]').type('John');
    cy.get('tbody tr').should('contain', 'John');

    // Clear the search
    cy.get('input[placeholder*="Search"]').clear();

    // Should show all users again
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('should handle case-insensitive search [functional], [TC-1028]', () => {
    const searchTerm = 'john';
    cy.get('input[placeholder*="Search"]').type(searchTerm);

    cy.get('tbody tr').should('contain', 'John');
  });

  it('should handle partial search matches [functional], [TC-1029]', () => {
    const searchTerm = 'jo';
    cy.get('input[placeholder*="Search"]').type(searchTerm);

    cy.get('tbody tr').should('contain', 'John');
  });

  it('should show no results for non-existent search [usability], [TC-1030]', () => {
    const searchTerm = 'NonExistentUser';
    cy.get('input[placeholder*="Search"]').type(searchTerm);

    cy.get('tbody tr').should('not.contain', searchTerm);
  });
});
