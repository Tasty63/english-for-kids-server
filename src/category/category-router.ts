import express, { Router } from 'express';
import CategoryModel from './category-model';

const categoryRouter = Router();

categoryRouter.get('/', async (request, result) => {
  try {
    const categories = await CategoryModel.find();

    if (!categories) {
      return result.json({});
    }

    return result.json({ categories });
  } catch (error) {
    return result.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
});

export default categoryRouter;
