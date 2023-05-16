const {
  DeviceModel,
  DeviceEventModel,
  EventModel,
  ManagerModel,
} = require('../models')

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

module.exports = {
  addDevice,
  addDeviceEvent,
}
