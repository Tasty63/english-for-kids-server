import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  login: { type: String, requried: true, unique: true },
  password: { type: String, requried: true },
});

export default model('user', userSchema);
