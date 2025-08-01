'use client';

import React, { useState } from 'react';
import { UserFormData } from '../types/user';
import { Button, Input, Modal } from './ui';
import { useFormValidation } from '../hooks/useFormValidation';
import { useUserContext, userActions } from '../context/UserContext';

interface AddUserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData: UserFormData = {
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

// Generate random realistic coordinates
const generateRandomCoordinates = () => {
  // Major city coordinates for realistic demo data
  const cities = [
    { lat: 40.7128, lng: -74.006 }, // New York
    { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    { lat: 41.8781, lng: -87.6298 }, // Chicago
    { lat: 29.7604, lng: -95.3698 }, // Houston
    { lat: 33.749, lng: -84.388 }, // Atlanta
    { lat: 25.7617, lng: -80.1918 }, // Miami
    { lat: 39.9526, lng: -75.1652 }, // Philadelphia
    { lat: 32.7767, lng: -96.797 }, // Dallas
    { lat: 37.7749, lng: -122.4194 }, // San Francisco
    { lat: 47.6062, lng: -122.3321 }, // Seattle
    { lat: 51.5074, lng: -0.1278 }, // London
    { lat: 48.8566, lng: 2.3522 }, // Paris
    { lat: 52.52, lng: 13.405 }, // Berlin
    { lat: 35.6762, lng: 139.6503 }, // Tokyo
    { lat: 31.2304, lng: 121.4737 }, // Shanghai
  ];

  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  // Add small random offset to make it more realistic
  const latOffset = (Math.random() - 0.5) * 0.1; // ±0.05 degrees
  const lngOffset = (Math.random() - 0.5) * 0.1; // ±0.05 degrees

  return {
    lat: (randomCity.lat + latOffset).toFixed(6),
    lng: (randomCity.lng + lngOffset).toFixed(6),
  };
};

export default function AddUserForm({ isOpen, onClose }: AddUserFormProps) {
  const { dispatch } = useUserContext();
  const [formData, setFormData] = useState<UserFormData>(initialFormData);

  const {
    formState,
    handleFieldChange,
    handleFieldBlur,
    getFieldError,
    hasFieldError,
    validateForm,
    clearErrors,
    setSubmitting,
    errors,
  } = useFormValidation({
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev };

      // Handle nested fields (address, company)
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (parent === 'address') {
          newData.address = { ...newData.address, [child]: value };
        } else if (parent === 'company') {
          newData.company = { ...newData.company, [child]: value };
        }
      } else {
        (newData as Record<string, unknown>)[field] = value;
      }

      return newData;
    });

