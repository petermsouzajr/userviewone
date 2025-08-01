# Cypress Setup for TypeScript

This project has been configured with Cypress for both E2E and Component testing with full TypeScript support.

## 🚀 Quick Start

### Running Cypress Tests

1. **Open Cypress Test Runner (Interactive Mode):**

   ```bash
   npm run cypress:open
   ```

2. **Run E2E Tests (Headless Mode):**

   ```bash
   npm run cypress:run:e2e
   ```

3. **Run Component Tests (Headless Mode):**

   ```bash
   npm run cypress:run:component
   ```

4. **Run E2E Tests with Dev Server:**

   ```bash
   npm run test:e2e
   ```

5. **Run Component Tests with Dev Server:**
   ```bash
   npm run test:component
   ```

## 📁 Project Structure

```
cypress/
├── e2e/                    # End-to-end tests
│   └── user-management.cy.ts
├── component/              # Component tests
│   └── AddUserForm.cy.tsx
├── support/                # Support files
│   ├── e2e.ts            # E2E support
│   ├── component.ts       # Component support
│   └── commands.ts        # Custom commands
├── fixtures/              # Test data
└── tsconfig.json          # TypeScript config
```

## 🧪 Test Types

### E2E Tests (`cypress/e2e/`)

- Test complete user workflows
- Navigate between pages
- Test form submissions
- Verify data persistence
- Test search and sort functionality

### Component Tests (`cypress/component/`)

- Test individual React components
- Verify component behavior in isolation
- Test form validation
- Test user interactions

## 🔧 Custom Commands

The project includes custom Cypress commands for common operations:

### `cy.addUser(userData)`

Adds a new user via the form with the provided data.

```typescript
cy.addUser({
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  phone: '1234567890',
  website: 'https://johndoe.com',
  address: {
    street: '123 Main St',
    city: 'New York',
    zipcode: '10001',
  },
  company: {
    name: 'Tech Corp',
  },
});
```

### `cy.searchUsers(searchTerm)`

Searches for users in the user list.

```typescript
cy.searchUsers('John');
```

### `cy.sortUsersBy(columnName)`

Sorts the user table by the specified column.

```typescript
cy.sortUsersBy('Name');
cy.sortUsersBy('Email');
cy.sortUsersBy('Company');
```

## 📝 Writing Tests

### E2E Test Example

```typescript
describe('User Management', () => {
  it('should add a new user successfully', () => {
    cy.addUser({
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '1234567890',
      address: {
        street: '123 Main St',
        city: 'New York',
        zipcode: '10001',
      },
      company: {
        name: 'Tech Corp',
      },
    });

    // Verify user was added
    cy.contains('John Doe').should('be.visible');
  });
});
```

### Component Test Example

```typescript
import React from 'react';
import AddUserForm from '../../src/components/AddUserForm';

describe('AddUserForm Component', () => {
  it('should render all form fields', () => {
    cy.mount(
      <AddUserForm
        isOpen={true}
        onClose={cy.stub()}
        onSuccess={cy.stub()}
        mode="page"
      />
    );

    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
  });
});
```

## ⚙️ Configuration

### Cypress Configuration (`cypress.config.ts`)

- **Base URL:** `http://localhost:3000`
- **Viewport:** 1280x720
- **Timeouts:** 10 seconds
- **Video Recording:** Disabled
- **Screenshots:** Enabled on failure

### TypeScript Configuration (`cypress/tsconfig.json`)

- Strict type checking enabled
- Cypress and Node.js types included
- ES5 target for browser compatibility

## 🎯 Test Coverage

The current test suite covers:

### E2E Tests

- ✅ User list page display
- ✅ Navigation to add user page
- ✅ Adding new users
- ✅ Form validation (empty and invalid data)
- ✅ Field error clearing on typing
- ✅ User search functionality
- ✅ Table sorting
- ✅ Navigation back from add user page

### Component Tests

- ✅ Form field rendering
- ✅ Form submission with valid data
- ✅ Validation error display
- ✅ Field error clearing
- ✅ Cancel button functionality
- ✅ Email validation
- ✅ Phone validation
- ✅ Website URL validation

## 🚀 Best Practices

1. **Use Custom Commands:** Leverage the provided custom commands for common operations
2. **Test User Workflows:** Focus on complete user journeys rather than isolated features
3. **Data Isolation:** Each test should be independent and not rely on other tests
4. **Meaningful Assertions:** Verify both visual elements and functional behavior
5. **Type Safety:** Use TypeScript for better development experience and error catching

## 🔍 Debugging

### View Test Results

- **Interactive Mode:** Use `npm run cypress:open` for step-by-step debugging
- **Headless Mode:** Use `npm run cypress:run` for CI/CD integration

### Common Issues

- **Port Conflicts:** Ensure port 3000 is available for the dev server
- **Type Errors:** Check that all imports and types are correctly defined
- **Timing Issues:** Use `cy.wait()` or proper assertions for async operations

## 📊 Integration with CI/CD

The Cypress tests can be easily integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run E2E Tests
  run: npm run test:e2e

- name: Run Component Tests
  run: npm run test:component
```

## 🎉 Next Steps

1. **Add More Tests:** Expand test coverage for edge cases
2. **Performance Testing:** Add tests for large datasets
3. **Accessibility Testing:** Include accessibility checks
4. **Visual Regression:** Add visual regression testing
5. **API Testing:** Test API endpoints directly
