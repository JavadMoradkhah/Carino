import { Router } from 'express';

const router = Router();

router.get('/api', (req, res) => {
  res.send('Hello World');
});

export default router;
