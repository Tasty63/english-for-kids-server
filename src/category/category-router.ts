import express, { Router } from 'express';
import { StatusCodes } from 'src/config';
import CategoryModel from './category-model';

const categoryRouter = Router();

categoryRouter.get('/', async (request: express.Request, result: express.Response) => {
  try {
    const categories = await CategoryModel.find();

    if (!categories) {
      return result.json({});
    }

    return result.json({ categories });
  } catch (error) {
    return result
      .status(StatusCodes.InternalServerError)
      .json({ message: 'Something went wrong. Please try again later' });
  }
});

export default categoryRouter;
