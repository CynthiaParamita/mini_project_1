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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const atob_1 = __importDefault(require("atob"));
const btoa_1 = __importDefault(require("btoa"));
const crypto_js_1 = __importDefault(require("crypto-js"));
require("dotenv/config");
const connectRedis_1 = __importDefault(require("../redis/connectRedis"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
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
            const { full_name, email } = req.body;
            const newUser = yield UserModel_1.default.create({ full_name: full_name, email: email, password: cipherpass });
            if (newUser.full_name === full_name) {
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
            const users = yield UserModel_1.default.findAll({
                where: {
                    email: req.body.email
                }
            });
            const len = JSON.stringify(users, null, 2).length;
            if (len > 3) {
                const result = JSON.parse(JSON.stringify(users, null, 2));
                const decryptedText = crypto_js_1.default.AES.decrypt(result[0].password, process.env.ACCESS_TOKEN_KEY_CRYPTO).toString(crypto_js_1.default.enc.Utf8);
                if (decryptedText == pass_atob) {
                    const token = jsonwebtoken_1.default.sign({ result }, process.env.ACCESS_TOKEN_KEY_JWT, { expiresIn: "2h", });
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