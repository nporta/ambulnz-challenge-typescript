import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import { apiRoutes } from './routes/api.js'

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})


app.use('/api', apiRoutes)

app.use((error, req, res, next) => {
  const status = error.statusCode
  const message = error.message
  const data = error.data
  res.status(status).json({ 
    message, 
    data, 
  })
})

mongoose.connect(
  process.env.MONGO_URL,
  {
    useCreateIndex: true,
  }
).then(result => {
  app.listen(3000)
})
.catch(err => console.log(err))