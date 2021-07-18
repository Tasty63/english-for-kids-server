import express, { Router } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { UserType } from '../app.api';
import { jwtSecretKey, StatusCodes } from '../config';
import UserModel from './user-model';

const authorizationRouter = Router();

authorizationRouter.post(
  '/login',
  [
    check('username')
      .isString()
      .withMessage('Incorrect login')
      .isLength({ min: 5 })
      .withMessage('Username must be more than 5 characters'),
    check('password')
      .isString()
      .withMessage('Incorrect password')
      .isLength({ min: 5 })
      .withMessage('Password must be more than 5 characters'),
  ],
  async (request: express.Request, result: express.Response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return result.status(StatusCodes.BadRequest).json({
          errors: errors.array(),
          message: 'Incorrect login data',
        });
      }

      const { username, password }: UserType = request.body;
      const user = await UserModel.findOne({ username });

      if (!user) {
        return result.status(StatusCodes.BadRequest).json({ message: 'User does not exist' });
      }

      const isPasswordsMatch = password === user.password;

      if (!isPasswordsMatch) {
        return result.status(StatusCodes.BadRequest).json({ message: 'Incorrect password' });
      }

      const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });

      return result.json({ token, userId: user.id });
    } catch (error) {
      return result
        .status(StatusCodes.InternalServerError)
        .json({ message: 'Something went wrong. Please try again later' });
    }
  }
);

export default authorizationRouter;
