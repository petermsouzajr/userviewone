'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User } from '../types/user';

// State interface
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  searchTerm: string;
  sortConfig: {
    key: keyof User;
    direction: 'asc' | 'desc';
  } | null;
}

// Action types
type UserAction =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SELECT_USER'; payload: User | null }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | {
      type: 'SET_SORT_CONFIG';
      payload: { key: keyof User; direction: 'asc' | 'desc' } | null;
    }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
  searchTerm: '',
  sortConfig: null,
};

// Reducer function
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.payload,
      };

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };

    case 'SET_SORT_CONFIG':
      return {
        ...state,
        sortConfig: action.payload,
      };

    case 'ADD_USER':
      return {
        ...state,
        users: [action.payload, ...state.users],
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Context interface
interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Helper functions for common actions
export const userActions = {
  setUsers: (users: User[]) => ({ type: 'SET_USERS' as const, payload: users }),
  setLoading: (loading: boolean) => ({
    type: 'SET_LOADING' as const,
    payload: loading,
  }),
  setError: (error: string | null) => ({
    type: 'SET_ERROR' as const,
    payload: error,
  }),
  selectUser: (user: User | null) => ({
    type: 'SELECT_USER' as const,
    payload: user,
  }),
  setSearchTerm: (searchTerm: string) => ({
    type: 'SET_SEARCH_TERM' as const,
    payload: searchTerm,
  }),
  setSortConfig: (
    sortConfig: { key: keyof User; direction: 'asc' | 'desc' } | null
  ) => ({ type: 'SET_SORT_CONFIG' as const, payload: sortConfig }),
  addUser: (user: User) => ({ type: 'ADD_USER' as const, payload: user }),
  clearError: () => ({ type: 'CLEAR_ERROR' as const }),
};
