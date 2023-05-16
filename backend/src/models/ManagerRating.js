const { DataTypes } = require('sequelize')

const { sequelize } = require('../config/db.js')

const ManagerRating = sequelize.define('managerRating', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
})

module.exports = ManagerRating
