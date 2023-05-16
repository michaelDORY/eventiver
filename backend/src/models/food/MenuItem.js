const { DataTypes } = require('sequelize')

const { sequelize } = require('../../config/db.js')
const { CURRENCY } = require('../../constants.js')

const MenuItem = sequelize.define('menuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  priceValue: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  currency: {
    type: DataTypes.ENUM(...Object.values(CURRENCY)),
    allowNull: false,
    defaultValue: CURRENCY.usd,
  },
  unit: {
    type: DataTypes.STRING,
  },
  imageUrls: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
})

module.exports = MenuItem
