import sequelize from "../dbconfig/dbconnector";
const { Sequelize, DataTypes } = require('sequelize');


const Wallet = sequelize.define('wallet', {
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
},{
  tableName: 't_wallet',
  timestamps: false
});

export default Wallet