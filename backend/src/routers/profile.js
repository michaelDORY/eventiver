const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.js')
const { updateProfileValidation } = require('../validations/profile')
const { ProfileController } = require('../controllers')
const { rolesMiddleware } = require('../middlewares')
const { USER_ROLES } = require('../constants')

const ProfileRouter = new Router()

ProfileRouter.put(
  '/',
  authMiddleware,
  rolesMiddleware(Object.values(USER_ROLES)),
  updateProfileValidation,
  ProfileController.updateProfile
)

module.exports = ProfileRouter
