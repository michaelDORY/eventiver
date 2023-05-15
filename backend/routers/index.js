const AuthRouter = require('./auth.js')
const DeviceRouter = require('./device.js')
const EventRouter = require('./event.js')
const FoodRouter = require('./food.js')
const FileRouter = require('./file.js')
const ProfileRouter = require('./profile.js')
const ManagerRouter = require('./manager.js')
const OrderRouter = require('./order.js')

module.exports = (app) => {
  app.use('/auth', AuthRouter)
  app.use('/device', DeviceRouter)
  app.use('/event', EventRouter)
  app.use('/food', FoodRouter)
  app.use('/upload', FileRouter)
  app.use('/profile', ProfileRouter)
  app.use('/manager', ManagerRouter)
  app.use('/order', OrderRouter)
}
