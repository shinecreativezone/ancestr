
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warmth-500 to-memory-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-serif font-bold text-xl text-gray-900">Ancestr</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Creating meaningful digital twins of loved ones to preserve memories 
              and continue conversations across generations.
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Ancestr. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
              <li><Link to="/avatar-type" className="text-gray-600 hover:text-gray-900">Try Demo</Link></li>
              <li><Link to="/waitlist" className="text-gray-600 hover:text-gray-900">Join Waitlist</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
