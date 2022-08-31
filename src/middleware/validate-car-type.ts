import { validate } from '../models/CarType';
import { Request, Response, NextFunction } from 'express';

export default function () {
  return function (req: Request, res: Response, next: NextFunction): Response | void {
    const { error: validationError } = validate(req);
    if (validationError) {
      return res.status(400).send({ message: validationError.message });
    }
    next();
  };
}
