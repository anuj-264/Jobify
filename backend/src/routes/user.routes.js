import { Router } from 'express';
const router = Router();


import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/user.controller.js';
import { validateUpdateUserInput } from '../middlewares/validation.middleware.js';
import { authorizePermissions } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [authorizePermissions('admin'),getApplicationStats]);
router.patch('/update-user',upload.single('avatar'),validateUpdateUserInput, updateUser);
export default router;