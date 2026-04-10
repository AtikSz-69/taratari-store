import { useState, useEffect } from 'react';
import { X, Package, Clock, ShoppingBag, Loader2, ChevronDown, ChevronUp, MapPin, Phone, User as UserIcon, Mail, Shield, Star, TrendingUp } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';

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

export default function UserDashboard() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [tab, setTab] = useState<'overview' | 'orders'>('overview');

  async function fetchMyOrders() {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/user/orders?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.success) setOrders(data.orders || []);
    } catch { /* ignore */ }
    setLoading(false);
  }

  useEffect(() => {
    if (isOpen && user?.email) fetchMyOrders();
  }, [isOpen, user?.email]);

  function formatDate(d: string) {
    return new Date(d).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'short' });
  }

  function parseItems(json: string) {
    try { return JSON.parse(json); } catch { return []; }
  }

  const totalSpent = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const statusColor = (s: string) =>
    s === 'completed' ? 'bg-emerald-100 text-emerald-700' :
    s === 'processing' ? 'bg-blue-100 text-blue-700' :
    'bg-amber-100 text-amber-700';

  if (!user) return null;

  return (
    <>
      {/* Dashboard Trigger — shown in header via prop, or as standalone */}
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
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl z-50 bg-gray-50 shadow-2xl flex flex-col"
            >
              {/* Dashboard Header */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="relative px-6 py-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-14 h-14 rounded-2xl border-2 border-white/20 shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-white">{user.name}</h2>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: ShoppingBag, value: orders.length, label: 'Orders', color: 'text-red-400' },
                      { icon: TrendingUp, value: `৳${totalSpent.toLocaleString()}`, label: 'Total Spent', color: 'text-emerald-400' },
                      { icon: Star, value: 'Gold', label: 'Member Tier', color: 'text-yellow-400' },
                    ].map(({ icon: Icon, value, label, color }) => (
                      <div key={label} className="bg-white/[0.06] rounded-xl p-3 border border-white/10">
                        <Icon size={16} className={`${color} mb-1.5`} />
                        <div className="text-base font-bold text-white">{value}</div>
                        <div className="text-[10px] text-gray-500 font-medium">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-white px-6">
                {[
                  { id: 'overview' as const, label: 'Profile' },
                  { id: 'orders' as const, label: `My Orders (${orders.length})` },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      tab === t.id ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {/* ========== PROFILE TAB ========== */}
                {tab === 'overview' && (
                  <div className="p-6 space-y-4">
                    {/* Profile Info Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Account Details</h3>
                      {[
                        { icon: UserIcon, label: 'Full Name', value: user.name },
                        { icon: Mail, label: 'Email', value: user.email },
                        { icon: Shield, label: 'Auth Provider', value: 'Google' },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                          <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                            <Icon size={16} className="text-gray-400" />
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-400 font-medium">{label}</p>
                            <p className="text-sm font-semibold text-gray-900">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Membership Card */}
                    <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <Star size={18} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Gold Member</span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{user.firstName}'s Rewards</h3>
                        <p className="text-sm text-gray-400 mb-4">You've earned {orders.length * 50} loyalty points</p>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" style={{ width: `${Math.min((orders.length * 50 / 500) * 100, 100)}%` }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 mt-1.5">
                          <span>{orders.length * 50} pts</span>
                          <span>500 pts for Platinum</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========== ORDERS TAB ========== */}
                {tab === 'orders' && (
                  <div className="p-6 space-y-3">
                    {loading ? (
                      <div className="flex items-center justify-center py-16">
                        <Loader2 size={24} className="animate-spin text-gray-400" />
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-16 text-gray-400">
                        <ShoppingBag size={48} className="mx-auto mb-4 opacity-40" />
                        <p className="font-bold text-lg text-gray-600 mb-1">No orders yet</p>
                        <p className="text-sm">Your order history will appear here</p>
                        <Button className="mt-6" onClick={() => setIsOpen(false)}>
                          Start Shopping
                        </Button>
                      </div>
                    ) : (
                      orders.map((order) => {
                        const items = parseItems(order.items_json);
                        const isExpanded = expandedOrder === order.id;
                        return (
                          <motion.div
                            key={order.id}
                            layout
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                          >
                            <button
                              onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                                  <Package size={18} className="text-red-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900">
                                    Order #{order.id}
                                  </p>
                                  <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock size={10} /> {formatDate(order.created_at)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <p className="text-sm font-bold text-gray-900">৳{order.total_amount?.toLocaleString()}</p>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor(order.status || 'pending')}`}>
                                    {order.status || 'pending'}
                                  </span>
                                </div>
                                {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                              </div>
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="border-t border-gray-50"
                                >
                                  <div className="p-4 space-y-3 bg-gray-50/50">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Phone size={13} className="text-gray-400" />
                                        <span className="text-gray-600">{order.customer_phone}</span>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <MapPin size={13} className="text-gray-400 mt-0.5" />
                                        <span className="text-gray-600 text-xs">{order.customer_address}</span>
                                      </div>
                                    </div>
                                    <div className="bg-white rounded-xl border border-gray-100 p-3">
                                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Items</p>
                                      {items.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                                          <span className="text-gray-700">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                                          <span className="font-semibold text-gray-900">৳{(item.price * item.quantity).toLocaleString()}</span>
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Export open function for Header to use */}
      <DashboardTrigger onOpen={() => setIsOpen(true)} />
    </>
  );
}

// Hidden component that exposes the open function via a global event
function DashboardTrigger({ onOpen }: { onOpen: () => void }) {
  useEffect(() => {
    const handler = () => onOpen();
    window.addEventListener('open-dashboard', handler);
    return () => window.removeEventListener('open-dashboard', handler);
  }, [onOpen]);
  return null;
}
