const { body } = require('express-validator')
const { validateRequestBody } = require('../middlewares')

const updateProfileValidation = [
	body('name', 'Name should consist of at least 3 letters')
		.optional()
		.isString()
		.isLength({ min: 3 }),
	body('managerInfo', 'Enter correct manager info')
		.optional()
		.isObject({
			info: body('info', 'Enter correct info').optional().isString(),
			phone: body('phone', 'Enter correct phone').optional().isString(),
		}),
	body('guestInfo', 'Enter correct guest info')
		.optional()
		.isObject({
			phone: body('phone', 'Enter correct phone').optional().isString(),
			address: body('address', 'Enter correct address').optional().isString(),
			notes: body('notes', 'Enter correct notes').optional().isString(),
		}),
	body('chiefKey', 'Enter correct chief key').optional().isString(),
	body('avatarUrl', 'Enter correct avatar url').optional().isString(),
	validateRequestBody,
]

module.exports = { updateProfileValidation }
