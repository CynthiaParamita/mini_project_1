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
class UserQuery {
    static registUser(client, request, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { full_name, email } = request.body;
            const sql = 'INSERT INTO t_user (full_name, email, password) VALUES ($1, $2, $3)';
            const result = yield client.query(sql, [full_name, email, password]);
            return result;
        });
    }
    static loginUser(client, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = request.body.email.toString();
            const sql = 'SELECT * FROM t_user WHERE email = $1';
            const result = yield client.query(sql, [email]);
            return result;
        });
    }
}
exports.default = UserQuery;
//# sourceMappingURL=UserQuery.js.map