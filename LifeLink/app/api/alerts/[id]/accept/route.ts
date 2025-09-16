import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Alert from '@/models/Alert';
import { verifyToken } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const alert = await Alert.findById(params.id);
    
    if (!alert) {
      return NextResponse.json({ message: 'Alert not found' }, { status: 404 });
    }

    if (alert.status !== 'pending') {
      return NextResponse.json({ message: 'Alert is no longer available' }, { status: 400 });
    }

    // Update alert status
    const updatedAlert = await Alert.findByIdAndUpdate(
      params.id,
      {
        status: 'accepted',
        acceptedBy: decoded.userId,
        acceptedAt: new Date(),
      },
      { new: true }
    ).populate('userId', 'name').populate('acceptedBy', 'name');

    return NextResponse.json({
      message: 'Alert accepted successfully',
      alert: updatedAlert,
    });

  } catch (error: any) {
    console.error('Alert accept error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}