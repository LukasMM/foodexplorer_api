require('dotenv/config')
require('express-async-errors')

const express = require('express')

const cors = require('cors')
const cookieParser = require('cookie-parser')

const routes = require('./routes')
const AppError = require('./utils/AppError')
const { UPLOADS_FOLDER } = require('./configs/upload')

const app = express()
app.use(express.json())

app.use(cors({
  origin: ['http://localhost:5173', 'httP://127.0.0.1:5173/'],
  credentials: true
}))
app.use(cookieParser())

app.use('/files', express.static(UPLOADS_FOLDER))

app.use(routes)

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  return res.status(500).json({
    status: 'error',
    message: 'Erro de servidor interno!'
  })
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))