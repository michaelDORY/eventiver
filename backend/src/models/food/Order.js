const { DataTypes } = require('sequelize')

const { sequelize } = require('../../config/db.js')
const { ORDER_STATUSES } = require('../../constants.js')
const { CURRENCY } = require('../../constants')

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(ORDER_STATUSES)),
    defaultValue: ORDER_STATUSES.pending,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.ENUM(...Object.values(CURRENCY)),
    allowNull: false,
    defaultValue: CURRENCY.usd,
  },
  timeConfirmed: {
    type: DataTypes.DATE,
  },
})

module.exports = Order
