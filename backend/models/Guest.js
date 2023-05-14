const { DataTypes } = require('sequelize')

const { sequelize } = require('../db.js')

const Guest = sequelize.define('guest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.TEXT,
  },
})

module.exports = Guest
