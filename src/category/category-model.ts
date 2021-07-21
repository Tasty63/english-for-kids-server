import { Schema, model } from 'mongoose';
import { CategoryType } from '../app.api';

const categorySchema = new Schema<CategoryType, any, CategoryType>({
  name: { type: String, requried: true },
  preview: { type: String, requried: true },
  words: [
    {
      word: { type: String },
      translation: { type: String },
      image: { type: String },
      audioSrc: { type: String },
    },
  ],
});

export default model<CategoryType>('category', categorySchema);
