import pool from '../dbconfig/dbconnector';
import express, { Request, Response } from 'express';
import Joi from 'joi'

import userService from '../service/userService';
import { register } from 'ts-node';

class WalletController {

    public async RegistUser(req: Request, res: Response){
        const schema = Joi.object().keys({
            full_name: Joi.string().required(),
            email:Joi.string().required(),
            password:Joi.string().required()
        });
        try {
            const Result: any = schema.validate(req.body)
            if (Result.error==null) {
                const UserService: userService = new userService();
                await UserService.registUser(req, res);
            } else {
                res.status(400).json({
                    status: 'NOK',
                    message: 'Invalid request body',
                });
            }
        } catch (error) {
            console.log('[UserController][RegistUser]', error);
            res.status(500).json({
                status: 'NOK',
                message: 'Server error'
            });
        }
    }

    public async LoginUser(req: Request, res: Response){
        const schema = Joi.object().keys({
            email:Joi.string().required(),
            password:Joi.string().required()
        });
        try {
            const Result: any = schema.validate(req.body)
            if (Result.error==null) {
                const UserService: userService = new userService();
                await UserService.LoginUser(req, res);
            } else {
                res.status(400).json({
                    status: 'NOK',
                    message: 'Invalid request body',
                });
            }
        } catch (error) {
            console.log('[UserController][loginUser]', error);
            res.status(500).json({
                status: 'NOK',
                message: 'Server error'
            });
        }
    }
}

export default WalletController;