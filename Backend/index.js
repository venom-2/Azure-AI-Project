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
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Register routes
app.use('/api', visionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
