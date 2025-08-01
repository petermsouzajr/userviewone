describe('[FrontendFellows] Add User Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open add user modal [functional], [TC-1031]', () => {
    cy.get('button').contains('Add User').click();
    cy.get('h2').should('contain', 'Add New User');
  });

  it('should navigate to add user page [functional], [TC-1032]', () => {
    cy.get('a').contains('Add User').click();
    cy.url().should('include', '/add-user');
  });

  it('should display all form fields in modal [usability], [TC-1033]', () => {
    cy.get('button').contains('Add User').click();

    // Basic Information
    cy.get('label').should('contain', 'Name');
    cy.get('label').should('contain', 'Username');
    cy.get('label').should('contain', 'Email');
    cy.get('label').should('contain', 'Phone');
    cy.get('label').should('contain', 'Website');

    // Address
    cy.get('label').should('contain', 'Street');
    cy.get('label').should('contain', 'Suite');
    cy.get('label').should('contain', 'City');
    cy.get('label').should('contain', 'Zipcode');

    // Company
    cy.get('label').should('contain', 'Company Name');
    cy.get('label').should('contain', 'Catch Phrase');
    cy.get('label').should('contain', 'Business');
  });

  it('should display all form fields on dedicated page [usability], [TC-1034]', () => {
    cy.visit('/add-user');

    // Basic Information
    cy.get('label').should('contain', 'Name');
    cy.get('label').should('contain', 'Username');
    cy.get('label').should('contain', 'Email');
    cy.get('label').should('contain', 'Phone');
    cy.get('label').should('contain', 'Website');

    // Address
    cy.get('label').should('contain', 'Street');
    cy.get('label').should('contain', 'Suite');
    cy.get('label').should('contain', 'City');
    cy.get('label').should('contain', 'Zipcode');

    // Company
    cy.get('label').should('contain', 'Company Name');
    cy.get('label').should('contain', 'Catch Phrase');
    cy.get('label').should('contain', 'Business');
  });

  it('should add user successfully via modal [functional], [TC-1035]', () => {
    cy.get('button').contains('Add User').click();

    // Fill form with valid data
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="phone"]').type('123-456-7890');
    cy.get('input[name="website"]').type('https://johndoe.com');

    cy.get('input[name="address.street"]').type('123 Main St');
    cy.get('input[name="address.suite"]').type('Apt 1');
    cy.get('input[name="address.city"]').type('New York');
    cy.get('input[name="address.zipcode"]').type('12345');

    cy.get('input[name="company.name"]').type('Tech Corp');
    cy.get('input[name="company.catchPhrase"]').type('Innovation at its best');
    cy.get('input[name="company.bs"]').type('synergize scalable supply-chains');

    cy.get('button[type="submit"]').click();

    // Verify success
    cy.get('tbody tr').should('contain', 'John Doe');
  });

  it('should add user successfully via dedicated page [functional], [TC-1036]', () => {
    cy.visit('/add-user');

    // Fill form with valid data
    cy.get('input[name="name"]').type('Jane Smith');
    cy.get('input[name="username"]').type('janesmith');
    cy.get('input[name="email"]').type('jane@example.com');
    cy.get('input[name="phone"]').type('987-654-3210');
    cy.get('input[name="website"]').type('https://janesmith.com');

    cy.get('input[name="address.street"]').type('456 Oak Ave');
    cy.get('input[name="address.suite"]').type('Suite 2');
    cy.get('input[name="address.city"]').type('Los Angeles');
    cy.get('input[name="address.zipcode"]').type('54321');

    cy.get('input[name="company.name"]').type('Design Studio');
    cy.get('input[name="company.catchPhrase"]').type('Creative solutions');
    cy.get('input[name="company.bs"]').type('revolutionize end-to-end systems');

    cy.get('button[type="submit"]').click();

    // Verify redirect and success
    cy.url().should('include', '/');
    cy.get('tbody tr').should('contain', 'Jane Smith');
  });

  it('should validate required fields [functional], [TC-1037]', () => {
    cy.get('button').contains('Add User').click();
    cy.get('button[type="submit"]').click();

    // Check for validation errors
    cy.get('ul').should('contain', 'Name is required');
    cy.get('ul').should('contain', 'Email is required');
    cy.get('ul').should('contain', 'Phone is required');
  });

  it('should validate email format [functional], [TC-1038]', () => {
    cy.get('button').contains('Add User').click();
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();

    cy.get('ul').should('contain', 'Invalid email format');
  });

  it('should validate phone format [functional], [TC-1039]', () => {
    cy.get('button').contains('Add User').click();
    cy.get('input[name="phone"]').type('123');
    cy.get('button[type="submit"]').click();

    cy.get('ul').should('contain', 'Phone must be in format');
  });

  it('should validate website URL format [functional], [TC-1040]', () => {
    cy.get('button').contains('Add User').click();
    cy.get('input[name="website"]').type('not-a-url');
    cy.get('button[type="submit"]').click();

    cy.get('ul').should('contain', 'Invalid website URL');
  });

  it('should clear validation errors when user types [usability], [TC-1041]', () => {
    cy.get('button').contains('Add User').click();
    cy.get('button[type="submit"]').click();

    // Verify errors are shown
    cy.get('ul').should('contain', 'Name is required');

    // Type in name field
    cy.get('input[name="name"]').type('John');

    // Verify error is cleared
    cy.get('ul').should('not.contain', 'Name is required');
  });

  it('should close modal when cancel is clicked [functional], [TC-1042]', () => {
    cy.get('button').contains('Add User').click();
    cy.get('button').contains('Cancel').click();

    cy.get('h2').should('not.contain', 'Add New User');
  });

  it('should navigate back from add user page [functional], [TC-1043]', () => {
    cy.visit('/add-user');
    cy.get('a').contains('Back').click();

    cy.url().should('not.include', '/add-user');
  });
});
