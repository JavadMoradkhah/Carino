import Joi from 'joi';
import driveTrain from '../models/enums/drive-train';
import colors from '../models/enums/colors';
import fuelTypes from '../models/enums/fuel-types';
import trims from '../models/enums/trims';
import bodyStyles from '../models/enums/body-styles';

const createSchema = Joi.object({
  brand: Joi.string().length(24).hex().required(),
  condition: Joi.string().valid('NEW', 'USED', 'CERTIFIED').required(),
  description: Joi.string().max(1024),
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
  seller: Joi.string().length(24).hex().required(),
  // status: Joi.string().valid('PENDING', 'CONFIRMED'),
  transmission: Joi.string().valid('Manual', 'Automatic').required(),
  trim: Joi.string().valid(...trims),
  type: Joi.string()
    .valid(...bodyStyles)
    .required(),
  year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
});

const updateSchema = Joi.object({
  brand: Joi.string().length(24).hex(),
  condition: Joi.string().valid('NEW', 'USED', 'CERTIFIED'),
  description: Joi.string().max(1024),
  driveTrain: Joi.string().valid(...driveTrain),
  exteriorColor: Joi.string().valid(...colors),
  fuelType: Joi.string().valid(...fuelTypes),
  images: Joi.array().items(Joi.string()).min(1),
  interiorColor: Joi.string().valid(...colors),
  location: Joi.object({
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    coordinates: Joi.array().items(Joi.number()).min(2),
  }),
  mileage: Joi.number().min(0).max(1_000_000),
  model: Joi.string().min(1).max(30),
  price: Joi.number().min(0).max(Number.MAX_SAFE_INTEGER),
  // seller: Joi.string().length(24).hex(),
  // status: Joi.string().valid('PENDING', 'CONFIRMED'),
  transmission: Joi.string().valid('Manual', 'Automatic'),
  trim: Joi.string().valid(...trims),
  type: Joi.string().valid(...bodyStyles),
  year: Joi.number().min(1900).max(new Date().getFullYear()),
});

export { createSchema, updateSchema };
