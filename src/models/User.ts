import Joi from 'joi';
import jwt from 'jsonwebtoken';
import User from '../tsd/interfaces/User';
import UserResult from '../tsd/interfaces/UserResult';
import { Request } from 'express';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema<User>(
  {
    name: { type: String, minLength: 2, maxLength: 30, required: true },
    email: { type: String, minLength: 5, maxLength: 50, unique: true, required: true },
    password: { type: String, minLength: 8, maxLength: 80, required: true },
  },
  { timestamps: true }
);

UserSchema.methods.parseUserResult = function () {
  return this.toObject({
    versionKey: false,
    transform: function (doc: UserResult, ret: UserResult) {
      delete ret.password;
      return ret;
    },
  });
};

UserSchema.methods.generateAuthToken = function (parsedUser: UserResult) {
  if (!process.env.JWT_SECRET) {
    throw new Error('The JWT_SECRET environment variable is not provided!');
  }

  return jwt.sign(parsedUser, process.env.JWT_SECRET, { expiresIn: '24h' });
};

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
