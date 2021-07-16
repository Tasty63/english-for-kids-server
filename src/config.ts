import path from 'path';

export const PORT = process.env.PORT || 5000;
export const mongoURL =
  'mongodb+srv://Tasty:tasty@cluster0.tlprk.mongodb.net/english-for-kids?retryWrites=true&w=majority';
export const cloudinaryURL = 'cloudinary://739318174681858:lfHGHpNw5v_kJTo_fzfL8gjuF68@tasty63';
export const cloudinaryAPIKey = 739318174681858;
export const clodinaryAPISecret = 'lfHGHpNw5v_kJTo_fzfL8gjuF68';
export const publicPath = path.resolve(__dirname, '../public');
export const jwtSecretKey = 'frontend';

export enum StatusCodes {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}
