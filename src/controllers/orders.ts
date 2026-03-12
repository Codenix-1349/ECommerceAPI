import type { NextFunction, Request, Response } from "express";
import type { Types } from "mongoose";
import { Order } from "#models/Order";
import { Product } from "#models/Product";
import { User } from "#models/User";
import type { AppError } from "#middleware/errorHandler";

interface OrderItemInput {
  productId: string | Types.ObjectId;
  quantity: number;
}

const createAppError = (message: string, statusCode: number): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  return error;
};

const calculateOrderTotal = async (
  products: OrderItemInput[],
): Promise<number> => {
  const productIds = products.map((item) => item.productId.toString());
  const foundProducts = await Product.find({ _id: { $in: productIds } });

  if (foundProducts.length !== productIds.length) {
    throw createAppError("One or more products do not exist", 400);
  }

  const priceMap = new Map(
    foundProducts.map((product) => [product.id.toString(), product.price]),
  );

  return products.reduce((sum, item) => {
    const price = priceMap.get(item.productId.toString());

    if (price === undefined) {
      throw createAppError("One or more products do not exist", 400);
    }

    return sum + price * item.quantity;
  }, 0);
};

const getPopulatedOrders = () =>
  Order.find()
    .populate("userId", "name email")
    .populate("products.productId", "name description price categoryId");

export const getOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const orders = await getPopulatedOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("products.productId", "name description price categoryId");

    if (!order) {
      return next(createAppError("Order not found", 404));
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId, products } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return next(createAppError("User does not exist", 400));
    }

    const total = await calculateOrderTotal(products);
    const order = await Order.create({ userId, products, total });

    const populatedOrder = await Order.findById(order.id)
      .populate("userId", "name email")
      .populate("products.productId", "name description price categoryId");

    res.status(201).json(populatedOrder);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const existingOrder = await Order.findById(req.params.id);

    if (!existingOrder) {
      return next(createAppError("Order not found", 404));
    }

    const userId = req.body.userId ?? existingOrder.userId;
    const products = req.body.products ?? existingOrder.products;

    const user = await User.findById(userId);
    if (!user) {
      return next(createAppError("User does not exist", 400));
    }

    const total = await calculateOrderTotal(products);

    existingOrder.userId = userId;
    existingOrder.products = products;
    existingOrder.total = total;

    await existingOrder.save();

    const populatedOrder = await Order.findById(existingOrder.id)
      .populate("userId", "name email")
      .populate("products.productId", "name description price categoryId");

    res.json(populatedOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(createAppError("Order not found", 404));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
