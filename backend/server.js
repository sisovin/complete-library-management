const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const app = require('./app');
const { connectDB } = require('./config/db.config');
const { logger } = require('./config/logger.config');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to the database
connectDB();

const server = express();

// Middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(compression());

// Routes
server.use('/api/v1', app);

// Error handling middleware
server.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
