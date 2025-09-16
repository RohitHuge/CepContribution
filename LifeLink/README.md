# LifeLink - Emergency Organ & Blood Donor Platform

A comprehensive full-stack Next.js application connecting donors and recipients for emergency blood and organ donations in real-time.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure JWT-based authentication with HTTP-only cookies
- **Multi-Role System**: Donors, Recipients, and Medical Coordinators
- **Real-Time Matching**: Location-based emergency alert system
- **Medical Verification**: Secure verification system for enhanced trust
- **Emergency Alerts**: Create and respond to urgent donation requests
- **Profile Management**: Comprehensive medical and contact information

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **TailwindCSS** for modern UI design
- **Location-Based Services** with GPS coordinates
- **Responsive Design** for all devices
- **Production Ready** with deployment configurations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lifelink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/lifelink
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXTAUTH_SECRET=your-nextauth-secret-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

### User Model
```typescript
{
  name: string;
  email: string (unique);
  passwordHash: string;
  role: 'donor' | 'recipient' | 'coordinator';
  createdAt: Date;
  updatedAt: Date;
}
```

### Profile Model
```typescript
{
  userId: ObjectId (ref: User);
  bloodType: string; // A+, A-, B+, B-, AB+, AB-, O+, O-
  organType: string[]; // kidney, liver, heart, lungs, etc.
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
  medicalHistory: string;
}
```

### Alert Model
```typescript
{
  userId: ObjectId (ref: User);
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
  acceptedBy?: ObjectId (ref: User);
  acceptedAt?: Date;
  resolvedAt?: Date;
}
```

## 🛡️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token

### Profile Management
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Create/update user profile

### Emergency Alerts
- `GET /api/alerts` - Get alerts (my alerts or nearby alerts)
- `POST /api/alerts` - Create new alert
- `POST /api/alerts/[id]/accept` - Accept an alert
- `POST /api/alerts/[id]/resolve` - Mark alert as resolved

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3B82F6` (Blue-600)
- **Secondary Green**: `#10B981` (Green-500)
- **Accent Purple**: `#8B5CF6` (Purple-500)
- **Emergency Red**: `#EF4444` (Red-500)
- **Neutral**: Various gray tones
- **Background**: White with gray-50 accents

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, various sizes (text-xl to text-5xl)
- **Body**: Regular weight, readable line heights
- **UI Elements**: Medium weight for emphasis

## 🔐 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Authentication**: Secure token generation and verification
- **HTTP-Only Cookies**: Prevent XSS attacks
- **Input Validation**: Server-side validation with Mongoose
- **Protected Routes**: Client-side route protection
- **Medical Verification**: Additional security layer for donors

## 📱 Pages & Components

### Public Pages
- **Home** (`/`) - Landing page with hero section
- **About** (`/about`) - Mission and values
- **Awareness** (`/awareness`) - Education about donation
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - Account creation

### Protected Pages
- **Dashboard** (`/dashboard`) - User overview and stats
- **Profile** (`/profile`) - Manage medical and contact info
- **Alerts** (`/alerts`) - Create and manage emergency requests

### Key Components
- **Navbar** - Navigation with authentication state
- **Footer** - Contact info and links
- **ProtectedRoute** - Route protection wrapper
- **AuthProvider** - Authentication context

## 🌍 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Configure build settings using `netlify.toml`
2. Set environment variables
3. Deploy from Git repository

### Docker
```bash
docker build -t lifelink .
docker run -p 3000:3000 lifelink
```

## 🧪 Location-Based Matching

The platform uses GPS coordinates to find nearby donors:

1. **User Location**: Captured during profile creation
2. **Distance Calculation**: Haversine formula for accurate distances
3. **Compatibility Check**: Blood type and organ matching
4. **Real-Time Alerts**: Instant notifications to compatible donors

### Blood Type Compatibility Matrix
```
Donor -> Can donate to:
O- -> Everyone (Universal donor)
O+ -> O+, A+, B+, AB+
A- -> A-, A+, AB-, AB+
A+ -> A+, AB+
B- -> B-, B+, AB-, AB+
B+ -> B+, AB+
AB- -> AB-, AB+
AB+ -> AB+ only
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For emergency assistance: **1-800-LIFE-LINK**

For technical support: support@lifelink.org

---

**Built with ❤️ for saving lives through technology**