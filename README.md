# User Dashboard Application

A modern, responsive React dashboard application for managing user data with search, sort, and CRUD operations.

## 🚀 Features

### Core Functionality

- **User Management**: Fetch, display, and add users
- **Search & Filter**: Real-time search by name, email, and company
- **Sortable Table**: Click column headers to sort data
- **User Details Modal**: View comprehensive user information
- **Add User Form**: Create new users with validation
- **Client-side Routing**: Navigate between User List and Add User views

### Technical Features

- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: ARIA attributes and keyboard navigation
- **Error Handling**: Comprehensive error states and loading indicators
- **Form Validation**: Real-time validation with helpful error messages
- **Performance Optimized**: Efficient rendering and state management
- **Type Safety**: Full TypeScript implementation

## 🛠 Tech Stack

### Frontend

- **React 19** with functional components and hooks
- **TypeScript** for type safety
- **Next.js 15** for development and build tooling
- **React Router DOM** for client-side routing
- **Tailwind CSS** for styling

### State Management

- **Context API** with useReducer for predictable state updates
- **Custom hooks** for reusable logic

### Testing

- **Jest** for test runner
- **React Testing Library** for component testing
- **User Event** for interaction testing

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page with routing
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Table.tsx
│   ├── UserTable.tsx     # Main user table with search/sort
│   ├── UserModal.tsx     # User details modal
│   ├── AddUserForm.tsx   # Add user form with validation
│   ├── UserListPage.tsx  # User list page component
│   ├── AddUserPage.tsx   # Add user page component
│   └── __tests__/        # Unit tests
├── context/              # State management
│   └── UserContext.tsx   # User state with Context API
├── hooks/                # Custom hooks
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   ├── api.ts           # API functions
│   ├── config.ts        # Configuration
│   └── validation.ts    # Form validation
└── styles/              # Global styles
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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run dev:check:all` - Run lint, type-check, and tests

## 🏗 Architecture Decisions

### State Management: Context API + useReducer

**Why Context API?**

- Lightweight for this application size
- Built into React, no external dependencies
- Perfect for shared state across components
- Predictable state updates with useReducer

**Benefits:**

- Centralized state management
- Easy to test and debug
- Type-safe with TypeScript
- Scalable for future features

### Component Architecture

**UI Components:**

- Reusable, composable components
- Consistent styling with Tailwind
- Accessibility-first design
- Type-safe props with TypeScript

**Page Components:**

- Route-specific components
- Clean separation of concerns
- Easy to test and maintain

### API Integration

**Features:**

- Fetch API with fallback to XMLHttpRequest
- Configurable timeouts and error handling
- Environment-based configuration
- Debug logging for development

### Form Validation

**Approach:**

- Real-time validation on blur
- Comprehensive error messages
- Type-safe validation rules
- Accessible error display

## 🧪 Testing Strategy

### Unit Tests

- **Component Testing**: Test individual component behavior
- **User Interactions**: Test form submissions, clicks, navigation
- **State Management**: Test context and reducer logic
- **Error Handling**: Test error states and edge cases

### Test Coverage

- User table functionality (search, sort, display)
- Form validation and submission
- Modal interactions
- Routing behavior

## 🎨 UI/UX Design

### Design Principles

- **Clean & Modern**: Minimalist design with clear hierarchy
- **Responsive**: Mobile-first approach
- **Accessible**: WCAG 2.1 AA compliance
- **Consistent**: Unified design system

### Color Scheme

- Primary: Blue (#3B82F6)
- Secondary: Gray (#6B7280)
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Background: Light Gray (#F9FAFB)

### Typography

- Font: Inter (Google Fonts)
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 🔧 Configuration

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_API_TIMEOUT=5000

# Feature Flags
NEXT_PUBLIC_ENABLE_DEBUG_LOGGING=true
```

### API Endpoints

- **Users**: `GET /users` - Fetch all users
- **User Details**: `GET /users/:id` - Fetch specific user

## 🚀 Performance Optimizations

### Implemented

- **Memoization**: useMemo for expensive computations
- **Lazy Loading**: Code splitting for routes
- **Efficient Rendering**: Optimized re-renders
- **Debounced Search**: Smooth search experience

### Future Optimizations

- **Virtualization**: For large datasets (>50 items)
- **Caching**: API response caching
- **Pagination**: Server-side pagination
- **Image Optimization**: Lazy loading images

## 🔒 Security Considerations

- **Input Validation**: Client and server-side validation
- **XSS Prevention**: Sanitized user inputs
- **CSRF Protection**: Token-based protection
- **Content Security Policy**: Restricted resource loading

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the mock API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React Testing Library](https://testing-library.com/) for testing utilities
