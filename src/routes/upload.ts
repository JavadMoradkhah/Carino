import carsStorage from '../config/cars-storage';
import { transformMulterFiles } from '../utils/file-name-parser';
import { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();
const upload = carsStorage.array('images', 6);

router.post('/carImages', (req: Request, res: Response) => {
  upload(req, res, function (err): Response | void {
    if (err) {
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          return res.status(400).send({ status: 'BadRequest', message: 'Files bigger than 2MB are not allowed.' });
        case 'LIMIT_UNEXPECTED_FILE':
          return res
            .status(400)
            .send({ status: 'BadRequest', message: 'You cannot upload more than 6 images for each car.' });
        default:
          return res.status(500).send({ status: 'Error', message: err.message });
      }
    }

    if (!req.files) {
      return res.status(500).send({ status: 'Error', message: 'Something failed during uploading files' });
    }

    const files = Array.isArray(req.files) ? req.files : req.files.images;

    res
      .status(200)
      .send({ status: 'OK', message: 'Files uploaded successfully.', result: transformMulterFiles(files) });
  });
});

export default router;
