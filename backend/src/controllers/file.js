const ApiError = require('../utils/ApiError')
const { s3Upload } = require('../config/s3-service')

const uploadFile = async (req, res, next) => {
  try {
    const results = await s3Upload(req, req.files || [req.file])
    console.log(results)
    return res.json(results)
  } catch (err) {
    next(ApiError.badRequest(err, 'File was not uploaded'))
  }
}

module.exports = {
  uploadFile,
}
