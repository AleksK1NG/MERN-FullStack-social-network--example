const express = require('express');
const morgan = require('morgan');
const config = require('config');
const http = require('http');
const connect = require('./db');

const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
const commentsRoutes = require('./routes/comments');
const postsRoutes = require('./routes/posts');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const passport = require('passport');

connect();
const app = express();
app.server = http.createServer(app);

// PORT
const port = process.env.PORT || 5000;

// // Body Parser
// app.use(express.json());

require('./models/User');
require('./models/Blog');
require('./models/Comment');
require('./models/Post');

require('./services/passport');

// Logger
if (app.get('env') === 'development') {
  console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
  app.use(morgan('tiny'));
  dbDebugger('DB debugger is running');
}

// Body Parser
app.use(express.json());

// Routes
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/comments', commentsRoutes);
app.use('/api/v1/posts', postsRoutes);

// Server
app.server.listen(port, () => console.log(`Server is listening on port: ${port}. Pid: ${process.pid}`));

process.on('SIGTERM', () => {
  console.log('Signal SIGTERM');
  app.server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Signal SIGINT');
  app.server.close(() => {
    process.exit(0);
  });
});
