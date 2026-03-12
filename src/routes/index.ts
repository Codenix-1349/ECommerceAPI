import { Router } from "express";
import categoryRoutes from "#routes/categoryRoutes";
import orderRoutes from "#routes/orderRoutes";
import productRoutes from "#routes/productRoutes";
import userRoutes from "#routes/userRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;
