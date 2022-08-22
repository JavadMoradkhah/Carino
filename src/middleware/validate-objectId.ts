import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction): Response | void {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: 'The given ID is invalid' });
  }
  next();
}
