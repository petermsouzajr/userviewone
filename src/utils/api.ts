import { User } from '../types/user';
import {
  config,
  getApiUrl,
  getApiTimeout,
  getUsersEndpoint,
  debugLog,
} from './config';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const url = getApiUrl(getUsersEndpoint());
    debugLog('🔄 Making API request to:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout from environment variable
      signal: AbortSignal.timeout(getApiTimeout()),
    });

    debugLog('📡 Response status:', response.status);
    debugLog('📡 Response headers:', response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    debugLog('📦 Parsed data:', data);
    return data;
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    throw err;
  }
};

// Alternative method using XMLHttpRequest for testing
export const fetchUsersXHR = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = getApiUrl(getUsersEndpoint());
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          debugLog('✅ XHR successful:', data);
          resolve(data);
        } catch {
          reject(new Error('Failed to parse response'));
        }
      } else {
        reject(new Error(`HTTP error! status: ${xhr.status}`));
      }
    };

    xhr.onerror = function () {
      reject(new Error('Network error'));
    };

    xhr.ontimeout = function () {
      reject(new Error('Request timeout'));
    };

    xhr.timeout = getApiTimeout();
    xhr.send();
  });
};

// Helper function to get API configuration
export const getApiConfig = () => ({
  baseUrl: config.api.baseUrl,
  timeout: config.api.timeout,
  usersEndpoint: config.api.endpoints.users,
  debugLogging: config.features.enableDebugLogging,
});
