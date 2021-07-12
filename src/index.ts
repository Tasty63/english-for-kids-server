import express from 'express';
import mongoose from 'mongoose';

import { PORT, mongoURL } from './config';
import authorizationRouter from './routes/authorization';

const app = express();
app.use('/api/auth', authorizationRouter);
async function start() {
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
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// start();
