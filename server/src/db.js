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

// Application schema for student applications
const applicationSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    // Applicant information
    applicant: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      university: String,
      studentId: String
    },
    property: { type: String, required: true },
    location: { type: String, required: true },
    rent: { type: String, required: true },
    moveInDate: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
    progress: { type: Number, default: 0 },
    nextStep: { type: String, default: '' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    compatibility: { type: Number, default: 0 },
    // References & financial
    references: {
      refName: String,
      refRelationship: String,
      refPhone: String,
      refEmail: String
    },
    financial: {
      monthlyBudget: String,
      incomeSource: String,
      guarantor: String
    },
    history: {
      prevAddress: String,
      livingExperience: String,
      landlordName: String,
      landlordPhone: String
    },
    compatibilityInfo: {
      cleanliness: String,
      noiseTolerance: String,
      sleepSchedule: String,
      allergies: String
    },
    notes: String,
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    timeline: { type: [{ date: String, event: String, status: String }], default: [] },
    documents: { type: [{ name: String, status: String, uploaded: String }], default: [] },
    messages: { type: [{ from: String, message: String, time: String }], default: [] }
  },
  { timestamps: true }
);

export const Application = mongoose.model('Application', applicationSchema);


// Roommate profile schema used by the Flatmates feature
const roommateProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    university: { type: String, index: true },
    city: { type: String, index: true },
    gender: { type: String, enum: ['Male','Female','Other'], index: true },
    budget: { type: Number, index: true },
    cleanliness: { type: String, enum: ['High','Medium','Low'], default: 'Medium' },
    traits: { type: [String], default: [] },
    interests: { type: [String], default: [] },
    bio: { type: String, default: '' },
    avatarUrl: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', index: true },
  },
  { timestamps: true }
);

roommateProfileSchema.index({ name: 'text', university: 'text', city: 'text', bio: 'text' });

export const RoommateProfile = mongoose.model('RoommateProfile', roommateProfileSchema);

// Message thread schema (simple direct chat between two users)
const messageSchema = new mongoose.Schema(
  {
    threadId: { type: String, index: true }, // `${aId}:${bId}` sorted
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', index: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', index: true },
    text: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);


// Admin: Community Group
const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    members: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Group = mongoose.model('Group', groupSchema);

// Admin: Academic Calendar Event
const calendarEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    term: { type: String, default: 'Spring' },
    year: { type: Number, default: new Date().getFullYear() }
  },
  { timestamps: true }
);

export const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

// Admin: Emergency Broadcast log
const alertSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    via: { type: [String], default: ['email'] },
    status: { type: String, enum: ['queued','sent','failed'], default: 'queued' }
  },
  { timestamps: true }
);

export const Alert = mongoose.model('Alert', alertSchema);

