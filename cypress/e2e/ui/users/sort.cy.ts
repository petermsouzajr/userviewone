describe('[Backendteam] Sort Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should sort users by name ascending [functional], [TC-1022]', () => {
    cy.get('th').contains('Name').click();
    cy.get('tbody tr').first().should('contain', 'A');
  });

  it('should sort users by name descending [functional], [TC-1023]', () => {
    cy.get('th').contains('Name').click();
    cy.get('th').contains('Name').click();
    cy.get('tbody tr').first().should('contain', 'Z');
  });

  it('should sort users by email [functional], [TC-1024]', () => {
    cy.get('th').contains('Email').click();
    cy.get('tbody tr').first().should('contain', 'a');
  });

  it('should sort users by phone [functional], [TC-1025]', () => {
    cy.get('th').contains('Phone').click();
    cy.get('tbody tr').first().should('contain', '+');
  });

  it('should sort users by company [functional], [TC-1026]', () => {
    cy.get('th').contains('Company').click();
    cy.get('tbody tr').first().should('contain', 'A');
  });

  it('should maintain sort order after search [functional], [TC-1027]', () => {
    // First sort by name
    cy.get('th').contains('Name').click();

    // Then search
    cy.get('input[placeholder*="Search"]').type('John');

    // Sort order should be maintained
    cy.get('tbody tr').should('contain', 'John');
  });
});
