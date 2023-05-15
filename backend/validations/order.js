const { body } = require('express-validator')
const { validateRequestBody } = require('../middlewares')
const {ORDER_STATUSES} = require("../constants");

const createOrderValidation = [
	body('orderItems', 'Invalid order items').isArray({ min: 1 }),
	body('orderItems.*', 'Invalid order items')
		.isObject({
			menuItemId: body('menuItemId', 'Invalid menu item id').isNumeric(),
			quantity: body('quantity', 'Invalid quantity').isNumeric(),
		}),
	body('eventId', 'Invalid event id').isNumeric(),
	validateRequestBody,
]

const updateOrderValidation = [
	body('orderItems', 'Invalid order items').optional().isArray({ min: 1 }),
	body('orderItems.*', 'Invalid order items')
		.isObject({
			menuItemId: body('menuItemId', 'Invalid menu item id').isNumeric(),
			quantity: body('quantity', 'Invalid quantity').isNumeric(),
		}),
	body('eventId', 'Invalid event id').optional().isNumeric(),
	body('status', 'Invalid status').optional().toLowerCase().isIn(Object.values(ORDER_STATUSES)),
	validateRequestBody,
]

module.exports = { createOrderValidation, updateOrderValidation }
