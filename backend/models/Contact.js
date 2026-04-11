import mongoose from 'mongoose';

// ─── Contact Schema ────────────────────────────────────────────────────────────
// Defines the shape of data stored in MongoDB.
// Both `email` and `createdAt` are indexed for faster queries.

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    index: true, // Optimization: indexed for faster lookups
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Optimization: indexed for sorting by date
  },
});

export default mongoose.model('Contact', contactSchema);
