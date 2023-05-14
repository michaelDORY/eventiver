const { DataTypes } = require('sequelize')

const { sequelize } = require('../db.js')
const { USER_ROLES } = require('../constants.js')

const User = sequelize.define(
  'user',
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(USER_ROLES)),
      allowNull: false,
    },
    avatarUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = User
