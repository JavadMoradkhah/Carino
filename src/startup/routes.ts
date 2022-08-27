import home from '../routes/home';
import brand from '../routes/brand';
import auth from '../routes/auth';
import cars from '../routes/cars';
import error from '../middleware/error';
import cors from 'cors';
import express, { Application } from 'express';

export default function (app: Application) {
  app.use(cors());
  app.use(express.json());

  app.use('/api/', home);
  app.use('/api/brands', brand);
  app.use('/api/auth', auth);
  app.use('/api/cars', cars);

  app.use(error);
}
