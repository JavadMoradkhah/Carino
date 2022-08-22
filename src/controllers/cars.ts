import { Car, validate } from '../models/Car';
import { Brand } from '../models/Brand';
import { User } from '../models/User';
import { Request, Response, NextFunction } from 'express';

const getAllCars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cars = await Car.find({});
    res.send(cars);
  } catch (error) {
    next(error);
  }
};

const getCarByID = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).send({ message: 'The car not found with the given ID' });
    }

    res.send(car);
  } catch (error) {
    return next(error);
  }
};

const createCar = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { error: validationError } = validate(req);
    if (validationError) {
      return res.status(400).send({ message: validationError.message });
    }

    const brand = await Brand.findById(req.body.brand);
    if (!brand) {
      return res.status(400).send({ message: 'The given brand ID is invalid' });
    }

    req.body.brand = { _id: brand._id, name: brand.name };

    const seller = await User.findById(req.body.seller);
    if (!seller) {
      return res.status(400).send({ message: 'The given seller ID is invalid' });
    }

    req.body.seller = { _id: seller._id, name: seller.name, email: seller.email };

    let car = new Car(req.body);

    await car.save();

    res.send(car);
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).send({ message: 'The car not found with the given ID' });
    }

    const { error: validationError } = validate(req, true);
    if (validationError) {
      return res.status(400).send({ message: validationError.message });
    }

    if (req.body.brand) {
      const brand = await Brand.findById(req.body.brand);

      if (!brand) {
        return res.status(400).send({ message: 'The given brand ID is invalid' });
      }

      req.body.brand = { _id: brand._id, name: brand.name };
    }

    if (req.body.seller) {
      const seller = await User.findById(req.body.seller);

      if (!seller) {
        return res.status(400).send({ message: 'The given seller ID is invalid' });
      }

      req.body.seller = { _id: seller._id, name: seller.name, email: seller.email };
    }

    Object.assign(car, req.body);

    await car.save();

    res.send(car);
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).send({ message: 'The car not found with the given ID' });
    }

    await car.remove();

    res.send(car);
  } catch (error) {
    next(error);
  }
};

export { getAllCars, getCarByID, createCar, updateCar, deleteCar };
