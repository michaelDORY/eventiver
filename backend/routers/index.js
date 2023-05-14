const AuthRouter = require('./auth.js')
const DeviceRouter = require('./device.js')
const EventRouter = require('./event.js')
const FoodRouter = require('./food.js')
const FileRouter = require('./file.js')

module.exports = (app) => {
  app.use('/auth', AuthRouter)
  app.use('/device', DeviceRouter)
  app.use('/event', EventRouter)
  app.use('/food', FoodRouter)
  app.use('/upload', FileRouter)
}
