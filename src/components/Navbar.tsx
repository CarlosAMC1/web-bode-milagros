'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMenu, FiShoppingBag, FiUser } from 'react-icons/fi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="glass px-4 py-2 rounded-2xl flex items-center gap-6">
            <Link href="/" className="text-xl font-black tracking-tighter flex items-center gap-2 group">
              <span className="premium-gradient bg-clip-text text-transparent group-hover:text-glow transition-all">MILAGROS</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
            </Link>

            <div className="hidden md:flex gap-8 items-center">
              <Link href="/" className="text-xs font-bold tracking-widest text-slate-300 hover:text-white transition-colors">INICIO</Link>
              <Link href="#productos" className="text-xs font-bold tracking-widest text-slate-300 hover:text-white transition-colors">PRODUCTOS</Link>
              <Link href="#nosotros" className="text-xs font-bold tracking-widest text-slate-300 hover:text-white transition-colors">NOSOTROS</Link>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <button className="hidden sm:flex glass p-3 rounded-xl text-white hover:bg-white/20 transition-all">
              <FiShoppingBag />
            </button>

            <Link
              href="/login"
              className="glass p-3 rounded-xl text-white hover:bg-white/20 transition-all flex items-center gap-2 px-4"
            >
              <FiUser />
              <span className="text-xs font-bold tracking-widest hidden lg:inline">LOGIN</span>
            </Link>

            <button
              className="md:hidden glass p-3 rounded-xl text-white"
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 w-80 h-full glass-dark z-[70] p-10 flex flex-col gap-10"
            >
              <button className="self-end p-2 glass rounded-lg" onClick={() => setMenuOpen(false)}>
                <FiX size={24} />
              </button>

              <div className="flex flex-col gap-8">
                <Link href="/" onClick={() => setMenuOpen(false)} className="text-2xl font-black text-white hover:text-primary transition-colors">Inicio</Link>
                <Link href="#productos" onClick={() => setMenuOpen(false)} className="text-2xl font-black text-white hover:text-primary transition-colors">Productos</Link>
                <Link href="#nosotros" onClick={() => setMenuOpen(false)} className="text-2xl font-black text-white hover:text-primary transition-colors">Nosotros</Link>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="mt-4 px-8 py-4 bg-primary text-white font-bold rounded-2xl text-center shadow-lg">
                  Panel Admin
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
