const { Router } = require('express')
const { EventController } = require('../controllers')
const { authMiddleware, rolesMiddleware } = require('../middlewares')
const {
  addEventValidation,
  updateEventValidation,
} = require('../validations/event.js')
const { USER_ROLES } = require('../constants.js')

const EventRouter = new Router()

EventRouter.get(
  '/count',
  authMiddleware,
  rolesMiddleware([USER_ROLES.admin]),
  EventController.getNumberOfEventsPerStatus
)
EventRouter.get(
  '/count-per-period',
  authMiddleware,
  rolesMiddleware([USER_ROLES.admin]),
  EventController.getNumberOfEventPerPeriodOfTime
)

EventRouter.get(
  '/types',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager, USER_ROLES.admin]),
  EventController.getEventTypes
)
EventRouter.get(
  '/',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager, USER_ROLES.admin]),
  EventController.getEvents
)
EventRouter.get(
  '/:eventId',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager, USER_ROLES.admin]),
  EventController.getEvent
)
EventRouter.post(
  '/',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager, USER_ROLES.admin]),
  addEventValidation,
  EventController.createEvent
)
EventRouter.put(
  '/:eventId',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager, USER_ROLES.admin]),
  updateEventValidation,
  EventController.updateEvent
)
EventRouter.delete(
  '/:eventId',
  authMiddleware,
  rolesMiddleware([USER_ROLES.manager, USER_ROLES.admin]),
  EventController.deleteEvent
)

module.exports = EventRouter
