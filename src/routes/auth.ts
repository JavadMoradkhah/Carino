import { registerUser, loginUser, sendVerificationEmail } from '../controllers/auth';
import { Router } from 'express';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/sendVerificationEmail', sendVerificationEmail);

export default router;
