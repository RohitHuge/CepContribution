'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Heart, User, Bell, Activity, MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Profile {
  bloodType: string;
  organType: string[];
  contact: {
    phone: string;
    emergencyContact: string;
  };
  location: {
    address: string;
  };
  medicalVerified: boolean;
  availability: boolean;
}

interface Alert {
  _id: string;
  type: 'blood' | 'organ';
  bloodTypeNeeded?: string;
  organNeeded?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'accepted' | 'resolved' | 'cancelled';
  description: string;
  location: {
    address: string;
  };
  userId: {
    name: string;
  };
  createdAt: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [nearbyAlerts, setNearbyAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch profile
      const profileResponse = await fetch('/api/profile', {
        credentials: 'include',
      });
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setProfile(profileData.profile);
      }

      // Fetch user's alerts
      const myAlertsResponse = await fetch('/api/alerts?type=my', {
        credentials: 'include',
      });
      if (myAlertsResponse.ok) {
        const myAlertsData = await myAlertsResponse.json();
        setAlerts(myAlertsData.alerts || []);
      }

      // Fetch nearby alerts for donors
      if (user?.role === 'donor') {
        const nearbyAlertsResponse = await fetch('/api/alerts?type=nearby', {
          credentials: 'include',
        });
        if (nearbyAlertsResponse.ok) {
          const nearbyAlertsData = await nearbyAlertsResponse.json();
          setNearbyAlerts(nearbyAlertsData.alerts || []);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'resolved': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome back, {user?.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  Role: <span className="font-semibold capitalize">{user?.role}</span>
                  {profile?.medicalVerified && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  )}
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/profile"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
                <Link
                  href="/alerts"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Alerts
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Status */}
          {!profile && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">Complete Your Profile</h3>
                  <p className="text-yellow-700 mt-1">
                    Please complete your profile to start receiving or making donation requests.
                  </p>
                  <Link
                    href="/profile"
                    className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-yellow-800 bg-yellow-100 hover:bg-yellow-200 transition-colors"
                  >
                    Complete Profile
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          {profile && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Blood Type</p>
                    <p className="text-2xl font-bold text-gray-900">{profile.bloodType}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Activity className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {profile.availability ? 'Available' : 'Unavailable'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Bell className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                    <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Alerts */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">My Alerts</h2>
                <p className="text-sm text-gray-600 mt-1">Alerts you've created</p>
              </div>
              <div className="p-6">
                {alerts.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No alerts created yet</p>
                    <Link
                      href="/alerts"
                      className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Create your first alert
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alerts.slice(0, 3).map((alert) => (
                      <div key={alert._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(alert.urgency)}`}>
                              {alert.urgency.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                              {alert.status.toUpperCase()}
                            </span>
                          </div>
                          <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-800 mb-1">
                          {alert.type === 'blood' ? `Blood Type: ${alert.bloodTypeNeeded}` : `Organ: ${alert.organNeeded}`}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {alert.location.address}
                        </div>
                      </div>
                    ))}
                    {alerts.length > 3 && (
                      <Link
                        href="/alerts"
                        className="block text-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                      >
                        View all {alerts.length} alerts
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Nearby Alerts (for donors) */}
            {user?.role === 'donor' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Nearby Alerts</h2>
                  <p className="text-sm text-gray-600 mt-1">Emergency requests near you</p>
                </div>
                <div className="p-6">
                  {nearbyAlerts.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No nearby alerts at the moment</p>
                      <p className="text-sm text-gray-500 mt-2">We'll notify you when someone needs help</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {nearbyAlerts.slice(0, 3).map((alert) => (
                        <div key={alert._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(alert.urgency)}`}>
                                {alert.urgency.toUpperCase()}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(alert.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-800 mb-1">
                            {alert.type === 'blood' ? `Blood Type: ${alert.bloodTypeNeeded}` : `Organ: ${alert.organNeeded}`}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="flex items-center text-xs text-gray-500 mb-3">
                            <MapPin className="h-3 w-3 mr-1" />
                            {alert.location.address}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">Requested by: {alert.userId.name}</p>
                          <Link
                            href="/alerts"
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                          >
                            Respond
                          </Link>
                        </div>
                      ))}
                      {nearbyAlerts.length > 3 && (
                        <Link
                          href="/alerts"
                          className="block text-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                        >
                          View all {nearbyAlerts.length} nearby alerts
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}