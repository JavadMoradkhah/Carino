import validateObjectId from '../middleware/validate-objectId';
import { getAllCars, getCarByID, createCar, updateCar, deleteCar } from '../controllers/cars';
import { Router } from 'express';

const router = Router();

router.get('/', getAllCars);

router.get('/:id', validateObjectId, getCarByID);

router.post('/', createCar);

router.put('/:id', validateObjectId, updateCar);

router.delete('/:id', validateObjectId, deleteCar);

export default router;
