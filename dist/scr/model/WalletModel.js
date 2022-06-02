"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnector_1 = __importDefault(require("../dbconfig/dbconnector"));
const { Sequelize, DataTypes } = require('sequelize');
const Wallet = dbconnector_1.default.define('wallet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    income: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expenses: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 't_wallet',
    timestamps: false
});
exports.default = Wallet;
//# sourceMappingURL=WalletModel.js.map