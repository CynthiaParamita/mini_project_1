import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import walletRouter from './route/WalletRouter';
import userRouter from './route/UserRouter';
import Sequelize from './dbconfig/dbconnector';
import 'dotenv/config'
import redis=require('redis')
import sequelize = require('sequelize')


class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();   
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
    }

    async dbConnect() {
        try {
            await Sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }
    
    private routerConfig() {
        this.app.get("/", (req, res) => {
            res.send("Hello World");
        });
        this.app.use('/wallet', walletRouter);
        this.app.use('/user',userRouter)
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;