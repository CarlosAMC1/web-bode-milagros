'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMenu } from 'react-icons/fi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-gray-900">
            <span className="text-emerald-600">LOS</span>
            <span className="tracking-tight">MILAGROS</span>
          </Link>

          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-sm text-gray-700 hover:text-emerald-600 font-medium transition-all">INICIO</Link>
            <Link href="#productos" className="text-sm text-gray-700 hover:text-emerald-600 font-medium transition-all">PRODUCTOS</Link>
            <Link href="#nosotros" className="text-sm text-gray-700 hover:text-emerald-600 font-medium transition-all">NOSOTROS</Link>
            <Link
              href="/contacto"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all text-sm font-semibold shadow-sm"
            >
              PEDIDOS
            </Link>
          </div>

          {/* Botón hamburguesa en mobile */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-[60] p-6 flex flex-col gap-6"
          >
            <button className="self-end" onClick={() => setMenuOpen(false)}>
              <FiX size={26} />
            </button>

            <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-emerald-600 text-base font-semibold">Inicio</Link>
            <Link href="#productos" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-emerald-600 text-base font-semibold">Productos</Link>
            <Link href="#nosotros" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-emerald-600 text-base font-semibold">Nosotros</Link>
            <Link href="/contacto" onClick={() => setMenuOpen(false)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-emerald-700 transition-all">
              Pedidos
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
