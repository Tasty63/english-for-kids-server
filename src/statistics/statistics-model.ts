import { Schema, model } from 'mongoose';
import { StatisticWordType } from '../app.api';

const statisticsSchema = new Schema({
  id: { type: String, requried: true, unique: true },
  trained: { type: Number, requried: true },
  guesses: { type: Number, requried: true },
  mistakes: { type: Number, requried: true },
});

export default model<StatisticWordType>('statistic', statisticsSchema);
