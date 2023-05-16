const { DataTypes } = require('sequelize')

const { sequelize } = require('../../config/db.js')

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
})

module.exports = OrderItem
