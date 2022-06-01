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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserQuery_1 = __importDefault(require("../query/UserQuery"));
const atob_1 = __importDefault(require("atob"));
const btoa_1 = __importDefault(require("btoa"));
const crypto_js_1 = __importDefault(require("crypto-js"));
require("dotenv/config");
const connectRedis_1 = __importDefault(require("../redis/connectRedis"));
class UserService {
    registUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // encrypt password using btoa
            const password = req.body.password;
            const pass_btoa = (0, btoa_1.default)(password);
            //decrypt password using atob
            const pass_atob = (0, atob_1.default)(pass_btoa);
            // encrypt pass_atob using crypt-js
            const cipherpass = crypto_js_1.default.AES.encrypt(pass_atob, process.env.ACCESS_TOKEN_KEY_CRYPTO).toString();
            //connect to db and querying
            const client = yield dbconnector_1.default.connect();
            const resultQuery = yield UserQuery_1.default.registUser(client, req, cipherpass);
            client.release();
            if (resultQuery.rowCount > 0) {
                res.status(200).json({
                    status: 'OK',
                    message: 'User Registration successful',
                });
            }
            else {
                res.status(500).json({
                    status: 'NOK',
                    message: 'User Registration fail'
                });
            }
        });
    }
    LoginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // encrypt password using btoa
            const password = req.body.password;
            const pass_btoa = (0, btoa_1.default)(password);
            //decrypt password using atob
            const pass_atob = (0, atob_1.default)(pass_btoa);
            //connect to db and querying
            const client = yield dbconnector_1.default.connect();
            const resultQuery = yield UserQuery_1.default.loginUser(client, req);
            client.release();
            if (resultQuery.rowCount > 0) {
                const decryptedText = crypto_js_1.default.AES.decrypt(resultQuery.rows[0].password, process.env.ACCESS_TOKEN_KEY_CRYPTO).toString(crypto_js_1.default.enc.Utf8);
                if (decryptedText == pass_atob) {
                    const token = jsonwebtoken_1.default.sign({ resultQuery }, process.env.ACCESS_TOKEN_KEY_JWT, { expiresIn: "2h", });
                    const userID = resultQuery.rows[0].id.toString();
                    connectRedis_1.default.SET(token, "1");
                    connectRedis_1.default.expire(token, 7200);
                    res.status(200).json({
                        status: 'OK',
                        message: 'User login successful',
                        token: token
                    });
                }
            }
            else {
                res.status(500).json({
                    status: 'NOK',
                    message: 'User login fail',
                    data: req.body
                });
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map