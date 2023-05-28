const { body } = require('express-validator')

const { DEVICE_TYPES } = require('../constants.js')
const { validateRequestBody } = require('../middlewares')

const addDeviceValidation = [
  body('name', 'Name should consist of at least 3 letters')
    .isString()
    .isLength({ min: 3 }),
  body('type', 'Enter correct type')
    .toLowerCase()
    .isIn(Object.values(DEVICE_TYPES)),
  validateRequestBody,
]

const addDeviceEventValidation = [
  body('name', 'Name should consist of at least 3 letters')
    .isString()
    .isLength({ min: 3 }),
  body('value', 'Enter correct value').isNumeric(),
  body('unit', 'Enter correct unit').isString(),
  body('location', 'Enter correct location').isString(),
  body('eventId', 'Enter correct event id').optional().isNumeric(),
  validateRequestBody,
]

const addDeviceEventFromAWSValidation = [
  body('name', 'Name should consist of at least 3 letters')
    .isString()
    .isLength({ min: 3 }),
  body('value', 'Enter correct value').isNumeric(),
  body('unit', 'Enter correct unit').isString(),
  body('location', 'Enter correct location').isString(),
  body('eventId', 'Enter correct event id').optional().isNumeric(),
  body('deviceId', 'Enter correct device id').optional().isNumeric(),
  validateRequestBody,
]

module.exports = {
  addDeviceValidation,
  addDeviceEventValidation,
  addDeviceEventFromAWSValidation,
}
