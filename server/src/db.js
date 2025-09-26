import mongoose from 'mongoose';

export async function connectToDatabase(uri) {
  if (mongoose.connection.readyState === 1) return mongoose;
  return mongoose.connect(uri, { dbName: process.env.MONGODB_DB || undefined });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, 'Invalid email address']
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120
    },
    passwordHash: {
      type: String,
      required: true
    },
    university: { type: String, default: 'StaySync University' },
    avatarUrl: { type: String, default: null },
    role: {
      type: String,
      enum: ['student'],
      default: 'student'
    },
    verified: {
      type: Boolean,
      default: false
    },
    provider: {
      type: String,
      enum: ['local', 'google', 'microsoft'],
      default: 'local'
    },
    lastLoginAt: {
      type: Date
    },
    stats: {
      applicationsSubmitted: { type: Number, default: 0 },
      applicationsApproved: { type: Number, default: 0 },
      messagesUnread: { type: Number, default: 0 },
      documentsPending: { type: Number, default: 0 }
    },
    recentApplications: [
      {
        listingTitle: String,
        status: { type: String, enum: ['draft', 'under_review', 'approved', 'rejected'], default: 'draft' },
        submittedAt: String
      }
    ],
    tasks: [
      { title: String, completed: { type: Boolean, default: false } }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.passwordHash;
        return ret;
      }
    }
  }
);

// Note: index is already created via `unique: true` on email

export const Student = mongoose.model('Student', studentSchema);

// Listing schema for search/browse
const listingSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['apartment', 'roommate'], required: true },
    title: { type: String, required: true },
    location: { type: String, required: true, index: true },
    rent: { type: Number, required: true, index: true },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 1 },
    sqft: { type: Number },
    amenities: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    distance: { type: Number, default: 0 },
    available: { type: String },
    featured: { type: Boolean, default: false },
    compatibility: { type: Number },
    roommate: {
      name: String,
      major: String,
      year: String,
      avatar: String
    },
    landlord: {
      name: String,
      rating: Number,
      avatar: String
    },
    images: { type: Number, default: 0 },
    lastUpdated: { type: String },
    views: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    applications: { type: Number, default: 0 }
  },
  { timestamps: true }
);

listingSchema.index({ title: 'text', location: 'text' });

export const Listing = mongoose.model('Listing', listingSchema);


