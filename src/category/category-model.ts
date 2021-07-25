import { Schema, model } from 'mongoose';

import { CategoryType } from '../app.api';
import wordSchema from '../word/word-model';

const categorySchema = new Schema<CategoryType>({
  name: { type: String, requried: true },
  preview: { type: String, requried: true },
  words: [wordSchema],
});

export default model<CategoryType>('category', categorySchema);
