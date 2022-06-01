import express, { Router, Request, Response, NextFunction } from 'express';
import { constants } from 'zlib';
export const routerTemplate = express.Router()
import WalletController from '../controller/WalletController';
import redisClient from '../redis/connectRedis'
import Middleware from '../middleware/middleware'

const router = Router();
const walletController = new WalletController();
const middleware=new Middleware()

router.get('/get/all',middleware.MiddleWare, walletController.getWallet);
router.post('/insert',middleware.MiddleWare, walletController.insertWallet);
router.post('/update',middleware.MiddleWare, walletController.updateWallet);
router.get('/get/detail/:id',middleware.MiddleWare,walletController.getWalletbyID);

export default router;