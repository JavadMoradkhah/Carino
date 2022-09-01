import { registerUser, loginUser, sendVerificationEmail, verifyEmail } from '../controllers/auth';
import { Router } from 'express';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/sendVerificationEmail', sendVerificationEmail);

router.post('/verifyEmail', verifyEmail);

export default router;
