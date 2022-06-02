import sequelize from "../dbconfig/dbconnector";
const { Sequelize, DataTypes } = require('sequelize');


const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  tableName: 't_user',
  timestamps: false
});

export default User