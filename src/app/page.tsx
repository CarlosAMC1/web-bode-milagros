'use client';

import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import Mapa from '../components/Mapa';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Testimonios from '../components/Testimonios';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { products } = useApp();

  // Mostrar solo destacados o una selección en el home si se desea
  const productosAMostrar = products.slice(0, 6);

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroBanner />

      <section id="productos" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-2 block">Selección Especial</span>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Nuestros <br />
              <span className="premium-gradient bg-clip-text text-transparent">Productos</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-lg">
            Calidad seleccionada pieza por pieza para garantizar la frescura y el sabor que tú te mereces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {productosAMostrar.map((producto) => (
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
