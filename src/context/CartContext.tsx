import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { Product } from '@/data/mockData';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'taratari_cart';

export function CartProvider({ children }: { children: ReactNode }) {
    // Restore cart from localStorage on mount
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });
    const [isCartOpen, setCartOpen] = useState(false);

    // Persist cart to localStorage on every change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = useCallback((product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((item) => item.id !== id));
        } else {
            setItems((prev) =>
                prev.map((item) => (item.id === id ? { ...item, quantity } : item))
            );
        }
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, setCartOpen }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}

