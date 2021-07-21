import express, { Router } from 'express';
import checkAuthorization from '../authorization/authorization-middleware';
import { StatusCodes } from '../config';
import CategoryModel from '../category/category-model';
import multerLoader from '../upload';
import cloudinary from 'cloudinary';

const wordsRouter = Router();

export enum fileFields {
  Audio = 'audio',
  Image = 'image',
}

wordsRouter.post(
  '/:id',
  multerLoader.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  async (request: express.Request, result: express.Response) => {
    try {
      const files = request.files as { [fieldname: string]: Express.Multer.File[] };
      const image = files['image'][0];
      const imageCloudinaryData = await cloudinary.v2.uploader.upload(image.path, {
        folder: 'images',
      });
      console.log(imageCloudinaryData);

      // const imageCloudinary_id = request.files?.image[0].filename;

      // const category = await CategoryModel.findOneAndUpdate(
      //   { _id: request.params.id },
      //   {
      //     $push: {
      //       words: {
      //         id: request.body.id,
      //         word: request.body.word,
      //         translation: request.body.translation,
      //         image: request.body.image,
      //         audioSrc: request.body.audioSrc,
      //       },
      //     },
      //   },
      //   { new: true }
      // );

      // if (!category) {
      //   return result.json({});
      // }

      // return result.json(category);
    } catch (error) {
      result.status(StatusCodes.InternalServerError).json({ message: 'Something went wrong. Please try again later' });
    }
  }
);

wordsRouter.delete('/:id', multerLoader.single('image'), async (request: express.Request, result: express.Response) => {
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
});

export default wordsRouter;
