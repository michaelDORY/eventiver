const { Router } = require('express')
const { EventController } = require('../controllers/index.js')
const { authMiddleware, rolesMiddleware } = require('../middlewares/index.js')
const {
  addEventValidation,
  updateEventValidation,
} = require('../validations/event.js')
const { USER_ROLES } = require('../constants.js')

const EventRouter = new Router()

EventRouter.get(
  '/',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager]),
  EventController.getEvents
)
EventRouter.get(
  '/:eventId',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager]),
  EventController.getEvent
)
EventRouter.post(
  '/',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager]),
  addEventValidation,
  EventController.createEvent
)
EventRouter.put(
  '/:eventId',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager]),
  updateEventValidation,
  EventController.updateEvent
)
EventRouter.delete(
  '/:eventId',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager]),
  EventController.deleteEvent
)

module.exports = EventRouter
