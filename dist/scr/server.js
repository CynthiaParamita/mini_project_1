"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const WalletRouter_1 = __importDefault(require("./route/WalletRouter"));
const UserRouter_1 = __importDefault(require("./route/UserRouter"));
const dbconnector_1 = __importDefault(require("./dbconfig/dbconnector"));
require("dotenv/config");
class Server {
    constructor() {
        this.start = (port) => {
            return new Promise((resolve, reject) => {
                this.app.listen(port, () => {
                    resolve(port);
                }).on('error', (err) => reject(err));
            });
        };
        this.app = (0, express_1.default)();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }
    config() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json({ limit: '1mb' })); // 100kb default
    }
    dbConnect() {
        dbconnector_1.default.connect(function (err, client, done) {
            if (err) {
                console.error(err);
            }
            console.log('Connected');
        });
    }
    routerConfig() {
        this.app.get("/", (req, res) => {
            res.send("Hello World");
        });
        this.app.use('/wallet', WalletRouter_1.default);
        this.app.use('/user', UserRouter_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map