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
const dbconnector_1 = __importDefault(require("../dbconfig/dbconnector"));
const WalletQuery_1 = __importDefault(require("../query/WalletQuery"));
class WalletService {
    getAllWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield dbconnector_1.default.connect();
            const resultQuery = yield WalletQuery_1.default.getAllWallet(client);
            client.release();
            if (resultQuery.rowCount > 0) {
                const result = resultQuery.rows;
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
            const client = yield dbconnector_1.default.connect();
            const resultQuery = yield WalletQuery_1.default.insertWalletData(client, req);
            client.release();
            if (resultQuery.rowCount > 0) {
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
            const client = yield dbconnector_1.default.connect();
            const resultQuery = yield WalletQuery_1.default.updateWalletData(client, req);
            console.log(resultQuery);
            client.release();
            if (resultQuery.rowCount > 0) {
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
}
exports.default = WalletService;
//# sourceMappingURL=WalletService.js.map