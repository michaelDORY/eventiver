const { DataTypes } = require('sequelize')

const { sequelize } = require('../../db.js')

const Category = sequelize.define('category', {
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
})

module.exports = Category
