import { Request } from 'express';
import User from '../types/User';

interface AuthRequest extends Request {
  user?: User;
}

export default AuthRequest;
