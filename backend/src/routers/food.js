const { Router } = require('express')
const { FoodController } = require('../controllers')
const { authMiddleware, rolesMiddleware } = require('../middlewares')
const {
  addMenuItemValidation,
  updateMenuItemValidation,
} = require('../validations/food.js')
const { USER_ROLES } = require('../constants.js')

const FoodRouter = new Router()

FoodRouter.get(
  '/',
  authMiddleware,
  rolesMiddleware(Object.values(USER_ROLES)),
  FoodController.getMenuItems
)
FoodRouter.get(
  '/:menuItemId',
  authMiddleware,
  rolesMiddleware([USER_ROLES.foodProvider]),
  FoodController.getMenuItem
)
FoodRouter.post(
  '/',
  authMiddleware,
  rolesMiddleware([USER_ROLES.foodProvider]),
  addMenuItemValidation,
  FoodController.createMenuItem
)
FoodRouter.put(
  '/:menuItemId',
  authMiddleware,
  rolesMiddleware([USER_ROLES.foodProvider]),
  updateMenuItemValidation,
  FoodController.updateMenuItem
)
FoodRouter.delete(
  '/:menuItemId',
  authMiddleware,
  rolesMiddleware([USER_ROLES.foodProvider]),
  FoodController.deleteMenuItem
)

module.exports = FoodRouter
