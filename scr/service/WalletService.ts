import pool from '../dbconfig/dbconnector';
import express, {Request, Response} from 'express';
import WalletQuery from '../query/WalletQuery';

class WalletService {
    async getAllWallet(req: Request, res: Response) {
        const client = await pool.connect();
        const resultQuery: any = await WalletQuery.getAllWallet(client);
        client.release();

        if (resultQuery.rowCount > 0) {
            const result: any = resultQuery.rows;
            res.status(200).json({
                status: 'OK',
                message: 'Wallet is retrieved successfully',
                data: result
            });
        } else {
            res.status(200).json({
                status: 'NOK',
                message: 'Wallet is empty'
            });
        }
    }
    async insertAllWallet(req: Request, res: Response) {
        const client = await pool.connect();
        const resultQuery: any = await WalletQuery.insertWalletData(client,req);
        client.release();

        if (resultQuery.rowCount > 0) {
            res.status(200).json({
                status: 'OK',
                message: 'Data input successful',
            });
        } else {
            res.status(500).json({
                status: 'NOK',
                message: 'Data input fail'
            });
        }
    }
    async updateAllWallet(req: Request, res: Response) {
        const client = await pool.connect();
        const resultQuery: any = await WalletQuery.updateWalletData(client,req);
        client.release();

        if (resultQuery.rowCount > 0) {
            res.status(200).json({
                status: 'OK',
                message: 'Data update successful',
            });
        } else {
            res.status(500).json({
                status: 'NOK',
                message: 'Data update fail'
            });
        }
    }
    async getWalletbyID(req: Request, res: Response) {
        const client = await pool.connect();
        const resultQuery: any = await WalletQuery.getWalletById(client,req);
        client.release();

        if (resultQuery.rowCount > 0) {
            const result: any = resultQuery.rows;
            res.status(200).json({
                status: 'OK',
                message: 'Wallet is retrieved successfully',
                data: result
            });
        } else {
            res.status(200).json({
                status: 'NOK',
                message: 'Wallet is empty'
            });
        }
    }
}

export default WalletService;