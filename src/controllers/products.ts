import type { Request, Response, NextFunction } from 'express';
import { Product } from '#models/Product';
import { Category } from '#models/Category';
import type { AppError } from '#middleware/errorHandler';

export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId } = req.query;
    
    let queryQuery = {};
    if (categoryId) {
      queryQuery = { categoryId };
    }
    
    const products = await Product.find(queryQuery).populate('categoryId', 'name');
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryId', 'name');
    if (!product) {
      const err = new Error('Product not found') as AppError;
      err.statusCode = 404;
      return next(err);
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, price, categoryId } = req.body;
    
    // Verify Category Exists
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      const err = new Error('Invalid category ID. Category does not exist.') as AppError;
      err.statusCode = 400;
      return next(err);
    }

    const product = await Product.create({ name, description, price, categoryId });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;

    // Verify Category Exists if categoryId is updated
    if (categoryId) {
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        const err = new Error('Invalid category ID. Category does not exist.') as AppError;
        err.statusCode = 400;
        return next(err);
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, categoryId },
      { new: true, runValidators: true }
    );

    if (!product) {
      const err = new Error('Product not found') as AppError;
      err.statusCode = 404;
      return next(err);
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      const err = new Error('Product not found') as AppError;
      err.statusCode = 404;
      return next(err);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
