import express from 'express';
import { AuthControllers } from './auth/auth.controller';
import auth from '../Middlewar/auth';

const router = express.Router();

router.post('/auth/register', AuthControllers.SignUp);
router.post('/auth/login', AuthControllers.SignIn);
router.get('/auth/me', auth('user'), AuthControllers.getUserFromDb);
router.get('/auth/admin', auth('admin'), AuthControllers.getAdminFromDb);
router.post('/auth/refresh-token', AuthControllers.refreshToken);

export const AuthRoutes = router;
