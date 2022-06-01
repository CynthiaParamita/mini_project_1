import express, { Router, Request, Response, NextFunction } from 'express';
import redisClient from '../redis/connectRedis'

class middleware{
    public async MiddleWare(req: Request, res: Response,next: NextFunction) {
        const authorization: string = req.headers.authorization;
        const result=redisClient.exists(authorization)
        result.then(function(result) {
            if(result===1){
                next();
            } else {
                res.status(401).json({
                    status: 'NOK',
                    message: 'User not authorized'
                });
            }
         })
    }
}

export default middleware