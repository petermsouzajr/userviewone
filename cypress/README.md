# Cypress Test Suite Documentation

## Overview

This Cypress test suite covers the User Management application with comprehensive E2E and component testing. Tests are organized by team and feature areas for better reporting and maintenance.

## Team Structure

### Frontend Teams

- **Frontendfrogs** - Homepage functionality, user management E2E workflows
- **FrontendFellows** - Add user functionality, smoke tests

### Backend Team

- **Backendteam** - Search, sort, user details, regression testing

### Test Categories

- **[smoke]** - Critical path tests that must pass for basic functionality
- **[regression]** - Comprehensive tests to prevent feature regression
- **[functional]** - Feature-specific functionality tests

## Test Structure

### Test Types (Derived from Folder Structure)

Test types are automatically determined by the folder structure:

- **`ui/`** - UI tests (automatically detected as `ui` type)

### Test Categories (Indicated in Test Descriptions)

Test categories are explicitly marked in test descriptions:

- **`[smoke]`** - Critical path tests for basic functionality
- **`[functional]`** - Core business logic and feature testing
- **`[regression]`** - Tests to prevent feature regression
- **`[usability]`** - User experience and interface testing

### E2E Tests (`cypress/e2e/`)

#### UI Tests (`cypress/e2e/ui/`)

##### Homepage (`cypress/e2e/ui/homepage/`)

- **`homepage/homepage.cy.ts`** - Homepage functionality, navigation, and smoke tests

##### Users (`cypress/e2e/ui/users/`)

- **`users/user-management.cy.ts`** - Complete user management workflows, regression tests
- **`users/add-user.cy.ts`** - User creation workflows
- **`users/user-details.cy.ts`** - User detail viewing and interactions
- **`users/search.cy.ts`** - Search functionality
- **`users/sort.cy.ts`** - Sorting functionality

## Manual Test Case IDs

Each automated test is linked to a manual test case for traceability:

- **TC-1001** - Homepage loading and display
- **TC-1002** - User list display and pagination
- **TC-1003** - Search functionality
- **TC-1004** - Table sorting
- **TC-1005** - Add user via modal
- **TC-1006** - Add user via dedicated page
- **TC-1007** - Form validation
- **TC-1008** - User detail viewing
- **TC-1009** - Navigation between pages
- **TC-1010** - Error handling and loading states
- **...and 67 more comprehensive test cases**

## Running Tests

### Basic Commands

```bash
# Open Cypress Test Runner
npm run qa:cypress:open

# Run all Cypress tests
npm run qa:cypress:run

# Run full nightly test suite with reporting
npm run qa:test:nightly
```

### Team-Specific Commands

```bash
# Run all tests for Frontendfrogs team
npm run qa:test:frontendfrogs

# Run all tests for FrontendFellows team
npm run qa:test:frontendfellows

# Run all tests for Backendteam team
npm run qa:test:backendteam
```

### Category-Specific Commands

```bash
# Run all smoke tests
npm run qa:test:smoke

# Run smoke tests for specific team (example)
npx cypress run --env grep=[Frontendfrogs];[smoke],grepFilterSpecs=true
```

### Advanced Filtering

```bash
# Run tests by multiple criteria
npx cypress run --env grep=[Frontendfrogs];[functional],grepFilterSpecs=true

# Run tests by category only
npx cypress run --env grep=[regression],grepFilterSpecs=true

# Run tests by team and category
npx cypress run --env grep=[Backendteam];[usability],grepFilterSpecs=true
```

### Running by Folder Structure

```bash
# Run all UI tests
npx cypress run --spec "cypress/e2e/ui/**/*.cy.ts"

# Run all homepage tests
npx cypress run --spec "cypress/e2e/ui/homepage/**/*.cy.ts"

# Run all user tests
npx cypress run --spec "cypress/e2e/ui/users/**/*.cy.ts"

# Run specific feature tests
npx cypress run --spec "cypress/e2e/ui/users/search.cy.ts"
npx cypress run --spec "cypress/e2e/ui/users/sort.cy.ts"
npx cypress run --spec "cypress/e2e/ui/users/add-user.cy.ts"
```

## Test Data

- Test users are created dynamically during test execution
- No persistent test data is required
- All tests clean up after themselves

## Reporting

Tests are configured for integration with qa-shadow-report for comprehensive reporting and team metrics.

## Best Practices

1. Each test is independent and can run in isolation
2. Tests follow the AAA pattern (Arrange, Act, Assert)
3. Custom commands are used for common operations
4. Team annotations are included in test descriptions
5. Manual test case IDs are linked for traceability

## cypress/grep Integration

To enhance your testing workflow and leverage the team name, test type, and test category annotations you've included in your test titles, we recommend integrating the @cypress/grep plugin.

### Benefits of Using @cypress/grep

- **Selective Test Execution**: Run only the tests that match certain patterns, such as [smoke], [functional], or [Frontendfrogs], improving efficiency.
- **Enhanced Filtering**: Easily filter tests by team, type, or category directly from the command line or via environment variables.

### Usage

You can use @cypress/grep to run tests that match specific patterns:

```bash
# Run all smoke tests
npm run qa:cypress:smoke

# Run all tests for the 'Frontendfrogs' team
npm run qa:cypress:frontendfrogs

# Run all smoke tests for team Frontendfrogs
npx cypress run --env grep=[Frontendfrogs];[smoke],grepFilterSpecs=true
```

### @cypress/grep Tags Feature

The @cypress/grep package has a Tags feature, which allows you to add an Object after the test description, like this: `it('verifies X = 2', { tags: 'smoke' }, () => {`. This format does not break the functionality of qa-shadow-report, but it is not fully supported either. Specifically, qa-shadow-report will not parse the object or include its tags in the generated report. Only the text in the test description itself will be parsed and added to the report, meaning that any tags added as objects will be ignored by qa-shadow-report.
