const { EventModel, ManagerModel, EventTypeModel } = require('../models')
const { filterNullUndefined } = require('../utils/req')
const ApiError = require('../utils/ApiError')
const { Sequelize } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
const { sequelize } = require('../config/db')

const getEvent = async (req, res, next) => {
  try {
    const event = await EventModel.findOne({
      where: { id: req.params.eventId },
      include: [EventTypeModel],
      raw: true,
    })

    return res.json(event)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const getEventTypes = async (req, res, next) => {
  try {
    const eventTypes = await EventTypeModel.findAll({ raw: true })

    return res
      .set({
        'Content-Range': `event 0-${eventTypes.length - 1}/1`,
      })
      .json(eventTypes)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const getEvents = async (req, res, next) => {
  const managerIdFromParams = req.query?.filter
    ? JSON.parse(req.query.filter)?.managerId
    : null

  try {
    let events = null

    if (req.adminId) {
      events = await EventModel.findAll({
        include: [EventTypeModel, ManagerModel],
        ...(managerIdFromParams
          ? {
              where: { managerId: managerIdFromParams },
            }
          : {}),
        raw: true,
      })
    } else {
      events = await EventModel.findAll({
        where: { managerId: req.managerId },
        include: [EventTypeModel, ManagerModel],
        raw: true,
      })
    }

    return res
      .set({
        'Content-Range': `event 0-${events.length - 1}/1`,
      })
      .json(events)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const createEvent = async (req, res, next) => {
  const managerId = req.managerId ?? req.body.managerId

  if (!managerId) {
    return next(ApiError.badRequest([], 'Manager id is required'))
  }

  const event = await EventModel.create(
    {
      ...req.body,
      managerId: managerId,
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
      id: uuidv4(),
    }))

    res
      .set({
        'Content-Range': `event/count 0-${eventCountsAsInt.length - 1}/1`,
      })
      .json(eventCountsAsInt)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const ACCEPTABLE_PERIODS_OF_TIME = ['day', 'week', 'month', 'year']

const getNumberOfEventPerPeriodOfTime = async (req, res, next) => {
  let period = req.params.perPeriod

  if (!ACCEPTABLE_PERIODS_OF_TIME.includes(period)) {
    period = 'day'
  }

  try {
    const data = await EventModel.findAll({
      attributes: [
        [
          sequelize.fn('date_trunc', period, sequelize.col('createdAt')),
          period,
        ],
        [sequelize.fn('count', sequelize.literal('*')), 'count'],
      ],
      group: [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt'))],
      order: [[period, 'ASC']],
      raw: true,
    })

    res
      .set({
        'Content-Range': `event/count 0-${data.length - 1}/1`,
      })
      .json(
        data.map((record) => ({
          ...record,
          count: +record.count,
          periodName: period,
          id: uuidv4(),
        }))
      )
  } catch (err) {
    next(ApiError.badRequest())
  }
}

module.exports = {
  getEvent,
  getEventTypes,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getNumberOfEventsPerStatus,
  getNumberOfEventPerPeriodOfTime,
}
