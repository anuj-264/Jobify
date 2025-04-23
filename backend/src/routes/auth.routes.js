import { Router } from "express";


import { login, logout, register } from "../controllers/auth.controller.js";
import { validateRegisterInput , validateLoginInput} from "../middlewares/validation.middleware.js";


const router = Router();

// Auth routes
router.post('/register', validateRegisterInput,register);
router.post('/login',validateLoginInput, login);
router.get('/logout',logout );


export default router;