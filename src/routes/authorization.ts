import express, { Router } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { UserType } from 'src/app.api';
import { jwtSecretKey } from 'src/config';
import User from '../models/user';

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
        return result.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login data',
        });
      }

      const { username, password }: UserType = request.body;
      const user: UserType = await User.findOne({ username });

      if (!user) {
        return result.status(400).json({ message: 'User does not exist' });
      }

      const isPasswordsMatch = password === user.password;

      if (!isPasswordsMatch) {
        return result.status(400).json({ message: 'Incorrect password' });
      }

      const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });

      return result.json({ token, userId: user.id });
    } catch (error) {
      return result.status(500).json({ message: 'Something went wrong. Please try again later' });
    }
  },
);

export default authorizationRouter;
