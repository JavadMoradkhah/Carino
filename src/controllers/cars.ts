import AuthRequest from '../tsd/interfaces/AuthRequest';
import { Car } from '../models/Car';
import { Brand } from '../models/Brand';
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

const createCar = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: 'Authentication is required to access this resource.' });
    }

    const brand = await Brand.findById(req.body.brand);
    if (!brand) {
      return res.status(400).send({ message: 'The given brand ID is invalid' });
    }

    req.body.brand = { _id: brand._id, name: brand.name };

    req.body.seller = { _id: req.user._id, name: req.user.name, email: req.user.email };

    const car = new Car(req.body);

    await car.save();

    res.status(201).send(car);
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: 'Authentication is required to access this resource.' });
    }

    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).send({ message: 'The car not found with the given ID' });
    }

    // Checking if does user updating his own car and not the others'
    if (req.user.email !== car.seller.email) {
      return res.status(403).send({ message: "You cannot change others' cars information" });
    }

    if (req.body.brand) {
      const brand = await Brand.findById(req.body.brand);

      if (!brand) {
        return res.status(400).send({ message: 'The given brand ID is invalid' });
      }

      req.body.brand = { _id: brand._id, name: brand.name };
    }

    Object.assign(car, req.body);

    await car.save();

    res.send(car);
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: 'Authentication is required to access this resource.' });
    }

    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).send({ message: 'The car not found with the given ID' });
    }

    // Checking if does user updating his own car and not the others'
    if (req.user.email !== car.seller.email) {
      return res.status(403).send({ message: "You cannot remove others' cars from the website!" });
    }

    await car.remove();

    res.send(car);
  } catch (error) {
    next(error);
  }
};

export { getAllCars, getCarByID, createCar, updateCar, deleteCar };
