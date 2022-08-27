import { Brand, validate } from '../models/Brand';
import { Request, Response, NextFunction } from 'express';

const getAllBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await Brand.find({});
    res.send(brands);
  } catch (error) {
    next(error);
  }
};

const getBrandByID = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).send({ message: 'The brand not found with the given ID' });
    }

    res.send(brand);
  } catch (error) {
    next(error);
  }
};

const createBrand = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    let brand = await Brand.findOne({ name: req.body.name });

    if (brand) {
      return res.status(400).send({ message: 'The brand already exists with the given name' });
    }

    brand = new Brand({ name: req.body.name });

    await brand.save();

    res.send(brand);
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).send({ message: 'The brand not found with the given ID' });
    }

    if (await Brand.findOne({ name: req.body.name })) {
      return res.status(400).send({ message: 'The brand already exists with the given name' });
    }

    brand.name = req.body.name;

    await brand.save();

    res.send(brand);
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    let brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).send({ message: 'The brand not found with the given ID' });
    }

    await brand.remove();

    res.send(brand);
  } catch (error) {
    next(error);
  }
};

export { getAllBrands, getBrandByID, createBrand, updateBrand, deleteBrand };
