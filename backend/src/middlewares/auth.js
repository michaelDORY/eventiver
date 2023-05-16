const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError.js')

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) return next(ApiError.forbidden())

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded._id
    return next()
  } catch (e) {
    return next(ApiError.forbidden())
  }
}

module.exports = authMiddleware
