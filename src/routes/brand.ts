import { getAllBrands, getBrandByID, createBrand, updateBrand, deleteBrand } from '../controllers/brand';
import { Router } from 'express';

const router = Router();

router.get('/', getAllBrands);

router.get('/:id', getBrandByID);

router.post('/', createBrand);

router.put('/:id', updateBrand);

router.delete('/:id', deleteBrand);

export default router;
