const parsePath = (filePath: string): string => {
  return filePath.replace(/\\/g, '/');
};

const transformMulterFiles = (files: Express.Multer.File[]): string[] => {
  return files.map((file) => parsePath(file.path));
};

const generateUniqueFileName = (file: Express.Multer.File): string => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const mimeType = file.mimetype.split('/')[1];
  const fileName = `${uniqueSuffix}.${mimeType}`;
  return fileName;
};

export { parsePath, generateUniqueFileName, transformMulterFiles };
