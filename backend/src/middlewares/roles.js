const {
  UserModel,
  GuestModel,
  ManagerModel,
  FoodProviderModel,
} = require('../models')
const { USER_ROLES } = require('../constants')
const ApiError = require('../utils/ApiError')

const rolesMiddleware = (roles) => async (req, res, next) => {
  const { userId } = req

  try {
    const realRole = (
      await UserModel.findOne({
        where: { id: userId },
        attributes: { include: ['role'] },
      })
    )?.dataValues.role

    if (roles.includes(realRole)) {
      switch (realRole) {
        case USER_ROLES.guest:
          req.guestId = (
            await GuestModel.findOne({
              where: { userId },
              attributes: { include: ['id'] },
            })
          )?.dataValues.id
          break
        case USER_ROLES.manager:
          req.managerId = (
            await ManagerModel.findOne({
              where: { userId },
              attributes: { include: ['id'] },
            })
          )?.dataValues.id
          break
        case USER_ROLES.foodProvider:
          req.foodProviderId = (
            await FoodProviderModel.findOne({
              where: { userId },
              attributes: { include: ['id'] },
            })
          )?.dataValues.id
          break
        case USER_ROLES.admin:
          req.adminId = userId
          break
      }
      return next()
    }

    next(ApiError.forbidden())
  } catch (e) {
    return next(ApiError.forbidden())
  }
}

module.exports = rolesMiddleware
