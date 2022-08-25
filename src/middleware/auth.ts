import jwt from 'jsonwebtoken';
import { User as UserModel } from '../models/User';
import User from '../tsd/types/User';
import AuthRequest from '../tsd/interfaces/AuthRequest';
import { Response, NextFunction } from 'express';

export default function (req: AuthRequest, res: Response, next: NextFunction): Response | void {
  if (!process.env.JWT_SECRET) {
    return next(new Error('The JWT_SECRET environment variable is not provided!'));
  }

  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(401).send({ message: 'No token provided!' });
  }

  let token: string[] | null | string = authorization.match(/Bearer (.*)/);

  if (!token) {
    return res.status(400).send({ message: 'The provided token is invalid!' });
  }

  token = token[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded): Promise<Response | void> => {
    if (err) {
      return res.status(400).send({ message: 'The provided token is invalid!' });
    }

    const user = decoded as User;

    if (!(await UserModel.findById(user._id))) {
      return res.status(400).send({ message: 'The given token is invalid!' });
    }

    req.user = user;

    next();
  });
}
