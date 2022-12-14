import Car from '../tsd/types/Car';
import driveTrain from '../tsd/enums/drive-train';
import colors from '../tsd/enums/colors';
import fuelTypes from '../tsd/enums/fuel-types';
import trims from '../tsd/enums/trims';
import { createSchema, updateSchema } from '../schemas/Car';
import { Request } from 'express';
import mongoose, { Schema, model } from 'mongoose';

const CarSchema = new Schema<Car>(
  {
    brand: new Schema({
      _id: { type: mongoose.Types.ObjectId, ref: 'Brand', required: true },
      name: { type: String, index: true, required: true },
    }),
    condition: { type: String, enum: ['NEW', 'USED', 'CERTIFIED'], required: true },
    description: { type: String, maxLength: 2048 },
    driveTrain: { type: String, enum: driveTrain, required: true },
    exteriorColor: { type: String, enum: colors, required: true },
    fuelType: { type: String, enum: fuelTypes, required: true },
    images: { type: [String], required: true },
    interiorColor: { type: String, enum: colors, required: true },
    location: {
      country: { type: String, index: true, required: true },
      state: { type: String, index: true, required: true },
      city: { type: String, index: true, required: true },
      coordinates: { type: [Number], required: true },
    },
    mileage: { type: Number, min: 0, max: 1_000_000, required: true },
    model: { type: String, index: true, minLength: 1, maxLength: 30, required: true },
    price: { type: Number, min: 0, max: Number.MAX_SAFE_INTEGER, required: true },
    seller: new Schema({
      _id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
      email: { type: String, index: true, required: true },
    }),
    status: { type: String, enum: ['PENDING', 'CONFIRMED'], default: 'PENDING' },
    transmission: { type: String, enum: ['MANUAL', 'AUTOMATIC'], required: true },
    trim: { type: String, enum: trims },
    type: new Schema({
      _id: { type: mongoose.Types.ObjectId, ref: 'Type', required: true },
      name: { type: String, minLength: 3, maxLength: 20, required: true },
    }),
    year: { type: Number, min: 1900, max: new Date().getFullYear(), required: true },
  },
  { timestamps: true }
);

const Car = model<Car>('Car', CarSchema);

const validate = (req: Request, isUpdateSchema: Boolean = false) => {
  let schema = createSchema;
  if (isUpdateSchema) {
    schema = updateSchema;
  }
  return schema.validate(req.body);
};

export { Car, validate };
