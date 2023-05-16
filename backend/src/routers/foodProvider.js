const { Router } = require('express')
const { FoodProviderController } = require('../controllers')
const { authMiddleware, rolesMiddleware } = require('../middlewares')
const { USER_ROLES } = require('../constants.js')

const FoodProviderRouter = new Router()

FoodProviderRouter.get(
  '/popular',
  authMiddleware,
  rolesMiddleware(Object.values(USER_ROLES)),
  FoodProviderController.getTopFoodProviders
)

module.exports = FoodProviderRouter
