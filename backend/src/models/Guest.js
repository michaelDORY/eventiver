const { DataTypes } = require('sequelize')

const { sequelize } = require('../config/db.js')

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
