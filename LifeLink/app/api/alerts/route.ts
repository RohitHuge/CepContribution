import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Alert from '@/models/Alert';
import Profile from '@/models/Profile';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
           Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
           Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'my' or 'nearby'
    const radius = parseFloat(searchParams.get('radius') || '50'); // Default 50km

    if (type === 'my') {
      // Get user's own alerts
      const alerts = await Alert.find({ userId: decoded.userId })
        .populate('userId', 'name')
        .populate('acceptedBy', 'name')
        .sort({ createdAt: -1 });
      
      return NextResponse.json({ alerts });
    } else {
      // Get nearby alerts for donors
      const userProfile = await Profile.findOne({ userId: decoded.userId });
      
      if (!userProfile) {
        return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
      }

      // Find all active alerts
      const allAlerts = await Alert.find({ 
        status: 'pending',
        userId: { $ne: decoded.userId } // Exclude own alerts
      })
        .populate('userId', 'name')
        .sort({ createdAt: -1 });

      // Filter alerts by compatibility and distance
      const nearbyAlerts = allAlerts.filter(alert => {
        const distance = calculateDistance(
          userProfile.location.lat,
          userProfile.location.lng,
          alert.location.lat,
          alert.location.lng
        );

        if (distance > radius) return false;

        // Check blood type compatibility
        if (alert.type === 'blood') {
          const canDonate = checkBloodCompatibility(userProfile.bloodType, alert.bloodTypeNeeded!);
          return canDonate;
        }

        // Check organ compatibility
        if (alert.type === 'organ') {
          return userProfile.organType && userProfile.organType.includes(alert.organNeeded!);
        }

        return false;
      });

      return NextResponse.json({ alerts: nearbyAlerts });
    }

  } catch (error: any) {
    console.error('Alerts fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const alertData = await request.json();

    const newAlert = await Alert.create({
      ...alertData,
      userId: decoded.userId,
    });

    const populatedAlert = await Alert.findById(newAlert._id)
      .populate('userId', 'name');

    return NextResponse.json({
      message: 'Alert created successfully',
      alert: populatedAlert,
    });

  } catch (error: any) {
    console.error('Alert creation error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Blood compatibility checker
function checkBloodCompatibility(donorBloodType: string, recipientBloodType: string): boolean {
  const compatibility: Record<string, string[]> = {
    'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // Universal donor
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A-': ['A-', 'A+', 'AB-', 'AB+'],
    'A+': ['A+', 'AB+'],
    'B-': ['B-', 'B+', 'AB-', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+'], // Universal recipient (can only donate to AB+)
  };

  return compatibility[donorBloodType]?.includes(recipientBloodType) || false;
}