    handleFieldChange(field, value);
  };

  const handleInputBlur = (field: string, value: string) => {
    handleFieldBlur(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    // Validate entire form
    const isValid = validateForm(formData);

    if (isValid) {
      try {
        // Create new user with generated ID
        const newUser = {
          ...formData,
          id: Date.now(), // Simple ID generation for demo
          address: {
            ...formData.address,
            geo: generateRandomCoordinates(),
          },
        };

        // Add user to state
        dispatch(userActions.addUser(newUser));

        // Reset form and close modal
        setFormData(initialFormData);
        clearErrors();
        onClose();
      } catch (error) {
        console.error('Error adding user:', error);
      } finally {
        setSubmitting(false);
      }
    } else {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    clearErrors();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Add New User"
      size="xl"
      closeOnBackdrop={true}
      closeOnEscape={true}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name *"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={(e) => handleInputBlur('name', e.target.value)}
              error={
                hasFieldError('name')
                  ? getFieldError('name') || undefined
                  : undefined
              }
              variant={hasFieldError('name') ? 'error' : 'default'}
            />
            <Input
              label="Username *"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              onBlur={(e) => handleInputBlur('username', e.target.value)}
              error={
                hasFieldError('username')
                  ? getFieldError('username') || undefined
                  : undefined
              }
              variant={hasFieldError('username') ? 'error' : 'default'}
            />
            <Input
              label="Email *"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={(e) => handleInputBlur('email', e.target.value)}
              error={
                hasFieldError('email')
                  ? getFieldError('email') || undefined
                  : undefined
              }
              variant={hasFieldError('email') ? 'error' : 'default'}
            />
            <Input
              label="Phone *"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onBlur={(e) => handleInputBlur('phone', e.target.value)}
              error={
                hasFieldError('phone')
                  ? getFieldError('phone') || undefined
                  : undefined
              }
              variant={hasFieldError('phone') ? 'error' : 'default'}
            />
            <Input
              label="Website"
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              onBlur={(e) => handleInputBlur('website', e.target.value)}
              error={
                hasFieldError('website')
                  ? getFieldError('website') || undefined
                  : undefined
              }
              variant={hasFieldError('website') ? 'error' : 'default'}
              helperText="Optional - must start with http:// or https://"
            />
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Street *"
              value={formData.address.street}
              onChange={(e) =>
                handleInputChange('address.street', e.target.value)
              }
              onBlur={(e) => handleInputBlur('address.street', e.target.value)}
              error={
                hasFieldError('address.street')
                  ? getFieldError('address.street') || undefined
                  : undefined
              }
              variant={hasFieldError('address.street') ? 'error' : 'default'}
            />
            <Input
              label="Suite"
              value={formData.address.suite}
              onChange={(e) =>
                handleInputChange('address.suite', e.target.value)
              }
              onBlur={(e) => handleInputBlur('address.suite', e.target.value)}
            />
            <Input
              label="City *"
              value={formData.address.city}
              onChange={(e) =>
                handleInputChange('address.city', e.target.value)
              }
              onBlur={(e) => handleInputBlur('address.city', e.target.value)}
              error={
                hasFieldError('address.city')
                  ? getFieldError('address.city') || undefined
                  : undefined
              }
              variant={hasFieldError('address.city') ? 'error' : 'default'}
            />
            <Input
              label="Zipcode *"
              value={formData.address.zipcode}
              onChange={(e) =>
                handleInputChange('address.zipcode', e.target.value)
              }
              onBlur={(e) => handleInputBlur('address.zipcode', e.target.value)}
              error={
                hasFieldError('address.zipcode')
                  ? getFieldError('address.zipcode') || undefined
                  : undefined
              }
              variant={hasFieldError('address.zipcode') ? 'error' : 'default'}
            />
          </div>
        </div>

        {/* Company Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Name *"
              value={formData.company.name}
              onChange={(e) =>
                handleInputChange('company.name', e.target.value)
              }
              onBlur={(e) => handleInputBlur('company.name', e.target.value)}
              error={
                hasFieldError('company.name')
                  ? getFieldError('company.name') || undefined
                  : undefined
              }
              variant={hasFieldError('company.name') ? 'error' : 'default'}
            />
            <Input
              label="Catch Phrase"
              value={formData.company.catchPhrase}
              onChange={(e) =>
                handleInputChange('company.catchPhrase', e.target.value)
              }
              onBlur={(e) =>
                handleInputBlur('company.catchPhrase', e.target.value)
              }
            />
            <Input
              label="Business Strategy"
              value={formData.company.bs}
              onChange={(e) => handleInputChange('company.bs', e.target.value)}
              onBlur={(e) => handleInputBlur('company.bs', e.target.value)}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={formState.isSubmitting}
            className="!font-bold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secondary"
            loading={formState.isSubmitting}
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? 'Adding User...' : 'Add User'}
          </Button>
        </div>

        {/* Form Status */}
        {formState.hasErrors && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 font-medium mb-2">
              Please fix the following {formState.errorCount} error
              {formState.errorCount !== 1 ? 's' : ''}:
            </p>
            <ul className="text-sm text-red-600 space-y-1">
              {errors.map((error, index) => (
                <li
                  key={`${error.field}-${index}`}
                  className="flex items-start"
                >
                  <span className="text-red-500 mr-1">•</span>
                  <span>
                    <strong>{error.field.replace('.', ' ')}:</strong>{' '}
                    {error.message}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </Modal>
  );
}
