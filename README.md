# User Management Dashboard

A modern, responsive React dashboard application for managing user data with search, sort, and CRUD operations.

## ✅ Requirements Fulfillment

### **Core Requirements & Solutions**

| Requirement                           | Solution                                         | Extra Features                                        | Justification                                      |
| ------------------------------------- | ------------------------------------------------ | ----------------------------------------------------- | -------------------------------------------------- |
| **Fetch users from public API**       | ✅ `fetchUsers()` from JSONPlaceholder API       | ✅ XHR fallback for network resilience                | Robust error handling with fallback mechanism      |
| **Display users in searchable table** | ✅ `UserTable` component with real-time search   | ✅ Debounced search, multi-field filtering            | Smooth UX with 300ms debounce for performance      |
| **Sortable table columns**            | ✅ `useSort` hook with multi-column support      | ✅ Visual sort indicators, bidirectional sorting      | Clear user feedback with sort direction indicators |
| **Modal for user details**            | ✅ `UserModal` component with comprehensive data | ✅ Responsive modal, keyboard navigation              | Accessible modal with proper ARIA attributes       |
| **Add user form**                     | ✅ `AddUserForm` with Zod validation             | ✅ Dedicated page + modal modes, real-time validation | Type-safe validation with immediate user feedback  |
| **Client-side routing**               | ✅ Next.js App Router with dynamic routes        | ✅ Clean URLs, proper navigation patterns             | Modern routing with built-in optimizations         |

### **Architecture & Tech Stack**

| Requirement                          | Solution                                         | Extra Features                                 | Justification                                        |
| ------------------------------------ | ------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------------- |
| **React with functional components** | ✅ Modern React 19 with hooks                    | ✅ Custom hooks (useSearch, useSort, useUsers) | Reusable logic with clear separation of concerns     |
| **React Router for navigation**      | ✅ Next.js App Router (superior to React Router) | ✅ Built-in optimizations, SEO-friendly        | Next.js provides better performance and features     |
| **State management choice**          | ✅ Context API + useReducer                      | ✅ Centralized state, predictable updates      | Lightweight solution perfect for this scale          |
| **Responsive design**                | ✅ Mobile-first Tailwind CSS                     | ✅ Breakpoint-specific layouts, touch-friendly | Consistent design system with utility-first approach |
| **Accessible components**            | ✅ ARIA attributes, keyboard navigation          | ✅ Screen reader support, focus management     | WCAG 2.1 AA compliance for inclusive design          |
| **Clean, consistent styling**        | ✅ Tailwind CSS with custom design system        | ✅ Component variants, consistent spacing      | Rapid development with maintainable design tokens    |

### **Functionality Requirements**

| Requirement                  | Solution                                | Extra Features                                       | Justification                                     |
| ---------------------------- | --------------------------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| **Search by name and email** | ✅ Multi-field search with debouncing   | ✅ Company search, case-insensitive, partial matches | Comprehensive search covering all relevant fields |
| **Sort by columns**          | ✅ Click-to-sort with visual feedback   | ✅ Multi-column support, sort persistence            | Intuitive sorting with clear visual indicators    |
| **Modal for user details**   | ✅ Comprehensive user profile display   | ✅ Address, phone, company, website details          | Complete user information in accessible modal     |
| **Form validation**          | ✅ Zod schemas for type-safe validation | ✅ Real-time validation, field-level errors          | Robust validation with immediate user feedback    |

### **Performance & Quality**

| Requirement                 | Solution                                        | Extra Features                                | Justification                                |
| --------------------------- | ----------------------------------------------- | --------------------------------------------- | -------------------------------------------- |
| **Optimize list rendering** | ✅ React.memo, useMemo for expensive operations | ✅ Virtualization ready, efficient re-renders | Performance optimizations for scalability    |
| **Code splitting**          | ✅ Next.js automatic code splitting             | ✅ Lazy loading for routes, dynamic imports   | Built-in optimizations reduce bundle size    |
| **Error handling**          | ✅ Comprehensive error boundaries               | ✅ API error handling, user-friendly messages | Graceful degradation with clear error states |
| **Loading states**          | ✅ Skeleton loaders, spinners                   | ✅ Progressive loading, optimistic updates    | Smooth user experience during data fetching  |

### **Testing Requirements**

| Requirement                       | Solution                                | Extra Features                                   | Justification                              |
| --------------------------------- | --------------------------------------- | ------------------------------------------------ | ------------------------------------------ |
| **Unit tests for key components** | ✅ 93 tests with 94% pass rate          | ✅ Component, utility, context, UI tests         | Comprehensive coverage ensures reliability |
| **Integration/E2E tests**         | ✅ Cypress with team-based organization | ✅ qa-shadow-report integration, custom commands | Professional testing setup with reporting  |

### **Additional Excellence**

