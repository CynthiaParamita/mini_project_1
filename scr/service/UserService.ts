import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import UserQuery from '../query/UserQuery';
import atob from 'atob'
import btoa from 'btoa'
import CryptoJS from 'crypto-js'
import { Cipher } from 'crypto';
import 'dotenv/config'
import redisClient from "../redis/connectRedis"
import User from '../model/UserModel'

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
        const { full_name, email}: any = req.body
        const newUser = await User.create({ full_name:full_name , email: email ,password:cipherpass});

        if (newUser.full_name===full_name) {
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
        const users=await User.findAll({
            where: {
              email: req.body.email
            }
          });
        const len= JSON.stringify(users, null, 2).length

        if (len>3) {
            const result=JSON.parse(JSON.stringify(users, null, 2))
            const decryptedText  = CryptoJS.AES.decrypt(result[0].password, process.env.ACCESS_TOKEN_KEY_CRYPTO).toString(CryptoJS.enc.Utf8);
            if (decryptedText == pass_atob){ 
                const token : string = jwt.sign({result},process.env.ACCESS_TOKEN_KEY_JWT,{expiresIn: "2h",})
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