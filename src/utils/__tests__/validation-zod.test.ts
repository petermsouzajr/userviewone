import {
  UserFormSchema,
  UserSchema,
  validateUserForm,
  validateField,
  formatZodErrors,
  validateUser,
} from '../validation-zod';

describe('Zod Validation', () => {
  describe('UserFormSchema', () => {
    const validUserForm = {
      name: 'John Doe',
      username: 'johndoe123',
      email: 'john@example.com',
      phone: '1234567890',
      website: 'https://example.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 4B',
        city: 'New York',
        zipcode: '12345',
      },
      company: {
        name: 'Acme Corp',
        catchPhrase: 'Making the world better',
        bs: 'synergize scalable supply-chains',
      },
    };

    it('validates correct user form data', () => {
      const result = UserFormSchema.safeParse(validUserForm);
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const invalidData = { ...validUserForm, email: 'invalid-email' };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Please enter a valid email address'
        );
      }
    });

    it('rejects invalid phone number', () => {
      const invalidData = { ...validUserForm, phone: 'abc-def-ghij' };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects invalid zipcode', () => {
      const invalidData = {
        ...validUserForm,
        address: { ...validUserForm.address, zipcode: 'invalid' },
      };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('allows empty website (optional field)', () => {
      const dataWithEmptyWebsite = { ...validUserForm, website: '' };
      const result = UserFormSchema.safeParse(dataWithEmptyWebsite);
      expect(result.success).toBe(true);
    });

    it('rejects invalid username', () => {
      const invalidData = { ...validUserForm, username: 'user-name' };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects invalid name', () => {
      const invalidData = { ...validUserForm, name: 'John123' };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    // Additional edge case tests
    it('rejects name that is too short', () => {
      const invalidData = { ...validUserForm, name: 'J' };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Name must be at least 2 characters'
        );
      }
    });

    it('rejects name that is too long', () => {
      const longName = 'A'.repeat(51);
      const invalidData = { ...validUserForm, name: longName };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Name must be less than 50 characters'
        );
      }
    });

    it('rejects username that is too short', () => {
      const invalidData = { ...validUserForm, username: 'ab' };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Username must be at least 3 characters'
        );
      }
    });

    it('rejects username that is too long', () => {
      const longUsername = 'a'.repeat(21);
      const invalidData = { ...validUserForm, username: longUsername };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Username must be less than 20 characters'
        );
      }
    });

    it('rejects invalid website URL', () => {
      const invalidData = { ...validUserForm, website: 'not-a-url' };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects missing required fields', () => {
      const invalidData = {
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
        },
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
      };
      const result = UserFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('handles special characters in name correctly', () => {
      const validNames = ["O'Connor", 'Jean-Pierre', 'Mary Jane'];

      validNames.forEach((name) => {
        const data = { ...validUserForm, name };
        const result = UserFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('rejects names with invalid characters', () => {
      const invalidNames = [
        'John123',
        'Mary@Doe',
        'Bob#Smith',
        'Alice$Jones',
        'José', // Non-ASCII characters are not allowed
      ];

      invalidNames.forEach((name) => {
        const data = { ...validUserForm, name };
        const result = UserFormSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('validateField', () => {
    it('validates name field', () => {
      expect(validateField('name', 'John Doe')).toBe(null);
      expect(validateField('name', 'J')).toBe(
        'Name must be at least 2 characters'
      );
      expect(validateField('name', 'John123')).toBe(
        'Name can only contain letters, spaces, hyphens, and apostrophes'
      );
    });

    it('validates email field', () => {
      expect(validateField('email', 'test@example.com')).toBe(null);
      expect(validateField('email', 'invalid-email')).toBe(
        'Please enter a valid email address'
      );
    });

    it('validates phone field', () => {
      expect(validateField('phone', '1234567890')).toBe(null);
      expect(validateField('phone', 'abc-def-ghij')).toBe(
        'Please enter a valid phone number'
      );
    });

    it('validates address fields', () => {
      expect(validateField('address.street', '123 Main St')).toBe(null);
      expect(validateField('address.street', '')).toBe(
        'Street address is required'
      );

      expect(validateField('address.city', 'New York')).toBe(null);
      expect(validateField('address.city', '')).toBe('City is required');

      expect(validateField('address.zipcode', '12345')).toBe(null);
      expect(validateField('address.zipcode', 'invalid')).toBe(
        'Please enter a valid zipcode'
      );
    });

    it('validates company fields', () => {
      expect(validateField('company.name', 'Acme Corp')).toBe(null);
      expect(validateField('company.name', '')).toBe(
        'Company name is required'
      );
    });

    // Additional validateField tests
    it('handles unknown fields gracefully', () => {
      expect(validateField('unknown.field', 'some value')).toBe(null);
      expect(validateField('', 'some value')).toBe(null);
      expect(validateField('random', 'some value')).toBe(null);
    });

    it('handles website field with empty string', () => {
      expect(validateField('website', '')).toBe(null);
      expect(validateField('website', 'https://example.com')).toBe(null);
      expect(validateField('website', 'not-a-url')).toBe(
        'Please enter a valid website URL'
      );
    });

    it('handles edge cases for phone numbers', () => {
      const validPhones = ['1234567890', '+1234567890', '123456789012345'];
      const invalidPhones = ['', 'abc', '123-456-7890'];

      validPhones.forEach((phone) => {
        expect(validateField('phone', phone)).toBe(null);
      });

      invalidPhones.forEach((phone) => {
        expect(validateField('phone', phone)).toBe(
          'Please enter a valid phone number'
        );
      });
    });

    it('handles edge cases for zipcodes', () => {
      const validZipcodes = ['12345', '12345-6789'];
      const invalidZipcodes = ['1234', '123456', 'abcde', '1234a'];

      validZipcodes.forEach((zipcode) => {
        expect(validateField('address.zipcode', zipcode)).toBe(null);
      });

      invalidZipcodes.forEach((zipcode) => {
        expect(validateField('address.zipcode', zipcode)).toBe(
          'Please enter a valid zipcode'
        );
      });
    });
  });

  describe('formatZodErrors', () => {
    it('formats validation errors correctly', () => {
      const invalidData = {
        name: 'J',
        email: 'invalid-email',
        phone: 'abc',
      };

      const result = validateUserForm(invalidData);
      const errors = formatZodErrors(result);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.field === 'name')).toBe(true);
      expect(errors.some((e) => e.field === 'email')).toBe(true);
      expect(errors.some((e) => e.field === 'phone')).toBe(true);
    });

    it('returns empty array for valid data', () => {
      const validData = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '1234567890',
        website: '',
        address: {
          street: '123 Main St',
          suite: '',
          city: 'New York',
          zipcode: '12345',
        },
        company: {
          name: 'Acme Corp',
          catchPhrase: '',
          bs: '',
        },
      };

      const result = validateUserForm(validData);
      const errors = formatZodErrors(result);

      expect(errors).toHaveLength(0);
    });

    // Additional formatZodErrors tests
    it('handles empty result object', () => {
      const emptyResult = { success: true };
      const errors = formatZodErrors(emptyResult);
      expect(errors).toHaveLength(0);
    });

    it('handles result with no error', () => {
      const resultWithNoError = { success: false };
      const errors = formatZodErrors(resultWithNoError);
      expect(errors).toHaveLength(0);
    });

    it('formats nested field errors correctly', () => {
      const invalidData = {
        name: 'John Doe',
        address: {
          street: '',
          city: '',
          zipcode: 'invalid',
        },
        company: {
          name: '',
        },
      };

      const result = validateUserForm(invalidData);
      const errors = formatZodErrors(result);

      expect(errors.some((e) => e.field === 'address.street')).toBe(true);
      expect(errors.some((e) => e.field === 'address.city')).toBe(true);
      expect(errors.some((e) => e.field === 'address.zipcode')).toBe(true);
      expect(errors.some((e) => e.field === 'company.name')).toBe(true);
    });
  });

  describe('validateUser', () => {
    const validUser = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe123',
      email: 'john@example.com',
      phone: '1234567890',
      website: 'https://example.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 4B',
        city: 'New York',
        zipcode: '12345',
        geo: {
          lat: '40.7128',
          lng: '-74.0060',
        },
      },
      company: {
        name: 'Acme Corp',
        catchPhrase: 'Making the world better',
        bs: 'synergize scalable supply-chains',
      },
    };

    it('validates correct user data', () => {
      const result = validateUser(validUser);
      expect(result.success).toBe(true);
    });

    it('rejects user without id', () => {
      const userWithoutId = {
        name: validUser.name,
        username: validUser.username,
        email: validUser.email,
        phone: validUser.phone,
        website: validUser.website,
        address: validUser.address,
        company: validUser.company,
      };
      const result = validateUser(userWithoutId);
      expect(result.success).toBe(false);
    });

    it('rejects user with invalid id type', () => {
      const userWithInvalidId = { ...validUser, id: '1' };
      const result = validateUser(userWithInvalidId);
      expect(result.success).toBe(false);
    });

    it('rejects user without geo coordinates', () => {
      const userWithoutGeo = {
        ...validUser,
        address: { ...validUser.address, geo: undefined },
      };
      const result = validateUser(userWithoutGeo);
      expect(result.success).toBe(false);
    });

    it('rejects user with invalid geo coordinates', () => {
      const userWithInvalidGeo = {
        ...validUser,
        address: {
          ...validUser.address,
          geo: { lat: null, lng: null },
        },
      };
      const result = validateUser(userWithInvalidGeo);
      expect(result.success).toBe(false);
    });
  });

  describe('UserSchema', () => {
    const validUser = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe123',
      email: 'john@example.com',
      phone: '1234567890',
      website: 'https://example.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 4B',
        city: 'New York',
        zipcode: '12345',
        geo: {
          lat: '40.7128',
          lng: '-74.0060',
        },
      },
      company: {
        name: 'Acme Corp',
        catchPhrase: 'Making the world better',
        bs: 'synergize scalable supply-chains',
      },
    };

    it('validates correct user data', () => {
      const result = UserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('requires id field', () => {
      const userWithoutId = {
        name: validUser.name,
        username: validUser.username,
        email: validUser.email,
        phone: validUser.phone,
        website: validUser.website,
        address: validUser.address,
        company: validUser.company,
      };
      const result = UserSchema.safeParse(userWithoutId);
      expect(result.success).toBe(false);
    });

    it('requires geo coordinates', () => {
      const userWithoutGeo = {
        ...validUser,
        address: { ...validUser.address, geo: undefined },
      };
      const result = UserSchema.safeParse(userWithoutGeo);
      expect(result.success).toBe(false);
    });
  });

  describe('Performance and Edge Cases', () => {
    it('handles large input strings efficiently', () => {
      const largeName = 'A'.repeat(1000);
      const result = validateField('name', largeName);
      expect(result).toBe('Name must be less than 50 characters');
    });

    it('handles special characters in various fields', () => {
      // Test special characters in name
      expect(validateField('name', "O'Connor")).toBe(null);
      expect(validateField('name', 'Jean-Pierre')).toBe(null);
      expect(validateField('name', 'José')).toBe(
        'Name can only contain letters, spaces, hyphens, and apostrophes'
      );

      // Test special characters in username
      expect(validateField('username', 'user_123')).toBe(null);
      expect(validateField('username', 'user123')).toBe(null);
    });

    it('handles empty and whitespace-only inputs', () => {
      expect(validateField('name', '')).toBe(
        'Name must be at least 2 characters'
      );
      expect(validateField('name', '   ')).toBe(
        'Name must be at least 2 characters'
      ); // Whitespace-only should now fail validation
      expect(validateField('email', '')).toBe(
        'Please enter a valid email address'
      );
      expect(validateField('phone', '')).toBe(
        'Please enter a valid phone number'
      );
    });

    it('handles null and undefined inputs gracefully', () => {
      // These should be handled by the calling code, but test for robustness
      expect(validateField('name', null as unknown as string)).toBe(
        'Invalid input: expected string, received null'
      );
      expect(validateField('email', undefined as unknown as string)).toBe(
        'Invalid input: expected string, received undefined'
      );
    });
  });
});
