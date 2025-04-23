import { z } from 'zod';

// Address Schema
export const addressSchema = z.object({
  id: z.string().uuid(),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  isDefault: z.boolean().default(false),
});

// User Schema
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(['user', 'admin']).default('user'),
  isEmailVerified: z.boolean().default(false),
  addresses: z.array(addressSchema).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// User Registration Input Schema
export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
  name: z.string().min(1),
});

// User Update Input Schema
export const userUpdateSchema = userSchema
  .omit({
    id: true,
    email: true,
    role: true,
    isEmailVerified: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// Address Input Schema
export const addressInputSchema = addressSchema.omit({
  id: true,
});

export type User = z.infer<typeof userSchema>;
export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type Address = z.infer<typeof addressSchema>;
export type AddressInput = z.infer<typeof addressInputSchema>;
