import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Profile from '@/models/Profile';
import { verifyToken } from '@/lib/auth';

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

    const profile = await Profile.findOne({ userId: decoded.userId });
    
    return NextResponse.json({ profile });

  } catch (error: any) {
    console.error('Profile fetch error:', error);
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

    const profileData = await request.json();

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ userId: decoded.userId });
    
    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: decoded.userId },
        profileData,
        { new: true, runValidators: true }
      );
      return NextResponse.json({
        message: 'Profile updated successfully',
        profile: updatedProfile,
      });
    } else {
      // Create new profile
      const newProfile = await Profile.create({
        ...profileData,
        userId: decoded.userId,
      });
      return NextResponse.json({
        message: 'Profile created successfully',
        profile: newProfile,
      });
    }

  } catch (error: any) {
    console.error('Profile save error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}