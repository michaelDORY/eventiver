const { Router } = require('express')
const { DeviceController } = require('../controllers')
const { authMiddleware, rolesMiddleware } = require('../middlewares')
const {
  addDeviceValidation,
  addDeviceEventValidation,
} = require('../validations/device')
const { USER_ROLES } = require('../constants.js')

const DeviceRouter = new Router()

DeviceRouter.post(
  '/',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager]),
  addDeviceValidation,
  DeviceController.addDevice
)
DeviceRouter.post(
  '/:deviceId/event',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager]),
  addDeviceEventValidation,
  DeviceController.addDeviceEvent
)

module.exports = DeviceRouter
