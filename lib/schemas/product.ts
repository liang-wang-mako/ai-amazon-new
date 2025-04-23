import { z } from 'zod';

// Product Category Schema
export const productCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  description: z.string().max(500).optional(),
  slug: z.string().min(1),
});

// Product Image Schema
export const productImageSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  alt: z.string().min(1),
  isPrimary: z.boolean().default(false),
});

// Product Variant Schema
export const productVariantSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  inventory: z.number().int().min(0),
  attributes: z.record(z.string(), z.string()),
});

// Product Schema
export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(2000),
  slug: z.string().min(1),
  status: z.enum(['draft', 'published', 'archived']),
  categoryId: z.string().uuid(),
  images: z.array(productImageSchema),
  variants: z.array(productVariantSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// Product Input Schema (for creating/updating products)
export const productInputSchema = productSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    categoryId: z.string().uuid().optional(),
    images: z.array(productImageSchema.omit({ id: true })).optional(),
    variants: z.array(productVariantSchema.omit({ id: true })).optional(),
  });

export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;
export type ProductCategory = z.infer<typeof productCategorySchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type ProductImage = z.infer<typeof productImageSchema>;
