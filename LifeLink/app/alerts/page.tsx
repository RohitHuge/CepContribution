'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AlertTriangle, Plus, Clock, MapPin, Phone, User, Heart, CheckCircle, X } from 'lucide-react';

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
  contactInfo: {
    phone: string;
    hospital?: string;
  };
  userId: {
    _id: string;
    name: string;
  };
  acceptedBy?: {
    name: string;
  };
  createdAt: string;
  acceptedAt?: string;
  resolvedAt?: string;
}

export default function AlertsPage() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [nearbyAlerts, setNearbyAlerts] = useState<Alert[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    type: 'blood',
    bloodTypeNeeded: '',
    organNeeded: '',
    urgency: 'medium',
    description: '',
    contactPhone: '',
    hospital: '',
    address: '',
    lat: 0,
    lng: 0,
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const organTypes = ['kidney', 'liver', 'heart', 'lungs', 'pancreas', 'cornea', 'skin', 'bone', 'other'];
  const urgencyLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
  ];

  useEffect(() => {
    fetchAlerts();
    getCurrentLocation();
  }, []);

  const fetchAlerts = async () => {
    try {
      // Fetch user's own alerts
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
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const alertData = {
        type: formData.type,
        ...(formData.type === 'blood' ? { bloodTypeNeeded: formData.bloodTypeNeeded } : { organNeeded: formData.organNeeded }),
        urgency: formData.urgency,
        description: formData.description,
        location: {
          lat: formData.lat,
          lng: formData.lng,
          address: formData.address,
        },
        contactInfo: {
          phone: formData.contactPhone,
          hospital: formData.hospital,
        },
      };

      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(alertData),
      });

      if (response.ok) {
        setShowCreateForm(false);
        setFormData({
          type: 'blood',
          bloodTypeNeeded: '',
          organNeeded: '',
          urgency: 'medium',
          description: '',
          contactPhone: '',
          hospital: '',
          address: '',
          lat: 0,
          lng: 0,
        });
        fetchAlerts();
      }
    } catch (error) {
      console.error('Error creating alert:', error);
    }
  };

  const handleAcceptAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}/accept`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        fetchAlerts();
      }
    } catch (error) {
      console.error('Error accepting alert:', error);
    }
  };

  const handleResolveAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}/resolve`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        fetchAlerts();
      }
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    const level = urgencyLevels.find(l => l.value === urgency);
    return level ? level.color : 'bg-gray-100 text-gray-800';
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

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Emergency Alerts</h1>
                <p className="text-gray-600 mt-1">Manage your emergency requests and respond to others</p>
              </div>
              {(user?.role === 'recipient' || user?.role === 'coordinator') && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Alert
                </button>
              )}
            </div>
          </div>

          {/* Create Alert Form */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Create Emergency Alert</h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleCreateAlert} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alert Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="blood">Blood Donation</option>
                        <option value="organ">Organ Donation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urgency Level
                      </label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        {urgencyLevels.map(level => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {formData.type === 'blood' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Type Needed
                      </label>
                      <select
                        value={formData.bloodTypeNeeded}
                        onChange={(e) => setFormData({...formData, bloodTypeNeeded: e.target.value})}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="">Select Blood Type</option>
                        {bloodTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organ Needed
                      </label>
                      <select
                        value={formData.organNeeded}
                        onChange={(e) => setFormData({...formData, organNeeded: e.target.value})}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="">Select Organ</option>
                        {organTypes.map(organ => (
                          <option key={organ} value={organ} className="capitalize">{organ}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                      rows={3}
                      placeholder="Please describe the medical situation and urgency..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                        required
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hospital (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.hospital}
                        onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                        placeholder="Hospital name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                      placeholder="123 Main St, City, State, ZIP"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Create Alert
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Alerts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Alerts */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">My Alerts</h2>
                <p className="text-sm text-gray-600 mt-1">Emergency requests you've created</p>
              </div>
              <div className="p-6">
                {alerts.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No alerts created yet</p>
                    {(user?.role === 'recipient' || user?.role === 'coordinator') && (
                      <button
                        onClick={() => setShowCreateForm(true)}
                        className="mt-2 text-red-600 hover:text-red-800 transition-colors font-medium"
                      >
                        Create your first alert
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(alert.urgency)}`}>
                              {alert.urgency.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                              {alert.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(alert.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="font-medium text-gray-800">
                            {alert.type === 'blood' ? `Blood Type: ${alert.bloodTypeNeeded}` : `Organ: ${alert.organNeeded}`}
                          </p>
                          <p className="text-sm text-gray-600">{alert.description}</p>
                          
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {alert.location.address}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {alert.contactInfo.phone}
                            </div>
                          </div>

                          {alert.acceptedBy && (
                            <div className="flex items-center text-xs text-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Accepted by: {alert.acceptedBy.name}
                            </div>
                          )}

                          {alert.status === 'accepted' && (
                            <button
                              onClick={() => handleResolveAlert(alert._id)}
                              className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                            >
                              Mark as Resolved
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Nearby Alerts (for donors) */}
            {user?.role === 'donor' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Nearby Emergency Alerts</h2>
                  <p className="text-sm text-gray-600 mt-1">Help save lives in your area</p>
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
                      {nearbyAlerts.map((alert) => (
                        <div key={alert._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(alert.urgency)}`}>
                                {alert.urgency.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(alert.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="font-medium text-gray-800">
                              {alert.type === 'blood' ? `Blood Type: ${alert.bloodTypeNeeded}` : `Organ: ${alert.organNeeded}`}
                            </p>
                            <p className="text-sm text-gray-600">{alert.description}</p>
                            
                            <div className="flex items-center text-xs text-gray-500 space-x-4">
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {alert.userId.name}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {alert.location.address}
                              </div>
                            </div>

                            {alert.contactInfo.hospital && (
                              <div className="text-xs text-gray-500">
                                Hospital: {alert.contactInfo.hospital}
                              </div>
                            )}

                            <div className="flex items-center text-xs text-gray-500">
                              <Phone className="h-3 w-3 mr-1" />
                              {alert.contactInfo.phone}
                            </div>

                            {alert.status === 'pending' && (
                              <button
                                onClick={() => handleAcceptAlert(alert._id)}
                                className="mt-2 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                              >
                                Accept & Help
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
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