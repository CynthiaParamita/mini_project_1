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
const connectRedis_1 = __importDefault(require("../redis/connectRedis"));
class middleware {
    MiddleWare(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers.authorization;
            const result = connectRedis_1.default.exists(authorization);
            result.then(function (result) {
                if (result === 1) {
                    next();
                }
                else {
                    res.status(401).json({
                        status: 'NOK',
                        message: 'User not authorized'
                    });
                }
            });
        });
    }
}
exports.default = middleware;
//# sourceMappingURL=middleware.js.map