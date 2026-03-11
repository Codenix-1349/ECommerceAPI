import type { Request, Response, NextFunction } from 'express';
import { User } from '#models/User';
import type { AppError } from '#middleware/errorHandler';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const err = new Error('User not found') as AppError;
      err.statusCode = 404;
      return next(err);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      const err = new Error('Email already exists') as AppError;
      err.statusCode = 400;
      return next(err);
    }
    
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: id as any } });
      if (emailExists) {
        const err = new Error('Email already in use') as AppError;
        err.statusCode = 400;
        return next(err);
      }
    }

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true, runValidators: true }
    );

    if (!user) {
      const err = new Error('User not found') as AppError;
      err.statusCode = 404;
      return next(err);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      const err = new Error('User not found') as AppError;
      err.statusCode = 404;
      return next(err);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
