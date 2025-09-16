import mongoose from 'mongoose';

export interface IProfile extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  bloodType: string;
  organType?: string[];
  contact: {
    phone: string;
    emergencyContact: string;
  };
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  medicalVerified: boolean;
  availability: boolean;
  medicalHistory?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new mongoose.Schema<IProfile>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bloodType: {
    type: String,
    required: [true, 'Blood type is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  organType: [{
    type: String,
    enum: ['kidney', 'liver', 'heart', 'lungs', 'pancreas', 'cornea', 'skin', 'bone', 'other'],
  }],
  contact: {
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number'],
    },
    emergencyContact: {
      type: String,
      required: [true, 'Emergency contact is required'],
      match: [/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid emergency contact'],
    },
  },
  location: {
    lat: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: [-90, 'Latitude must be between -90 and 90'],
      max: [90, 'Latitude must be between -90 and 90'],
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: [-180, 'Longitude must be between -180 and 180'],
      max: [180, 'Longitude must be between -180 and 180'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      maxlength: [200, 'Address cannot exceed 200 characters'],
    },
  },
  medicalVerified: {
    type: Boolean,
    default: false,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  medicalHistory: {
    type: String,
    maxlength: [1000, 'Medical history cannot exceed 1000 characters'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);