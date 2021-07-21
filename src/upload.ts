import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import path from 'path';
import express from 'express';

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary.v2,
//   params: async (request, file) => {
//     return {
//       folder: 'images',
//       resource_type: 'image',
//     };
//   },
// });

const storage = multer.diskStorage({});

// const filterFiles = (
//   request: express.Request,
//   file: Express.Multer.File,
//   callback: (error: Error | null, destination: string) => void
// ) => {
//   if (file.mimetype === 'image/png') {
//     callback(null, true);
//   }
// };

const multerLoader = multer({ storage: storage });

export default multerLoader;
