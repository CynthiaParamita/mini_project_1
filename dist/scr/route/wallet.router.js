"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTemplate = void 0;
const express_1 = __importStar(require("express"));
exports.routerTemplate = express_1.default.Router();
const wallet_controller_1 = __importDefault(require("../controller/wallet.controller"));
const router = (0, express_1.Router)();
const walletController = new wallet_controller_1.default();
const middleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization === 'CYNTHIA') {
        next();
    }
    else {
        res.status(401).json({
            status: 'NOK',
            message: 'User not authorized'
        });
    }
};
router.get('/get/all', middleware, walletController.getWallet);
router.post('/insert', middleware, walletController.insertWallet);
router.post('/update', middleware, walletController.updateWallet);
router.get('/get/detail/:id', middleware, walletController.getWalletbyID);
exports.default = router;
//# sourceMappingURL=wallet.router.js.map