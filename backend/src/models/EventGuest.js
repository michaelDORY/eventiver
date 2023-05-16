const { DataTypes } = require('sequelize')

const { sequelize } = require('../config/db.js')

const EventGuest = sequelize.define('eventGuest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
})

module.exports = EventGuest
