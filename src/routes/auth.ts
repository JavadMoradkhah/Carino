import { registerUser, loginUser } from '../controllers/auth';
import { Router } from 'express';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;
