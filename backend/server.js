import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import contactRoutes from './routes/contact.js';
import cvRoutes from './routes/cv.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '10kb' })); // Limit body size for security

// ─── Database Connection (Async I/O) ──────────────────────────────────────────
// mongoose.connect() is a non-blocking async operation.
// We await it before starting the server to ensure DB is ready.

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit if DB connection fails — server is unusable without it
  }
};

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use('/api/contact', contactRoutes);      // POST /api/contact
app.use('/api/cv', cvRoutes);               // GET  /api/cv/download/:format

// Health check endpoint — used by Render/Railway to confirm server is live
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler — catches any undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 CV download: http://localhost:${PORT}/api/cv/download/pdf`);
  });
});
