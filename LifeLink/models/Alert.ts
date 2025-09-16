import mongoose from 'mongoose';

export interface IAlert extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: 'blood' | 'organ';
  bloodTypeNeeded?: string;
  organNeeded?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'pending' | 'accepted' | 'resolved' | 'cancelled';
  description: string;
  contactInfo: {
    phone: string;
    hospital?: string;
  };
  acceptedBy?: mongoose.Types.ObjectId;
  acceptedAt?: Date;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AlertSchema = new mongoose.Schema<IAlert>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['blood', 'organ'],
    required: [true, 'Alert type is required'],
  },
  bloodTypeNeeded: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: function(this: IAlert) {
      return this.type === 'blood';
    },
  },
  organNeeded: {
    type: String,
    enum: ['kidney', 'liver', 'heart', 'lungs', 'pancreas', 'cornea', 'skin', 'bone', 'other'],
    required: function(this: IAlert) {
      return this.type === 'organ';
    },
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: [true, 'Urgency level is required'],
  },
  location: {
    lat: {
      type: Number,
      required: [true, 'Latitude is required'],
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      maxlength: [200, 'Address cannot exceed 200 characters'],
    },
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'resolved', 'cancelled'],
    default: 'pending',
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  contactInfo: {
    phone: {
      type: String,
      required: [true, 'Contact phone is required'],
      match: [/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number'],
    },
    hospital: {
      type: String,
      maxlength: [100, 'Hospital name cannot exceed 100 characters'],
    },
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  acceptedAt: Date,
  resolvedAt: Date,
}, {
  timestamps: true,
});

export default mongoose.models.Alert || mongoose.model<IAlert>('Alert', AlertSchema);