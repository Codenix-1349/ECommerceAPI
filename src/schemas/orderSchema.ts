import { z } from 'zod';

export const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),
    products: z.array(z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID'),
      quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    })).min(1, 'Order must contain at least one product'),
  }),
});

export const updateOrderSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID'),
  }),
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID').optional(),
    products: z.array(z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID'),
      quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    })).min(1, 'Order must contain at least one product').optional(),
  }),
});

export const getOrDeleteOrderSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID'),
  }),
});
