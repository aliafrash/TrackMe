import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express App
const app = express();

// Connect Database
connectDB();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(
  cors({
    origin: '*', // Allow requests from frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded files (profile pictures, etc.)
app.use('/uploads', express.static(uploadsDir));

// Root Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'TrackMe API is running smoothly 🚀',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Global 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 TrackMe Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

