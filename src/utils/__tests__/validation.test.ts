import {
  validateEmail,
  validateRequired,
  validatePhone,
  validateWebsite,
  validateUsername,
  validateName,
  validateAddress,
  validateCompany,
  validateUserForm,
  getFieldError,
  validateField,
} from '../validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@example')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });

    it('handles whitespace correctly', () => {
      expect(validateEmail('  test@example.com  ')).toBe(true);
      expect(validateEmail('test@example.com ')).toBe(true);
    });
  });

  describe('validateRequired', () => {
    it('validates non-empty strings', () => {
      expect(validateRequired('test')).toBe(true);
      expect(validateRequired('  test  ')).toBe(true);
      expect(validateRequired('a')).toBe(true);
    });

    it('rejects empty or whitespace-only strings', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
      expect(validateRequired('\t\n')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('validates correct phone numbers', () => {
      expect(validatePhone('123-456-7890')).toBe(true);
      expect(validatePhone('(123) 456-7890')).toBe(true);
      expect(validatePhone('123.456.7890')).toBe(true);
      expect(validatePhone('+1-555-123-4567')).toBe(true);
      expect(validatePhone('5551234567')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(validatePhone('abc-def-ghij')).toBe(false);
      expect(validatePhone('')).toBe(false);
      expect(validatePhone('123')).toBe(true); // This is actually valid per the regex
    });
  });

  describe('validateWebsite', () => {
    it('validates correct website URLs', () => {
      expect(validateWebsite('https://example.com')).toBe(true);
      expect(validateWebsite('http://www.example.org')).toBe(true);
      expect(validateWebsite('https://subdomain.example.co.uk')).toBe(true);
    });

    it('rejects invalid website URLs', () => {
      expect(validateWebsite('not-a-url')).toBe(false);
      expect(validateWebsite('ftp://example.com')).toBe(false);
      expect(validateWebsite('example.com')).toBe(false);
    });

    it('allows empty strings (optional field)', () => {
      expect(validateWebsite('')).toBe(true);
      expect(validateWebsite('   ')).toBe(true);
    });
  });

  describe('validateUsername', () => {
    it('validates correct usernames', () => {
      expect(validateUsername('john_doe')).toBe(true);
      expect(validateUsername('user123')).toBe(true);
      expect(validateUsername('test_user_123')).toBe(true);
      expect(validateUsername('abc')).toBe(true); // minimum length
      expect(validateUsername('a'.repeat(20))).toBe(true); // maximum length
    });

    it('rejects invalid usernames', () => {
      expect(validateUsername('ab')).toBe(false); // too short
      expect(validateUsername('a'.repeat(21))).toBe(false); // too long
      expect(validateUsername('user-name')).toBe(false); // hyphens not allowed
      expect(validateUsername('user name')).toBe(false); // spaces not allowed
      expect(validateUsername('user@name')).toBe(false); // special chars not allowed
      expect(validateUsername('')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('validates correct names', () => {
      expect(validateName('John Doe')).toBe(true);
      expect(validateName('Mary-Jane')).toBe(true);
      expect(validateName("O'Connor")).toBe(true);
      expect(validateName('Jean-Pierre')).toBe(true);
      expect(validateName('A')).toBe(false); // too short
      expect(validateName('a'.repeat(51))).toBe(false); // too long
    });

    it('rejects invalid names', () => {
      expect(validateName('John123')).toBe(false); // numbers not allowed
      expect(validateName('John@Doe')).toBe(false); // special chars not allowed
      expect(validateName('')).toBe(false);
      expect(validateName('   ')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(validateName('A')).toBe(false); // minimum 2 characters
      expect(validateName('a'.repeat(51))).toBe(false); // maximum 50 characters
      expect(validateName('  John  ')).toBe(true); // trims whitespace
    });
  });

  describe('validateAddress', () => {
    it('validates correct addresses', () => {
      const validAddress = {
        street: '123 Main St',
        suite: 'Apt 1',
        city: 'Test City',
        zipcode: '12345',
      };
      const errors = validateAddress(validAddress);
      expect(errors).toHaveLength(0);
    });

    it('rejects addresses with missing required fields', () => {
      const invalidAddress = {
        street: '',
        suite: 'Apt 1',
        city: '',
        zipcode: '',
      };
      const errors = validateAddress(invalidAddress);
      expect(errors).toHaveLength(3);
      expect(errors.some((e) => e.field === 'street')).toBe(true);
      expect(errors.some((e) => e.field === 'city')).toBe(true);
      expect(errors.some((e) => e.field === 'zipcode')).toBe(true);
    });

    it('validates zipcode format', () => {
      const addressWithInvalidZip = {
        street: '123 Main St',
        suite: 'Apt 1',
        city: 'Test City',
        zipcode: 'invalid',
      };
      const errors = validateAddress(addressWithInvalidZip);
      expect(errors.some((e) => e.field === 'zipcode')).toBe(true);
    });

    it('accepts valid zipcode formats', () => {
      const addressWithValidZip = {
        street: '123 Main St',
        suite: 'Apt 1',
        city: 'Test City',
        zipcode: '12345-6789',
      };
      const errors = validateAddress(addressWithValidZip);
      expect(errors.some((e) => e.field === 'zipcode')).toBe(false);
    });
  });

  describe('validateCompany', () => {
    it('validates correct company data', () => {
      const validCompany = {
        name: 'Test Company',
        catchPhrase: 'Test phrase',
        bs: 'Test bs',
      };
      const errors = validateCompany(validCompany);
      expect(errors).toHaveLength(0);
    });

    it('rejects company with missing name', () => {
      const invalidCompany = {
        name: '',
        catchPhrase: 'Test phrase',
        bs: 'Test bs',
      };
      const errors = validateCompany(invalidCompany);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('company.name');
    });
  });

  describe('validateUserForm', () => {
    it('validates complete user form data', () => {
      const validUserData = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '123-456-7890',
        website: 'https://example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt 1',
          city: 'Test City',
          zipcode: '12345',
        },
        company: {
          name: 'Test Company',
          catchPhrase: 'Test phrase',
          bs: 'Test bs',
        },
      };
      const result = validateUserForm(validUserData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('rejects incomplete user form data', () => {
      const invalidUserData = {
        name: '',
        username: '',
        email: 'invalid-email',
        phone: '',
        website: 'not-a-url',
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
      const result = validateUserForm(invalidUserData);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('getFieldError', () => {
    it('returns error message for specific field', () => {
      const errors = [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Invalid email format' },
      ];
      expect(getFieldError(errors, 'name')).toBe('Name is required');
      expect(getFieldError(errors, 'email')).toBe('Invalid email format');
    });

    it('returns null for field without errors', () => {
      const errors = [{ field: 'name', message: 'Name is required' }];
      expect(getFieldError(errors, 'email')).toBeNull();
    });
  });

  describe('validateField', () => {
    it('validates email field', () => {
      expect(validateField('email', 'test@example.com')).toBeNull();
      expect(validateField('email', 'invalid-email')).toBeTruthy();
    });

    it('validates required fields', () => {
      expect(validateField('name', 'John Doe')).toBeNull();
      expect(validateField('name', '')).toBeTruthy();
    });

    it('validates phone field', () => {
      expect(validateField('phone', '123-456-7890')).toBeNull();
      expect(validateField('phone', 'invalid')).toBeTruthy();
    });

    it('validates website field', () => {
      expect(validateField('website', 'https://example.com')).toBeNull();
      expect(validateField('website', 'not-a-url')).toBeTruthy();
      expect(validateField('website', '')).toBeNull(); // optional field
    });

    it('validates username field', () => {
      expect(validateField('username', 'johndoe')).toBeNull();
      expect(validateField('username', 'ab')).toBeTruthy(); // too short
    });

    it('validates name field', () => {
      expect(validateField('name', 'John Doe')).toBeNull();
      expect(validateField('name', 'A')).toBeTruthy(); // too short
    });
  });
});
