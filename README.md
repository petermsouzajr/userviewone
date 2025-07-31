# User Dashboard

A modern React dashboard application built with Next.js, TypeScript, and Tailwind CSS. This project includes state management, API integration, component architecture, and professional development practices.

## 🚀 Features

- **User Management**: Fetch and display users from JSONPlaceholder API
- **Interactive UI**: Click user cards to view detailed information in a modal
- **State Management**: Centralized state using React Context + useReducer
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Professional Architecture**: Clean separation of concerns and scalable patterns

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API + useReducer
- **API**: JSONPlaceholder REST API
- **Development**: ESLint, TypeScript strict mode

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd userviewone
npm install
```

### 2. Environment Setup

Create your environment file:

```bash
# Copy the example environment file
cp env.example .env.local

# Edit the environment file with your configuration
nano .env.local
```

**Required Environment Variables:**

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_USERS_ENDPOINT=/users

# Optional Fallbacks (for development)
NEXT_PUBLIC_API_BASE_URL_FALLBACK=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_API_TIMEOUT_FALLBACK=10000
NEXT_PUBLIC_USERS_ENDPOINT_FALLBACK=/users

# Feature Flags
NEXT_PUBLIC_ENABLE_DEBUG_LOGGING=true
NEXT_PUBLIC_ENABLE_MOCK_DATA=false

# App Configuration
NEXT_PUBLIC_APP_NAME=User Dashboard
NEXT_PUBLIC_APP_VERSION=0.1.0
```

### 3. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Development Commands

### Quality Assurance

```bash
# Run all quality checks (linting + type checking)
npm run dev:check:all

# Run ESLint only
npm run lint

# Run TypeScript type checking only
npm run type-check
```

### Build and Production

```bash
# Build for production
npm run build

# Start production server
npm run start

# Preview production build
npm run build && npm run start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with UserProvider
│   ├── page.tsx           # Main dashboard page
│   ├── error.tsx          # Error boundary
│   └── global-error.tsx   # Global error boundary
├── components/            # React components
│   ├── ApiTest.tsx        # User list component (main display)
│   └── UserModal.tsx      # User detail modal
├── context/              # State management
│   └── UserContext.tsx   # Global state with useReducer
├── types/                # TypeScript definitions
│   └── user.ts           # User interface types
├── utils/                # Utility functions
│   ├── api.ts            # API fetching utilities
│   └── config.ts         # Environment configuration
└── styles/               # Global styles
    └── globals.css       # Tailwind CSS imports
```

## 🏗️ Architecture

### State Management

The application uses **React Context + useReducer** for centralized state management:

- **UserContext**: Global state for users, loading, errors, selected user
- **useReducer**: Predictable state updates with type-safe actions
- **Custom Hooks**: `useUserContext` for easy state access

### Component Architecture

- **Separation of Concerns**: Each component has a single responsibility
- **Type Safety**: Full TypeScript coverage for all components
- **Reusable Patterns**: Consistent styling and interaction patterns

### API Integration

- **Environment-based Configuration**: API URLs and timeouts from environment variables
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Loading States**: Professional loading indicators

## 🔧 Development Process

### 1. Environment Setup

The project uses a robust environment variable system:

```bash
# Required for API functionality
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_USERS_ENDPOINT=/users

# Optional fallbacks for development
NEXT_PUBLIC_API_BASE_URL_FALLBACK=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_API_TIMEOUT_FALLBACK=10000
NEXT_PUBLIC_USERS_ENDPOINT_FALLBACK=/users
```

### 2. Quality Assurance

Before committing code, run the quality checks:

```bash
npm run dev:check:all
```

This command runs:

- **ESLint**: Code linting and style checking
- **TypeScript**: Type checking with `tsc --noEmit`

### 3. Development Workflow

1. **Start Development Server**: `npm run dev`
2. **Make Changes**: Edit components in `src/components/`
3. **Quality Check**: `npm run dev:check:all`
4. **Test Features**: Verify user interactions and API calls
5. **Commit**: Only commit after passing quality checks

### 4. Environment Variables

The project uses a sophisticated environment variable system:

- **Primary Variables**: Main configuration values
- **Fallback Variables**: Backup values for development
- **Validation**: Runtime validation of required variables
- **Type Safety**: TypeScript integration for environment values

## 🧪 Testing

### Manual Testing

1. **API Integration**: Verify users load from JSONPlaceholder
2. **User Interactions**: Click user cards to open detail modal
3. **Error Handling**: Test with invalid API endpoints
4. **Responsive Design**: Test on different screen sizes

### Quality Checks

```bash
# Run all quality checks
npm run dev:check:all

# Individual checks
npm run lint      # ESLint
npm run type-check # TypeScript
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📚 Documentation

- **Implementation Plan**: See `DASHBOARD_PLAN.md` for detailed development roadmap
- **Environment Setup**: See `ENVIRONMENT_SETUP.md` for environment variable documentation
- **API Documentation**: JSONPlaceholder API at https://jsonplaceholder.typicode.com

## 📄 License

This project is created for educational and evaluation purposes.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
