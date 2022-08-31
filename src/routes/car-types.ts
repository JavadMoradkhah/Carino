import validateObjectId from '../middleware/validate-objectId';
import { getAllTypes, getTypeByID, createType, updateType, deleteType } from '../controllers/car-types';
import validateCarType from '../middleware/validate-car-type';
import { Router } from 'express';

const router = Router();

router.get('/', getAllTypes);

router.get('/:id', validateObjectId, getTypeByID);

router.post('/', validateCarType(), createType);

router.put('/:id', validateObjectId, validateCarType(), updateType);

router.delete('/:id', validateObjectId, deleteType);

export default router;
