import { Button } from './ui/Button';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="bg-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-600 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6">
          <Mail size={24} className="text-red-500" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">THANKS FOR COMING HERE</h2>
        <p className="text-gray-400 mb-8">
          WE BELIEVE IN YOUR PRIVACY.
        </p>

        <form className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            required
          />
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white border-0">
            Subscribe
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 mt-4">
          By subscribing, you agree to our Terms & Conditions and Privacy Policy.
        </p>
      </div>
    </section>
  );
}
