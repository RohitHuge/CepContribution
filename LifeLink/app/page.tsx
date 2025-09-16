import Link from 'next/link';
import { Heart, Users, MapPin, Shield, Clock, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Save Lives with <span className="text-yellow-300">LifeLink</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Connect donors and recipients for emergency blood and organ donations in real-time. 
              Every second counts when saving lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Become a Donor
              </Link>
              <Link
                href="/awareness"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">10,000+</h3>
              <p className="text-gray-600">Lives Saved</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">50,000+</h3>
              <p className="text-gray-600">Active Donors</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">2 mins</h3>
              <p className="text-gray-600">Average Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How LifeLink Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform uses advanced location-based matching to connect donors with recipients in emergency situations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Register as Donor</h3>
              <p className="text-gray-600">
                Create your profile with blood type, organ availability, and location information.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Location Matching</h3>
              <p className="text-gray-600">
                GPS-based matching finds the nearest compatible donors for emergency requests.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Verified & Secure</h3>
              <p className="text-gray-600">
                Medical verification and secure authentication ensure trust and safety for all users.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Real-Time Alerts</h3>
              <p className="text-gray-600">
                Instant notifications to nearby donors when emergency requests are made.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Emergency Support</h3>
              <p className="text-gray-600">
                24/7 support system for critical blood and organ donation requests.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Track Impact</h3>
              <p className="text-gray-600">
                Monitor your donations and see the direct impact you're making in saving lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the LifeLink Community Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of a global network dedicated to saving lives through organ and blood donation.
          </p>
          <Link
            href="/register"
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}