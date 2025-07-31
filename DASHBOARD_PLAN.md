# Senior Frontend Engineer Take-Home Exercise - Implementation Plan

## Project Overview

This document outlines the detailed implementation plan for building a user dashboard application that fetches users from a public API, displays them in a searchable/sortable table, shows detailed profiles in modals, and includes a form to add new users with client-side routing.

## Current Project Analysis

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **React**: v19.1.0 (latest)
- **Build Tool**: Next.js built-in bundler

## Architecture Decisions

### 1. State Management Strategy

**Choice**: React Context API with useReducer
**Rationale**:

- Lightweight and built into React
- Perfect for this scale of application
- Provides predictable state updates
- Easy to test and debug
- No external dependencies

### 2. Routing Strategy

**Choice**: Next.js App Router with dynamic routes
**Rationale**:

- Leverages existing Next.js setup
- Built-in performance optimizations
- SEO-friendly
- Type-safe routing with TypeScript

### 3. UI Component Library

**Choice**: Custom components with Tailwind CSS
**Rationale**:

- Full control over design
- Smaller bundle size
- Consistent with existing setup
- Better accessibility control

## Detailed Implementation Plan

### Phase 1: Project Setup & Dependencies

#### 1.1 Install Additional Dependencies

```bash
npm install react-router-dom @types/react-router-dom
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev vitest jsdom
```

#### 1.2 Project Structure Setup

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (User List)
│   ├── add-user/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Table.tsx
│   ├── UserTable.tsx
│   ├── UserModal.tsx
│   ├── AddUserForm.tsx
│   └── Navigation.tsx
├── hooks/
│   ├── useUsers.ts
│   ├── useSearch.ts
│   └── useSort.ts
├── context/
│   └── UserContext.tsx
├── types/
│   └── user.ts
├── utils/
│   ├── api.ts
│   ├── validation.ts
│   └── helpers.ts
└── tests/
    ├── components/
    └── hooks/
```

### Phase 2: Core Types & Interfaces ✅ **COMPLETED**

#### 2.1 Define User Types

```typescript
// src/types/user.ts
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
```

### Phase 3: API Layer & Data Fetching ✅ **COMPLETED**

#### 3.1 API Utilities

```typescript
// src/utils/api.ts
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
```

**Status**: ✅ **COMPLETED** - API utilities created, types defined, and basic data fetching functionality verified. Component successfully displays user data (tested with mock data due to network connectivity issues with external API).

### Phase 4: State Management

#### 4.1 User Context Implementation

```typescript
// src/context/UserContext.tsx
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

type UserAction =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SELECT_USER'; payload: User | null }
  | { type: 'ADD_USER'; payload: User };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SELECT_USER':
      return { ...state, selectedUser: action.payload };
    case 'ADD_USER':
      return { ...state, users: [action.payload, ...state.users] };
    default:
      return state;
  }
};
```

### Phase 5: Core Components Development

#### 5.1 Reusable UI Components

- **Button.tsx**: Accessible button with variants
- **Input.tsx**: Form input with validation states
- **Modal.tsx**: Accessible modal with backdrop
- **Table.tsx**: Sortable table component

#### 5.2 Feature Components

- **UserTable.tsx**: Main table with search and sort
- **UserModal.tsx**: Detailed user information modal
- **AddUserForm.tsx**: Form for adding new users
- **Navigation.tsx**: App navigation component

### Phase 6: Custom Hooks

#### 6.1 Search Hook

```typescript
// src/hooks/useSearch.ts
export const useSearch = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return { searchTerm, setSearchTerm, filteredUsers };
};
```

#### 6.2 Sort Hook

```typescript
// src/hooks/useSort.ts
export const useSort = (users: User[]) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sortedUsers = useMemo(() => {
    if (!sortConfig) return users;

    return [...users].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, sortConfig]);

  return { sortConfig, setSortConfig, sortedUsers };
};
```

### Phase 7: Form Validation

#### 7.1 Validation Utilities

```typescript
// src/utils/validation.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};
```

### Phase 8: Performance Optimizations

#### 8.1 Virtualization for Large Lists

- Implement react-window for tables with >50 items
- Lazy load user details in modal
- Implement pagination if needed

#### 8.2 Code Splitting

- Lazy load AddUserForm component
- Split API utilities into separate chunks
- Implement dynamic imports for heavy components

#### 8.3 Memoization

- Memoize expensive calculations
- Use React.memo for components
- Optimize re-renders with useCallback and useMemo

### Phase 9: Accessibility Implementation

#### 9.1 ARIA Attributes

- Proper table semantics
- Modal accessibility
- Form field labels and descriptions
- Keyboard navigation support

#### 9.2 Screen Reader Support

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Focus management

### Phase 10: Testing Strategy

#### 10.1 Unit Tests

- Component rendering tests
- Hook functionality tests
- Utility function tests
- Form validation tests

#### 10.2 Integration Tests

- User flow tests
- API integration tests
- State management tests

#### 10.3 Test Setup

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
  },
});
```

