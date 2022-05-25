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
Object.defineProperty(exports, "__esModule", { value: true });
class WalletQuery {
    static getAllWallet(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM t_wallet";
            const result = yield client.query(sql);
            return result;
        });
    }
    static insertWalletData(client, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { income, expenses } = request.body;
            const result = yield client.query('INSERT INTO t_wallet (income, expenses) VALUES ($1, $2)', [income, expenses]);
            return result;
        });
    }
    static updateWalletData(client, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, income, expenses } = request.body;
            const sql = 'UPDATE t_wallet SET income = $1, expenses = $2 WHERE id = $3';
            const result = yield client.query(sql, [income, expenses, id]);
            return result;
        });
    }
    static getWalletById(client, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(request.params.id);
            const sql = 'SELECT * FROM t_wallet WHERE id = $1';
            const result = yield client.query(sql, [id]);
            return result;
        });
    }
}
exports.default = WalletQuery;
//# sourceMappingURL=WalletQuery.js.map