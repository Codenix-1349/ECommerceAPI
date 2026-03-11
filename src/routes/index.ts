import { Router } from 'express';
import userRoutes from '#routes/userRoutes';
import categoryRoutes from '#routes/categoryRoutes';
import productRoutes from '#routes/productRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
// More routes will be mounted here (orders)

export default router;
