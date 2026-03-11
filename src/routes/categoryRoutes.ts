import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '#controllers/categories';
import { validate } from '#middleware/validate';
import { createCategorySchema, updateCategorySchema, getOrDeleteCategorySchema } from '#schemas/categorySchema';

const router = Router();

router.route('/')
  .get(getCategories)
  .post(validate(createCategorySchema), createCategory);

router.route('/:id')
  .get(validate(getOrDeleteCategorySchema), getCategoryById)
  .put(validate(updateCategorySchema), updateCategory)
  .delete(validate(getOrDeleteCategorySchema), deleteCategory);

export default router;
