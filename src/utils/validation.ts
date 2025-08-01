// Validation utilities for user form data

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Required field validation
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Phone number validation
export const validatePhone = (phone: string): boolean => {
  // Allow various phone formats: +1-555-123-4567, (555) 123-4567, 555.123.4567, etc.
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanedPhone = phone.replace(/[\s\-\(\)\.]/g, '');
  return phoneRegex.test(cleanedPhone);
};

// Website URL validation
export const validateWebsite = (website: string): boolean => {
  if (!website.trim()) return true; // Optional field
  const urlRegex = /^https?:\/\/.+/;
  return urlRegex.test(website.trim());
};

// Username validation
export const validateUsername = (username: string): boolean => {
  // Username should be 3-20 characters, alphanumeric and underscores only
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username.trim());
};

// Name validation
export const validateName = (name: string): boolean => {
  // Name should be 2-50 characters, letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
  return nameRegex.test(name.trim());
};

// Address validation
export const validateAddress = (address: {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateRequired(address.street)) {
    errors.push({ field: 'street', message: 'Street address is required' });
  }

  if (!validateRequired(address.city)) {
    errors.push({ field: 'city', message: 'City is required' });
  }

  if (!validateRequired(address.zipcode)) {
    errors.push({ field: 'zipcode', message: 'Zipcode is required' });
  } else {
    // Basic zipcode validation (US format)
    const zipcodeRegex = /^\d{5}(-\d{4})?$/;
    if (!zipcodeRegex.test(address.zipcode.trim())) {
      errors.push({
        field: 'zipcode',
        message: 'Please enter a valid zipcode',
      });
    }
  }

  return errors;
};

// Company validation
export const validateCompany = (company: {
  name: string;
  catchPhrase: string;
  bs: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateRequired(company.name)) {
    errors.push({ field: 'company.name', message: 'Company name is required' });
  }

  return errors;
};

// Complete user form validation
export const validateUserForm = (data: {
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
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Basic field validations
  if (!validateName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Please enter a valid name (2-50 characters)',
    });
  }

  if (!validateUsername(data.username)) {
    errors.push({
      field: 'username',
      message:
        'Username must be 3-20 characters, alphanumeric and underscores only',
    });
  }

  if (!validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address',
    });
  }

  if (!validatePhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Please enter a valid phone number',
    });
  }

  if (!validateWebsite(data.website)) {
    errors.push({
      field: 'website',
      message: 'Please enter a valid website URL (optional)',
    });
  }

  // Address validation
  const addressErrors = validateAddress(data.address);
  errors.push(...addressErrors);

  // Company validation
  const companyErrors = validateCompany(data.company);
  errors.push(...companyErrors);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Get field error message
export const getFieldError = (
  errors: ValidationError[],
  field: string
): string | null => {
  const error = errors.find((err) => err.field === field);
  return error ? error.message : null;
};

// Validate single field
export const validateField = (field: string, value: string): string | null => {
  switch (field) {
    case 'name':
      return validateName(value)
        ? null
        : 'Please enter a valid name (2-50 characters)';
    case 'username':
      return validateUsername(value)
        ? null
        : 'Username must be 3-20 characters, alphanumeric and underscores only';
    case 'email':
      return validateEmail(value) ? null : 'Please enter a valid email address';
    case 'phone':
      return validatePhone(value) ? null : 'Please enter a valid phone number';
    case 'website':
      return validateWebsite(value)
        ? null
        : 'Please enter a valid website URL (optional)';
    default:
      return null;
  }
};
