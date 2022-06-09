"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.configuration();
        this.routes();
    }
    configuration() {
        this.app.set('port', process.env.PORT || 3000);
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.send("Hello World");
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is Listening ${this.app.get('port')}port.`);
        });
    }
}
const server = new Server();
server.start();
