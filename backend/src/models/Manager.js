const { DataTypes } = require('sequelize')

const { sequelize } = require('../config/db.js')

const Manager = sequelize.define('manager', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  info: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
})

module.exports = Manager
