const { Router } = require('express')
const { FileController } = require('../controllers')
const { authMiddleware, rolesMiddleware } = require('../middlewares')
const { USER_ROLES } = require('../constants.js')
const { uploadImage } = require('../config/multer.js')

const FileRouter = new Router()

FileRouter.post(
  '/menu-item',
  authMiddleware,
  rolesMiddleware([USER_ROLES.foodProvider]),
  uploadImage.any('file'),
  FileController.uploadFile
)

FileRouter.post(
  '/user',
  authMiddleware,
  uploadImage.array('file'),
  FileController.uploadFile
)

module.exports = FileRouter
