import Joi from 'joi';
import Verification from '../tsd/interfaces/Verification';
import { Request } from 'express';
import { Schema, model } from 'mongoose';

const VerificationSchema = new Schema<Verification>({
  email: { type: String, minLength: 5, maxLength: 50, required: true },
  code: { type: String, required: true },
  timestamp: { type: Date, expires: 120, default: Date.now },
});

const Verification = model<Verification>('Verification', VerificationSchema);

const validate = (req: Request) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).email().required(),
    code: Joi.string().required(),
  });

  return schema.validate(req.body);
};

export { Verification, validate };
