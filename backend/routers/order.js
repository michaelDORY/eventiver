const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.js')
const { createOrderValidation, updateOrderValidation } = require('../validations/order')
const { OrderController } = require('../controllers')
const { rolesMiddleware } = require('../middlewares')
const { USER_ROLES } = require('../constants')

const OrderRouter = new Router()

OrderRouter.post(
	'/',
	authMiddleware,
	rolesMiddleware([USER_ROLES.manager]),
	createOrderValidation,
	OrderController.createOrder
)

OrderRouter.put(
	'/:orderId',
	authMiddleware,
	rolesMiddleware([USER_ROLES.manager, USER_ROLES.foodProvider]),
	updateOrderValidation,
	OrderController.updateOrder
)

module.exports = OrderRouter
