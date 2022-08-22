import routes from './startup/routes';
import database from './startup/db';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

database();
routes(app);

app.listen(port, () => {
  console.log(`Server is listening: http://localhost:${port}/api/`);
});
