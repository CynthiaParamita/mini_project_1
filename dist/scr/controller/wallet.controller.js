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
const joi_1 = __importDefault(require("joi"));
const WalletService_1 = __importDefault(require("../service/WalletService"));
class WalletController {
    getWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const walletService = new WalletService_1.default();
                yield walletService.getAllWallet(req, res);
            }
            catch (error) {
                console.log('[WalletController][getWallet]', error);
                res.status(500).json({
                    status: 'NOK',
                    message: 'Server error'
                });
            }
        });
    }
    insertWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                income: joi_1.default.number().required(),
                expenses: joi_1.default.number().required()
            });
            try {
                const Result = schema.validate(req.body);
                if (Result.error == null) {
                    const walletService = new WalletService_1.default();
                    yield walletService.insertAllWallet(req, res);
                }
                else {
                    res.status(400).json({
                        status: 'NOK',
                        message: 'Invalid request body',
                    });
                }
            }
            catch (error) {
                console.log('[WalletController][getWallet]', error);
                res.status(500).json({
                    status: 'NOK',
                    message: 'Server error control'
                });
            }
        });
    }
    updateWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                id: joi_1.default.number().required(),
                income: joi_1.default.number().required(),
                expenses: joi_1.default.number().required()
            });
            try {
                const Result = schema.validate(req.body);
                if (Result.error == null) {
                    const walletService = new WalletService_1.default();
                    yield walletService.updateAllWallet(req, res);
                }
                else {
                    res.status(400).json({
                        status: 'NOK',
                        message: 'Invalid request body'
                    });
                }
            }
            catch (error) {
                console.log('[WalletController][getWallet]', error);
                res.status(500).json({
                    status: 'NOK',
                    message: 'Server error'
                });
            }
        });
    }
    getWalletbyID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const walletService = new WalletService_1.default();
                yield walletService.getWalletbyID(req, res);
            }
            catch (error) {
                console.log('[WalletController][getWallet]', error);
                res.status(500).json({
                    status: 'NOK',
                    message: 'Server error',
                    data: req.params.id
                });
            }
        });
    }
}
exports.default = WalletController;
//# sourceMappingURL=wallet.controller.js.map