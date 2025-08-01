# Cypress Test Suite

## Overview

This Cypress test suite covers the User Management application with comprehensive E2E testing. Tests are organized by team and feature areas for better reporting and maintenance.

## Team Structure

### Frontend Teams

- **Frontendfrogs** - Homepage functionality, user management E2E workflows
- **FrontendFellows** - Add user functionality, smoke tests

### Backend Team

- **Backendteam** - Search, sort, user details, regression testing

## Test Structure

### Test Types (Derived from Folder Structure)

- **`ui/`** - UI tests (automatically detected as `ui` type)

### Test Categories (Indicated in Test Descriptions)

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
npm run qa:cypress:frontendfrogs

# Run all tests for FrontendFellows team
npm run qa:cypress:frontendfellows

# Run all tests for Backendteam team
npm run qa:cypress:backendteam
```

### Category-Specific Commands

```bash
# Run all smoke tests
npm run qa:cypress:smoke
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

## @cypress/grep Integration

The @cypress/grep plugin enables selective test execution based on team names and test categories.

### Benefits

- **Selective Test Execution**: Run only tests that match certain patterns
- **Enhanced Filtering**: Easily filter tests by team, type, or category

### Usage

```bash
# Run all smoke tests
npm run qa:cypress:smoke

# Run all tests for the 'Frontendfrogs' team
npm run qa:cypress:frontendfrogs

# Run all smoke tests for team Frontendfrogs
npx cypress run --env grep=[Frontendfrogs];[smoke],grepFilterSpecs=true
```
