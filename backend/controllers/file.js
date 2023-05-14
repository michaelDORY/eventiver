const ApiError = require('../utils/ApiError')

const uploadFile = (req, res, next) => {
  if (req?.files) {
    return res.json({ paths: req.files.map((file) => file.path) })
  } else if (req?.file?.path) {
    return res.json({ path: req.file.path })
  }

  next(ApiError.badRequest([], 'File was not uploaded'))
}

module.exports = {
  uploadFile,
}
