import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function App() {
  return (
      <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
        <Header />

        <main className="flex-1">
          <Hero />

        </main>

        <Footer />
      </div>
  );
}
