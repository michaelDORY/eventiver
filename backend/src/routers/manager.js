const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.js')
const { addOneRatingValidation } = require('../validations/manager')
const { ManagerController } = require('../controllers')
const { rolesMiddleware } = require('../middlewares')
const { USER_ROLES } = require('../constants')

const ProfileRouter = new Router()

ProfileRouter.get(
  '/',
  authMiddleware,
  rolesMiddleware([USER_ROLES.admin]),
  ManagerController.getManagersInfo
)

ProfileRouter.get(
  '/:managerId',
  authMiddleware,
  rolesMiddleware([USER_ROLES.admin]),
  ManagerController.getManagerInfo
)

ProfileRouter.post(
  '/:managerId/rate',
  authMiddleware,
  rolesMiddleware([USER_ROLES.guest]),
  addOneRatingValidation,
  ManagerController.addOneRatingFromGuestToManager
)

module.exports = ProfileRouter
