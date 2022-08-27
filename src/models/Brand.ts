import Joi from 'joi';
import { Request } from 'express';
import { Schema, model } from 'mongoose';

const BrandSchema = new Schema(
  {
    name: { type: String, index: true, unique: true, minLength: 3, maxLength: 30, required: true },
  },
  { timestamps: true }
);

const Brand = model('Brand', BrandSchema);

const validate = (req: Request) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .pattern(/^[A-Z]+[A-Z|a-z|-|\s]+$/)
      .required(),
  });
  return schema.validate(req.body);
};

export { Brand, validate };
