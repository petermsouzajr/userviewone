'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  validateField,
  validateUserForm,
  formatZodErrors,
} from '../utils/validation-zod';
import { UserFormData } from '../types/user';

interface ValidationError {
  field: string;
  message: string;
}

interface UseFormValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
}

export const useFormValidation = (options: UseFormValidationOptions = {}) => {
  const { validateOnChange = false, validateOnBlur = false } = options;

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modifiedAfterSubmission, setModifiedAfterSubmission] = useState<
    Set<string>
  >(new Set());

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
    const formattedErrors = formatZodErrors(result);
    setErrors(formattedErrors);

    // Mark all fields as touched when form is submitted
    const allFields = [
      'name',
      'username',
      'email',
      'phone',
      'website',
      'address.street',
      'address.suite',
      'address.city',
      'address.zipcode',
      'company.name',
      'company.catchPhrase',
      'company.bs',
    ];
    setTouched(new Set(allFields));

    // Reset modified fields tracking when form is submitted
    setModifiedAfterSubmission(new Set());

    return result.success;
  }, []);

  // Handle field change with validation (disabled by default)
  const handleFieldChange = useCallback(
    (field: string, value: string) => {
      // Track if field has been modified after submission
      if (isSubmitting === false && errors.some((err) => err.field === field)) {
        setModifiedAfterSubmission((prev) => new Set([...prev, field]));
      }

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
    [validateOnChange, validateSingleField, isSubmitting, errors]
  );

  // Handle field blur with validation (disabled by default)
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
      // Don't show errors for fields that have been modified after submission
      if (modifiedAfterSubmission.has(field)) {
        return false;
      }

      // Show validation errors when submitting the form OR when there are actual errors for the field
      // This ensures error styling persists even after isSubmitting becomes false
      return (isSubmitting || !!getFieldError(field)) && !!getFieldError(field);
    },
    [getFieldError, isSubmitting, modifiedAfterSubmission]
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
