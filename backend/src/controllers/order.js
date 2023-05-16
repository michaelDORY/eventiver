const ApiError = require('../utils/ApiError')
const {
  OrderModel,
  ManagerModel,
  FoodProviderModel,
  OrderItemModel,
  MenuItemModel,
} = require('../models')
const { sequelize } = require('../config/db')
const { filterNullUndefined } = require('../utils/req')
const { Sequelize } = require('sequelize')
const { ORDER_STATUSES, CURRENCY } = require('../constants')
const createOrder = async (req, res, next) => {
  const { managerId } = req
  const { orderItems: bodyOrderItems, eventId } = req.body

  const menuItemIds = bodyOrderItems.map((item) => item.menuItemId)

  try {
    const menuItems = await MenuItemModel.findAll({
      where: { id: menuItemIds },
    })

    const priceMap = menuItems.reduce((map, item) => {
      map[item.id] = item.priceValue
      return map
    }, {})

    const orderItemsWithTotal = bodyOrderItems.map((item) => ({
      ...item,
      totalPrice: item.quantity * priceMap[item.menuItemId],
    }))

    await sequelize.transaction(async (t) => {
      const orderItems = await OrderItemModel.bulkCreate(orderItemsWithTotal, {
        include: [MenuItemModel],
        transaction: t,
      })

      const orderTotalPrice = orderItems.reduce(
        (total, item) => total + item.dataValues.totalPrice,
        0
      )

      const order = await OrderModel.create(
        {
          totalPrice: orderTotalPrice,
          currency: menuItems[0].dataValues.currency,
          managerId,
          eventId,
          foodProviderId: menuItems[0].dataValues.foodProviderId,
        },
        {
          include: [ManagerModel, FoodProviderModel, OrderItemModel],
          transaction: t,
        }
      )

      for (let item of orderItems) {
        await order.addOrderItem(item, { transaction: t })
      }

      return res.json(order.dataValues)
    })
  } catch (err) {
    next(ApiError.badRequest(err))
  }
}

const updateOrder = async (req, res, next) => {
  const { managerId } = req
  const { orderItems: bodyOrderItems, eventId, status } = req.body
  const { orderId } = req.params

  const menuItemIds = bodyOrderItems?.map((item) => item.menuItemId)

  try {
    const menuItems = menuItemIds
      ? await MenuItemModel.findAll({
          where: { id: menuItemIds },
        })
      : null

    const priceMap = menuItems?.reduce((map, item) => {
      map[item.id] = item.priceValue
      return map
    }, {})

    const orderItemsWithTotal = bodyOrderItems?.map((item) => ({
      ...item,
      totalPrice: item.quantity * priceMap[item.menuItemId],
    }))

    await sequelize.transaction(async (t) => {
      const orderItems = orderItemsWithTotal
        ? await OrderItemModel.bulkCreate(orderItemsWithTotal, {
            include: [MenuItemModel],
            transaction: t,
          })
        : null

      const orderTotalPrice = orderItems?.reduce(
        (total, item) => total + item.dataValues.totalPrice,
        0
      )

      await OrderModel.update(
        filterNullUndefined({
          totalPrice: orderTotalPrice,
          currency: menuItems?.[0].dataValues.currency,
          managerId,
          eventId,
          foodProviderId: menuItems?.[0].dataValues.foodProviderId,
          status,
        }),
        {
          where: { id: orderId },
          include: [ManagerModel, FoodProviderModel, OrderItemModel],
          transaction: t,
        }
      )

      const order = await OrderModel.findByPk(orderId, {
        include: [ManagerModel, FoodProviderModel, OrderItemModel],
        transaction: t,
      })

      for (let item of orderItems || []) {
        await order.addOrderItem(item, { transaction: t })
      }

      orderItems &&
        (await OrderItemModel.destroy({
          where: {
            id: {
              [Sequelize.Op.notIn]: orderItems.map(
                (item) => item.dataValues.id
              ),
            },
          },
        }))

      return res.json(order.dataValues)
    })
  } catch (err) {
    next(ApiError.badRequest(err))
  }
}

const getTotalSalesOfAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.sum('totalPrice', {
      where: {
        status: ORDER_STATUSES.completed,
        currency: CURRENCY.usd,
      },
    })
    res.json(orders ?? 0)
  } catch (err) {
    next(ApiError.badRequest(err))
  }
}

const getNumberOfOrdersPerStatus = async (req, res, next) => {
  try {
    const orderCounts = await OrderModel.findAll({
      group: ['status'],
      attributes: ['status', [Sequelize.fn('COUNT', 'status'), 'count']],
    })

    const orderCountsAsInt = orderCounts.map((event) => ({
      status: event.getDataValue('status'),
      count: +event.getDataValue('count'),
    }))

    res.json(orderCountsAsInt)
  } catch (err) {
    next(ApiError.badRequest(err))
  }
}

module.exports = {
  createOrder,
  updateOrder,
  getTotalSalesOfAllOrders,
  getNumberOfOrdersPerStatus,
}
