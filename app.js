const express = require('express')
const morgan = require('morgan')
const config = require('config')
const http = require('http')
const connect = require('./db')

const dbDebugger = require('debug')('app:db')

connect()
const app = express()
app.server = http.createServer(app)

if (app.get('env') === 'development') {
  console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'))
  app.use(morgan('tiny'))
  dbDebugger('DB debugger is running')
}

// Body Parser
app.use(express.json())

// Routes
app.use('/api/v1/posts', require('./routes/api/posts'))
app.use('/api/v1/auth', require('./routes/api/auth'))
app.use('/api/v1/profile', require('./routes/api/profile'))

// PORT
const port = process.env.PORT || 5000

// Server
app.server.listen(port, () => console.log(`Server is listening on port: ${port}. Pid: ${process.pid}`))

process.on('SIGTERM', () => {
  console.log('Signal SIGTERM')
  app.server.close(() => {
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('Signal SIGINT')
  app.server.close(() => {
    process.exit(0)
  })
})
