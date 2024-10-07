const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const visionRoutes = require('./routes/ocr');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// CORS configuration
app.use(cors());

// Preflight request handler
// app.options('*', cors());

// Register routes
app.use('/api', visionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
