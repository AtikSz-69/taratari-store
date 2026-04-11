import { useState, useEffect } from 'react';
import {
  X, Lock, Package, ShoppingBag, Loader2, Trash2, RefreshCw,
  Plus, Sparkles, Tag, DollarSign, FileText, Image, Eye, EyeOff,
  Phone, MapPin, User, Clock, ChevronDown, ChevronUp, Search
} from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';

type Tab = 'orders' | 'products' | 'add' | 'subscribers';

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items_json: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface AdminProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at: string;
}

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [tab, setTab] = useState<Tab>('orders');

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<number | null>(null);

  // Subscribers state
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subscribersLoading, setSubscribersLoading] = useState(false);

  // Products state
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Add product state
  const [form, setForm] = useState({
    name: '', description: '', price: '', image_url: '', category: 'general', features: '',
  });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user } = useAuth();

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'video-editing', label: 'Video Editing' },
    { value: 'subscriptions', label: 'Premium Subs' },
    { value: 'design', label: 'Graphic Design' },
    { value: 'vpn', label: 'VPN & Security' },
    { value: 'software', label: 'Software Keys' },
    { value: 'ai-tools', label: 'AI Tools' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'courses', label: 'Online Courses' },
  ];

  // Fetch orders
  async function fetchOrders() {
    setOrdersLoading(true);
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'x-admin-key': adminKey },
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders || []);
    } catch { /* ignore */ }
    setOrdersLoading(false);
  }

  // Fetch subscribers
  async function fetchSubscribers() {
    setSubscribersLoading(true);
    try {
      const res = await fetch('/api/admin/subscribers', {
        headers: { 'x-admin-key': adminKey },
      });
      const data = await res.json();
      if (data.success) setSubscribers(data.subscribers || []);
    } catch { /* ignore */ }
    setSubscribersLoading(false);
  }

  // Fetch products
  async function fetchProducts() {
    setProductsLoading(true);
    try {
      const res = await fetch('/api/admin/products', {
        headers: { 'x-admin-key': adminKey },
      });
      const data = await res.json();
      if (data.success) setProducts(data.products || []);
    } catch { /* ignore */ }
    setProductsLoading(false);
  }

  // Delete product
  async function deleteProduct(id: number) {
    setDeletingId(id);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch { /* ignore */ }
    setDeletingId(null);
  }

  // Delete order
  async function deleteOrder(id: number) {
    if (!confirm('Are you sure you want to permanently delete this order?')) return;
    setDeletingOrderId(id);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
        if (expandedOrder === id) setExpandedOrder(null);
      }
    } catch { /* ignore */ }
    setDeletingOrderId(null);
  }

  function handleEditProduct(product: AdminProduct) {
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price ? String(product.price) : '',
      image_url: product.image_url || '',
      category: product.category || 'general',
      features: ''
    });
    setEditingProductId(product.id);
    setTab('add');
    setResult(null);
  }

  // Magic Generate
  async function handleMagicGenerate() {
    if (!form.name.trim()) return;
    setGenerating(true);
    setResult(null);
    try {
      const res = await fetch('/api/gemma-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), features: form.features.trim() || undefined, category: form.category }),
      });
      const data = await res.json();
      if (data.success && data.description) {
        setForm({ ...form, description: data.description });
        setResult({ type: 'success', message: 'AI generated description ✨' });
      } else {
        setResult({ type: 'error', message: data.error || 'Generation failed' });
      }
    } catch {
      setResult({ type: 'error', message: 'Could not connect to AI' });
    }
    setGenerating(false);
  }

  // Submit product
  async function handleAddProduct() {
    if (!form.name.trim() || !form.price || Number(form.price) <= 0) {
      setResult({ type: 'error', message: 'Name and valid price are required' });
      return;
    }
    setSubmitting(true);
    setResult(null);
    try {
      const endpoint = editingProductId ? '/api/admin/products' : '/api/admin/add';
      const method = editingProductId ? 'PUT' : 'POST';
      
      const payload: any = {
        name: form.name.trim(), description: form.description.trim(),
        price: Number(form.price), image_url: form.image_url.trim(), category: form.category,
      };
      if (editingProductId) payload.id = editingProductId;

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ type: 'success', message: editingProductId ? 'Product updated successfully!' : `Product added! ID: #${data.productId}` });
        setForm({ name: '', description: '', price: '', image_url: '', category: 'general', features: '' });
        setEditingProductId(null);
        // Auto-refresh products list and switch to Products tab after 1.5s
        setTimeout(() => {
          fetchProducts();
          setTab('products');
          setResult(null);
        }, 1500);
      } else {
        setResult({ type: 'error', message: data.error || 'Failed' });
      }
    } catch {
      setResult({ type: 'error', message: 'Server error' });
    }
    setSubmitting(false);
  }

  // Auth handler
  function handleLogin() {
    if (!adminKey.trim()) return;
    setIsAuthenticated(true);
    fetchOrders();
    fetchProducts();
    fetchSubscribers();
  }

  // Load data when tab changes
  useEffect(() => {
    if (!isAuthenticated) return;
    if (tab === 'orders') fetchOrders();
    if (tab === 'products') fetchProducts();
    if (tab === 'subscribers') fetchSubscribers();
  }, [tab, isAuthenticated]);

  function formatDate(d: string) {
    return new Date(d).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'short' });
  }

  function parseItems(json: string) {
    try { return JSON.parse(json); } catch { return []; }
  }

  const filteredOrders = orders.filter((o) =>
    o.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer_phone?.includes(searchQuery) ||
    String(o.id).includes(searchQuery)
  );

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubscribers = subscribers.filter((s) =>
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // IMPORTANT Admin Check Rule
  if (user?.email !== 'iamatik69@gmail.com') return null;

  return (
    <>
      {/* Floating Admin Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gray-900 text-white shadow-xl hover:bg-gray-800 flex items-center justify-center transition-all hover:scale-110 group"
        title="Admin Panel"
      >
        <Lock size={22} className="group-hover:hidden" />
        <Package size={22} className="hidden group-hover:block" />
      </button>

      {/* Admin Panel Fullscreen */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-2xl z-50 bg-gray-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
                <div className="flex items-center gap-3">
                  <Package size={20} />
                  <div>
                    <h2 className="text-lg font-bold">Admin Panel</h2>
                    <p className="text-xs text-gray-400">Taratari Store Management</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Auth Gate */}
              {!isAuthenticated ? (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="w-full max-w-sm space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-4">
                        <Lock size={28} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Admin Access</h3>
                      <p className="text-sm text-gray-500 mt-1">Enter your secret key to continue</p>
                    </div>
                    <div className="relative">
                      <input
                        type={showKey ? 'text' : 'password'}
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        placeholder="Enter admin secret key"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 text-sm pr-12"
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      />
                      <button
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <Button className="w-full bg-gray-900 hover:bg-gray-800" onClick={handleLogin}>
                      <Lock size={16} className="mr-2" /> Unlock Admin Panel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex border-b border-gray-200 bg-white px-6">
                    {[
                      { id: 'orders' as Tab, label: 'Orders', icon: ShoppingBag, count: orders.length },
                      { id: 'products' as Tab, label: 'Products', icon: Package, count: products.length },
                      { id: 'subscribers' as Tab, label: 'Customers', icon: User, count: subscribers.length },
                      { id: 'add' as Tab, label: editingProductId ? 'Edit Product' : 'Add Product', icon: Plus },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { setTab(t.id); setSearchQuery(''); setResult(null); }}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                          tab === t.id
                            ? 'border-red-600 text-red-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <t.icon size={16} />
                        {t.label}
                        {t.count !== undefined && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            tab === t.id ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {t.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Search Bar (for orders & products tabs) */}
                  {tab !== 'add' && (
                    <div className="px-6 py-3 bg-white border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
                          <Search size={16} className="text-gray-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={tab === 'orders' ? 'Search by name, phone, or ID...' : tab === 'products' ? 'Search by name or category...' : 'Search emails...'}
                            className="flex-1 bg-transparent outline-none text-sm"
                          />
                        </div>
                        <button
                          onClick={() => {
                              if (tab === 'orders') fetchOrders();
                              else if (tab === 'products') fetchProducts();
                              else if (tab === 'subscribers') fetchSubscribers();
                          }}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                          <RefreshCw size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto">
                    {/* ============ ORDERS TAB ============ */}
                    {tab === 'orders' && (
                      <div className="p-6 space-y-3">
                        {ordersLoading ? (
                          <div className="flex items-center justify-center py-16">
                            <Loader2 size={24} className="animate-spin text-gray-400" />
                          </div>
                        ) : filteredOrders.length === 0 ? (
                          <div className="text-center py-16 text-gray-400">
                            <ShoppingBag size={40} className="mx-auto mb-3 opacity-50" />
                            <p className="font-medium">No orders found</p>
                          </div>
                        ) : (
                          filteredOrders.map((order) => {
                            const items = parseItems(order.items_json);
                            const isExpanded = expandedOrder === order.id;
                            return (
                              <motion.div
                                key={order.id}
                                layout
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                              >
                                <button
                                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                                      <ShoppingBag size={18} className="text-red-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-semibold text-gray-900">
                                        Order #{order.id} — <span className="text-red-600">৳{order.total_amount?.toLocaleString()}</span>
                                      </p>
                                      <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <User size={10} /> {order.customer_name}
                                        <span className="mx-1">·</span>
                                        <Clock size={10} /> {formatDate(order.created_at)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                      'bg-gray-100 text-gray-600'
                                    }`}>
                                      {order.status || 'pending'}
                                    </span>
                                    {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                  </div>
                                </button>

                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="border-t border-gray-100"
                                    >
                                      <div className="p-4 space-y-3 bg-gray-50">
                                        <div className="flex justify-between items-start">
                                            <div className="grid grid-cols-2 gap-3 text-sm flex-1">
                                              <div className="flex items-center gap-2">
                                                <Phone size={14} className="text-gray-400" />
                                                <span className="text-gray-700">{order.customer_phone}</span>
                                              </div>
                                              <div className="flex items-start gap-2">
                                                <MapPin size={14} className="text-gray-400 mt-0.5" />
                                                <span className="text-gray-700">{order.customer_address}</span>
                                              </div>
                                            </div>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); deleteOrder(order.id); }}
                                                disabled={deletingOrderId === order.id}
                                                className="ml-4 p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                                                title="Delete Order"
                                            >
                                                {deletingOrderId === order.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                            </button>
                                        </div>
                                        <div className="bg-white rounded-lg border border-gray-100 p-3">
                                          <p className="text-xs font-semibold text-gray-500 mb-2">Items</p>
                                          {items.map((item: any, i: number) => (
                                            <div key={i} className="flex justify-between text-sm py-1">
                                              <span className="text-gray-700">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                                              <span className="font-medium">৳{(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            );
                          })
                        )}
                      </div>
                    )}

                    {/* ============ PRODUCTS TAB ============ */}
                    {tab === 'products' && (
                      <div className="p-6 space-y-3">
                        {productsLoading ? (
                          <div className="flex items-center justify-center py-16">
                            <Loader2 size={24} className="animate-spin text-gray-400" />
                          </div>
                        ) : filteredProducts.length === 0 ? (
                          <div className="text-center py-16 text-gray-400">
                            <Package size={40} className="mx-auto mb-3 opacity-50" />
                            <p className="font-medium">No products found</p>
                          </div>
                        ) : (
                          filteredProducts.map((product) => (
                            <motion.div
                              key={product.id}
                              layout
                              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
                            >
                              {product.image_url ? (
                                <img src={product.image_url} alt={product.name} className="w-14 h-14 rounded-lg object-cover bg-gray-100" referrerPolicy="no-referrer" />
                              ) : (
                                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
                                  <Package size={20} className="text-gray-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-sm font-bold text-red-600">৳{product.price}</span>
                                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">{product.category}</span>
                                </div>
                                {product.description && (
                                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{product.description}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleEditProduct(product)}
                                    className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  >
                                    <Sparkles size={16} /> {/* Can use an Edit/Pen icon but Sparkles looks nice for edit too */}
                                  </button>
                                  <button
                                    onClick={() => deleteProduct(product.id)}
                                    disabled={deletingId === product.id}
                                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                                  >
                                    {deletingId === product.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                  </button>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    )}

                    {/* ============ SUBSCRIBERS TAB ============ */}
                    {tab === 'subscribers' && (
                      <div className="p-6 space-y-3">
                        {subscribersLoading ? (
                          <div className="flex items-center justify-center py-16">
                            <Loader2 size={24} className="animate-spin text-gray-400" />
                          </div>
                        ) : filteredSubscribers.length === 0 ? (
                          <div className="text-center py-16 text-gray-400">
                            <User size={40} className="mx-auto mb-3 opacity-50" />
                            <p className="font-medium">No loyal customers yet</p>
                          </div>
                        ) : (
                          filteredSubscribers.map((sub) => (
                            <motion.div
                              key={sub.id}
                              layout
                              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                      <User size={18} className="text-blue-600" />
                                  </div>
                                  <div>
                                      <p className="text-sm font-semibold text-gray-900">{sub.email}</p>
                                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                          <Clock size={10} /> Joined: {formatDate(sub.created_at)}
                                      </p>
                                  </div>
                              </div>
                              <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                  Subscriber
                              </span>
                            </motion.div>
                          ))
                        )}
                      </div>
                    )}

                    {/* ============ ADD PRODUCT TAB ============ */}
                    {tab === 'add' && (
                      <div className="p-6 space-y-4">
                        {/* Product Name */}
                        <div>
                          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                            <Tag size={14} /> Product Name
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="e.g. Netflix Premium 4K - 1 Month"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 text-sm"
                          />
                        </div>

                        {/* Category */}
                        <div>
                          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                            <FileText size={14} /> Category
                          </label>
                          <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 text-sm bg-white"
                          >
                            {categories.map((cat) => (
                              <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Key Features */}
                        <div>
                          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                            <Sparkles size={14} className="text-purple-500" /> Key Features
                            <span className="text-gray-400 font-normal">(helps AI)</span>
                          </label>
                          <input
                            type="text"
                            value={form.features}
                            onChange={(e) => setForm({ ...form, features: e.target.value })}
                            placeholder="e.g. 4K UHD, 4 screens, no ads"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 text-sm"
                          />
                        </div>

                        {/* Description + Magic Generate */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                              <FileText size={14} /> Description
                            </label>
                            <button
                              onClick={handleMagicGenerate}
                              disabled={generating || !form.name.trim()}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 shadow-sm"
                            >
                              {generating ? <><Loader2 size={12} className="animate-spin" /> Generating...</> : <><Sparkles size={12} /> Magic Generate</>}
                            </button>
                          </div>
                          <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Product description (or click Magic Generate ✨)"
                            rows={5}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 text-sm resize-none"
                          />
                        </div>

                        {/* Price */}
                        <div>
                          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                            <DollarSign size={14} /> Price (৳ BDT)
                          </label>
                          <input
                            type="number"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            placeholder="0"
                            min="1"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 text-sm"
                          />
                        </div>

                        {/* Image URL */}
                        <div>
                          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                            <Image size={14} /> Image URL <span className="text-gray-400 font-normal">(optional)</span>
                          </label>
                          <input
                            type="url"
                            value={form.image_url}
                            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 text-sm"
                          />
                        </div>

                        {/* Result */}
                        {result && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 rounded-lg text-sm font-medium ${
                              result.type === 'success'
                                ? 'bg-green-50 border border-green-200 text-green-700'
                                : 'bg-red-50 border border-red-200 text-red-600'
                            }`}
                          >
                            {result.message}
                          </motion.div>
                        )}

                        <Button
                          className="w-full bg-gray-900 hover:bg-gray-800"
                          isLoading={submitting}
                          onClick={handleAddProduct}
                        >
                          {editingProductId ? <><Package size={16} className="mr-2" /> Update Product</> : <><Plus size={16} className="mr-2" /> Add Product to Store</>}
                        </Button>
                        {editingProductId && (
                            <Button
                                variant="ghost"
                                className="w-full mt-2"
                                onClick={() => {
                                    setForm({ name: '', description: '', price: '', image_url: '', category: 'general', features: '' });
                                    setEditingProductId(null);
                                    setTab('products');
                                }}
                            >
                                Cancel Editing
                            </Button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
