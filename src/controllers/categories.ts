import type { Request, Response, NextFunction } from 'express';
import { Category } from '#models/Category';
import type { AppError } from '#middleware/errorHandler';

export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      const err = new Error('Category not found') as AppError;
      err.statusCode = 404;
      return next(err);
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.body;
    
    const exists = await Category.findOne({ name });
    if (exists) {
      const err = new Error('Category already exists') as AppError;
      err.statusCode = 400;
      return next(err);
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (name) {
      const exists = await Category.findOne({ name, _id: { $ne: id as any } });
      if (exists) {
        const err = new Error('Category name already in use') as AppError;
        err.statusCode = 400;
        return next(err);
      }
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!category) {
      const err = new Error('Category not found') as AppError;
      err.statusCode = 404;
      return next(err);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      const err = new Error('Category not found') as AppError;
      err.statusCode = 404;
      return next(err);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
