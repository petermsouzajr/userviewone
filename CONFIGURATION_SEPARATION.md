# Configuration Separation

This project uses separate configurations for different concerns to maintain clean separation and avoid conflicts.

## 📁 Configuration Files

### TypeScript Configurations

| File | Purpose | Scope |
|------|---------|-------|
| `tsconfig.json` | Base configuration | All TypeScript files |
| `tsconfig.project.json` | Main project only | Source code (no tests) |
| `tsconfig.test.json` | Jest tests only | Test files |
| `cypress/tsconfig.json` | Cypress only | Cypress files |

### ESLint Configurations

| File | Purpose | Scope |
|------|---------|-------|
| `eslint.config.mjs` | Main configuration | All files with separate rules |
| `.eslintrc.cypress.json` | Cypress-specific | Cypress files only |

## 🎯 Configuration Separation

### 1. TypeScript Separation

#### Main Project (`tsconfig.project.json`)
```json
{
  "extends": "./tsconfig.json",
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": [
    "src/**/__tests__/**/*",
    "src/**/*.test.ts",
    "cypress/**/*"
  ]
}
```

#### Jest Tests (`tsconfig.test.json`)
```json
{
  "extends": "./tsconfig.json",
  "include": ["src/**/__tests__/**/*"],
  "exclude": ["cypress/**/*"]
}
```

#### Cypress (`cypress/tsconfig.json`)
```json
{
  "compilerOptions": {
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
```

### 2. ESLint Separation

#### Main Project Rules
- Next.js specific rules
- React best practices
- TypeScript strict mode
- No Cypress globals

#### Cypress Rules
- Cypress-specific rules
- `cy` and `Cypress` globals
- Testing best practices
- Relaxed TypeScript rules for testing

## 🚀 Available Scripts

### Project-Only Checks
```bash
# Lint only project files
npm run lint:project

# Type check only project files
npm run type-check:project

# Full project check (no tests)
npm run dev:check:project
```

### Cypress-Only Checks
```bash
# Lint only Cypress files
npm run lint:cypress

# Type check only Cypress files
npm run type-check:cypress

# Full Cypress check
npm run dev:check:cypress
```

### All Checks
```bash
# Lint everything
npm run lint

# Type check everything
npm run type-check

# Full check (project + tests + Cypress)
npm run dev:check:all
```

## 🔧 Why This Separation?

### 1. **Type Conflicts**
- **Problem**: Cypress types conflict with Jest types
- **Solution**: Separate TypeScript configs prevent conflicts

### 2. **Different Rules**
- **Problem**: Cypress needs different ESLint rules than production code
- **Solution**: Separate ESLint configurations

### 3. **Performance**
- **Problem**: Checking everything together is slow
- **Solution**: Targeted checks for faster feedback

### 4. **CI/CD Optimization**
- **Problem**: Different environments need different checks
- **Solution**: Granular scripts for specific needs

## 📊 Configuration Matrix

| Environment | TypeScript Config | ESLint Config | Purpose |
|-------------|-------------------|---------------|---------|
| Development | `tsconfig.project.json` | `eslint.config.mjs` | Main app development |
| Jest Tests | `tsconfig.test.json` | `eslint.config.mjs` | Unit/integration tests |
| Cypress | `cypress/tsconfig.json` | `.eslintrc.cypress.json` | E2E/component tests |
| Build | `tsconfig.json` | `eslint.config.mjs` | Production build |

## 🎯 Best Practices

### 1. **Development Workflow**
```bash
# When working on main app
npm run dev:check:project

# When working on tests
npm run dev:check:cypress

# Before committing
npm run dev:check:all
```

### 2. **CI/CD Pipeline**
```yaml
# Example GitHub Actions
- name: Check Project
  run: npm run dev:check:project

- name: Check Tests
  run: npm run test

- name: Check Cypress
  run: npm run dev:check:cypress
```

### 3. **IDE Configuration**
- **VS Code**: Use workspace-specific settings
- **WebStorm**: Configure separate run configurations
- **Vim/Emacs**: Use project-specific configs

## 🔍 Troubleshooting

### Common Issues

#### 1. **TypeScript Errors in Cypress**
```bash
# Check Cypress types specifically
npm run type-check:cypress
```

#### 2. **ESLint Errors in Cypress**
```bash
# Check Cypress linting specifically
npm run lint:cypress
```

#### 3. **Conflicting Types**
- Ensure `cypress/tsconfig.json` excludes main project
- Ensure `tsconfig.test.json` excludes Cypress
- Use separate `node_modules` if needed

### Debugging Commands

```bash
# Check what files are included in each config
npx tsc --listFiles --project tsconfig.project.json
npx tsc --listFiles --project tsconfig.test.json
npx tsc --listFiles --project cypress/tsconfig.json

# Check ESLint configuration
npx eslint --print-config src/components/AddUserForm.tsx
npx eslint --print-config cypress/e2e/user-management.cy.ts
```

## 🎉 Benefits

### ✅ **Clean Separation**
- No type conflicts between environments
- Appropriate rules for each context
- Clear boundaries between concerns

### ✅ **Performance**
- Faster type checking for specific contexts
- Targeted linting for faster feedback
- Optimized CI/CD pipelines

### ✅ **Maintainability**
- Easy to understand what each config does
- Simple to modify rules for specific contexts
- Clear documentation of purpose

### ✅ **Developer Experience**
- Appropriate autocomplete for each context
- Relevant error messages
- Faster development cycles 