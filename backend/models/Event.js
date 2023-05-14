const { DataTypes } = require('sequelize')

const { sequelize } = require('../db.js')
const { EVENT_STATUSES } = require('../constants.js')

const Event = sequelize.define('event', {
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
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(EVENT_STATUSES)),
    defaultValue: EVENT_STATUSES.planned,
    allowNull: false,
  },
})

module.exports = Event
