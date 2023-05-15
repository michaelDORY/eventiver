const {UserModel, ManagerModel, FoodProviderModel, GuestModel} = require("../models");
const {filterNullUndefined} = require("../utils/req");
const ApiError = require("../utils/ApiError");
const updateProfile = async (req, res, next) => {
	const { userId, managerId, foodProviderId } = req;

	try {
		const [affectedCount] = await UserModel.update(
			filterNullUndefined(req.body),
			{
				where: { id: userId },
			}
		);

		if (affectedCount === 0) {
			return next(ApiError.badRequest([], 'Profile was not updated'))
		}

		const profile = await UserModel.findOne({
			where: { id: userId },
			include: [managerId ? ManagerModel : foodProviderId ? FoodProviderModel : GuestModel],
		})

		const { passwordHash, ...profileDataValues } = profile.dataValues

		return res.json(profileDataValues)
	} catch (err) {
		next(ApiError.badRequest())
	}
}

module.exports = {
	updateProfile,
}