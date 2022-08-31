import home from '../routes/home';
import brand from '../routes/brand';
import auth from '../routes/auth';
import cars from '../routes/cars';
import carTypes from '../routes/car-types';
import upload from '../routes/upload';
import error from '../middleware/error';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import express, { Application } from 'express';

export default function (app: Application) {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.use('/api/', home);
  app.use('/api/brands', brand);
  app.use('/api/auth', auth);
  app.use('/api/cars', cars);
  app.use('/api/carTypes', carTypes);
  app.use('/api/upload', upload);

  app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

  app.use(error);
}
