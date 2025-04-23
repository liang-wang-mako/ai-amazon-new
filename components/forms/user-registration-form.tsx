'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { userRegistrationSchema } from '@/lib/schemas/user';
import {
  validateFormData,
  getFieldError,
  hasErrors,
  type ValidationResult,
} from '@/lib/utils/validation';
import type { UserRegistration } from '@/lib/schemas/user';

export function UserRegistrationForm() {
  const [errors, setErrors] = useState<ValidationResult<UserRegistration>['errors']>();

  async function onSubmit(formData: FormData) {
    const validation = await validateFormData(formData, userRegistrationSchema);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    // Clear errors if validation succeeds
    setErrors(undefined);

    // Here you would typically send the data to your API
    console.log('Form data:', validation.data);
  }

  return (
    <form action={onSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={`mt-1 block w-full rounded-md border ${
              getFieldError(errors, 'name') ? 'border-red-500' : 'border-input'
            } px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {getFieldError(errors, 'name') && (
            <p className="mt-1 text-sm text-red-500">{getFieldError(errors, 'name')}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={`mt-1 block w-full rounded-md border ${
              getFieldError(errors, 'email') ? 'border-red-500' : 'border-input'
            } px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {getFieldError(errors, 'email') && (
            <p className="mt-1 text-sm text-red-500">{getFieldError(errors, 'email')}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={`mt-1 block w-full rounded-md border ${
              getFieldError(errors, 'password') ? 'border-red-500' : 'border-input'
            } px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {getFieldError(errors, 'password') && (
            <p className="mt-1 text-sm text-red-500">{getFieldError(errors, 'password')}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Register
        <Icon name="chevronRight" className="ml-2" />
      </Button>

      {getFieldError(errors, '_form') && (
        <p className="mt-4 text-sm text-red-500 text-center">{getFieldError(errors, '_form')}</p>
      )}
    </form>
  );
}
