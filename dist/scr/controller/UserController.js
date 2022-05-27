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
const userService_1 = __importDefault(require("../service/userService"));
class WalletController {
    RegistUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                full_name: joi_1.default.string().required(),
                email: joi_1.default.string().required(),
                password: joi_1.default.string().required()
            });
            try {
                const Result = schema.validate(req.body);
                if (Result.error == null) {
                    const UserService = new userService_1.default();
                    yield UserService.registUser(req, res);
                }
                else {
                    res.status(400).json({
                        status: 'NOK',
                        message: 'Invalid request body',
                    });
                }
            }
            catch (error) {
                console.log('[UserController][RegistUser]', error);
                res.status(500).json({
                    status: 'NOK',
                    message: 'Server error'
                });
            }
        });
    }
    LoginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                email: joi_1.default.string().required(),
                password: joi_1.default.string().required()
            });
            try {
                const Result = schema.validate(req.body);
                if (Result.error == null) {
                    const UserService = new userService_1.default();
                    yield UserService.LoginUser(req, res);
                }
                else {
                    res.status(400).json({
                        status: 'NOK',
                        message: 'Invalid request body',
                    });
                }
            }
            catch (error) {
                console.log('[UserController][loginUser]', error);
                res.status(500).json({
                    status: 'NOK',
                    message: 'Server error'
                });
            }
        });
    }
}
exports.default = WalletController;
//# sourceMappingURL=UserController.js.map