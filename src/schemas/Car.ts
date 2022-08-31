import Joi from 'joi';
import driveTrain from '../tsd/enums/drive-train';
import colors from '../tsd/enums/colors';
import fuelTypes from '../tsd/enums/fuel-types';
import trims from '../tsd/enums/trims';

const createSchema = Joi.object({
  brand: Joi.string().length(24).hex().required(),
  condition: Joi.string().valid('NEW', 'USED', 'CERTIFIED').required(),
  description: Joi.string().max(2048),
  driveTrain: Joi.string()
    .valid(...driveTrain)
    .required(),
  exteriorColor: Joi.string()
    .valid(...colors)
    .required(),
  fuelType: Joi.string()
    .valid(...fuelTypes)
    .required(),
  images: Joi.array().items(Joi.string()).min(1).required(),
  interiorColor: Joi.string()
    .valid(...colors)
    .required(),
  location: Joi.object({
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    coordinates: Joi.array().items(Joi.number()).min(2),
  }).required(),
  mileage: Joi.number().min(0).max(1_000_000).required(),
  model: Joi.string().min(1).max(30).required(),
  price: Joi.number().min(0).max(Number.MAX_SAFE_INTEGER).required(),
  transmission: Joi.string().valid('MANUAL', 'AUTOMATIC').required(),
  trim: Joi.string().valid(...trims),
  type: Joi.string().length(24).hex().required(),
  year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
});

const updateSchema = Joi.object({
  brand: Joi.string().length(24).hex(),
  condition: Joi.string().valid('NEW', 'USED', 'CERTIFIED'),
  description: Joi.string().max(2048),
  driveTrain: Joi.string().valid(...driveTrain),
  exteriorColor: Joi.string().valid(...colors),
  fuelType: Joi.string().valid(...fuelTypes),
  images: Joi.array().items(Joi.string()).min(1),
  interiorColor: Joi.string().valid(...colors),
  location: Joi.object({
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    coordinates: Joi.array().items(Joi.number()).min(2),
  }),
  mileage: Joi.number().min(0).max(1_000_000),
  model: Joi.string().min(1).max(30),
  price: Joi.number().min(0).max(Number.MAX_SAFE_INTEGER),
  transmission: Joi.string().valid('Manual', 'Automatic'),
  trim: Joi.string().valid(...trims),
  type: Joi.string().length(24).hex(),
  year: Joi.number().min(1900).max(new Date().getFullYear()),
});

export { createSchema, updateSchema };
