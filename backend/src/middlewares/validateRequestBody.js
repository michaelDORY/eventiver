const { validationResult } = require('express-validator')
const ApiError = require('../utils/ApiError')

const validateRequestBody = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(ApiError.badRequest(errors.array()))
  }
  next()
}

module.exports = validateRequestBody
