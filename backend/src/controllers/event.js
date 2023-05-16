const { EventModel, ManagerModel, EventTypeModel } = require('../models')
const { filterNullUndefined } = require('../utils/req')
const ApiError = require('../utils/ApiError')
const { Sequelize } = require('sequelize')

const getEvent = async (req, res, next) => {
  try {
    const event = await EventModel.findOne({
      where: { id: req.params.eventId },
      include: [EventTypeModel],
    })

    return res.json(event.dataValues)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const getEvents = async (req, res, next) => {
  try {
    const events = await EventModel.findAll({
      where: { managerId: req.managerId },
      include: [EventTypeModel],
    })

    return res.json(events.map((event) => event.dataValues))
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const createEvent = async (req, res) => {
  const event = await EventModel.create(
    {
      ...req.body,
      managerId: req.managerId,
    },
    { include: [ManagerModel, EventTypeModel] }
  )

  return res.json(event?.dataValues)
}

const updateEvent = async (req, res, next) => {
  const { eventId } = req.params

  try {
    const [affectedCount] = await EventModel.update(
      filterNullUndefined(req.body),
      {
        where: { id: eventId },
      }
    )

    if (affectedCount === 0) {
      return next(ApiError.badRequest([], 'Event was not updated'))
    }

    const event = await EventModel.findOne({
      where: { id: eventId },
      include: [EventTypeModel],
    })

    return res.json(event.dataValues)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const deleteEvent = async (req, res, next) => {
  const { eventId } = req.params

  try {
    const numberOfDeletedRows = await EventModel.destroy({
      where: { id: eventId },
    })

    if (numberOfDeletedRows === 0) {
      return next(ApiError.badRequest('Event was not deleted'))
    }

    return res.json({ message: 'Event was deleted' })
  } catch (err) {
    next(ApiError.badRequest('Event was not deleted'))
  }
}

const getNumberOfEventsPerStatus = async (req, res, next) => {
  try {
    const eventCounts = await EventModel.findAll({
      group: ['status'],
      attributes: ['status', [Sequelize.fn('COUNT', 'status'), 'count']],
    })

    const eventCountsAsInt = eventCounts.map((event) => ({
      status: event.getDataValue('status'),
      count: +event.getDataValue('count'),
    }))

    res.json(eventCountsAsInt)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getNumberOfEventsPerStatus,
}
