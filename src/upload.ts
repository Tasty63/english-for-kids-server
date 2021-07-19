import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import path from 'path';
import express from 'express';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (request, file) => {
    return {
      folder: 'images',
    };
  },
});

const imageLoader = multer({ storage: storage });

export default imageLoader;
