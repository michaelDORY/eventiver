const { body } = require('express-validator')
const { validateRequestBody } = require('../middlewares')

const addEventValidation = [
  body('name', 'Name should consist of at least 3 letters')
    .isString()
    .isLength({ min: 3 }),
  body('description', 'Description should consist of at least 3 letters')
    .isString()
    .isLength({ min: 3 }),
  body('date', 'Enter correct date').isISO8601().toDate(),
  body('time', 'Enter correct time').isTime(),
  body('location', 'Enter correct location').isString(),
  body('eventTypeId', 'Enter correct event type id').isNumeric(),
  validateRequestBody,
]

const updateEventValidation = [
  body('name', 'Name should consist of at least 3 letters')
    .optional()
    .isString()
    .isLength({ min: 3 }),
  body('description', 'Description should consist of at least 3 letters')
    .optional()
    .isString()
    .isLength({ min: 3 }),
  body('date', 'Enter correct date').isISO8601().toDate(),
  body('time', 'Enter correct time').optional().isTime(),
  body('location', 'Enter correct location').optional().isString(),
  body('eventTypeId', 'Enter correct event type id').optional().isNumeric(),
  validateRequestBody,
]

module.exports = {
  addEventValidation,
  updateEventValidation,
}
