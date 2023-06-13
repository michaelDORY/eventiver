const {
  ManagerRatingModel,
  ManagerModel,
  GuestModel,
  UserModel,
} = require('../models')
const ApiError = require('../utils/ApiError')

const getManagersInfo = async (req, res, next) => {
  try {
    const managers = await ManagerModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: {
            exclude: ['passwordHash'],
          },
        },
      ],
      raw: true,
    })

    if (!managers) {
      return next(ApiError.badRequest([], 'Manager not found'))
    }

    return res
      .set({
        'Content-Range': `manager 0-1/1`,
      })
      .json(managers)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const getManagerInfo = async (req, res, next) => {
  try {
    const manager = await ManagerModel.findOne({
      where: { id: req.params.managerId },
      include: [UserModel],
      raw: true,
    })

    if (!manager) {
      return next(ApiError.badRequest([], 'Manager not found'))
    }

    return res
      .set({
        'Content-Range': `manager 0-1/1`,
      })
      .json(manager)
  } catch (err) {
    next(ApiError.badRequest())
  }
}

const addOneRatingFromGuestToManager = async (req, res, next) => {
  const { managerId } = req.params
  const { guestId } = req

  try {
    await ManagerRatingModel.create(
      { ...req.body, guestId, managerId },
      { include: [GuestModel, ManagerModel] }
    )

    const ratingCount = await ManagerRatingModel.count({
      where: { managerId },
    })

    const manager = await ManagerModel.findOne({
      where: { id: managerId },
    })

    let newManagerRating

    if (ratingCount === 1) {
      newManagerRating = req.body.rating
    } else {
      newManagerRating =
        (manager.rating * ratingCount + req.body.rating) / (ratingCount + 1)
    }

    const [affectedCount] = await ManagerModel.update(
      { rating: newManagerRating },
      { where: { id: managerId } }
    )

    if (affectedCount === 0) {
      return next(ApiError.badRequest([], 'Rating was not updated'))
    }

    return res.json({ message: 'Rating was added', rating: newManagerRating })
  } catch (err) {
    next(ApiError.badRequest())
  }
}

module.exports = {
  getManagersInfo,
  getManagerInfo,
  addOneRatingFromGuestToManager,
}
