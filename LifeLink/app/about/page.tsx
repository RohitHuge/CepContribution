import { Heart, Users, Globe, Shield, Clock, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About LifeLink</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Revolutionizing emergency healthcare through technology, connecting donors and recipients when every second counts.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                LifeLink was created with a simple but powerful vision: to save lives by connecting donors 
                and recipients in real-time during medical emergencies. We believe that technology can bridge 
                the gap between those who need help and those willing to provide it.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Every year, thousands of people lose their lives waiting for organ transplants or emergency 
                blood transfusions. Our platform addresses this critical need by using advanced location-based 
                matching, instant notifications, and verified medical profiles to ensure help arrives as quickly as possible.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <span className="text-lg font-semibold text-gray-800">Saving lives through innovation</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-purple-50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">10K+</div>
                  <div className="text-gray-600">Lives Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-500 mb-2">50K+</div>
                  <div className="text-gray-600">Active Donors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">100+</div>
                  <div className="text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at LifeLink, from product development to user support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Life First</h3>
              <p className="text-gray-600">
                Every decision we make is driven by our commitment to saving and improving lives through innovative technology.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Trust & Security</h3>
              <p className="text-gray-600">
                We maintain the highest standards of security and privacy to protect our users' sensitive medical information.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Community</h3>
              <p className="text-gray-600">
                Building a global community of donors, recipients, and medical professionals united by compassion.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Speed</h3>
              <p className="text-gray-600">
                Time is critical in medical emergencies. We optimize every process to ensure the fastest possible response times.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Accessibility</h3>
              <p className="text-gray-600">
                Making life-saving resources available to everyone, regardless of location or economic status.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibly text-gray-800 mb-4">Excellence</h3>
              <p className="text-gray-600">
                Continuously improving our platform and services to provide the best possible experience for all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Together with our community, we're making a real difference in emergency healthcare worldwide.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Global Network</h3>
                <p className="text-gray-600 mb-6">
                  Our platform operates in over 100 countries, with verified donors and medical facilities 
                  working together to save lives. From major metropolitan areas to rural communities, 
                  LifeLink ensures help is always within reach.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="bg-green-500 w-2 h-2 rounded-full mr-3"></div>
                    <span className="text-gray-700">Real-time emergency response system</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-500 w-2 h-2 rounded-full mr-3"></div>
                    <span className="text-gray-700">Medical professional verification</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-500 w-2 h-2 rounded-full mr-3"></div>
                    <span className="text-gray-700">Multi-language support</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-500 w-2 h-2 rounded-full mr-3"></div>
                    <span className="text-gray-700">24/7 emergency hotline</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">2 min</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600">Platform Uptime</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of the solution. Register today and help save lives in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Become a Donor
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}