### Phase 11: Error Handling & Loading States

#### 11.1 Error Boundaries

- Global error boundary
- API error handling
- Form validation errors
- Network error handling

#### 11.2 Loading States

- Skeleton loaders
- Spinner components
- Progressive loading
- Optimistic updates

### Phase 12: Responsive Design

#### 12.1 Mobile-First Approach

- Responsive table design
- Mobile-friendly modal
- Touch-friendly interactions
- Adaptive navigation

#### 12.2 Breakpoint Strategy

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Phase 13: Final Polish & Deployment

#### 13.1 Code Quality

- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Performance auditing

#### 13.2 Deployment Preparation

- Build optimization
- Environment variables
- SEO meta tags
- PWA considerations

## Technical Specifications

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Accessibility Standards

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- High contrast support

## Risk Mitigation

### Technical Risks

1. **API Rate Limiting**: Implement retry logic and caching
2. **Large Dataset Performance**: Virtualization and pagination
3. **Browser Compatibility**: Progressive enhancement approach
4. **State Management Complexity**: Keep context simple, use local state where appropriate

### Timeline Risks

1. **Scope Creep**: Strict adherence to requirements
2. **Testing Coverage**: Focus on critical user flows
3. **Performance Issues**: Early performance monitoring
4. **Accessibility Gaps**: Continuous accessibility testing

## Success Metrics

### Functional Requirements

- ✅ Fetch users from API
- ✅ Display in searchable table
- ✅ Sort by columns
- ✅ Show details in modal
- ✅ Add new user form
- ✅ Client-side routing
- ✅ Form validation
- ✅ Responsive design
- ✅ Accessibility compliance

### Quality Requirements

- ✅ Clean, maintainable code
- ✅ Comprehensive testing
- ✅ Performance optimization
- ✅ Error handling
- ✅ Loading states

## Deliverables

1. **Source Code**: Complete React application
2. **Documentation**: README with setup instructions
3. **Tests**: Unit and integration tests
4. **Deployment**: Live demo URL
5. **Architecture**: Technical decisions documentation

## Timeline Summary

- **Day 1**: Setup, types, API layer ✅ **COMPLETED**
- **Day 2**: State management, core components
- **Day 3**: Hooks, form validation
- **Day 4**: Performance, accessibility
- **Day 5**: Testing, error handling
- **Day 6**: Responsive design
- **Day 7**: Polish, deployment

Total estimated time: 7 days (35-40 hours)

## Next Steps

1. ✅ Review and approve this plan
2. ✅ Set up development environment
3. ✅ Begin Phase 1 implementation
4. ✅ Complete Phase 2 (Types) ✅ **COMPLETED**
5. ✅ Complete Phase 3 (API Layer) ✅ **COMPLETED**
6. Regular progress reviews
7. Final code review and testing
8. Deployment and documentation

---

_This plan provides a comprehensive roadmap for building a production-ready dashboard application that meets all requirements while demonstrating senior-level frontend engineering skills._
