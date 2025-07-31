# Environment Variables Setup

This project uses environment variables for configuration with a fallback pattern that keeps sensitive values out of the codebase.

## Quick Setup

1. **Copy the example file:**

   ```bash
   cp env.example .env.local
   ```

2. **Edit the `.env.local` file** with your specific values:

   ```bash
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
   NEXT_PUBLIC_API_TIMEOUT=5000
   NEXT_PUBLIC_USERS_ENDPOINT=/users
   NEXT_PUBLIC_POSTS_ENDPOINT=/posts

   # Development Configuration
   NODE_ENV=development

   # Feature flags
   NEXT_PUBLIC_ENABLE_MOCK_DATA=false
   NEXT_PUBLIC_ENABLE_DEBUG_LOGGING=true

   # App Configuration
   NEXT_PUBLIC_APP_NAME=UserView Dashboard
   NEXT_PUBLIC_APP_VERSION=1.0.0
   ```

## Environment Variables Reference

### Required Variables

| Variable                   | Description               | Fallback Variable                   | Example                   |
| -------------------------- | ------------------------- | ----------------------------------- | ------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for API requests | `NEXT_PUBLIC_API_BASE_URL_FALLBACK` | `https://api.example.com` |

### Optional Variables

#### API Configuration

| Variable                     | Description                         | Fallback Variable                     | Default  | Example      |
| ---------------------------- | ----------------------------------- | ------------------------------------- | -------- | ------------ |
| `NEXT_PUBLIC_API_TIMEOUT`    | API request timeout in milliseconds | `NEXT_PUBLIC_API_TIMEOUT_FALLBACK`    | `5000`   | `10000`      |
| `NEXT_PUBLIC_USERS_ENDPOINT` | Users API endpoint                  | `NEXT_PUBLIC_USERS_ENDPOINT_FALLBACK` | `/users` | `/api/users` |
| `NEXT_PUBLIC_POSTS_ENDPOINT` | Posts API endpoint                  | `NEXT_PUBLIC_POSTS_ENDPOINT_FALLBACK` | `/posts` | `/api/posts` |

#### Feature Flags

| Variable                           | Description               | Default | Example |
| ---------------------------------- | ------------------------- | ------- | ------- |
| `NEXT_PUBLIC_ENABLE_MOCK_DATA`     | Enable mock data fallback | `false` | `true`  |
| `NEXT_PUBLIC_ENABLE_DEBUG_LOGGING` | Enable debug logging      | `true`  | `false` |

#### App Configuration

| Variable                  | Description         | Fallback Variable                  | Default              | Example  |
| ------------------------- | ------------------- | ---------------------------------- | -------------------- | -------- |
| `NEXT_PUBLIC_APP_NAME`    | Application name    | `NEXT_PUBLIC_APP_NAME_FALLBACK`    | `UserView Dashboard` | `My App` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `NEXT_PUBLIC_APP_VERSION_FALLBACK` | `1.0.0`              | `2.1.0`  |

## Fallback Pattern

This project uses a **fallback pattern** to avoid exposing sensitive values in the codebase:

### How It Works

1. **Primary Variables**: Set your main configuration values
2. **Fallback Variables**: Set alternative values (optional)
3. **Code Logic**: Uses primary first, then fallback if primary is missing

### Example Usage

```bash
# Primary (production) values
NEXT_PUBLIC_API_BASE_URL=https://api.production.com
NEXT_PUBLIC_API_TIMEOUT=10000

# Fallback (development) values (optional)
NEXT_PUBLIC_API_BASE_URL_FALLBACK=https://api.staging.com
NEXT_PUBLIC_API_TIMEOUT_FALLBACK=5000
```

### Benefits

- ✅ **No hardcoded values** in the codebase
- ✅ **Flexible configuration** for different environments
- ✅ **Clear separation** between primary and fallback values
- ✅ **Environment-specific** configuration possible

## Environment Files

Next.js supports multiple environment files with different priorities:

1. `.env.local` - Local environment variables (not committed to git)
2. `.env.development` - Development environment variables
3. `.env.production` - Production environment variables
4. `.env` - Default environment variables

## Usage in Code

### Using the Config Utility

```typescript
import { config, debugLog, getApiUrl } from '@/utils/config';

// Access configuration
const apiUrl = getApiUrl('/users');
const timeout = config.api.timeout;

// Debug logging
debugLog('API call to:', apiUrl);
```

### Direct Environment Access

```typescript
// Access environment variables directly
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const timeout = process.env.NEXT_PUBLIC_API_TIMEOUT;
```

## Validation

The project includes environment validation. You can check for missing or invalid environment variables:

```typescript
import { validateEnvironment } from '@/utils/config';

const errors = validateEnvironment();
if (errors.length > 0) {
  console.error('Environment validation errors:', errors);
}
```

## Security Notes

- **Client-side variables**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- **Server-side variables**: Variables without `NEXT_PUBLIC_` are only available on the server
- **Sensitive data**: Never commit `.env.local` files containing sensitive information
- **Fallback values**: Keep fallback values in environment files, not in code

## Deployment

For production deployment, set environment variables in your hosting platform:

- **Vercel**: Use the Vercel dashboard or CLI
- **Netlify**: Use the Netlify dashboard
- **Railway**: Use the Railway dashboard
- **Docker**: Use Docker environment variables

## Example Production Environment

```bash
# Production environment variables
NEXT_PUBLIC_API_BASE_URL=https://api.production.com
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_ENABLE_DEBUG_LOGGING=false
NEXT_PUBLIC_APP_NAME=UserView Dashboard
NEXT_PUBLIC_APP_VERSION=1.0.0
```
