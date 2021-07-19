require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoURL } from './config';
import authorizationRouter from './authorization/authorization-router';
import categoryRoter from './category/category-router';
import statisticsRouter from './statistics/statistics-router';

const app = express();
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
