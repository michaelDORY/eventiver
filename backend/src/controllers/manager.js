const { ManagerRatingModel, ManagerModel, GuestModel } = require('../models')
const ApiError = require('../utils/ApiError')

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
  addOneRatingFromGuestToManager,
}
