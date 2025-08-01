import { z } from 'zod';

// Address schema
export const AddressSchema = z.object({
  street: z.string().trim().min(1, 'Street address is required'),
  suite: z.string().optional(),
  city: z.string().trim().min(1, 'City is required'),
  zipcode: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid zipcode'),
});

// Company schema
export const CompanySchema = z.object({
  name: z.string().trim().min(1, 'Company name is required'),
  catchPhrase: z.string().optional(),
  bs: z.string().optional(),
});

// User form schema
export const UserFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(
      /^[a-zA-Z\s\-']+$/,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    ),
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  website: z
    .string()
    .trim()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
  address: AddressSchema,
  company: CompanySchema,
});

// Full user schema (including generated fields)
export const UserSchema = UserFormSchema.extend({
  id: z.number(),
  address: AddressSchema.extend({
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
});

// Type exports
export type UserFormData = z.infer<typeof UserFormSchema>;
export type User = z.infer<typeof UserSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type Company = z.infer<typeof CompanySchema>;

// Pre-compiled field validators for better performance
const fieldValidators = {
  name: UserFormSchema.shape.name,
  username: UserFormSchema.shape.username,
  email: UserFormSchema.shape.email,
  phone: UserFormSchema.shape.phone,
  website: UserFormSchema.shape.website,
  'address.street': AddressSchema.shape.street,
  'address.city': AddressSchema.shape.city,
  'address.zipcode': AddressSchema.shape.zipcode,
  'company.name': CompanySchema.shape.name,
} as const;

// Validation functions
export const validateUserForm = (data: unknown) => {
  return UserFormSchema.safeParse(data);
};

export const validateUser = (data: unknown) => {
  return UserSchema.safeParse(data);
};

// Field-specific validation with pre-compiled validators
export const validateField = (field: string, value: string) => {
  const validator = fieldValidators[field as keyof typeof fieldValidators];

  if (!validator) {
    return null; // Unknown field, no validation
  }

  try {
    // Handle empty website field
    if (field === 'website' && value === '') {
      return null;
    }

    validator.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || 'Invalid field';
    }
    return 'Invalid field';
  }
};

// Error formatting with early returns for better performance
export const formatZodErrors = (result: {
  success: boolean;
  error?: z.ZodError;
}) => {
  if (result.success || !result.error) {
    return [];
  }

  // Group errors by field to avoid duplicates
  const errorMap = new Map<string, string[]>();

  result.error.issues.forEach((err) => {
    const field = err.path.join('.');
    if (!errorMap.has(field)) {
      errorMap.set(field, []);
    }
    errorMap.get(field)!.push(err.message);
  });

  // Convert to array format, taking only the first error per field
  return Array.from(errorMap.entries()).map(([field, messages]) => ({
    field,
    message: messages[0], // Take the first error message for each field
  }));
};