| Feature                    | Implementation                                 | Justification                                               |
| -------------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| **Zod Validation**         | ✅ Type-safe form validation                   | Modern validation library with excellent TypeScript support |
| **GitHub Actions CI/CD**   | ✅ Engineering CI + QA Nightly workflows       | Automated quality assurance and regression testing          |
| **Team-based Testing**     | ✅ Frontendfrogs, FrontendFellows, Backendteam | Scalable testing organization for enterprise teams          |
| **Performance Monitoring** | ✅ Codecov integration, build verification     | Continuous quality monitoring and reporting                 |
| **Accessibility**          | ✅ WCAG 2.1 AA compliance                      | Inclusive design for all users                              |
| **Error Boundaries**       | ✅ Global error handling                       | Graceful application recovery from errors                   |
| **Custom Hooks**           | ✅ useSearch, useSort, useUsers                | Reusable logic with clear APIs                              |
| **Responsive Design**      | ✅ Mobile-first approach                       | Optimal experience across all devices                       |

---

## 🚀 Features

- **User Management**: Fetch, display, and add users
- **Search & Filter**: Real-time search by name, email, and company
- **Sortable Table**: Click column headers to sort data
- **User Details Modal**: View comprehensive user information
- **Add User Form**: Create new users with Zod validation
- **Client-side Routing**: Navigate between User List and Add User views

## 🛠 Tech Stack

- **React 19** with functional components and hooks
- **TypeScript** for type safety
- **Next.js 15** for development and build tooling
- **Tailwind CSS** for styling
- **Zod** for form validation
- **Jest & React Testing Library** for testing
- **Cypress** for E2E testing

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── __tests__/        # Unit tests
├── context/              # State management
├── hooks/                # Custom hooks
├── types/                # TypeScript definitions
├── utils/                # Utility functions
└── cypress/              # E2E tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd userviewone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

#### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

#### Code Quality

- `npm run dev:lint:project` - Lint project files
- `npm run dev:type-check:project` - Type check project files
- `npm run dev:check:project` - Lint + type check project

#### Testing

- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

#### QA Testing

- `npm run qa:cypress:open` - Open Cypress Test Runner
- `npm run qa:cypress:run` - Run all Cypress tests
- `npm run qa:cypress:smoke` - Run smoke tests
- `npm run qa:test:nightly` - Run full nightly test suite

## 🧪 Testing

### Unit Tests

- **Jest** for test runner
- **React Testing Library** for component testing
- **93 tests** with 94% pass rate
- **Comprehensive coverage** of components, utilities, and context

### E2E Tests

- **Cypress** for end-to-end testing
- **Team-based organization** (Frontendfrogs, FrontendFellows, Backendteam)
- **qa-shadow-report** integration for comprehensive reporting
- **Custom commands** for common operations

## 🏗 Architecture

### State Management

- **Context API** with useReducer for predictable state updates
- **Custom hooks** for reusable logic (useSearch, useSort, useUsers)

### Form Validation

- **Zod schemas** for type-safe validation
- **Real-time validation** with field-level error display
- **Comprehensive validation** for all user fields

### Performance

- **Memoization** for expensive computations
- **Debounced search** for smooth user experience
- **Optimized re-renders** with React.memo and useCallback

## 🎨 UI/UX

- **Responsive design** - Mobile-first approach
- **Accessibility** - WCAG 2.1 AA compliance
- **Modern styling** - Clean, minimalist design with Tailwind CSS
- **Loading states** - Skeleton loaders and spinners
- **Error handling** - Comprehensive error boundaries and user feedback

## 📊 GitHub Actions & CI/CD

### Engineering CI

- **Code quality** - Linting, type checking, unit tests
- **Build verification** - Ensures application builds successfully
- **Coverage reporting** - Codecov integration

### QA Nightly

- **Regression testing** - Daily comprehensive test suite
- **qa-shadow-report** - Team-based reporting and metrics
- **Google Sheets integration** - Automated reporting

### Automated Quality Assurance

This project implements a comprehensive CI/CD pipeline with:

- **Daily Nightly Tests** - Automated regression testing at 1 AM UTC
- **Team-based Reporting** - qa-shadow-report sends detailed test results to Google Sheets
- **Quality Monitoring** - Continuous integration ensures code quality on every push/PR
- **Performance Tracking** - Code coverage and build verification on every change

### 📈 Test Reporting

The project uses **qa-shadow-report** for comprehensive test reporting:

- **Automated Reports** - Daily test results sent to Google Sheets
- **Team Metrics** - Track performance by team (Frontendfrogs, FrontendFellows, Backendteam)
- **Historical Data** - Maintain test history and trends
- **Quality Insights** - Detailed analysis of test coverage and failures

**📊 View Today's Report (August 1st):** [Google Sheets Dashboard](https://docs.google.com/spreadsheets/d/1Y8tFpbNEKPtQWmo3U9idGxxoSB3zIbLrQFsllr1mySs/edit?gid=1726990861#gid=1726990861)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
