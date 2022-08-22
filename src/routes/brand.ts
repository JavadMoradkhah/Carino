import validateObjectId from '../middleware/validate-objectId';
import { getAllBrands, getBrandByID, createBrand, updateBrand, deleteBrand } from '../controllers/brand';
import { Router } from 'express';

const router = Router();

router.get('/', getAllBrands);

router.get('/:id', validateObjectId, getBrandByID);

router.post('/', createBrand);

router.put('/:id', validateObjectId, updateBrand);

router.delete('/:id', validateObjectId, deleteBrand);

export default router;
