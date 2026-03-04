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
    title: 'CapCut Pro - 1 Year Subscription',
    platform: 'CapCut',
    price: 450,
    originalPrice: 1200,
    discount: 62,
    rating: 4.9,
    reviews: 3500,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    category: 'video-editing',
    isBestSeller: true
  },
  {
    id: '2',
    title: 'Canva Pro - Lifetime Access',
    platform: 'Canva',
    price: 250,
    originalPrice: 500,
    discount: 50,
    rating: 5.0,
    reviews: 5200,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=800',
    category: 'design',
    isBestSeller: true
  },
  {
    id: '3',
    title: 'Netflix Premium - 4K UHD (1 Month)',
    platform: 'Netflix',
    price: 180,
    originalPrice: 250,
    discount: 28,
    rating: 4.8,
    reviews: 8900,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=800',
    category: 'subscriptions'
  },
  {
    id: '4',
    title: 'ChatGPT Plus Shared Account',
    platform: 'OpenAI',
    price: 300,
    originalPrice: 2000,
    discount: 85,
    rating: 4.7,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    category: 'ai-tools',
    isNew: true
  },
  {
    id: '5',
    title: 'Windows 11 Pro Retail Key',
    platform: 'Microsoft',
    price: 450,
    originalPrice: 1500,
    discount: 70,
    rating: 4.9,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800',
    category: 'software'
  },
  {
    id: '6',
    title: 'NordVPN - 1 Year Account',
    platform: 'NordVPN',
    price: 600,
    originalPrice: 3000,
    discount: 80,
    rating: 4.8,
    reviews: 950,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    category: 'vpn'
  },
  {
    id: '7',
    title: 'Adobe Creative Cloud - 1 Month',
    platform: 'Adobe',
    price: 850,
    originalPrice: 2500,
    discount: 66,
    rating: 4.6,
    reviews: 780,
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=800',
    category: 'design'
  },
  {
    id: '8',
    title: 'Spotify Premium Individual',
    platform: 'Spotify',
    price: 120,
    originalPrice: 199,
    discount: 40,
    rating: 4.9,
    reviews: 15000,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800',
    category: 'subscriptions',
    isBestSeller: true
  }
];
