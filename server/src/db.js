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


