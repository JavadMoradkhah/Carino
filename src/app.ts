import routes from './startup/routes';
import express from 'express';

const app = express();
const port = 5000;

routes(app);

app.listen(port, () => {
  console.log(`Server is listening: http://localhost:${port}/api/`);
});
