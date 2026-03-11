import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must contain at least 2 characters'),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be a positive number'),
    categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID'),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    price: z.number().min(0).optional(),
    categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  }),
});

export const getOrDeleteProductSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID'),
  }),
});

export const getProductsSchema = z.object({
  query: z.object({
    categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID').optional(),
  }),
});
