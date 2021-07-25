import express, { Router } from 'express';
import checkAuthorization from '../authorization/authorization-middleware';
import { CloudinaryFolders, FileFields, getCloudinaryId, StatusCodes } from '../config';
import CategoryModel from '../category/category-model';
import multerLoader from '../upload';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';

const wordsRouter = Router();

wordsRouter.post(
  '/:id',
  checkAuthorization,
  multerLoader.fields([{ name: FileFields.Image }, { name: FileFields.Audio }]),
  async (request: express.Request, result: express.Response) => {
    try {
      const { word, translation } = request.body;
      const files = request.files as { [fieldname: string]: Express.Multer.File[] };
      let imageFile;
      let audioFile;
      let image = '';
      let audioSrc = '';

      if (files[FileFields.Image]) {
        imageFile = files[FileFields.Image][0];
        const imageCloudinaryData = await cloudinary.v2.uploader.upload(imageFile.path, {
          folder: CloudinaryFolders.Images,
        });
        image = imageCloudinaryData.secure_url;
      }

      if (files[FileFields.Audio]) {
        audioFile = files[FileFields.Audio][0];
        const audioCloudinaryData = await cloudinary.v2.uploader.upload(audioFile.path, {
          folder: CloudinaryFolders.Audio,
          resource_type: 'video',
        });

        audioSrc = audioCloudinaryData.secure_url;
      }

      const category = await CategoryModel.findOneAndUpdate(
        { _id: request.params.id },
        {
          $push: {
            words: {
              word,
              translation,
              image,
              audioSrc,
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
  }
);

wordsRouter.delete('/:id', multerLoader.single('image'), async (request: express.Request, result: express.Response) => {
  try {
    const deletedId = mongoose.Types.ObjectId(request.params.id);

    const cat = await CategoryModel.aggregate([
      { $unwind: '$words' },
      {
        $match: {
          'words._id': deletedId,
        },
      },
    ]);

    const imageCloudinaryId = getCloudinaryId(cat[0].words.image);
    const audioCloudinaryId = getCloudinaryId(cat[0].words.audioSrc);

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

    cloudinary.v2.uploader.destroy(imageCloudinaryId);
    cloudinary.v2.uploader.destroy(audioCloudinaryId);

    return result.json(category);
  } catch (error) {
    result.status(StatusCodes.InternalServerError).json({ message: 'Something went wrong. Please try again later' });
  }
});

export default wordsRouter;
