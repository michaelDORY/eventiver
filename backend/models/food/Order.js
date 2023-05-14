const { DataTypes } = require('sequelize')

const { sequelize } = require('../../db.js')
const { ORDER_STATUSES } = require('../../constants.js')

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
  timeCreated: {
    type: DataTypes.DATE,
  },
  timeConfirmed: {
    type: DataTypes.DATE,
  },
})

module.exports = Order
