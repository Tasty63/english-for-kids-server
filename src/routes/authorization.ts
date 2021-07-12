import express, { Router } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';

const authorizationRouter = Router();

export type User = {
  username: string;
  password: string;
};

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

      const { username, password }: User = request.body;
      const user: User = await User.findOne({ username });

      if (!user) {
        return result.status(400).json({ message: 'User does not exist' });
      }

      const isPasswordsMatch = password === user.password;

      if (!isPasswordsMatch) {
        return result.status(400).json({ message: 'Incorrect password' });
      }
    } catch (error) {
      result.status(500).json({ message: 'Something went wrong. Please try again later' });
    }
  }
);

export default authorizationRouter;
