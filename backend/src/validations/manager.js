const { body } = require('express-validator')
const { validateRequestBody } = require('../middlewares')

const addOneRatingValidation = [
  body('rating', 'Rating should be a number').isNumeric({ min: 1, max: 5 }),
  body('comment', 'Comment should be a string').optional().isString(),
  validateRequestBody,
]

module.exports = { addOneRatingValidation }
