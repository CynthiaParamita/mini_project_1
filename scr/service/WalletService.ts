import express, {Request, Response} from 'express';
import WalletQuery from '../query/WalletQuery';
import Wallet from '../model/WalletModel'

class WalletService {
    async getAllWallet(req: Request, res: Response) {
        const users = await Wallet.findAll();
        const len= JSON.stringify(users, null, 2).length

        if (len>3) {
            const result: any = JSON.parse(JSON.stringify(users, null, 2))
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
        const { income, expenses}: any = req.body
        const newWallet = await Wallet.create({ income:income , expenses:expenses });
       
        if (newWallet.income=income) {
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
        const { id,income, expenses}: any = req.body
        const updateWallet= await Wallet.update({ income:income,expenses:expenses}, {
            where: {
              id:id
            }
          });

        if (updateWallet.income=income) {
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
        const walletId=await Wallet.findAll({
            where: {
                id: req.params.id
            }
          });
        const len= JSON.stringify(walletId, null, 2).length

        if (len>3) {
            const result: any = JSON.parse(JSON.stringify(walletId, null, 2))
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