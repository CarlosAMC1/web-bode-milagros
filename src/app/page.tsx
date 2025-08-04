// app/page.tsx
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import Mapa from '../components/Mapa';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import productos from '../data/productos.json';

import Testimonios from '../components/Testimonios';
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroBanner />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Nuestros productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>

      <Mapa />
         <Testimonios />
      <Footer />
         <WhatsAppButton />
    </main>
  );
}
