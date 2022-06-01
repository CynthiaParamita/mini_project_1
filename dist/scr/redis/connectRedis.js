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
const redis = require('redis');
const redisClient = redis.createClient({
    url: 'redis://default:QidLNTtafbKcy02BnfUZq2rnKNVbfVIM@redis-14766.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:14766'
});
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
        console.log('Redis client connected...');
    }
    catch (err) {
        console.log(err.message);
        setTimeout(connectRedis, 5000);
    }
});
connectRedis();
redisClient.on('error', (err) => console.log(err));
exports.default = redisClient;
//# sourceMappingURL=connectRedis.js.map