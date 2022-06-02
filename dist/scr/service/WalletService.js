"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WalletModel_1 = __importDefault(require("../model/WalletModel"));
class WalletService {
    getAllWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield WalletModel_1.default.findAll();
            const len = JSON.stringify(users, null, 2).length;
            if (len > 3) {
                const result = JSON.parse(JSON.stringify(users, null, 2));
                res.status(200).json({
                    status: 'OK',
                    message: 'Wallet is retrieved successfully',
                    data: result
                });
            }
            else {
                res.status(200).json({
                    status: 'NOK',
                    message: 'Wallet is empty'
                });
            }
        });
    }
    insertAllWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { income, expenses } = req.body;
            const newWallet = yield WalletModel_1.default.create({ income: income, expenses: expenses });
            if (newWallet.income = income) {
                res.status(200).json({
                    status: 'OK',
                    message: 'Data input successful',
                });
            }
            else {
                res.status(500).json({
                    status: 'NOK',
                    message: 'Data input fail'
                });
            }
        });
    }
    updateAllWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, income, expenses } = req.body;
            const updateWallet = yield WalletModel_1.default.update({ income: income, expenses: expenses }, {
                where: {
                    id: id
                }
            });
            if (updateWallet.income = income) {
                res.status(200).json({
                    status: 'OK',
                    message: 'Data update successful',
                });
            }
            else {
                res.status(500).json({
                    status: 'NOK',
                    message: 'Data update fail'
                });
            }
        });
    }
    getWalletbyID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletId = yield WalletModel_1.default.findAll({
                where: {
                    id: req.params.id
                }
            });
            const len = JSON.stringify(walletId, null, 2).length;
            if (len > 3) {
                const result = JSON.parse(JSON.stringify(walletId, null, 2));
                res.status(200).json({
                    status: 'OK',
                    message: 'Wallet is retrieved successfully',
                    data: result
                });
            }
            else {
                res.status(200).json({
                    status: 'NOK',
                    message: 'Wallet is empty'
                });
            }
        });
    }
}
exports.default = WalletService;
//# sourceMappingURL=WalletService.js.map