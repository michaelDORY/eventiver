const { body } = require('express-validator')
const { validateRequestBody } = require('../middlewares')

const uploadFileValidation = [
  body('file', 'File should be a file').notEmpty(),
  validateRequestBody,
]

module.exports = {
  uploadFileValidation,
}
