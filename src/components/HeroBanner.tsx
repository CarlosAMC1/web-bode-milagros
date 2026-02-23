'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiStar } from 'react-icons/fi';

export default function HeroBanner() {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-background">
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      
      {/* Imagen/Video de fondo con Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 scale-105"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full text-amber-400 font-medium text-sm"
          >
            <FiStar className="fill-current text-amber-400" />
            <span>Calidad Premium desde 1995</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-tight"
          >
            Sabor Local, <br />
            <span className="premium-gradient bg-clip-text text-transparent text-glow">
              Calidad Global
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Descubre una selección exclusiva de productos locales traídos directamente a tu mesa con el amor y confianza de siempre.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group relative px-10 py-5 bg-primary text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <span className="relative flex items-center gap-2">
                Explorar Catálogo <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="px-10 py-5 glass hover:bg-white/20 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
              <FiShoppingBag />
              <span>Hacer Pedido</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Indicador de Scroll */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
