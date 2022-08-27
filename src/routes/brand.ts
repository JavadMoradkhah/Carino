import validateObjectId from '../middleware/validate-objectId';
import { getAllBrands, getBrandByID, createBrand, updateBrand, deleteBrand } from '../controllers/brand';
import validateBrand from '../middleware/validate-brand';
import { Router } from 'express';

const router = Router();

router.get('/', getAllBrands);

router.get('/:id', validateObjectId, getBrandByID);

router.post('/', validateBrand(), createBrand);

router.put('/:id', validateObjectId, validateBrand(), updateBrand);

router.delete('/:id', validateObjectId, deleteBrand);

export default router;
