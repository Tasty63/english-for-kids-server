import express, { Router } from 'express';
import checkAuthorization from '../authorization/authorization-middleware';
import { StatusCodes } from '../config';
import CategoryModel from '../category/category-model';
import imageLoader from '../upload';
import cloudinary from 'cloudinary';

const wordsRouter = Router();

wordsRouter.put('/add/:id', imageLoader.single('image'), async (request: express.Request, result: express.Response) => {
  try {
    const category = await CategoryModel.findOneAndUpdate(
      { _id: request.params.id },
      {
        $push: {
          words: {
            id: request.body.id,
            word: request.body.word,
            translation: request.body.translation,
            image: request.body.image,
            audioSrc: request.body.audioSrc,
          },
        },
      },
      { new: true }
    );

    if (!category) {
      return result.json({});
    }

    return result.json(category);
  } catch (error) {
    result.status(StatusCodes.InternalServerError).json({ message: 'Something went wrong. Please try again later' });
  }
});

wordsRouter.put(
  '/delete/:id',
  imageLoader.single('image'),
  async (request: express.Request, result: express.Response) => {
    try {
      const category = await CategoryModel.findOneAndUpdate(
        {},
        {
          $pull: {
            words: { _id: request.params.id },
          },
        },
        { new: true }
      );

      if (!category) {
        return result.json({});
      }

      return result.json(category);
    } catch (error) {
      result.status(StatusCodes.InternalServerError).json({ message: 'Something went wrong. Please try again later' });
    }
  }
);

export default wordsRouter;
