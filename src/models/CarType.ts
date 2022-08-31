import carType from '../tsd/interfaces/CarType';
import typeSchema from '../schemas/CarType';
import { Request } from 'express';
import { Schema, model } from 'mongoose';

const CarType = model<carType>(
  'Type',
  new Schema<carType>(
    {
      name: { type: String, minLength: 3, maxLength: 20, required: true },
    },
    { timestamps: true }
  )
);

const validate = (req: Request) => {
  return typeSchema.validate(req.body);
};

export { CarType, validate };
