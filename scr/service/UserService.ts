import pool from '../dbconfig/dbconnector';
import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import UserQuery from '../query/UserQuery';
import atob from 'atob'
import btoa from 'btoa'
import CryptoJS from 'crypto-js'
import { Cipher } from 'crypto';
import 'dotenv/config'
import redisClient from "../redis/connectRedis"

class UserService {
    async registUser(req: Request, res: Response) {
        // encrypt password using btoa
        const password: string = req.body.password
        const pass_btoa: string = btoa(password);

        //decrypt password using atob
        const pass_atob:string = atob(pass_btoa)
       
        // encrypt pass_atob using crypt-js
        const cipherpass = CryptoJS.AES.encrypt(pass_atob, process.env.ACCESS_TOKEN_KEY_CRYPTO).toString()

        //connect to db and querying
        const client = await pool.connect()
        const resultQuery: any = await UserQuery.registUser(client,req,cipherpass)
        client.release()

        if (resultQuery.rowCount > 0) {
            res.status(200).json({
                status: 'OK',
                message: 'User Registration successful',
            });
        } else {
            res.status(500).json({
                status: 'NOK',
                message: 'User Registration fail'
            });
        }
    }

    async LoginUser(req: Request, res: Response) {
        // encrypt password using btoa
        const password: string = req.body.password
        const pass_btoa: string = btoa(password);

        //decrypt password using atob
        const pass_atob:string = atob(pass_btoa)

        //connect to db and querying
        const client = await pool.connect()
        const resultQuery: any = await UserQuery.loginUser(client,req)
        client.release()

        if (resultQuery.rowCount > 0) {
            const decryptedText  = CryptoJS.AES.decrypt(resultQuery.rows[0].password, process.env.ACCESS_TOKEN_KEY_CRYPTO).toString(CryptoJS.enc.Utf8);
            if (decryptedText == pass_atob){ 
                const token : string = jwt.sign({resultQuery},process.env.ACCESS_TOKEN_KEY_JWT,{expiresIn: "2h",})
                const userID: string=resultQuery.rows[0].id.toString()
                redisClient.SET(token,"1")
                redisClient.expire(token,7200)
                res.status(200).json({
                    status: 'OK',
                    message: 'User login successful',
                    token: token
                });
            }
            
        } else {
            res.status(500).json({
                status: 'NOK',
                message: 'User login fail',
                data: req.body
            });
        }
    }


    
}

export default UserService;