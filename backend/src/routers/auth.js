const { Router } = require('express')
const { AuthController } = require('../controllers')
const authMiddleware = require('../middlewares/auth.js')
const { registerValidation } = require('../validations/auth')

const AuthRouter = new Router()

AuthRouter.post('/register', registerValidation, AuthController.register)
AuthRouter.post('/login', AuthController.login)
AuthRouter.get('/me', authMiddleware, AuthController.getInfo)

module.exports = AuthRouter
