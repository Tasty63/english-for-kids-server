import express, { Router } from 'express';
import checkAuthorization from '../authorization/authorization-middleware';
import { FileFields, getCloudinaryId, StatusCodes } from '../config';
import CategoryModel from './category-model';
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
    result.status(StatusCodes.InternalServerError).json({ message: 'Something went wrong. Please try again later' });
  }
});

categoryRouter.post(
  '/create',
  checkAuthorization,
  imageLoader.single(FileFields.Image),
  async (request: express.Request, result: express.Response) => {
    try {
      const { categoryName } = request.body;
      const path = request.file?.path;
      let preview = '';
      let cloudinary_id = '';

      if (path) {
        const imageCloudinaryData = await cloudinary.v2.uploader.upload(path, {
          folder: 'images',
        });

        preview = imageCloudinaryData.secure_url;
        cloudinary_id = getCloudinaryId(preview);
      }

      const category = new CategoryModel({
        name: categoryName,
        preview,
        cloudinary_id,
      });

      const saved = await category.save();
      const categories = await CategoryModel.find();

      return result.json(categories);
    } catch (error) {
      result.status(StatusCodes.InternalServerError).json({ message: 'Something went wrong. Please try again later' });
    }
  }
);

categoryRouter.delete(
  '/:id',
  checkAuthorization,
  imageLoader.single(FileFields.Image),
  async (request: express.Request, result: express.Response) => {
    try {
      const category = await CategoryModel.findOneAndDelete({ _id: request.params.id });

      if (!category) {
        return result.status(StatusCodes.BadRequest).json({ message: 'Category does not exist' });
      }

      const cloudinary_id = getCloudinaryId(category.preview);

      cloudinary.v2.uploader.destroy(cloudinary_id);

      const categories = await CategoryModel.find();

      if (!categories) {
        return result.json({});
      }

      return result.json(categories);
    } catch (error) {
      result.status(StatusCodes.InternalServerError).json({ message: 'Something went wrong. Please try again later' });
    }
  }
);

categoryRouter.put(
  '/:id',
  checkAuthorization,
  imageLoader.single(FileFields.Image),
  async (request: express.Request, result: express.Response) => {
    try {
      const { categoryName } = request.body;
      const path = request.file?.path;
      const oldCategory = await CategoryModel.findOne({ _id: request.params.id });

      if (!oldCategory) {
        return result.status(StatusCodes.BadRequest).json({ message: 'Category does not exist' });
      }

      let { name, preview } = oldCategory;

      if (path) {
        cloudinary.v2.uploader.destroy(getCloudinaryId(oldCategory.preview));

        const imageCloudinaryData = await cloudinary.v2.uploader.upload(path, {
          folder: 'images',
        });

        preview = imageCloudinaryData.secure_url;
      }

      if (categoryName) {
        name = categoryName;
      }

      const category = await CategoryModel.updateOne(
        { _id: request.params.id },
        {
          name,
          preview,
        }
      );

      const categories = await CategoryModel.find();

      if (!categories) {
        return result.json({});
      }

      return result.json(categories);
    } catch (error) {
      result.status(StatusCodes.InternalServerError).json({ message: 'Something went wrong. Please try again later' });
    }
  }
);

export default categoryRouter;
