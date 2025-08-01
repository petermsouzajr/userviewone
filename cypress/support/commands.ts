// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to add a user via the form
Cypress.Commands.add(
  'addUser',
  (userData: {
    name: string;
    username: string;
    email: string;
    phone: string;
    website?: string;
    address: {
      street: string;
      suite?: string;
      city: string;
      zipcode: string;
    };
    company: {
      name: string;
      catchPhrase?: string;
      bs?: string;
    };
  }) => {
    cy.visit('/add-user');

    // Fill in basic information
    cy.get('input[name="name"]').type(userData.name);
    cy.get('input[name="username"]').type(userData.username);
    cy.get('input[name="email"]').type(userData.email);
    cy.get('input[name="phone"]').type(userData.phone);

    if (userData.website) {
      cy.get('input[name="website"]').type(userData.website);
    }

    // Fill in address information
    cy.get('input[name="address.street"]').type(userData.address.street);
    if (userData.address.suite) {
      cy.get('input[name="address.suite"]').type(userData.address.suite);
    }
    cy.get('input[name="address.city"]').type(userData.address.city);
    cy.get('input[name="address.zipcode"]').type(userData.address.zipcode);

    // Fill in company information
    cy.get('input[name="company.name"]').type(userData.company.name);
    if (userData.company.catchPhrase) {
      cy.get('input[name="company.catchPhrase"]').type(
        userData.company.catchPhrase
      );
    }
    if (userData.company.bs) {
      cy.get('input[name="company.bs"]').type(userData.company.bs);
    }

    // Submit the form
    cy.get('button[type="submit"]').click();
  }
);

// Custom command to search for users
Cypress.Commands.add('searchUsers', (searchTerm: string) => {
  cy.get('input[placeholder*="Search"]').clear().type(searchTerm);
});

// Custom command to sort users by column
Cypress.Commands.add('sortUsersBy', (columnName: string) => {
  cy.contains('th', columnName).click();
});

// Type declarations for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      addUser(userData: {
        name: string;
        username: string;
        email: string;
        phone: string;
        website?: string;
        address: {
          street: string;
          suite?: string;
          city: string;
          zipcode: string;
        };
        company: {
          name: string;
          catchPhrase?: string;
          bs?: string;
        };
      }): Chainable<void>;
      searchUsers(searchTerm: string): Chainable<void>;
      sortUsersBy(columnName: string): Chainable<void>;
    }
  }
}

export {};
