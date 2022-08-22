import Joi from 'joi';
import { Request } from 'express';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, minLength: 2, maxLength: 30, required: true },
    email: { type: String, minLength: 5, maxLength: 50, unique: true, required: true },
    password: { type: String, minLength: 8, maxLength: 80, required: true },
  },
  { timestamps: true }
);

const User = model('User', UserSchema);

const validate = (req: Request) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .pattern(/^[A-Z]+[A-Z|a-z|\s]+$/)
      .required(),
    email: Joi.string().min(5).max(50).email().required(),
    password: Joi.string().min(8).max(80).required(),
  });
  return schema.validate(req.body);
};

export { User, validate };
