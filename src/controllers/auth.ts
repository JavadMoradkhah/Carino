import bcrypt from 'bcrypt';
import Joi from 'joi';
import randomCodeGenerator from '../utils/random-code-generator';
import emailSender from '../utils/email-sender';
import verificationTemplate from '../config/email/templates/verification';
import { User, validate } from '../models/User';
import { Verification } from '../models/Verification';
import { mongo } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { error: validationError } = validate(req);
    if (validationError) {
      return res.status(400).send({ message: validationError.message });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let user = new User({ name: req.body.name, email: req.body.email, password: hashedPassword });

    await user.save();

    const result = user.parseUserResult();

    const token = user.generateAuthToken(result);

    result.token = token;

    res.status(201).send({ result });
  } catch (error) {
    if (error instanceof mongo.MongoError && error.code === 11000) {
      return res.status(400).send({ message: 'The user already exists with the given email' });
    }
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { error: validationError } = validate(req, true);
    if (validationError) {
      return res.status(400).send({ message: validationError.message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ message: 'The given email or password in invalid' });
    }

    const passwordIsMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsMatch) {
      return res.status(400).send({ message: 'The given email or password in invalid' });
    }

    const payload = user.parseUserResult();

    const token = user.generateAuthToken(payload);

    payload.token = token;

    res.send({ result: payload });
  } catch (error) {
    next(error);
  }
};

const sendVerificationEmail = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(5).max(50).email().required(),
    });

    const { error: validationError } = schema.validate(req.body);
    if (validationError) {
      return res.status(400).send({ message: validationError.message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({
        message: 'You have to sign up before verifying your email.',
      });
    }

    const verificationCode = randomCodeGenerator();

    const salt = await bcrypt.genSalt(10);

    const hashedVerificationCode = await bcrypt.hash(verificationCode.toString(), salt);

    const verification = new Verification({
      email: req.body.email,
      code: hashedVerificationCode,
    });

    await verification.save();

    const subject = 'Email Verification';
    const template = verificationTemplate(verificationCode);

    await emailSender(req.body.email, subject, '', template);

    res.status(200).send({ message: 'Verification email successfully sent.' });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(5).max(50).email().required(),
      verificationCode: Joi.string().required(),
    });

    const { error: validationError } = schema.validate(req.body);
    if (validationError) {
      return res.status(400).send({ message: validationError.message });
    }

    const { email, verificationCode } = req.body;

    const verification = await Verification.findOne({ email });

    if (!verification) {
      return res.status(400).send({
        message: 'The verification code is expired or no verification code has been sent to the given email.',
      });
    }

    const isCodeMatch = await bcrypt.compare(verificationCode, verification.code);
    if (!isCodeMatch) {
      return res.status(400).send({ message: 'Invalid verification code.' });
    }

    await User.findOneAndUpdate({ email }, { verified: true });

    res.status(200).send({ message: 'Your email is verified successfully.' });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, sendVerificationEmail, verifyEmail };
