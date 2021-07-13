import { Schema, model } from 'mongoose';
import { CategoryType } from '../app.api';

const categorySchema = new Schema<CategoryType>({
  id: { type: String, requried: true, unique: true },
  name: { type: String, requried: true },
  preview: { type: String, requried: true },
  words: [
    {
      id: { type: String, requried: true, unique: true },
      word: { type: String, requried: true },
      translation: { type: String, requried: true },
      image: { type: String, requried: true },
      audioSrc: { type: String, requried: true },
    },
  ],
});

export default model<CategoryType>('category', categorySchema);
