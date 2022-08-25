import { validate } from '../models/Car';
import { Request, Response, NextFunction } from 'express';

export default function (isUpdate: boolean = false) {
  return function (req: Request, res: Response, next: NextFunction): Response | void {
    const { error: validationError } = validate(req, isUpdate);
    if (validationError) {
      return res.status(400).send({ message: validationError.message });
    }
    next();
  };
}
