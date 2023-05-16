const { MenuItemModel, CategoryModel, FoodProviderModel } = require('../models')
const { filterNullUndefined } = require('../utils/req')
const ApiError = require('../utils/ApiError.js')

const getMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItemModel.findOne({
      where: { id: req.params.menuItemId },
      include: [CategoryModel],
    })

    return res.json(menuItem.dataValues)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const getMenuItems = async (req, res, next) => {
  const { foodProviderId: foodProviderIdFromQuery } = req.query
  const foodProviderId = req.foodProviderId || foodProviderIdFromQuery

  if (!foodProviderId) {
    return next(ApiError.badRequest([], 'Food provider id is required'))
  }

  try {
    const menuItems = await MenuItemModel.findAll({
      where: { foodProviderId: +foodProviderId },
      include: [CategoryModel],
    })

    return res.json(menuItems.map((menuItem) => menuItem.dataValues))
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const createMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItemModel.create(
      { ...req.body, foodProviderId: req.foodProviderId },
      { include: [CategoryModel, FoodProviderModel] }
    )

    return res.json(menuItem.dataValues)
  } catch (err) {
    next(ApiError.badRequest(err))
  }
}

const updateMenuItem = async (req, res, next) => {
  const { menuItemId } = req.params

  try {
    const [affectedCount] = await MenuItemModel.update(
      filterNullUndefined(req.body),
      {
        where: { id: menuItemId },
      }
    )

    if (affectedCount === 0) {
      return next(ApiError.badRequest([], 'Event was not updated'))
    }

    const menuItem = await MenuItemModel.findOne({
      where: { id: menuItemId },
      include: [CategoryModel],
    })

    return res.json(menuItem.dataValues)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const deleteMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItemModel.destroy({
      where: {
        id: req.params.menuItemId,
      },
    })

    return res.json(menuItem.dataValues)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

module.exports = {
  getMenuItem,
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
}
