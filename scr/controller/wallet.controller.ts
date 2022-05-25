import pool from '../dbconfig/dbconnector';
import express, { Request, Response } from 'express';
import Joi from 'joi'

import WalletService from '../service/WalletService';
import { register } from 'ts-node';

class WalletController {
    public async getWallet(req: Request, res: Response) {
        try {
            const walletService: WalletService = new WalletService();
            await walletService.getAllWallet(req, res);
        }catch (error) {
            console.log('[WalletController][getWallet]', error);
            res.status(500).json({
                status: 'NOK',
                message: 'Server error'
            });
        }
    }

    public async insertWallet(req: Request, res: Response){
        const schema = Joi.object().keys({
            income: Joi.number().required(),
            expenses:Joi.number().required()
        });
        try {
            const Result: any = schema.validate(req.body)
            if (Result.error==null) {
                const walletService: WalletService = new WalletService();
                await walletService.insertAllWallet(req, res);
            } else {
                res.status(400).json({
                    status: 'NOK',
                    message: 'Invalid request body',
                });
            }
        } catch (error) {
            console.log('[WalletController][getWallet]', error);
            res.status(500).json({
                status: 'NOK',
                message: 'Server error control'
            });
        }
    }
    
    public async updateWallet(req: Request, res: Response){
        const schema = Joi.object().keys({
            id:Joi.number().required(),
            income: Joi.number().required(),
            expenses:Joi.number().required()
        });
        try {
            const Result: any = schema.validate(req.body)
            if (Result.error==null) {
                const walletService: WalletService = new WalletService();
                await walletService.updateAllWallet(req, res);
            } else {
                res.status(400).json({
                    status: 'NOK',
                    message: 'Invalid request body'
                });
            }
        } catch (error) {
            console.log('[WalletController][getWallet]', error);
            res.status(500).json({
                status: 'NOK',
                message: 'Server error'
            });
        }
    }

    public async getWalletbyID(req: Request, res: Response) {
        try {
            const walletService: WalletService = new WalletService();
            await walletService.getWalletbyID(req, res);
        }catch (error) {
            console.log('[WalletController][getWallet]', error);
            res.status(500).json({
                status: 'NOK',
                message: 'Server error',
            });
        }
    }
}

export default WalletController;