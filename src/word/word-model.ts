import { Schema, model } from 'mongoose';
import { WordDataType } from '../app.api';

const wordSchema = new Schema<WordDataType, any, WordDataType>({
  word: { type: String },
  translation: { type: String },
  image: { type: String },
  audioSrc: { type: String },
});

export default wordSchema;
