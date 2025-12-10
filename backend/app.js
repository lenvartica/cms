require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const eventRoutes = require('./routes/events');
const givingRoutes = require('./routes/giving');
const ministryRoutes = require('./routes/ministries');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection - Commented out for now to run without MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => logger.info('MongoDB connected...'))
//   .catch((err) => logger.error('MongoDB connection error:', err));

console.log('Running without MongoDB - Using localStorage for data storage');

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/giving', givingRoutes);
app.use('/api/ministries', ministryRoutes);

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
