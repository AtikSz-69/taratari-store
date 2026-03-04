import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';

type Page = 'home' | 'checkout' | 'thankyou';

export default function App() {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [lastOrderId, setLastOrderId] = useState<number | null>(null);

    function navigate(page: string) {
        setCurrentPage(page as Page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleOrderSuccess(orderId: number) {
        setLastOrderId(orderId);
        navigate('thankyou');
    }

    return (
        <CartProvider>
            <div className="min-h-screen bg-surface">
                <Navbar currentPage={currentPage} onNavigate={navigate} />
                <CartDrawer onCheckout={() => navigate('checkout')} />

                {currentPage === 'home' && <HomePage onNavigate={navigate} />}
                {currentPage === 'checkout' && (
                    <CheckoutPage onNavigate={navigate} onOrderSuccess={handleOrderSuccess} />
                )}
                {currentPage === 'thankyou' && (
                    <ThankYouPage orderId={lastOrderId} onNavigate={navigate} />
                )}
            </div>
        </CartProvider>
    );
}
