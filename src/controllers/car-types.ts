import { CarType } from '../models/CarType';
import { mongo } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

const getAllTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const types = await CarType.find({}).sort({ name: 1 }).select('_id, name');
    res.send(types);
  } catch (error) {
    next(error);
  }
};

const getTypeByID = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id = req.params.id;

    const type = await CarType.findById(id);
    if (!type) {
      return res.status(404).send({ message: 'The car type not found with the given ID' });
    }

    res.send(type);
  } catch (error) {
    return next(error);
  }
};

const createType = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const type = new CarType({ name: req.body.name });

    await type.save();

    res.status(201).send(type);
  } catch (error) {
    if (error instanceof mongo.MongoError && error.code === 11000) {
      return res.status(400).send({ message: 'A car type already exists with the given name' });
    }
    next(error);
  }
};

const updateType = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const type = await CarType.findById(req.params.id);

    if (!type) {
      return res.status(404).send({ message: 'The car type not found with the given ID' });
    }

    type.name = req.body.name;

    await type.save();

    res.send(type);
  } catch (error) {
    next(error);
  }
};

const deleteType = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const type = await CarType.findById(req.params.id);

    if (!type) {
      return res.status(404).send({ message: 'The car type not found with the given ID' });
    }

    await type.remove();

    res.send(type);
  } catch (error) {
    next(error);
  }
};

export { getAllTypes, getTypeByID, createType, updateType, deleteType };
