export interface Product {
  id: string;
  title: string;
  platform: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export const CATEGORIES = [
  { id: 'video-editing', name: 'Video Editing', icon: 'Video' },
  { id: 'subscriptions', name: 'Premium Subs', icon: 'Crown' },
  { id: 'design', name: 'Graphic Design', icon: 'Palette' },
  { id: 'vpn', name: 'VPN & Security', icon: 'Shield' },
  { id: 'software', name: 'Software Keys', icon: 'Key' },
  { id: 'ai-tools', name: 'AI Tools', icon: 'Bot' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2' },
  { id: 'courses', name: 'Online Courses', icon: 'GraduationCap' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Gemini AI Pro - 12 Year Subscription',
    platform: 'Google',
    price: 777,
    originalPrice: 1500,
    discount: 48,
    rating: 5.0,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    category: 'ai-tools',
    isBestSeller: true,
    isNew: true
  }
];
