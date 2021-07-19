export const PORT = process.env.PORT || 5000;
export const mongoURL =
  'mongodb+srv://Tasty:tasty@cluster0.tlprk.mongodb.net/english-for-kids?retryWrites=true&w=majority';
export const jwtSecretKey = 'frontend';

export enum StatusCodes {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}
