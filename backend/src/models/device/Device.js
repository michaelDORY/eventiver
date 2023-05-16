const { DataTypes } = require('sequelize')

const { sequelize } = require('../../config/db.js')
const { DEVICE_TYPES } = require('../../constants.js')

const Device = sequelize.define(
  'device',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(DEVICE_TYPES)),
      allowNull: false,
    },
  },
  {}
)

module.exports = Device
