import { Request, Response, NextFunction } from 'express';

export default function (err: Error, req: Request, res: Response, next: NextFunction): void {
  res.status(500).send({ message: 'Something failed, Please try again later.' });
}
