const path = require('path')
const multer = require('multer')

const storage = multer.memoryStorage()

function fileFilter(req, file, cb) {
  const fileExts = ['.png', '.jpg', '.jpeg', '.gif']

  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  )

  const isAllowedMimeType = file.mimetype.startsWith('image/')

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true)
  } else {
    cb('Error: File type not allowed!')
  }
}

const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 },
})

module.exports = {
  uploadImage,
}
