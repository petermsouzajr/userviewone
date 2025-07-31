// Environment configuration with type safety
export const config = {
  // API Configuration
  api: {
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL_FALLBACK,
    timeout: process.env.NEXT_PUBLIC_API_TIMEOUT
      ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 10)
      : process.env.NEXT_PUBLIC_API_TIMEOUT_FALLBACK
      ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT_FALLBACK, 10)
      : undefined,
    endpoints: {
      users:
        process.env.NEXT_PUBLIC_USERS_ENDPOINT ||
        process.env.NEXT_PUBLIC_USERS_ENDPOINT_FALLBACK,
      posts:
        process.env.NEXT_PUBLIC_POSTS_ENDPOINT ||
        process.env.NEXT_PUBLIC_POSTS_ENDPOINT_FALLBACK,
    },
  },

  // Feature flags
  features: {
    enableDebugLogging: process.env.NEXT_PUBLIC_ENABLE_DEBUG_LOGGING === 'true',
  },

  // App configuration
  app: {
    name:
      process.env.NEXT_PUBLIC_APP_NAME ||
      process.env.NEXT_PUBLIC_APP_NAME_FALLBACK,
    version:
      process.env.NEXT_PUBLIC_APP_VERSION ||
      process.env.NEXT_PUBLIC_APP_VERSION_FALLBACK,
    environment: process.env.NODE_ENV,
  },
} as const;

// Type for the config object
export type Config = typeof config;

// Helper function to validate required environment variables
export const validateEnvironment = (): string[] => {
  const errors: string[] = [];

  // Check for required environment variables (primary or fallback)
  if (
    !process.env.NEXT_PUBLIC_API_BASE_URL &&
    !process.env.NEXT_PUBLIC_API_BASE_URL_FALLBACK
  ) {
    errors.push(
      'NEXT_PUBLIC_API_BASE_URL or NEXT_PUBLIC_API_BASE_URL_FALLBACK is not set'
    );
  }

  // Validate timeout is a number (primary or fallback)
  const primaryTimeout = process.env.NEXT_PUBLIC_API_TIMEOUT
    ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 10)
    : null;
  const fallbackTimeout = process.env.NEXT_PUBLIC_API_TIMEOUT_FALLBACK
    ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT_FALLBACK, 10)
    : null;
  const timeout = primaryTimeout || fallbackTimeout;

  if (!timeout || isNaN(timeout) || timeout <= 0) {
    errors.push(
      'NEXT_PUBLIC_API_TIMEOUT or NEXT_PUBLIC_API_TIMEOUT_FALLBACK must be a positive number'
    );
  }

  return errors;
};

// Helper function to get full API URL with validation
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = config.api.baseUrl;
  if (!baseUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL or NEXT_PUBLIC_API_BASE_URL_FALLBACK is not set'
    );
  }
  return `${baseUrl}${endpoint}`;
};

// Helper function to get timeout with validation
export const getApiTimeout = (): number => {
  const timeout = config.api.timeout;
  if (!timeout) {
    throw new Error(
      'NEXT_PUBLIC_API_TIMEOUT or NEXT_PUBLIC_API_TIMEOUT_FALLBACK is not set'
    );
  }
  return timeout;
};

// Helper function to get users endpoint with validation
export const getUsersEndpoint = (): string => {
  const endpoint = config.api.endpoints.users;
  if (!endpoint) {
    throw new Error(
      'NEXT_PUBLIC_USERS_ENDPOINT or NEXT_PUBLIC_USERS_ENDPOINT_FALLBACK is not set'
    );
  }
  return endpoint;
};

// Helper function for debug logging
export const debugLog = (message: string, data?: unknown): void => {
  if (config.features.enableDebugLogging) {
    console.log(message, data);
  }
};
