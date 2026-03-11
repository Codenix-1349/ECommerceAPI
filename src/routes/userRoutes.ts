import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '#controllers/users';
import { validate } from '#middleware/validate';
import { createUserSchema, updateUserSchema, getOrDeleteUserSchema } from '#schemas/userSchema';

const router = Router();

router.route('/')
  .get(getUsers)
  .post(validate(createUserSchema), createUser);

router.route('/:id')
  .get(validate(getOrDeleteUserSchema), getUserById)
  .put(validate(updateUserSchema), updateUser)
  .delete(validate(getOrDeleteUserSchema), deleteUser);

export default router;
