import express from 'express';
import { StatusCodes, jwtSecretKey } from '../config';
import jwt from 'jsonwebtoken';
import something from '../custom.d';

const checkAuthorization = (request: express.Request, result: express.Response, next: express.NextFunction) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return result.status(StatusCodes.Unauthorized).json({ message: 'No authorization' });
    }

    const decodedToken = jwt.verify(token, jwtSecretKey);
    request.user = decodedToken;
    next();
  } catch (error) {
    return result.status(StatusCodes.Unauthorized).json({ message: 'No authorization' });
  }
};

export default checkAuthorization;
