import { z } from 'zod';

export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
};

export async function validateFormData<T>(
  formData: FormData,
  schema: z.Schema<T>
): Promise<ValidationResult<T>> {
  try {
    // Convert FormData to a plain object
    const data = Object.fromEntries(formData.entries());

    const transformedData: Record<string, unknown> = {};
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
        transformedData[key] = new Date(value);
      } else {
        transformedData[key] = value;
      }
    });

    // Validate the data against the schema
    const validatedData = await schema.parseAsync(transformedData);

    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Transform Zod errors into a more usable format
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });

      return {
        success: false,
        errors,
      };
    }

    // Handle unexpected errors
    return {
      success: false,
      errors: {
        _form: ['An unexpected error occurred.'],
      },
    };
  }
}

export function getFieldError(
  errors: Record<string, string[]> | undefined,
  field: string
): string | undefined {
  if (!errors) return undefined;
  const fieldErrors = errors[field];
  return fieldErrors?.[0];
}

export function hasErrors(errors: Record<string, string[]> | undefined): boolean {
  if (!errors) return false;
  return Object.keys(errors).length > 0;
}
