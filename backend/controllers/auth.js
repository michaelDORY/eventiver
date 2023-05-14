const bcrypt = require('bcrypt')
require('dotenv').config()
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError.js')
const {
  UserModel,
  FoodProviderModel,
  ManagerModel,
  GuestModel,
} = require('../models/index.js')
const { USER_ROLES } = require('../constants.js')

const register = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(ApiError.badRequest(errors.array()))

  const {
    email,
    password,
    name,
    avatarUrl,
    role: originCaseRole,
    managerInfo,
    guestInfo,
  } = req.body
  const role = originCaseRole?.toLowerCase()

  if (!!role && !Object.values(USER_ROLES).includes(role)) {
    return next(ApiError.badRequest([], 'Incorrect role'))
  }

  if (
    role === USER_ROLES.admin &&
    req.body?.chiefKey !== process.env.CHIEF_ADMIN_PASSWORD
  ) {
    return next(ApiError.forbidden())
  }

  try {
    const suchUser = await UserModel.findOne({ where: { email } })

    if (suchUser) {
      return next(
        ApiError.badRequest([], 'User with such email already exists')
      )
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    const newUserBody = {
      name,
      email,
      passwordHash,
      role,
      avatarUrl: avatarUrl || null,
    }

    let createdUser = null

    switch (role) {
      case USER_ROLES.foodProvider:
        createdUser = await UserModel.create(
          { ...newUserBody, foodProvider: {} },
          {
            include: [FoodProviderModel],
          }
        )
        break
      case USER_ROLES.manager:
        createdUser = await UserModel.create(
          { ...newUserBody, manager: managerInfo },
          { include: [ManagerModel] }
        )
        break
      case USER_ROLES.guest:
        createdUser = await UserModel.create(
          { ...newUserBody, guest: guestInfo },
          { include: [GuestModel] }
        )
        break
    }

    if (!createdUser) return next(ApiError.badRequest())

    const token = jwt.sign(
      { _id: createdUser.dataValues.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    )

    const userData = createdUser.dataValues

    if (userData?.passwordHash) {
      delete userData.passwordHash
    }

    return res.json({ ...userData, token })
  } catch (e) {
    console.error(e)
    return next(ApiError.badRequest())
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({
    where: { email },
  })
  if (!user) return next(ApiError.notFound([], 'Incorrect Email or password'))

  const { dataValues: userDataValues } = user

  const isPasswordValid = await bcrypt.compare(
    password,
    userDataValues.passwordHash
  )
  if (!isPasswordValid)
    return next(ApiError.notFound([], 'Incorrect email or password'))

  const token = jwt.sign({ _id: userDataValues.id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  const userData = user.dataValues

  if (userData?.passwordHash) {
    delete userData.passwordHash
  }

  return res.json({ ...userData, token })
}

const getInfo = async (req, res, next) => {
  const {
    dataValues: { role: userRole },
  } =
    (await UserModel.findOne({
      where: { id: req.userId },
      attributes: { include: ['role'] },
    })) ?? {}

  const roleModelMap = {
    guest: GuestModel,
    manager: ManagerModel,
    'food-provider': FoodProviderModel,
  }

  const user = await UserModel.findOne({
    where: {
      id: req.userId,
    },
    include: [
      {
        model: roleModelMap[userRole],
      },
    ],
  })
  if (!user) return next(ApiError.unauthorized())

  const userData = user.dataValues

  if (userData?.passwordHash) {
    delete userData.passwordHash
  }

  return res.json(userData)
}

module.exports = { register, login, getInfo }
