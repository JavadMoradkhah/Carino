import validateObjectId from '../middleware/validate-objectId';
import { getAllCars, getCarByID, createCar, updateCar, deleteCar } from '../controllers/cars';
import auth from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.get('/', getAllCars);

router.get('/:id', validateObjectId, getCarByID);

router.post('/', auth, createCar);

router.put('/:id', auth, validateObjectId, updateCar);

router.delete('/:id', auth, validateObjectId, deleteCar);

export default router;
