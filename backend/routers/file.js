const { Router } = require('express')
const { FileController } = require('../controllers/index.js')
const { authMiddleware, rolesMiddleware } = require('../middlewares/index.js')
const { USER_ROLES } = require('../constants.js')
const { uploadFileWithMulter } = require('../multer.js')

const FileRouter = new Router()

FileRouter.post(
  '/menu-item',
  authMiddleware,
  rolesMiddleware([USER_ROLES.foodProvider]),
  uploadFileWithMulter.any('file'),
  FileController.uploadFile
)

FileRouter.post(
  '/user',
  authMiddleware,
  uploadFileWithMulter.single('file'),
  FileController.uploadFile
)

module.exports = FileRouter
