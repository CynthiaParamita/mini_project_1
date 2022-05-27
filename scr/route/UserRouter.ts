import express, { Router, Request, Response, NextFunction } from 'express';
import { constants } from 'zlib';
export const routerTemplate = express.Router()
import UserController from '../controller/UserController';

const router = Router();
const userController = new UserController();

// const middleware: any = (req: Request, res: Response, next: NextFunction) => {
//     const authorization: string = req.headers.authorization;
//     if(authorization === 'CYNTHIA'){
//         next();
//     } else {
//         res.status(401).json({
//             status: 'NOK',
//             message: 'User not authorized'
//         });
//     }
// }

router.post('/register', userController.RegistUser);
router.post('/login', userController.LoginUser);

export default router;