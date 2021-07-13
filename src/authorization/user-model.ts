import { Schema, model } from 'mongoose';
import { UserType } from '../app.api';

const userSchema = new Schema({
  username: { type: String, requried: true, unique: true },
  password: { type: String, requried: true },
});

export default model<UserType>('user', userSchema);
