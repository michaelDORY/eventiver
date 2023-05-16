const { FoodProviderModel, UserModel } = require('../models')
const ApiError = require('../utils/ApiError')
const getTopFoodProviders = async (req, res, next) => {
  const { count = 5 } = req.query
  const countInt = +count

  if (isNaN(countInt) || countInt <= 0) {
    return next(ApiError.badRequest([], 'Count must be a positive number'))
  }

  try {
    const foodProviders = await FoodProviderModel.findAll({
      order: [['rating', 'DESC']],
      limit: countInt,
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: UserModel,
          attributes: ['id', 'email', 'name', 'avatarUrl'],
        },
      ],
    })

    return res.json(
      foodProviders.map((foodProvider) => foodProvider.dataValues)
    )
  } catch (err) {
    next(ApiError.badRequest(err))
  }
}

module.exports = {
  getTopFoodProviders,
}
