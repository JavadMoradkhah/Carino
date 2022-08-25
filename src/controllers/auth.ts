import { User, validate } from '../models/User';
import bcrypt from 'bcrypt';
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

    res.send({ result });
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
    if (error instanceof mongo.MongoError && error.code === 11000) {
      return res.status(400).send({ message: 'The user already exists with the given email' });
    }
    next(error);
  }
};

export { registerUser, loginUser };
