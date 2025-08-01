'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  ValidationError,
  validateField,
  validateUserForm,
} from '../utils/validation';
import { UserFormData } from '../types/user';

interface UseFormValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
}

export const useFormValidation = (options: UseFormValidationOptions = {}) => {
  const { validateOnChange = true, validateOnBlur = true } = options;

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateSingleField = useCallback(
    (field: string, value: string): string | null => {
      return validateField(field, value);
    },
    []
  );

  // Validate all fields
  const validateForm = useCallback((data: UserFormData): boolean => {
    const result = validateUserForm(data);
    setErrors(result.errors);
    return result.isValid;
  }, []);

  // Handle field change with validation
  const handleFieldChange = useCallback(
    (field: string, value: string) => {
      if (validateOnChange) {
        const fieldError = validateSingleField(field, value);

        setErrors((prev) => {
          const newErrors = prev.filter((err) => err.field !== field);
          if (fieldError) {
            newErrors.push({ field, message: fieldError });
          }
          return newErrors;
        });
      }

      // Mark field as touched
      setTouched((prev) => new Set([...prev, field]));
    },
    [validateOnChange, validateSingleField]
  );

  // Handle field blur with validation
  const handleFieldBlur = useCallback(
    (field: string, value: string) => {
      if (validateOnBlur) {
        const fieldError = validateSingleField(field, value);

        setErrors((prev) => {
          const newErrors = prev.filter((err) => err.field !== field);
          if (fieldError) {
            newErrors.push({ field, message: fieldError });
          }
          return newErrors;
        });
      }

      // Mark field as touched
      setTouched((prev) => new Set([...prev, field]));
    },
    [validateOnBlur, validateSingleField]
  );

  // Get error for a specific field
  const getFieldError = useCallback(
    (field: string): string | null => {
      const error = errors.find((err) => err.field === field);
      return error ? error.message : null;
    },
    [errors]
  );

  // Check if field has been touched
  const isFieldTouched = useCallback(
    (field: string): boolean => {
      return touched.has(field);
    },
    [touched]
  );

  // Check if field has error and is touched
  const hasFieldError = useCallback(
    (field: string): boolean => {
      return isFieldTouched(field) && !!getFieldError(field);
    },
    [isFieldTouched, getFieldError]
  );

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors([]);
    setTouched(new Set());
  }, []);

  // Clear error for specific field
  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => prev.filter((err) => err.field !== field));
  }, []);

  // Set submitting state
  const setSubmitting = useCallback((submitting: boolean) => {
    setIsSubmitting(submitting);
  }, []);

  // Form validation state
  const formState = useMemo(
    () => ({
      isValid: errors.length === 0,
      hasErrors: errors.length > 0,
      errorCount: errors.length,
      isSubmitting,
    }),
    [errors.length, isSubmitting]
  );

  return {
    errors,
    touched,
    formState,
    validateForm,
    validateSingleField,
    handleFieldChange,
    handleFieldBlur,
    getFieldError,
    isFieldTouched,
    hasFieldError,
    clearErrors,
    clearFieldError,
    setSubmitting,
  };
};
