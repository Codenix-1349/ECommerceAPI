import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from "#controllers/orders";
import { validate } from "#middleware/validate";
import {
  createOrderSchema,
  getOrDeleteOrderSchema,
  updateOrderSchema,
} from "#schemas/orderSchema";

const router = Router();

router.route("/").get(getOrders).post(validate(createOrderSchema), createOrder);

router
  .route("/:id")
  .get(validate(getOrDeleteOrderSchema), getOrderById)
  .put(validate(updateOrderSchema), updateOrder)
  .delete(validate(getOrDeleteOrderSchema), deleteOrder);

export default router;
