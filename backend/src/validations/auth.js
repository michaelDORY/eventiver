const { body } = require('express-validator')
const { USER_ROLES } = require('../constants.js')
const { validateRequestBody } = require('../middlewares')

const registerValidation = [
  body('email', 'Enter correct email').isEmail(),
  body('password', 'Password should have at least 6 symbols')
    .isString()
    .isLength({ min: 6 }),
  body('name', 'Name should consist of at least 3 letters')
    .isString()
    .isLength({ min: 3 }),
  body('role', 'Enter correct role')
    .optional()
    .toLowerCase()
    .isIn(Object.values(USER_ROLES)),
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
  validateRequestBody,
]

module.exports = { registerValidation }
