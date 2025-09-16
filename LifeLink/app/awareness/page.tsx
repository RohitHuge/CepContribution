import { Heart, Droplets, Users, Clock, Shield, CheckCircle } from 'lucide-react';

export default function AwarenessPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Understanding Donation
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Learn about the life-saving impact of blood and organ donation, and how you can make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">The Need is Real</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding the critical shortage of blood and organs helps us appreciate the importance of donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-red-50 p-8 rounded-xl text-center">
              <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">Every 2 Seconds</h3>
              <p className="text-gray-600">Someone needs blood in the United States</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">107,000+</h3>
              <p className="text-gray-600">People on organ transplant waiting list</p>
            </div>

            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">1 Donor</h3>
              <p className="text-gray-600">Can save up to 8 lives through organ donation</p>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-600 mb-2">17 People</h3>
              <p className="text-gray-600">Die daily waiting for organ transplants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Donation Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Blood Donation Facts</h2>
              <p className="text-lg text-gray-600 mb-6">
                Blood donation is one of the simplest ways to save lives. A single donation can help 
                multiple patients, from trauma victims to cancer patients undergoing treatment.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Universal Donor</h4>
                    <p className="text-gray-600">O-negative blood can be given to any patient in emergency situations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Quick Recovery</h4>
                    <p className="text-gray-600">Your body replaces donated blood within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Safe Process</h4>
                    <p className="text-gray-600">All equipment is sterile and used only once</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Health Benefits</h4>
                    <p className="text-gray-600">Regular donation may reduce risk of heart disease and cancer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Blood Type Compatibility</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-600">Can Donate To:</h4>
                    <div className="mt-2 space-y-1">
                      <div className="text-sm"><strong>O-:</strong> Everyone</div>
                      <div className="text-sm"><strong>O+:</strong> O+, A+, B+, AB+</div>
                      <div className="text-sm"><strong>A-:</strong> A-, A+, AB-, AB+</div>
                      <div className="text-sm"><strong>A+:</strong> A+, AB+</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-600">Can Receive From:</h4>
                    <div className="mt-2 space-y-1">
                      <div className="text-sm"><strong>AB+:</strong> Everyone</div>
                      <div className="text-sm"><strong>AB-:</strong> O-, A-, B-, AB-</div>
                      <div className="text-sm"><strong>B+:</strong> O-, O+, B-, B+</div>
                      <div className="text-sm"><strong>B-:</strong> O-, B-</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organ Donation Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Organ Donation: The Gift of Life</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Organ donation is the ultimate act of generosity, offering hope and new life to those waiting for transplants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Heart</h3>
              <p className="text-gray-600 text-sm">
                Heart transplants can give patients with end-stage heart disease a chance for a normal life.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Kidney</h3>
              <p className="text-gray-600 text-sm">
                Kidney transplants can free patients from dialysis and dramatically improve quality of life.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Liver</h3>
              <p className="text-gray-600 text-sm">
                Liver transplants can save patients with liver failure and allow them to live normal lives.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lungs</h3>
              <p className="text-gray-600 text-sm">
                Lung transplants offer hope to patients with severe lung diseases and breathing difficulties.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-yellow-500"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Pancreas</h3>
              <p className="text-gray-600 text-sm">
                Pancreas transplants can cure Type 1 diabetes and eliminate the need for insulin injections.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-indigo-500 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Eyes & Tissue</h3>
              <p className="text-gray-600 text-sm">
                Cornea and tissue donation can restore sight and help heal burn victims and trauma patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Myths vs Facts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Myths vs Facts</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let's clear up some common misconceptions about blood and organ donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">Common Myths</h3>
              
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h4 className="font-semibold text-gray-800 mb-2">❌ "I'm too old to donate"</h4>
                <p className="text-gray-600 text-sm">
                  Age limits vary, but many seniors can still donate blood and organs. Consult with medical professionals.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h4 className="font-semibold text-gray-800 mb-2">❌ "Blood donation weakens you"</h4>
                <p className="text-gray-600 text-sm">
                  Your body quickly replaces donated blood, and you may actually feel energized by helping others.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h4 className="font-semibold text-gray-800 mb-2">❌ "Rich people get organs first"</h4>
                <p className="text-gray-600 text-sm">
                  Organ allocation is based on medical need, compatibility, and time on waiting list - not wealth.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-green-600 mb-4">The Facts</h3>
              
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-800 mb-2">✅ Safe and regulated process</h4>
                <p className="text-gray-600 text-sm">
                  All donation procedures follow strict medical guidelines with minimal risk to donors.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-800 mb-2">✅ You can save multiple lives</h4>
                <p className="text-gray-600 text-sm">
                  One organ donor can save up to 8 lives and improve the lives of 75+ others through tissue donation.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-800 mb-2">✅ Donated organs work effectively</h4>
                <p className="text-gray-600 text-sm">
                  Transplant success rates are high, with many recipients living normal, healthy lives for decades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of donors who are making a difference in their communities every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Register as Donor
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}