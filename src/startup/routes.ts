import home from '../routes/home';
import brand from '../routes/brand';
import express, { Application } from 'express';

export default function (app: Application) {
  app.use(express.json());

  app.use('/api/', home);
  app.use('/api/brands', brand);
}
