import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">LifeLink</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Connecting donors and recipients for emergency blood and organ donations in real-time. 
              Every second counts when saving lives.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-500" />
                <span className="text-sm">24/7 Emergency: 1-800-LIFE-LINK</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/awareness" className="text-gray-400 hover:text-white transition-colors">Awareness</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-white transition-colors">Become a Donor</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-500" />
                <span className="text-gray-400">support@lifelink.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-500" />
                <span className="text-gray-400">+1-800-LIFE-LINK</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-gray-400">Global Network</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 LifeLink. All rights reserved. Saving lives through technology.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}