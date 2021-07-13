import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoURL } from './config';

import authorizationRouter from './routes/authorization';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authorizationRouter);

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => console.log(`Hello ${PORT}`));
  } catch (error) {
    console.log('error', error.message);
    process.exit(1);
  }
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

start();
