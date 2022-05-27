import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import walletRouter from './route/WalletRouter';
import userRouter from './route/UserRouter';
import pool from './dbconfig/dbconnector';

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

    private dbConnect() {
        pool.connect(function (err, client, done) {
            if (err) {console.error(err);}
            console.log('Connected');
          }); 
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