import express, { Router } from 'express';
import checkAuthorization from '../authorization/authorization-middleware';
import { StatusCodes } from '../config';
import CategoryModel from './category-model';
import path from 'path';
import imageLoader from '../upload';
import cloudinary from 'cloudinary';

const categoryRouter = Router();

categoryRouter.get('/', async (request: express.Request, result: express.Response) => {
  try {
    const categories = await CategoryModel.find();

    if (!categories) {
      return result.json({});
    }

    return result.json(categories);
  } catch (error) {
    return result
      .status(StatusCodes.InternalServerError)
      .json({ message: 'Something went wrong. Please try again later' });
  }
});

categoryRouter.post(
  '/create',
  imageLoader.single('image'),
  async (request: express.Request, result: express.Response) => {
    try {
      const { categoryName } = request.body;
      const path = request.file?.path;
      const cloudinary_id = request.file?.filename;

      const category = new CategoryModel({ name: categoryName, preview: path, cloudinary_id });

      const saved = await category.save();
      const categories = await CategoryModel.find();

      return result.json(categories);
    } catch (error) {
      return result
        .status(StatusCodes.InternalServerError)
        .json({ message: 'Something went wrong. Please try again later' });
    }
  }
);

categoryRouter.delete(
  '/:id',
  imageLoader.single('image'),
  async (request: express.Request, result: express.Response) => {
    try {
      const category = await CategoryModel.findOneAndDelete({ _id: request.params.id });

      if (!category) {
        return result.status(StatusCodes.BadRequest).json({ message: 'Category does not exist' });
      }

      const { cloudinary_id } = category;

      cloudinary.v2.uploader.destroy(cloudinary_id);

      const categories = await CategoryModel.find();

      if (!categories) {
        return result.json({});
      }

      return result.json(categories);
    } catch (error) {
      return result
        .status(StatusCodes.InternalServerError)
        .json({ message: 'Something went wrong. Please try again later' });
    }
  }
);

export default categoryRouter;
