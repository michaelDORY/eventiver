const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/' + req.path.split('upload/').pop())
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '-' + file.originalname)
  },
})

const uploadFileWithMulter = multer({ dest: './public/', storage })

module.exports = {
  uploadFileWithMulter,
}
