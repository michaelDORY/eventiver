const { body } = require('express-validator')
const { validateRequestBody } = require('../middlewares')
const { CURRENCY } = require('../constants.js')

const addMenuItemValidation = [
  body('name', 'Name should consist of at least 3 letters')
    .isString()
    .isLength({ min: 3 }),
  body('description', 'Description should consist of at least 3 letters')
    .isString()
    .isLength({ min: 3 }),
  body('priceValue', 'Price should be a number').isNumeric({ min: 0 }),
  body('currency', 'Currency should be a string')
    .toLowerCase()
    .isIn(Object.values(CURRENCY)),
  body('unit', 'Unit should be a string').isString(),
  body('imageUrls', 'Image urls should be an array of strings')
    .optional()
    .isArray(),
  body('imageUrls.*', 'Image urls should be an array of strings').isString(),
  body('categoryId', 'Category id should be a number').isNumeric(),
  validateRequestBody,
]

const updateMenuItemValidation = [
  body('name', 'Name should consist of at least 3 letters')
    .optional()
    .isString()
    .isLength({ min: 3 }),
  body('description', 'Description should consist of at least 3 letters')
    .optional()
    .isString()
    .isLength({ min: 3 }),
  body('priceValue', 'Price should be a number')
    .optional()
    .isNumeric({ min: 0 }),
  body('currency', 'Currency should be a string')
    .optional()
    .toLowerCase()
    .isIn(Object.values(CURRENCY)),
  body('unit', 'Unit should be a string').optional().isString(),
  body('imageUrls', 'Image urls should be an array of strings')
    .optional()
    .isArray(),
  body('imageUrls.*', 'Image urls should be an array of strings').isString(),
  body('categoryId', 'Category id should be a number').optional().isNumeric(),
  validateRequestBody,
]

module.exports = {
  addMenuItemValidation,
  updateMenuItemValidation,
}
