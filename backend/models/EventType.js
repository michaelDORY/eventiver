const { DataTypes } = require('sequelize')

const { sequelize } = require('../db.js')

const EventType = sequelize.define('eventType', {
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
})

module.exports = EventType
