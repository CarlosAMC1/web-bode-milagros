'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiShoppingBag, FiUser, FiHome, FiPackage, FiMessageSquare } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, user } = useApp();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', href: '/', icon: <FiHome /> },
    { name: 'PRODUCTOS', href: '/#productos', icon: <FiPackage /> },
    { name: 'CONTACTO', href: '/contacto', icon: <FiMessageSquare /> },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="glass px-6 py-2.5 rounded-2xl flex items-center gap-6 border-white/10">
            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 group">
              <span className="premium-gradient bg-clip-text text-transparent group-hover:text-glow transition-all uppercase">MILAGROS</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </Link>

            {/* Desktop Links (inside the same glass box for cleaner look) */}
            <div className="hidden md:flex items-center gap-1 border-l border-white/10 ml-4 pl-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-xl text-[10px] font-black tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="glass p-3.5 rounded-2xl text-white hover:bg-primary hover:text-white transition-all relative group border-white/10"
            >
              <FiShoppingBag size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              href={user ? "/admin" : "/login"}
              className="glass p-3.5 rounded-2xl text-white hover:bg-white/10 transition-all flex items-center gap-3 px-6 border-white/10"
            >
              <FiUser size={20} />
              <span className="text-[10px] font-black tracking-[0.2em] hidden lg:inline uppercase">
                {user ? 'PANEL' : 'LOGIN'}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden glass p-3.5 rounded-2xl text-white border-white/10"
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
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
              className="fixed top-0 right-0 w-80 h-full glass-dark z-[70] p-10 flex flex-col gap-10 border-l border-white/10"
            >
              <button className="self-end p-3 glass rounded-xl text-white hover:bg-white/10" onClick={() => setMenuOpen(false)}>
                <FiX size={20} />
              </button>

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 p-5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all font-bold group"
                  >
                    <span className="text-primary group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="tracking-widest text-xs">{link.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto border-t border-white/5 pt-10">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20"
                >
                  <FiUser />
                  ACCESO ADMIN
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer Overlay */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
