require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoURL, publicPath, cloudinaryURL } from './config';
import authorizationRouter from './authorization/authorization-router';
import categoryRoter from './category/category-router';
import statisticsRouter from './statistics/statistics-router';

// cloudinary.v2.uploader.upload('public/images/angry.jpg', { folder: 'images', public_id: 'angry' }, (error, result) => {
//   console.log(result, error);
// });

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(/^(?!\/api\/)/, express.static(publicPath));

app.use('/api/auth', authorizationRouter);
app.use('/api/category', categoryRoter);
app.use('/api/statistics', statisticsRouter);

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => console.log(`Hello ${PORT}`));
  } catch (error) {
    process.exit(1);
  }
};

start();
