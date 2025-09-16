'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { User, Phone, MapPin, Heart, Activity, Save, CheckCircle, AlertTriangle } from 'lucide-react';

interface ProfileData {
  bloodType: string;
  organType: string[];
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

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState<ProfileData>({
    bloodType: '',
    organType: [],
    contact: {
      phone: '',
      emergencyContact: '',
    },
    location: {
      lat: 0,
      lng: 0,
      address: '',
    },
    medicalVerified: false,
    availability: true,
    medicalHistory: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const organTypes = ['kidney', 'liver', 'heart', 'lungs', 'pancreas', 'cornea', 'skin', 'bone', 'other'];

  useEffect(() => {
    fetchProfile();
    getCurrentLocation();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.profile) {
          setProfile(data.profile);
          setFormData(data.profile);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
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
            location: {
              ...prev.location,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
        setMessage({ type: 'success', text: 'Profile saved successfully!' });
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.message || 'Failed to save profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }
      }));
    } else if (name === 'organType') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        organType: checkbox.checked
          ? [...prev.organType, value]
          : prev.organType.filter(organ => organ !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
                <p className="text-gray-600 mt-1">Manage your medical and contact information</p>
              </div>
              {profile?.medicalVerified && (
                <div className="flex items-center space-x-2 bg-green-50 text-green-800 px-4 py-2 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Medically Verified</span>
                </div>
              )}
            </div>
          </div>

          {/* Verification Notice */}
          {!profile?.medicalVerified && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">Medical Verification Required</h3>
                  <p className="text-yellow-700 mt-1">
                    Your profile needs to be verified by medical staff before you can participate in donations. 
                    Complete your profile and contact support for verification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {message && (
              <div className={`rounded-lg p-4 ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {message.text}
              </div>
            )}

            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Type *
                  </label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Blood Type</option>
                    {bloodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <input
                      type="checkbox"
                      name="availability"
                      checked={formData.availability}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Available for Donations
                  </label>
                  <p className="text-sm text-gray-600">
                    Toggle this to control if you want to receive donation requests
                  </p>
                </div>
              </div>

              {(user?.role === 'donor' || user?.role === 'coordinator') && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Organs Available for Donation
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {organTypes.map(organ => (
                      <label key={organ} className="flex items-center">
                        <input
                          type="checkbox"
                          name="organType"
                          value={organ}
                          checked={formData.organType.includes(organ)}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 capitalize">{organ}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <Phone className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact *
                  </label>
                  <input
                    type="tel"
                    name="contact.emergencyContact"
                    value={formData.contact.emergencyContact}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 987-6543"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">Location Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    required
                    placeholder="123 Main St, City, State, ZIP"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      name="location.lat"
                      value={formData.location.lat}
                      onChange={handleChange}
                      step="any"
                      placeholder="40.7128"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      name="location.lng"
                      value={formData.location.lng}
                      onChange={handleChange}
                      step="any"
                      placeholder="-74.0060"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Current Location
                </button>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <Heart className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">Medical History</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical History (Optional)
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Please describe any relevant medical conditions, medications, or allergies..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-600 mt-2">
                  This information helps medical professionals ensure safe donations.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}