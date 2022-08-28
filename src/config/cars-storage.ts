import { generateUniqueFileName } from '../utils/file-name-parser';
import multer from 'multer';
import { mkdir } from 'fs/promises';

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadsPath = './uploads/cars';
    await mkdir(uploadsPath, { recursive: true });
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    cb(null, generateUniqueFileName(file));
  },
});

const limits = { fileSize: 1024 ** 2 * 2 }; /* 2MB */

export default multer({
  storage,
  limits,
  fileFilter: function (req, file, cb) {
    const acceptableMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    if (!acceptableMimeTypes.includes(file.mimetype)) {
      return cb(null, false);
    }
    cb(null, true);
  },
});
