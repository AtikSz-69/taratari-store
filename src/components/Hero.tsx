import { Button } from './ui/Button';
import { ArrowRight, Star, Zap, Shield, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 z-10"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Premium Digital Store
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Upgrade Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                Digital Lifestyle
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg">
              Get instant access to Premium Subscriptions, Software Keys, and Digital Tools. 
              100% Genuine. Instant Delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 shadow-lg shadow-red-200">
                Browse Shop <ArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg" className="bg-white">
                View Flash Deals
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-gray-500 font-medium flex-wrap">
              <div className="flex items-center gap-1">
                <Zap className="text-yellow-500 fill-yellow-500" size={16} />
                <span>Instant Delivery</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
              <div className="flex items-center gap-1">
                <Shield className="text-green-500" size={16} />
                <span>Secure Payment</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
              <div className="flex items-center gap-1">
                <Clock className="text-blue-500" size={16} />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:h-[500px] flex items-center justify-center"
          >
            {/* Abstract Background Shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-red-100/50 to-orange-100/50 rounded-full blur-3xl -z-10"></div>
            
            {/* Digital Product Collage */}
            <div className="relative w-full max-w-lg">
               <div className="grid grid-cols-2 gap-4">
                 <img 
                   src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600" 
                   alt="Video Editing" 
                   className="rounded-2xl shadow-lg transform translate-y-8"
                   referrerPolicy="no-referrer"
                 />
                 <img 
                   src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=600" 
                   alt="Streaming" 
                   className="rounded-2xl shadow-lg transform -translate-y-8"
                   referrerPolicy="no-referrer"
                 />
               </div>
               
               {/* Floating Badge */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-2xl border border-gray-100 min-w-[200px] text-center z-20"
               >
                 <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Trusted By</div>
                 <div className="text-2xl font-black text-gray-900">10,000+</div>
                 <div className="text-sm text-red-600 font-medium">Happy Customers</div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
