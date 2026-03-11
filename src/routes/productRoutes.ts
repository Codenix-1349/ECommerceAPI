import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '#controllers/products';
import { validate } from '#middleware/validate';
import { createProductSchema, updateProductSchema, getOrDeleteProductSchema, getProductsSchema } from '#schemas/productSchema';

const router = Router();

router.route('/')
  .get(validate(getProductsSchema), getProducts)
  .post(validate(createProductSchema), createProduct);

router.route('/:id')
  .get(validate(getOrDeleteProductSchema), getProductById)
  .put(validate(updateProductSchema), updateProduct)
  .delete(validate(getOrDeleteProductSchema), deleteProduct);

export default router;
