const {
  DeviceModel,
  DeviceEventModel,
  EventModel,
  ManagerModel,
} = require('../models')
const ApiError = require('../utils/ApiError')

const addDevice = async (req, res) => {
  const { managerId } = req

  const device = await DeviceModel.create(
    {
      ...req.body,
      managerId,
    },
    { include: [ManagerModel] }
  )

  return res.json(device?.dataValues)
}

const addDeviceEvent = async (req, res) => {
  const { deviceId } = req.params

  const deviceEvent = await DeviceEventModel.create(
    { ...req.body, deviceId },
    { include: [DeviceModel, EventModel] }
  )

  return res.json(deviceEvent?.dataValues)
}

const addDeviceEventFromAWS = async (req, res, next) => {
  const { name, value, unit, location, eventId, deviceId } = req.body

  console.log('IN addDeviceEventFromAWS')

  try {
    const device = await DeviceModel.findByPk(+deviceId)

    if (!device) {
      console.error('Device not found')
    }

    const deviceEvent = await DeviceEventModel.create(
      { name, value, unit, location, deviceId, eventId },
      { include: [DeviceModel, EventModel] }
    )

    return res.json(deviceEvent?.dataValues)
  } catch (error) {
    console.log(error)
    next(ApiError.badRequest(error))
  }
}

module.exports = {
  addDevice,
  addDeviceEvent,
  addDeviceEventFromAWS,
}
