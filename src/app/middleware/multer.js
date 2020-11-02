const multer = require('multer')
const path = require('path')


module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..','..', 'tmp', 'uploads'))
    },
  }),
  limits: {
    fileSize: 10 * 1000 * 1000
  },
  filefilter: (req, file, cb) => {
    const allowedMimes = ['.png', '.jpg', '.jpeg', '.pdf']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
}
