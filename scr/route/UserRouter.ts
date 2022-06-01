import express, { Router, Request, Response, NextFunction } from 'express';
import { constants } from 'zlib';
export const routerTemplate = express.Router()
import UserController from '../controller/UserController';

const router = Router();
const userController = new UserController();

router.post('/register', userController.RegistUser);
router.post('/login', userController.LoginUser);

export default router;