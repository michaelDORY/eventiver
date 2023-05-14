const { DataTypes } = require('sequelize')

const { sequelize } = require('../../db.js')

const FoodProvider = sequelize.define('foodProvider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
})

module.exports = FoodProvider
