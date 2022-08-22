import Joi from 'joi';
import { Request } from 'express';
import { Schema, model } from 'mongoose';

interface User {
  name: string;
  email: string;
  password: string; // The password is optional to remove the password from the response body after user registration
}

const UserSchema = new Schema<User>(
  {
    name: { type: String, minLength: 2, maxLength: 30, required: true },
    email: { type: String, minLength: 5, maxLength: 50, unique: true, required: true },
    password: { type: String, minLength: 8, maxLength: 80, required: true },
  },
  { timestamps: true }
);

const User = model<User>('User', UserSchema);

const validate = (req: Request, isUpdateSchema: Boolean = false) => {
  const payload: any = {
    email: Joi.string().min(5).max(50).email().required(),
    password: Joi.string().min(8).max(80).required(),
  };

  if (!isUpdateSchema) {
    payload.name = Joi.string()
      .min(2)
      .max(30)
      .pattern(/^[A-Z]+[A-Z|a-z|\s]+$/)
      .required();
  }

  const schema = Joi.object(payload);
  return schema.validate(req.body);
};

export { User, validate };
