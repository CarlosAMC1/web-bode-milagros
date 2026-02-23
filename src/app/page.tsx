'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import Mapa from '../components/Mapa';
import Testimonios from '../components/Testimonios';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

export default function Home() {
  const { products } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.categoria)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || p.categoria === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroBanner />

      <section id="productos" className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-xl">
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Catálogo Exclusivo</span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              Nuestros <br />
              <span className="premium-gradient bg-clip-text text-transparent text-glow">Productos</span>
            </h2>
          </div>

          <div className="w-full md:w-auto space-y-4">
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass pl-12 pr-6 py-4 rounded-2xl w-full md:w-80 focus:outline-none focus:border-primary/40 text-white placeholder:text-slate-600 border-white/10 transition-all font-medium"
              />
            </div>

            <div className="flex gap-2 p-1 glass rounded-2xl border-white/5 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[400px]"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 text-center"
          >
            <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
              <FiSearch size={32} />
            </div>
            <p className="text-slate-500 text-lg uppercase font-black tracking-[0.3em]">No se encontraron resultados</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('Todos') }}
              className="mt-6 text-primary font-bold hover:underline"
            >
              Limpiar búsqueda
            </button>
          </motion.div>
        )}
      </section>

      <Mapa />
      <Testimonios />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
