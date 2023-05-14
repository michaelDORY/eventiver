const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')

const { sequelize } = require('./db.js')
require('./models/index.js')
const setupRouters = require('./routers/index.js')
const errorsMiddleware = require('./middlewares/errors.js')

const app = express()

app.use(cors())
app.use(bodyParser.json())

sequelize
  .sync({ force: false, logging: false })
  .then(() => console.info('All models were synchronized successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err))

setupRouters(app)
app.use(errorsMiddleware)

const port = process.env.PORT || 5003
app.listen(port, () => {
  console.info(`Example app listening on port ${port}`)
})
