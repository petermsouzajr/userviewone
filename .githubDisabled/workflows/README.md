# GitHub Actions Workflows

This directory contains GitHub Actions workflows for both QA and Engineering teams.

## QA Team Workflows

### Nightly Regression and Report (`qa-nightly-regression.yml`)

**Purpose**: Runs comprehensive regression tests and generates reports for QA team.

**Triggers**:

- Daily at 1 AM UTC (scheduled)
- On push to main branch

**Features**:

- Decrypts Google Sheets credentials for reporting
- Runs full nightly test suite with qa-shadow-report
- Uploads test results and screenshots as artifacts
- Generates comprehensive reports for QA analysis

**Usage**:

```bash
# Manual trigger via GitHub UI
# Or automatic daily execution
```

## Engineering Team Workflows

### Engineering CI (`engineering-ci.yml`)

**Purpose**: Development-focused Continuous Integration for engineering team.

**Triggers**:

- On push to main, develop, or feature branches
- On pull requests to main or develop

**Features**:

- **Code Quality**: Linting and type checking
- **Unit Testing**: Jest tests with coverage reporting
- **Build Verification**: Ensures application builds successfully
- **Coverage Reporting**: Codecov integration for test coverage

**Jobs**:

1. **`code-quality`**: Linting, type checking, unit tests, building, coverage

**Usage**:

```bash
# Automatic on push/PR
# No manual intervention needed
```

## Workflow Comparison

| Workflow                    | Team        | Frequency  | Scope                     | Reporting        |
| --------------------------- | ----------- | ---------- | ------------------------- | ---------------- |
| `qa-nightly-regression.yml` | QA          | Daily      | Full regression           | qa-shadow-report |
| `engineering-ci.yml`        | Engineering | On push/PR | Code quality + unit tests | Codecov          |

## Required Secrets

### For QA Workflows:

- `GPG_PASSPHRASE`: Passphrase for decrypting Google Sheets credentials

### For Engineering Workflows:

- No additional secrets required (uses public actions)

## Artifact Retention

- **QA Nightly**: 30 days (comprehensive reporting)
- **Engineering CI**: No artifacts (coverage via Codecov)

## Best Practices

1. **QA Team**: Use nightly workflow for comprehensive testing and reporting
2. **Engineering Team**: Use CI for code quality and unit testing
3. **Clear Separation**: Engineering focuses on development, QA focuses on testing
4. **Monitoring**: Check coverage reports and QA artifacts regularly
