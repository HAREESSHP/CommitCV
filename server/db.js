import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

let isConnected = false;

// In-memory fallbacks when MongoDB is not connected
export const inMemoryDB = {
  profiles: new Map(),
<<<<<<< HEAD
  hrTokens: [
    { id: 'HR-8192-STRIPE', hrName: 'Sarah Jenkins', org: 'Stripe', employeeId: 'CV101', username: 'cv101', password: 'Cv@101', date: '2026-10-08', status: 'Active' },
    { id: 'HR-4091-GOOGLE', hrName: 'Vikram Mehta', org: 'Google Cloud', employeeId: 'CV102', username: 'cv102', password: 'Cv@102', date: '2026-10-09', status: 'Active' }
=======
  recruiters: [
    { 
      recruiterId: 'REC-8192-STRIPE', 
      password: 'stripe@password123', 
      hrName: 'Sarah Jenkins', 
      org: 'Stripe', 
      date: '2026-10-08', 
      status: 'Active' 
    },
    { 
      recruiterId: 'REC-4091-GOOGLE', 
      password: 'google@cloud2026', 
      hrName: 'Vikram Mehta', 
      org: 'Google Cloud', 
      date: '2026-10-09', 
      status: 'Active' 
    }
>>>>>>> 7cef4923d0848f9f750e94dfe35fd199c8adcb1c
  ]
};

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[DB] No MONGODB_URI provided in .env. Running with in-memory persistence.');
    return false;
  }

  if (isConnected) return true;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('[DB] Connected to MongoDB production cluster successfully.');
    return true;
  } catch (err) {
    console.warn('[DB] Failed to connect to MongoDB, falling back to in-memory store:', err.message);
    return false;
  }
}

// Schemas
const StudentProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  name: String,
  avatar: String,
  activity: Object,
  techStacks: Array,
  improvements: Array,
  recommendedRoles: Array,
  analyzedAt: { type: Date, default: Date.now }
});

const RecruiterAccountSchema = new mongoose.Schema({
  recruiterId: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  hrName: { type: String, required: true },
  org: { type: String, required: true },
  employeeId: { type: String },
  username: { type: String },
  password: { type: String },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, default: 'Active' }
});

export const StudentProfile = mongoose.models.StudentProfile || mongoose.model('StudentProfile', StudentProfileSchema);
export const RecruiterAccount = mongoose.models.RecruiterAccount || mongoose.model('RecruiterAccount', RecruiterAccountSchema);
